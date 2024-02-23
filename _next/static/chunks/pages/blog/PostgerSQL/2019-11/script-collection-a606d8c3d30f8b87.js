(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9396],{7164:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/PostgerSQL/2019-11/script-collection",function(){return a(3062)}])},3062:function(e,n,a){"use strict";a.r(n);var t=a(5893),s=a(9305);a(7294);var l=a(850);n.default=()=>(0,t.jsxs)(s.Xg,{blogcentered:!0,children:[(0,t.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Снова за свое"}),(0,t.jsx)(s.xv,{p:!0,children:"Сегодня мы соберем базовый набор скрипто для общего ознакомления с состоянием сервера PostgreSQL. Информация будет полезна для администраторов и разработчиков, имеющих дело с хайповой СУБД, а также всем энтузиастам, желающих “пощупать” PostgreSQL."}),(0,t.jsx)(s.xv,{p:!0,children:"Здесь Вы не найдете продвинутых скриптов, ведь это лишь для знакомство с новым серверов PostgreSQL. Но обо всем далее."}),(0,t.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Это не руководство"}),(0,t.jsx)(s.xv,{p:!0,children:"Данный материал не является полным руководством, и уж тем более не охватывает все вопросы администрирования СУБД, мониторинга производительности и диагностики. Это лишь начальный набор скриптов, с помощью которого Вы сможете ознакомиться что вообще творится на Вашем сервере баз данных и определить дальнейшие шаги."}),(0,t.jsx)(s.xv,{p:!0,children:"Все скрипты можно запускать с помощью терминального клиента psql, с помощью графической утилиты pgAdmin или же с помощью другого графического инструмента Azure Data Studio (поддержка PostgreSQL реализовано через расширение, не забудьте его установить). Это прямо “золотой век” инструментария для работы с базами данных!"}),(0,t.jsx)(s.xv,{p:!0,children:"Начнем с простых скриптов и постепенно перейдем к некоторым вопросам производительности."}),(0,t.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Поехали!"}),(0,t.jsx)(s.xv,{p:!0,children:"Перейдем уже непосредственно к скриптам. Все они были проверены на PostgreSQL версии 10, но абсолютное большинство скриптов можно запускать и на более ранних версиях."}),(0,t.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Первое знакомство"}),(0,t.jsx)(s.xv,{p:!0,children:"Как только Вы запустили свое клиентское приложение, то в первую очередь стоило бы узнать следующую информацию"}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Базовая информация о сервере"}),(0,t.jsx)(s.xv,{p:!0,children:"Под базовой информацией понимается адрес и порт сервера, версия установленной СУБД PostgreSQL, а также текущее имя базы."}),(0,t.jsx)(l.Z,{code:'\nselect \n	inet_server_addr( ) AS "Server", \n	inet_server_port( ) AS "Port",\n	current_database() AS "CurrentDatabase",\n	version() AS "Version";\n                ',className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Скорее всего, большинство этих параметров Вам уже известны еще до подключения. Разве что версия СУБД может оставлять вопросы."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Время работы с момента запуска"}),(0,t.jsx)(s.xv,{p:!0,children:"Иногда может быть полезным узнать, когда последний раз была перезапущена служба PostgreSQL."}),(0,t.jsx)(l.Z,{code:"\nSELECT \n	pg_postmaster_start_time() AS StartTime,\n	date_trunc('second', current_timestamp - pg_postmaster_start_time()) as SecondsRunning,\n	date_trunc('second', current_timestamp - pg_postmaster_start_time()) / 86400 as DaysRunning\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Скрипт показывает время с момента старта службы в секундах и днях."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Количество активных соединений"}),(0,t.jsx)(s.xv,{p:!0,children:"Работа PostgreSQL построена таким образом, что каждое соединение порождает серверный процесс “postgres” на стороне сервера, именно поэтому количество и список соединений может стать очень важной информацией, для получения представления о нагрузке, интенсивности работы с базой и настроек самой СУБД для оптимальной работы. И по этой же причине для оптимальной работы с PG нужен пул соединений, который и использует платформа 1С."}),(0,t.jsx)(l.Z,{code:"\nselect pid as process_id, \n       usename as username, \n       datname as database_name, \n       client_addr as client_address, \n       application_name,\n       backend_start,\n       state,\n       state_change\nfrom pg_stat_activity;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Часто имеет смысл собирать количество соединений на постоянной основе с помощью систем мониторинга."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Просмотр конфигурации сервера"}),(0,t.jsxs)(s.xv,{p:!0,children:["Большое количество параметров сервера PostgreSQL задается в файле postgresql.conf, поэтому обязательно следует рассмотреть настройки этого файла. Однако, это не обязательно делать с помощью редактора VI и перезапускать весь сервер, чтобы из этого редактора выйти ",":)"]}),(0,t.jsx)(s.xv,{p:!0,children:"Можно выполнить такой запрос."}),(0,t.jsx)(l.Z,{code:"\nselect \n	*\nfrom pg_settings\n-- Здесь Вы можете поставить отбор по интересуемым Вас параметрам\n--where name like '%log%'\n                ",className:"my-5",language:"sql"}),(0,t.jsxs)(s.xv,{p:!0,children:["Подробную информацию Вы ",(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(s.e9,{newTab:!0,href:"https://www.postgresql.org/docs/current/runtime-config.html",children:"можете узнать здесь."})})})]}),(0,t.jsx)(s.xv,{p:!0,children:"Общую информацию мы получили, пойдемте дальше."}),(0,t.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"О базах данных"}),(0,t.jsx)(s.xv,{p:!0,children:"Следующее, что следует изучить - это список баз данных и их размер."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Список баз"}),(0,t.jsx)(s.xv,{p:!0,children:"Получим список баз и некоторые их параметры (владелец, кодировка и кое-что другое)."}),(0,t.jsx)(l.Z,{code:'\nSELECT\n    inet_server_addr() AS "Server",\n    d.datname as "Name",\n    pg_catalog.pg_get_userbyid(d.datdba) as "Owner",\n    pg_catalog.pg_encoding_to_char(d.encoding) as "Encoding",\n    d.datcollate as "Collate",\n    d.datctype as "Ctype",\n    pg_catalog.array_to_string(d.datacl, E\'\n\') AS "Access privileges"\nFROM pg_catalog.pg_database d\nORDER BY 2;\n                ',className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Теперь мы знаем какие базы у нас есть на сервере."}),(0,t.jsx)(s.xv,{p:!0,children:"Не думаю, что эта информация может быть полезна сама по себе. Теперь узнаем размер всех баз."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Размер всех баз"}),(0,t.jsx)(s.xv,{p:!0,children:"Скрипт позволяет узнать какие базы у нас самые большие по размеру."}),(0,t.jsx)(l.Z,{code:"\nselect t1.datname AS db_name,  \n       pg_size_pretty(pg_database_size(t1.datname)) as db_size\nfrom pg_database t1\norder by pg_database_size(t1.datname) desc;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Чем больше база, тем больше к ней вопросов."}),(0,t.jsx)(s.xv,{p:!0,children:"На следующем шаге уже может потребоваться посмотреть почему эта база такая большая."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Размер таблиц"}),(0,t.jsx)(s.xv,{p:!0,children:"Следующим скриптом Вы можете узнать какие именно таблицы больше всего используют места, где очень “пухлые” индексы и большое количество записей."}),(0,t.jsx)(l.Z,{code:"\nSELECT\n	tablename AS table_name,\n	pg_class.reltuples as rows,\n	pg_total_relation_size(schemaname||'.'||tablename) / 1024 AS reservedKB,\n	pg_table_size(schemaname||'.'||tablename) / 1024 AS dataKB,\n	pg_indexes_size(schemaname||'.'||tablename) / 1024 as index_sizeKB,\n	pg_total_relation_size(schemaname||'.'||tablename)\n		- pg_table_size(schemaname||'.'||tablename)\n		- pg_indexes_size(schemaname||'.'||tablename) as unusedKB\nFROM pg_catalog.pg_tables, pg_catalog.pg_class\nwhere pg_tables.tablename = pg_class.relname  \n	and schemaname = 'public' \nORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Гиганты на сервере найдены, причины их размера почти понятны. Двигаемся дальше, рассмотрим, как у нас обстоят дела с индексами."}),(0,t.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"И снова индексы"}),(0,t.jsx)(s.xv,{p:!0,children:"Индексы являются одними из самых важных объектов любой базы данных, обеспечивающих производительность запросов и клиентских приложений для базы (в нашем случае это платформы 1С). Узнаем список индексов, который у нас есть."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Список индексов"}),(0,t.jsx)(s.xv,{p:!0,children:"В скрипте нет ничего необычного, просто список индексов и команда для их создания."}),(0,t.jsx)(l.Z,{code:"\nSELECT\n	-- Имя таблицы\n    tablename,\n	-- Имя индекса\n    indexname,\n	-- Команда создания индекса\n    indexdef,\n	-- Имя схемы\n	schemaname\nFROM\n    pg_indexes\nORDER BY\n    tablename,\n    indexname;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Также можно получить список индексов, в котором будет список полей, которые в них входят."}),(0,t.jsx)(l.Z,{code:"\nselect\n    -- Имя таблицы\n    t.relname as table_name,\n    -- Имя индекса\n    i.relname as index_name,\n    -- Список колонок\n    string_agg(a.attname, ',') as column_name\nfrom\n    pg_class t,\n    pg_class i,\n    pg_index ix,\n    pg_attribute a\nwhere\n    t.oid = ix.indrelid\n    and i.oid = ix.indexrelid\n    and a.attrelid = t.oid\n    and a.attnum = ANY(ix.indkey)\n    and t.relkind = 'r'\n    and t.relname not like 'pg_%'\ngroup by  \n    t.relname,\n    i.relname\norder by\n    t.relname,\n    i.relname;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Теперь копнем глубже. Список индексов - это хорошо, но нам нужно больше. Индексы нужны, но они могут и быть избыточными. Получим статистику использования индексов."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Статистика использования индексов"}),(0,t.jsx)(s.xv,{p:!0,children:"С помощью предложенного скрипта можно получить информацию о таблицах и их индексах, их размер, а также количество операций сканирования, чтений и количество “живых” строк, прочитанных из индекса."}),(0,t.jsx)(l.Z,{code:"\nSELECT\n    pt.tablename AS TableName\n    ,t.indexname AS IndexName\n    ,pc.reltuples AS TotalRows\n    ,pg_size_pretty(pg_relation_size(quote_ident(pt.tablename)::text)) AS TableSize\n    ,pg_size_pretty(pg_relation_size(quote_ident(t.indexrelname)::text)) AS IndexSize\n    ,t.idx_scan AS TotalNumberOfScan\n    ,t.idx_tup_read AS TotalTupleRead\n    ,t.idx_tup_fetch AS TotalTupleFetched\nFROM pg_tables AS pt\nLEFT OUTER JOIN pg_class AS pc \n	ON pt.tablename=pc.relname\nLEFT OUTER JOIN\n( \n	SELECT \n		pc.relname AS TableName\n		,pc2.relname AS IndexName\n		,psai.idx_scan\n		,psai.idx_tup_read\n		,psai.idx_tup_fetch\n		,psai.indexrelname \n	FROM pg_index AS pi\n	JOIN pg_class AS pc \n		ON pc.oid = pi.indrelid\n	JOIN pg_class AS pc2 \n		ON pc2.oid = pi.indexrelid\n	JOIN pg_stat_all_indexes AS psai \n		ON pi.indexrelid = psai.indexrelid \n)AS T\n    ON pt.tablename = T.TableName\nWHERE pt.schemaname='public'\nORDER BY 1;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Теперь мы точно знаем, если, конечно, статистика собрана качественная, какие индексы и как используются. Под “живыми” строками подразумеваются те записи, которые фактически и являются актуальными данными таблицы. “Мертвые” строки - это старые версии записей, которые уже либо заменены более новыми версиями данных, либо удалены из таблицы. На то PostgreSQL и “версионник”, что создает более новые версии данных, а старые версии должны быть подвергнуты очистке с помощью VACUUM."}),(0,t.jsx)(s.xv,{p:!0,children:"Рекомендую периодически следить за использованием индексов, ведь избыточные индексы - это не меньшая проблема, чем недостающие индексы."}),(0,t.jsx)(s.xv,{p:!0,children:"Попробуем определить недостающие индексы."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Таблица с отсутствующими индексами"}),(0,t.jsx)(s.xv,{p:!0,children:"К сожалению, PostgreSQL не предоставляет таких эффективных инструментов для поиска недостающих индексов, как это есть в SQL Server. Но с помощью статистики использования таблиц, мы можем определить для каких таблиц индексов явно не хватает за счет количества операций сканирования."}),(0,t.jsx)(l.Z,{code:"\nSELECT\n  relname,\n  seq_scan - idx_scan AS too_much_seq,\n  CASE\n    WHEN\n      seq_scan - coalesce(idx_scan, 0) > 0\n    THEN\n      'Missing Index?'\n    ELSE\n      'OK'\n  END,\n  pg_relation_size(relname::regclass) AS rel_size, seq_scan, idx_scan\nFROM\n  pg_stat_all_tables\nWHERE\n  schemaname = 'public'\n  AND pg_relation_size(relname::regclass) > 80000\nORDER BY\n  too_much_seq DESC;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Далее нужно анализировать запросы к таблице и планы их выполнения, которые нужно собирать отдельно. Это выходит за рамки публикации, но может быть мы вернемся к этой теме в будущем."}),(0,t.jsx)(s.xv,{p:!0,children:"Также стоит держать под контролем показатели фрагментации индексов, или bloat (“раздутия”) как это обычно еще называют в PostgreSQL."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Информация о фрагментации (раздутии) индексов"}),(0,t.jsx)(s.xv,{p:!0,children:"По результатам скрипта можно судить корректно ли настроено обслуживание, выполняется ли операция VACUUM, эффективно ли обслуживания."}),(0,t.jsx)(l.Z,{code:"\n-- https://wiki.postgresql.org/wiki/Show_database_bloat\n\nSELECT\n  current_database(), schemaname, tablename, /*reltuples::bigint, relpages::bigint, otta,*/\n  ROUND((CASE WHEN otta=0 THEN 0.0 ELSE sml.relpages::FLOAT/otta END)::NUMERIC,1) AS tbloat,\n  CASE WHEN relpages < otta THEN 0 ELSE bs*(sml.relpages-otta)::BIGINT END AS wastedbytes,\n  iname, /*ituples::bigint, ipages::bigint, iotta,*/\n  ROUND((CASE WHEN iotta=0 OR ipages=0 THEN 0.0 ELSE ipages::FLOAT/iotta END)::NUMERIC,1) AS ibloat,\n  CASE WHEN ipages < iotta THEN 0 ELSE bs*(ipages-iotta) END AS wastedibytes\nFROM (\n  SELECT\n    schemaname, tablename, cc.reltuples, cc.relpages, bs,\n    CEIL((cc.reltuples*((datahdr+ma-\n      (CASE WHEN datahdr%ma=0 THEN ma ELSE datahdr%ma END))+nullhdr2+4))/(bs-20::FLOAT)) AS otta,\n    COALESCE(c2.relname,'?') AS iname, COALESCE(c2.reltuples,0) AS ituples, COALESCE(c2.relpages,0) AS ipages,\n    COALESCE(CEIL((c2.reltuples*(datahdr-12))/(bs-20::FLOAT)),0) AS iotta -- very rough approximation, assumes all cols\n  FROM (\n    SELECT\n      ma,bs,schemaname,tablename,\n      (datawidth+(hdr+ma-(CASE WHEN hdr%ma=0 THEN ma ELSE hdr%ma END)))::NUMERIC AS datahdr,\n      (maxfracsum*(nullhdr+ma-(CASE WHEN nullhdr%ma=0 THEN ma ELSE nullhdr%ma END))) AS nullhdr2\n    FROM (\n      SELECT\n        schemaname, tablename, hdr, ma, bs,\n        SUM((1-null_frac)*avg_width) AS datawidth,\n        MAX(null_frac) AS maxfracsum,\n        hdr+(\n          SELECT 1+COUNT(*)/8\n          FROM pg_stats s2\n          WHERE null_frac<>0 AND s2.schemaname = s.schemaname AND s2.tablename = s.tablename\n        ) AS nullhdr\n      FROM pg_stats s, (\n        SELECT\n          (SELECT current_setting('block_size')::NUMERIC) AS bs,\n          CASE WHEN SUBSTRING(v,12,3) IN ('8.0','8.1','8.2') THEN 27 ELSE 23 END AS hdr,\n          CASE WHEN v ~ 'mingw32' THEN 8 ELSE 4 END AS ma\n        FROM (SELECT version() AS v) AS foo\n      ) AS constants\n      GROUP BY 1,2,3,4,5\n    ) AS foo\n  ) AS rs\n  JOIN pg_class cc ON cc.relname = rs.tablename\n  JOIN pg_namespace nn ON cc.relnamespace = nn.oid AND nn.nspname = rs.schemaname AND nn.nspname <> 'information_schema'\n  LEFT JOIN pg_index i ON indrelid = cc.oid\n  LEFT JOIN pg_class c2 ON c2.oid = i.indexrelid\n) AS sml\nORDER BY wastedbytes DESC;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"На этом с индексами пока все. Давайте посмотрим на статистику."}),(0,t.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Статистика в порядке?"}),(0,t.jsx)(s.xv,{p:!0,children:"Статистика является одним из самых важных показателей, который использует планировщик для построения эффективных планов запросов. Если статистика устареет, то запросы могут быть выполнены самым неоптимальным образом. В итоге вся информационная система может столкнуться с деградацией производительности."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Информация о статистике"}),(0,t.jsx)(s.xv,{p:!0,children:"С помощью этого скрипта можно получить информацию о таблицах в части количества измененных строк с момента последнего обновления статистики, а также запуска последних операций обслуживания."}),(0,t.jsx)(l.Z,{code:'\nSELECT\n	-- Идентификатор таблицы\n	"relid",\n	-- Имя схемы\n	"schemaname",\n	-- Имя таблицы\n	"relname",\n	-- Оценочное число строк, изменённых в этой таблице, с момента последнего сбора статистики\n	"n_mod_since_analyze" AS "row_mod",\n	-- Время последней очистки этой таблицы вручную (VACUUM FULL не учитывается)\n	"last_vacuum",\n	-- Время последней очистки таблицы фоновым процессом автоочистки\n	"last_autovacuum",\n	-- Время последнего выполнения сбора статистики для этой таблицы вручную\n	"last_analyze",\n	-- Время последнего выполнения сбора статистики для этой таблицы фоновым процессом автоочистки\n	"last_autoanalyze",\n	-- Сколько раз очистка этой таблицы была выполнена вручную (VACUUM FULL не учитывается)\n	"vacuum_count",\n	-- Сколько раз очистка этой таблицы была выполнена фоновым процессом автоочистки\n	"autovacuum_count",	\n	-- Сколько раз сбор статистики для этой таблицы был выполнен вручную\n	"analyze_count",\n	-- Сколько раз сбор статистики для этой таблицы был выполнен фоновым процессом автоочистки\n	"autoanalyze_count"\nFROM pg_stat_all_tables\n                ',className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Так Вы можете проверить эффективность работы VACUUM, а также обновление статистики с помощью опции ANALYZE. Правильная настройка VACUUM - залог эффективной работы СУБД. Вот пример запуска очистки и обновления статистики одним подходом."}),(0,t.jsx)(l.Z,{code:"\n- Подробнее: https://postgrespro.ru/docs/postgrespro/9.5/sql-vacuum\n\n-- VACUUM высвобождает пространство, занимаемое \xabмёртвыми\xbb кортежами. При обычных операциях Postgres Pro кортежи, \n-- удалённые или устаревшие в результате обновления, физически не удаляются из таблицы; они сохраняются в ней, \n-- пока не будет выполнена команда VACUUM. \n\n-- VERBOSE - выводит подробный отчет о результатах работы\n-- ANALYZE - обновляет статистику для оптимальной работы планировщика (эффективного построения планов запросов)\n\nVACUUM (VERBOSE, ANALYZE);\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Обслуживание в этой публикации мы не затрагиваем, это отдельная история."}),(0,t.jsx)(s.xv,{p:!0,children:"Теперь давайте поговорим о производительности."}),(0,t.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Производительность"}),(0,t.jsx)(s.xv,{p:!0,children:"Тема производительности достаточно сложная и творческая, т.к. сильно зависит от инфраструктуры, настроек PostgreSQL, особенностей информационной системы и еще много чего. Нужен уникальный подход в сопровождении и качественный мониторинг. Сейчас же мы просто рассмотрим несколько скриптов, которые могут помочь в самом начале."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Активные запросы"}),(0,t.jsx)(s.xv,{p:!0,children:"Скрипт покажет все активные запросы на сервере."}),(0,t.jsx)(l.Z,{code:'\nSELECT\n	-- Текст активного запроса\n	"query" as "query",\n	-- Идентификатор пользователя\n	"usesysid" as "user_id",\n	-- Имя пользователя\n	"usename" as "user_name",\n	-- Идентификатор базы\n	"datid" as "db_id",\n	-- Имя базы данных\n	"datname" as "db_name",\n	-- Начало выполнения запроса\n	"query_start" as "query_start",	\n	-- Идентификатор серверного процесса\n	"pid" as "db_name",\n	-- Информация о клиенте\n	"client_addr" as "client_address",\n	"client_hostname" as "client_hostname",	\n	"client_port" as "client_port",\n	-- Время начала транзакции\n	"xact_start" as "xact_start",\n	-- Тип события, которого ждет процесс\n	"wait_event_type" as "wait_event_type",\n	-- Имя ожидаемого события\n	"wait_event" as "wait_event",\n	-- Общее текущее состояние этого серверного процесса.\n	/*\n	active: серверный процесс выполняет запрос.\n	idle: серверный процесс ожидает новой команды от клиента.\n	idle in transaction: серверный процесс находится внутри транзакции, но в настоящее время не выполняет никакой запрос.\n	idle in transaction (aborted): Это состояние подобно idle in transaction, за исключением того, \n		что один из операторов в транзакции вызывал ошибку.\n	fastpath function call: серверный процесс выполняет fast-path функцию.\n	disabled: Это состояние отображается для серверных процессов, у которых параметр track_activities отключён.\n	*/\n	"state" as "state"\nFROM pg_stat_activity\nWHERE "state" = \'active\'\n                ',className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Ну а что дальше делать с этими запросами зависит от ситуации."}),(0,t.jsx)(s.xv,{p:!0,children:"Теперь мы можем получить план запроса."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Получение плана запроса"}),(0,t.jsx)(s.xv,{p:!0,children:"PostgreSQL может кэшировать планы запросов в рамках серверных процессов, но это не является поведением по умолчанию. Поэтому, в отличии от SQL Server, мы не сможем получить кэш плана запроса из какого-либо буффера. Вместо этого нам нужно запросить у сервера план явно и он его сгенерирует заново. Вот как это можно сделать."}),(0,t.jsx)(l.Z,{code:"\n-- Анализ плана запроса, который использует планировщик\nEXPLAIN\n\n-- Текст запроса для анализа\nSELECT\n	*\nFROM pg_stat_activity;\n\n-- Анализ плана запроса с фактическим выполнением для более точной оценки\nEXPLAIN ANALYZE\n\n-- Текст запроса для анализа\nSELECT\n	*\nFROM pg_stat_activity;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"EXPLAIN поможет получить план запроса. Если использовать опцию “ANALYZE”, то мы получим более подробную информацию о запросе, в том числе количество строк и время выполнение. Это достигается за счет фактического выполнения запроса. Без этого параметра будет формироваться предварительный план, который во многих случаях также может быть полезен для анализа."}),(0,t.jsx)(s.xv,{p:!0,children:"Также можно настроить сбор планов выполняемых запросов, но это уже другая история."}),(0,t.jsx)(s.xv,{p:!0,children:"Может быть полезным получить информацию о выполняемых транзакциях."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Информация о транзакциях"}),(0,t.jsx)(s.xv,{p:!0,children:"Первым делом можно получить длительные транзакции в разрезе клиентский машин и пользователей."}),(0,t.jsx)(l.Z,{code:"\nselect \n    client_addr, \n    usename, \n    datname, \n    clock_timestamp() - xact_start as xact_age, \n    clock_timestamp() - query_start as query_age, \n    query \nfrom pg_stat_activity \norder by xact_start, query_start;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Также можно найти “плохие” транзакции, которые ожидают чего-то (снятие блокировки или других ресурсов) или отменены по каким-либо причинам."}),(0,t.jsx)(l.Z,{code:"\nselect\n    * \nfrom pg_stat_activity \nwhere state in ('idle in transaction', 'idle in transaction (aborted)');\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Обычно эти скрипты используются в аварийные моменты, когда есть жалобы на работу системы, т.к получать эту информацию в системе в моменты простоя (ночью, например или выходные) нет особого смысла."}),(0,t.jsx)(s.xv,{p:!0,children:"Можно проверить эффективность работы кэша."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Использование кэша"}),(0,t.jsx)(s.xv,{p:!0,children:"Аналогично SQL Server, можно отслеживать параметр эффективности работы с кэшем."}),(0,t.jsx)(l.Z,{code:"\nselect \n    sum(blks_hit)*100/sum(blks_hit+blks_read) as hit_ratio \nfrom pg_stat_database;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"Если значение выше 90%, то СУБД может эффективно использовать память для оптимизации своей работы."}),(0,t.jsx)(s.xv,{p:!0,children:"И под конец попробуем получить длительные запросы."}),(0,t.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Длительные запросы"}),(0,t.jsx)(s.xv,{p:!0,children:"Можно получить информацию о текущих запросах. которые выполняются больше какого-то времени."}),(0,t.jsx)(l.Z,{code:"\n-- Запросы, выполняющиеся более 1 минуты\n\nSELECT \n    now() - query_start as \"runtime\", \n    usename, \n    datname, \n    waiting, \n    state, \n    query \nFROM pg_stat_activity \nWHERE now() - query_start > '1 minutes'::interval \n--WHERE now() - query_start > '60 seconds'::interval \nORDER BY runtime DESC;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(s.xv,{p:!0,children:"В примере это запросы, выполняющиеся более 1 минуты. К сожалению, скрипт не может предоставить полноценную картину. Только сбор и анализ запросов в рамках мониторинга ответит на все вопросы по проблемам производительности."}),(0,t.jsx)(s.xv,{p:!0,children:"Вот и все, со скриптами пока все."}),(0,t.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Любите ли Вы PostgreSQL?"}),(0,t.jsx)(s.xv,{p:!0,children:"Никаких готовых рецептов в статье нет, также как и нет информации о настройке операционной системы для оптимальной работы СУБД (не важно Windows это или *.nix) или настройке мониторинга. Лишь скрипты для получения общей информации."}),(0,t.jsx)(s.xv,{p:!0,children:"Однако, теперь у Вас может появиться интерес и направление для изучения этой популярной и эффективной СУБД."})]})},850:function(e,n,a){"use strict";a.d(n,{Z:function(){return m}});var t=a(5893),s=a(7294),l=a(4965),i=a(4275),r=a(7340);function c(){let e=(0,r._)(["\n  text-align: left;\n  overflow: hidden;\n  font-size: 14px;\n  border-radius: 6px;\n  overflow: auto;\n  max-height: 350px;\n\n  & .token-line {\n    line-height: 1.3em;\n    height: 1.3em;\n  }\n"]);return c=function(){return e},e}let d=a(964).ZP.pre(c());var m=e=>{let{code:n,className:r,language:c}=e;return(void 0!==a.g?a.g:window).Prism=l.p1,a(1354),a(9016),a(5266),a(2927),a(1315),a(7874),a(6862),(0,t.jsx)("div",{className:(0,i.GF)("bg-blue-500 md:p-5 p-2",r),children:(0,t.jsx)("div",{className:"shadow-lg",children:(0,t.jsx)(l.y$,{theme:l.np.vsDark,code:n,language:null!=c?c:c="tsx",children:e=>{let{className:n,style:a,tokens:l,getLineProps:i,getTokenProps:r}=e;return(0,t.jsx)(d,{className:n,style:a,children:l.map((e,n)=>(0,s.createElement)("div",{...i({line:e,key:n}),key:Math.random()},e.map((e,n)=>(0,s.createElement)("span",{...r({token:e,key:n}),key:Math.random()}))))})}})})})}},9305:function(e,n,a){"use strict";a.d(n,{Ee:function(){return r},Xg:function(){return l},aV:function(){return d},e9:function(){return m},o_:function(){return x},ty:function(){return c},xv:function(){return i}});var t=a(5152),s=a.n(t);let l=s()(()=>Promise.all([a.e(4838),a.e(4738),a.e(4817),a.e(1664),a.e(7167)]).then(a.bind(a,7167)),{loadableGenerated:{webpack:()=>[7167]}}),i=s()(()=>a.e(9179).then(a.bind(a,9179)),{loadableGenerated:{webpack:()=>[9179]}}),r=s()(()=>a.e(1974).then(a.bind(a,1974)),{loadableGenerated:{webpack:()=>[1974]}}),c=s()(()=>a.e(8547).then(a.bind(a,8547)),{loadableGenerated:{webpack:()=>[8547]}}),d=s()(()=>a.e(6806).then(a.bind(a,6806)),{loadableGenerated:{webpack:()=>[6806]}}),m=s()(()=>Promise.all([a.e(1664),a.e(1465)]).then(a.bind(a,1465)),{loadableGenerated:{webpack:()=>[1465]}});s()(()=>a.e(567).then(a.bind(a,567)),{loadableGenerated:{webpack:()=>[567]}}),s()(()=>Promise.all([a.e(2004),a.e(4139)]).then(a.bind(a,4139)),{loadableGenerated:{webpack:()=>[4139]}});let x=s()(()=>Promise.all([a.e(5507),a.e(7472),a.e(584),a.e(7870)]).then(a.bind(a,7870)),{loadableGenerated:{webpack:()=>[7870]}})}},function(e){e.O(0,[1102,2888,9774,179],function(){return e(e.s=7164)}),_N_E=e.O()}]);