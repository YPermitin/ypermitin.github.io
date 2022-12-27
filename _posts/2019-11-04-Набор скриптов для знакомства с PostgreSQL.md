---
layout: post
title: Набор скриптов для знакомства с PostgreSQL
categories: postgresql
background: '/img/posts/2019/2019-11-04-%D0%9D%D0%B0%D0%B1%D0%BE%D1%80%20%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%82%D0%BE%D0%B2%20%D0%B4%D0%BB%D1%8F%20%D0%B7%D0%BD%D0%B0%D0%BA%D0%BE%D0%BC%D1%81%D1%82%D0%B2%D0%B0%20%D1%81%20PostgreSQL/logo.png'
---

Немного скриптов для PostgreSQL, позволяющих познакомиться с состоянием сервера.

## Снова за свое

Сегодня мы соберем базовый набор скрипто для общего ознакомления с состоянием сервера PostgreSQL. Информация будет полезна для администраторов и разработчиков, имеющих дело с хайповой СУБД, а также всем энтузиастам, желающих "пощупать" PostgreSQL. 

Здесь Вы не найдете продвинутых скриптов, ведь это лишь для знакомство с новым серверов PostgreSQL. Но обо всем далее.

## Это не руководство

Данный материал не является полным руководством, и уж тем более не охватывает все вопросы администрирования СУБД, мониторинга производительности и диагностики. Это лишь начальный набор скриптов, с помощью которого Вы сможете ознакомиться что вообще творится на Вашем сервере баз данных и определить дальнейшие шаги.

Все скрипты можно запускать с помощью терминального клиента psql, с помощью графической утилиты pgAdmin или же с помощью другого графического инструмента Azure Data Studio (поддержка PostgreSQL реализовано через расширение, не забудьте его установить). Это прямо "золотой век" инструментария для работы с базами данных!

Начнем с простых скриптов и постепенно перейдем к некоторым вопросам производительности.

## Поехали!

Перейдем уже непосредственно к скриптам. Все они были проверены на PostgreSQL версии 10, но абсолютное большинство скриптов можно запускать и на более ранних версиях.

### Первое знакомство

Как только Вы запустили свое клиентское приложение, то в первую очередь стоило бы узнать следующую информацию

#### Базовая информация о сервере

Под базовой информацией понимается адрес и порт сервера, версия установленной СУБД PostgreSQL, а также текущее имя базы.

```sql
select 
	inet_server_addr( ) AS "Server", 
	inet_server_port( ) AS "Port",
	current_database() AS "CurrentDatabase",
	version() AS "Version";
```

Скорее всего, большинство этих параметров Вам уже известны еще до подключения. Разве что версия СУБД может оставлять вопросы.

#### Время работы с момента запуска

Иногда может быть полезным узнать, когда последний раз была перезапущена служба PostgreSQL.

```sql
SELECT 
	pg_postmaster_start_time() AS StartTime,
	date_trunc('second', current_timestamp - pg_postmaster_start_time()) as SecondsRunning,
	date_trunc('second', current_timestamp - pg_postmaster_start_time()) / 86400 as DaysRunning
```

Скрипт показывает время с момента старта службы в секундах и днях.

#### Количество активных соединений

Работа PostgreSQL построена таким образом, что каждое соединение порождает серверный процесс "postgres" на стороне сервера, именно поэтому количество и список соединений может стать очень важной информацией, для получения представления о нагрузке, интенсивности работы с базой и настроек самой СУБД для оптимальной работы. И по этой же причине для оптимальной работы с PG нужен пул соединений, который и использует платформа 1С.

```sql
select pid as process_id, 
       usename as username, 
       datname as database_name, 
       client_addr as client_address, 
       application_name,
       backend_start,
       state,
       state_change
from pg_stat_activity;
```

Часто имеет смысл собирать количество соединений на постоянной основе с помощью систем мониторинга.

#### Просмотр конфигурации сервера

Большое количество параметров сервера PostgreSQL задается в файле postgresql.conf, поэтому обязательно следует рассмотреть настройки этого файла. Однако, это не обязательно делать с помощью редактора VI и перезапускать весь сервер, чтобы из этого редактора выйти :)

Можно выполнить такой запрос.

```sql
select 
	*
from pg_settings
-- Здесь Вы можете поставить отбор по интересуемым Вас параметрам
--where name like '%log%'
```

Подробную информацию Вы [можете узнать здесь](https://www.postgresql.org/docs/current/runtime-config.html).

Общую информацию мы получили, пойдемте дальше.

### О базах данных

Следующее, что следует изучить - это список баз данных и их размер.

#### Список баз

Получим список баз и некоторые их параметры (владелец, кодировка и кое-что другое).

```sql
SELECT
    inet_server_addr() AS "Server",
    d.datname as "Name",
    pg_catalog.pg_get_userbyid(d.datdba) as "Owner",
    pg_catalog.pg_encoding_to_char(d.encoding) as "Encoding",
    d.datcollate as "Collate",
    d.datctype as "Ctype",
    pg_catalog.array_to_string(d.datacl, E'\n') AS "Access privileges"
FROM pg_catalog.pg_database d
ORDER BY 2;
```

Теперь мы знаем какие базы у нас есть на сервере.

Не думаю, что эта информация может быть полезна сама по себе. Теперь узнаем размер всех баз.

#### Размер всех баз

Скрипт позволяет узнать какие базы у нас самые большие по размеру.

```sql
select t1.datname AS db_name,  
       pg_size_pretty(pg_database_size(t1.datname)) as db_size
from pg_database t1
order by pg_database_size(t1.datname) desc;
```

Чем больше база, тем больше к ней вопросов.

На следующем шаге уже может потребоваться посмотреть почему эта база такая большая.

#### Размер таблиц

Следующим скриптом Вы можете узнать какие именно таблицы больше всего используют места, где очень "пухлые" индексы и большое количество записей.

```sql
SELECT
	tablename AS table_name,
	pg_class.reltuples as rows,
	pg_total_relation_size(schemaname||'.'||tablename) / 1024 AS reservedKB,
	pg_table_size(schemaname||'.'||tablename) / 1024 AS dataKB,
	pg_indexes_size(schemaname||'.'||tablename) / 1024 as index_sizeKB,
	pg_total_relation_size(schemaname||'.'||tablename)
		- pg_table_size(schemaname||'.'||tablename)
		- pg_indexes_size(schemaname||'.'||tablename) as unusedKB
FROM pg_catalog.pg_tables, pg_catalog.pg_class
where pg_tables.tablename = pg_class.relname  
	and schemaname = 'public' 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
```

Гиганты на сервере найдены, причины их размера почти понятны. Двигаемся дальше, рассмотрим, как у нас обстоят дела с индексами.

### И снова индексы

Индексы являются одними из самых важных объектов любой базы данных, обеспечивающих производительность запросов и клиентских приложений для базы (в нашем случае это платформы 1С). Узнаем список индексов, который у нас есть.

#### Список индексов

В скрипте нет ничего необычного, просто список индексов и команда для их создания.

```sql
SELECT
	-- Имя таблицы
    tablename,
	-- Имя индекса
    indexname,
	-- Команда создания индекса
    indexdef,
	-- Имя схемы
	schemaname
FROM
    pg_indexes
ORDER BY
    tablename,
    indexname;
```

Также можно получить список индексов, в котором будет список полей, которые в них входят.

```sql
select
    -- Имя таблицы
    t.relname as table_name,
    -- Имя индекса
    i.relname as index_name,
    -- Список колонок
    string_agg(a.attname, ',') as column_name
from
    pg_class t,
    pg_class i,
    pg_index ix,
    pg_attribute a
where
    t.oid = ix.indrelid
    and i.oid = ix.indexrelid
    and a.attrelid = t.oid
    and a.attnum = ANY(ix.indkey)
    and t.relkind = 'r'
    and t.relname not like 'pg_%'
group by  
    t.relname,
    i.relname
order by
    t.relname,
    i.relname;
```

Теперь копнем глубже. Список индексов - это хорошо, но нам нужно больше. Индексы нужны, но они могут и быть избыточными. Получим статистику использования индексов.

#### Статистика использования индексов

С помощью предложенного скрипта можно получить информацию о таблицах и их индексах, их размер, а также количество операций сканирования, чтений и количество "живых" строк, прочитанных из индекса.

```sql
SELECT
    pt.tablename AS TableName
    ,t.indexname AS IndexName
    ,pc.reltuples AS TotalRows
    ,pg_size_pretty(pg_relation_size(quote_ident(pt.tablename)::text)) AS TableSize
    ,pg_size_pretty(pg_relation_size(quote_ident(t.indexrelname)::text)) AS IndexSize
    ,t.idx_scan AS TotalNumberOfScan
    ,t.idx_tup_read AS TotalTupleRead
    ,t.idx_tup_fetch AS TotalTupleFetched
FROM pg_tables AS pt
LEFT OUTER JOIN pg_class AS pc 
	ON pt.tablename=pc.relname
LEFT OUTER JOIN
( 
	SELECT 
		pc.relname AS TableName
		,pc2.relname AS IndexName
		,psai.idx_scan
		,psai.idx_tup_read
		,psai.idx_tup_fetch
		,psai.indexrelname 
	FROM pg_index AS pi
	JOIN pg_class AS pc 
		ON pc.oid = pi.indrelid
	JOIN pg_class AS pc2 
		ON pc2.oid = pi.indexrelid
	JOIN pg_stat_all_indexes AS psai 
		ON pi.indexrelid = psai.indexrelid 
)AS T
    ON pt.tablename = T.TableName
WHERE pt.schemaname='public'
ORDER BY 1;
```

Теперь мы точно знаем, если, конечно, статистика собрана качественная, какие индексы и как используются. Под "живыми" строками подразумеваются те записи, которые фактически и являются актуальными данными таблицы. "Мертвые" строки - это старые версии записей, которые уже либо заменены более новыми версиями данных, либо удалены из таблицы. На то PostgreSQL и "версионник", что создает более новые версии данных, а старые версии должны быть подвергнуты очистке с помощью VACUUM.

Рекомендую периодически следить за использованием индексов, ведь избыточные индексы - это не меньшая проблема, чем недостающие индексы.

Попробуем определить недостающие индексы.

#### Таблица с отсутствующими индексами

К сожалению, PostgreSQL не предоставляет таких эффективных инструментов для поиска недостающих индексов, как это есть в SQL Server. Но с помощью статистики использования таблиц, мы можем определить для каких таблиц индексов явно не хватает за счет количества операций сканирования.

```sql
SELECT
  relname,
  seq_scan - idx_scan AS too_much_seq,
  CASE
    WHEN
      seq_scan - coalesce(idx_scan, 0) > 0
    THEN
      'Missing Index?'
    ELSE
      'OK'
  END,
  pg_relation_size(relname::regclass) AS rel_size, seq_scan, idx_scan
FROM
  pg_stat_all_tables
WHERE
  schemaname = 'public'
  AND pg_relation_size(relname::regclass) > 80000
ORDER BY
  too_much_seq DESC;
```

Далее нужно анализировать запросы к таблице и планы их выполнения, которые нужно собирать отдельно. Это выходит за рамки публикации, но может быть мы вернемся к этой теме в будущем.

Также стоит держать под контролем показатели фрагментации индексов, или bloat ("раздутия") как это обычно еще называют в PostgreSQL.

#### Информация о фрагментации (раздутии) индексо

По результатам скрипта можно судить корректно ли настроено обслуживание, выполняется ли операция VACUUM, эффективно ли обслуживания.

```sql
-- https://wiki.postgresql.org/wiki/Show_database_bloat

SELECT
  current_database(), schemaname, tablename, /*reltuples::bigint, relpages::bigint, otta,*/
  ROUND((CASE WHEN otta=0 THEN 0.0 ELSE sml.relpages::FLOAT/otta END)::NUMERIC,1) AS tbloat,
  CASE WHEN relpages < otta THEN 0 ELSE bs*(sml.relpages-otta)::BIGINT END AS wastedbytes,
  iname, /*ituples::bigint, ipages::bigint, iotta,*/
  ROUND((CASE WHEN iotta=0 OR ipages=0 THEN 0.0 ELSE ipages::FLOAT/iotta END)::NUMERIC,1) AS ibloat,
  CASE WHEN ipages < iotta THEN 0 ELSE bs*(ipages-iotta) END AS wastedibytes
FROM (
  SELECT
    schemaname, tablename, cc.reltuples, cc.relpages, bs,
    CEIL((cc.reltuples*((datahdr+ma-
      (CASE WHEN datahdr%ma=0 THEN ma ELSE datahdr%ma END))+nullhdr2+4))/(bs-20::FLOAT)) AS otta,
    COALESCE(c2.relname,'?') AS iname, COALESCE(c2.reltuples,0) AS ituples, COALESCE(c2.relpages,0) AS ipages,
    COALESCE(CEIL((c2.reltuples*(datahdr-12))/(bs-20::FLOAT)),0) AS iotta -- very rough approximation, assumes all cols
  FROM (
    SELECT
      ma,bs,schemaname,tablename,
      (datawidth+(hdr+ma-(CASE WHEN hdr%ma=0 THEN ma ELSE hdr%ma END)))::NUMERIC AS datahdr,
      (maxfracsum*(nullhdr+ma-(CASE WHEN nullhdr%ma=0 THEN ma ELSE nullhdr%ma END))) AS nullhdr2
    FROM (
      SELECT
        schemaname, tablename, hdr, ma, bs,
        SUM((1-null_frac)*avg_width) AS datawidth,
        MAX(null_frac) AS maxfracsum,
        hdr+(
          SELECT 1+COUNT(*)/8
          FROM pg_stats s2
          WHERE null_frac<>0 AND s2.schemaname = s.schemaname AND s2.tablename = s.tablename
        ) AS nullhdr
      FROM pg_stats s, (
        SELECT
          (SELECT current_setting('block_size')::NUMERIC) AS bs,
          CASE WHEN SUBSTRING(v,12,3) IN ('8.0','8.1','8.2') THEN 27 ELSE 23 END AS hdr,
          CASE WHEN v ~ 'mingw32' THEN 8 ELSE 4 END AS ma
        FROM (SELECT version() AS v) AS foo
      ) AS constants
      GROUP BY 1,2,3,4,5
    ) AS foo
  ) AS rs
  JOIN pg_class cc ON cc.relname = rs.tablename
  JOIN pg_namespace nn ON cc.relnamespace = nn.oid AND nn.nspname = rs.schemaname AND nn.nspname <> 'information_schema'
  LEFT JOIN pg_index i ON indrelid = cc.oid
  LEFT JOIN pg_class c2 ON c2.oid = i.indexrelid
) AS sml
ORDER BY wastedbytes DESC;
```

На этом с индексами пока все. Давайте посмотрим на статистику.s

### Статистика в порядке?

Статистика является одним из самых важных показателей, который использует планировщик для построения эффективных планов запросов. Если статистика устареет, то запросы могут быть выполнены самым неоптимальным образом. В итоге вся информационная система может столкнуться с деградацией производительности.

#### Информация о статистике

С помощью этого скрипта можно получить информацию о таблицах в части количества измененных строк с момента последнего обновления статистики, а также запуска последних операций обслуживания.

```sql
SELECT
	-- Идентификатор таблицы
	"relid",
	-- Имя схемы
	"schemaname",
	-- Имя таблицы
	"relname",
	-- Оценочное число строк, изменённых в этой таблице, с момента последнего сбора статистики
	"n_mod_since_analyze" AS "row_mod",
	-- Время последней очистки этой таблицы вручную (VACUUM FULL не учитывается)
	"last_vacuum",
	-- Время последней очистки таблицы фоновым процессом автоочистки
	"last_autovacuum",
	-- Время последнего выполнения сбора статистики для этой таблицы вручную
	"last_analyze",
	-- Время последнего выполнения сбора статистики для этой таблицы фоновым процессом автоочистки
	"last_autoanalyze",
	-- Сколько раз очистка этой таблицы была выполнена вручную (VACUUM FULL не учитывается)
	"vacuum_count",
	-- Сколько раз очистка этой таблицы была выполнена фоновым процессом автоочистки
	"autovacuum_count",	
	-- Сколько раз сбор статистики для этой таблицы был выполнен вручную
	"analyze_count",
	-- Сколько раз сбор статистики для этой таблицы был выполнен фоновым процессом автоочистки
	"autoanalyze_count"
FROM pg_stat_all_tables
```

Так Вы можете проверить эффективность работы VACUUM, а также обновление статистики с помощью опции ANALYZE. Правильная настройка VACUUM - залог эффективной работы СУБД. Вот пример запуска очистки и обновления статистики одним подходом.

```sql
- Подробнее: https://postgrespro.ru/docs/postgrespro/9.5/sql-vacuum

-- VACUUM высвобождает пространство, занимаемое «мёртвыми» кортежами. При обычных операциях Postgres Pro кортежи, 
-- удалённые или устаревшие в результате обновления, физически не удаляются из таблицы; они сохраняются в ней, 
-- пока не будет выполнена команда VACUUM. 

-- VERBOSE - выводит подробный отчет о результатах работы
-- ANALYZE - обновляет статистику для оптимальной работы планировщика (эффективного построения планов запросов)

VACUUM (VERBOSE, ANALYZE);
```

Обслуживание в этой публикации мы не затрагиваем, это отдельная история.

Теперь давайте поговорим о производительности.

### Производительность

Тема производительности достаточно сложная и творческая, т.к. сильно зависит от инфраструктуры, настроек PostgreSQL, особенностей информационной системы и еще много чего. Нужен уникальный подход в сопровождении и качественный мониторинг. Сейчас же мы просто рассмотрим несколько скриптов, которые могут помочь в самом начале.

#### Активные запросы

Скрипт покажет все активные запросы на сервере.

```sql
SELECT
	-- Текст активного запроса
	"query" as "query",
	-- Идентификатор пользователя
	"usesysid" as "user_id",
	-- Имя пользователя
	"usename" as "user_name",
	-- Идентификатор базы
	"datid" as "db_id",
	-- Имя базы данных
	"datname" as "db_name",
	-- Начало выполнения запроса
	"query_start" as "query_start",	
	-- Идентификатор серверного процесса
	"pid" as "db_name",
	-- Информация о клиенте
	"client_addr" as "client_address",
	"client_hostname" as "client_hostname",	
	"client_port" as "client_port",
	-- Время начала транзакции
	"xact_start" as "xact_start",
	-- Тип события, которого ждет процесс
	"wait_event_type" as "wait_event_type",
	-- Имя ожидаемого события
	"wait_event" as "wait_event",
	-- Общее текущее состояние этого серверного процесса.
	/*
	active: серверный процесс выполняет запрос.
	idle: серверный процесс ожидает новой команды от клиента.
	idle in transaction: серверный процесс находится внутри транзакции, но в настоящее время не выполняет никакой запрос.
	idle in transaction (aborted): Это состояние подобно idle in transaction, за исключением того, 
		что один из операторов в транзакции вызывал ошибку.
	fastpath function call: серверный процесс выполняет fast-path функцию.
	disabled: Это состояние отображается для серверных процессов, у которых параметр track_activities отключён.
	*/
	"state" as "state"
FROM pg_stat_activity
WHERE "state" = 'active'
```

Ну а что дальше делать с этими запросами зависит от ситуации.

Теперь мы можем получить план запроса.

#### Получение плана запроса

PostgreSQL может кэшировать планы запросов в рамках серверных процессов, но это не является поведением по умолчанию. Поэтому, в отличии от SQL Server, мы не сможем получить кэш плана запроса из какого-либо буффера. Вместо этого нам нужно запросить у сервера план явно и он его сгенерирует заново. Вот как это можно сделать.

```sql
-- Анализ плана запроса, который использует планировщик
EXPLAIN

-- Текст запроса для анализа
SELECT
	*
FROM pg_stat_activity;

-- Анализ плана запроса с фактическим выполнением для более точной оценки
EXPLAIN ANALYZE

-- Текст запроса для анализа
SELECT
	*
FROM pg_stat_activity;
```

EXPLAIN поможет получить план запроса. Если использовать опцию "ANALYZE", то мы получим более подробную информацию о запросе, в том числе количество строк и время выполнение. Это достигается за счет фактического выполнения запроса. Без этого параметра будет формироваться предварительный план, который во многих случаях также может быть полезен для анализа.

Также можно настроить сбор планов выполняемых запросов, но это уже другая история.

Может быть полезным получить информацию о выполняемых транзакциях.

#### Информация о транзакциях

Первым делом можно получить длительные транзакции в разрезе клиентский машин и пользователей.

```sql
select 
    client_addr, 
    usename, 
    datname, 
    clock_timestamp() - xact_start as xact_age, 
    clock_timestamp() - query_start as query_age, 
    query 
from pg_stat_activity 
order by xact_start, query_start;
```

Также можно найти "плохие" транзакции, которые ожидают чего-то (снятие блокировки или других ресурсов) или отменены по каким-либо причинам.

```sql
select
    * 
from pg_stat_activity 
where state in ('idle in transaction', 'idle in transaction (aborted)');
```

Обычно эти скрипты используются в аварийные моменты, когда есть жалобы на работу системы, т.к получать эту информацию в системе в моменты простоя (ночью, например или выходные) нет особого смысла.

Можно проверить эффективность работы кэша.

#### Использование кэша

Аналогично SQL Server, можно отслеживать параметр эффективности работы с кэшем.

```sql
select 
    sum(blks_hit)*100/sum(blks_hit+blks_read) as hit_ratio 
from pg_stat_database;
```

Если значение выше 90%, то СУБД может эффективно использовать память для оптимизации своей работы.

И под конец попробуем получить длительные запросы.

#### Длительные запросы

Можно получить информацию о текущих запросах. которые выполняются больше какого-то времени.

```sql
-- Запросы, выполняющиеся более 1 минуты

SELECT 
    now() - query_start as "runtime", 
    usename, 
    datname, 
    waiting, 
    state, 
    query 
FROM pg_stat_activity 
WHERE now() - query_start > '1 minutes'::interval 
--WHERE now() - query_start > '60 seconds'::interval 
ORDER BY runtime DESC;
```

В примере это запросы, выполняющиеся более 1 минуты. К сожалению, скрипт не может предоставить полноценную картину. Только сбор и анализ запросов в рамках мониторинга ответит на все вопросы по проблемам производительности.

Вот и все, со скриптами пока все.

## Любите ли Вы PostgreSQL?

Никаких готовых рецептов в статье нет, также как и нет информации о настройке операционной системы для оптимальной работы СУБД (не важно Windows это или *.nix) или настройке мониторинга. Лишь скрипты для получения общей информации.

Однако, теперь у Вас может появиться интерес и направление для изучения этой популярной и эффективной СУБД.
