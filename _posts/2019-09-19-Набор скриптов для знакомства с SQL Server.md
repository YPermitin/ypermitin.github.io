---
layout: post
title: Набор скриптов для знакомства с SQL Server
categories: sqlserver
background: '/img/posts/2019/2019-09-19-%D0%9D%D0%B0%D0%B1%D0%BE%D1%80%20%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%82%D0%BE%D0%B2%20%D0%B4%D0%BB%D1%8F%20%D0%B7%D0%BD%D0%B0%D0%BA%D0%BE%D0%BC%D1%81%D1%82%D0%B2%D0%B0%20%D1%81%20SQL%20Server/logo.png'
---

Поговорим о скриптах, которые помогут быстро ознакомиться с состоянием SQL Server, в том числе с вопросами производительности.

## С чего все начинается

[В одной из прошлых статей](https://ypermitin.github.io/sqlserver/2019/05/05/Мониторинг-SQL-Server-с-помощью-Extended-Events-(и-не-только).-Как-держать-руку-на-пульсе.html) мы рассматривали вопросы мониторинга SQL Server в контексте работы с платформой 1С. И это правильно, ведь мониторинг СУБД является залогом стабильной работы информационной системы и всей компании.

Но что, если Вы как консультант / эксперт только пришли к новому клиенту / на новое место работы. Мониторинга там нет, но нужно понять, разобраться что там вообще происходит. Разобраться что за сервер вообще установлен, делаются ли бэкапы, какие базы развернуты, все ли в порядке с обслуживанием и так далее.

Сегодня мы рассмотрим подобные вопросы. Начнем знакомство с сервером с помощью простых запросов, а остановимся на примерах поинтереснее.

## Скриптов достаточно?

Думаете, что все возникающие вопросы с СУБД можно решить скриптами? Многие вопросы, но точно не все!

Например, полноценный мониторинг сервера и сбор счетчиков производительности средствами СУБД точно не реализовать, ведь данные нужно не просто собирать, но и обрабатывать, компоновать, визуализировать и, в конечном, счете как-то интерпретировать.

Конечно, SQL Server может решить все перечисленные задачи, ведь даже счетчики производительности операционной системы с его помощью можно собирать! Но это не всегда возможно, ведь тогда надо держать его установленным на всех серверах, даже которые к СУБД не относятся. А про сопровождение такого решения я вообще молчу.

Поэтому сделаю важное уточнение - с помощью предлагаемого набора скриптов решить все задачи с настройкой и мониторингом СУБД невозможно! А вот получить первое представление о ее состоянии, и поверхностную информацию о проблемах - самое то!

## Ближе к делу

Меньше слов - больше T-SQL скриптов!

### Знакомимся с сервером

На первом этапе всегда было бы полезно узнать следующую информацию. 

#### Базовая информация о сервере

Начнем с основной информации.

```sql
-- Имена сервера и экземпляра 
Select @@SERVERNAME as [Server\Instance]; 

-- версия SQL Server 
Select @@VERSION as SQLServerVersion; 

-- экземпляр SQL Server 
Select @@ServiceName AS ServiceInstance;

 -- Текущая БД (БД, в контексте которой выполняется запрос)
Select DB_NAME() AS CurrentDB_Name;
```

Теперь мы знаем какая версия SQL Server используется, имя экземпляра и сервера. 

Хотя есть подозрение, что имя экземпляра Вы знали еще до подключения к нему :)

Версия СУБД может пригодиться для определения какие возможности у нее есть, известные баги и др.

#### Время работы с момента запуска

В большинстве вопросов диагностики производительности и стабильности важно знать сколько времени уже запущен экземпляр SQL Server.

```sql
SELECT  @@Servername AS ServerName ,
        create_date AS  ServerStarted ,
        DATEDIFF(s, create_date, GETDATE()) / 86400.0 AS DaysRunning ,
        DATEDIFF(s, create_date, GETDATE()) AS SecondsRunnig
FROM    sys.databases
WHERE   name = 'tempdb'; 
```

Здесь мы получили имя сервера, дату его запуска, а также продолжительность работы сервера в днях и секундах. Для этого мы использовали дату создания базы TempDB, которая создается в момент запуска SQL Server.

Почему эта информация так важна? Сам SQL Server собирает статистику различных показателей (как используются индексы, информацию о недостающих индексах, планы запросов и др.). Чем дольше сервер работает, тем точнее собранная статистика.

Представьте, что Вы запустили сервер 5 минут назад, смотрите что информации о недостающих индексов нет. Правильно ли было полагаться на эти данные, которые были собраны за 5 минут?

#### Количество активных соединений

Еще одним очень важным моментом может быть количество активных соединений со SQL Server.

```sql
-- Похожая информация, может быть получена с помощью sp_who 

SELECT  @@Servername AS Server ,
        DB_NAME(database_id) AS DatabaseName ,
        COUNT(database_id) AS Connections ,
        Login_name AS  LoginName ,
        MIN(Login_Time) AS Login_Time ,
        MIN(COALESCE(last_request_end_time, last_request_start_time))
                                                         AS  Last_Batch
FROM    sys.dm_exec_sessions
WHERE   database_id > 0
        AND DB_NAME(database_id) NOT IN ( 'master', 'msdb' )
GROUP BY database_id ,
         login_name
ORDER BY DatabaseName;
```

Эта информация может пригодиться в следующих случаях:


* Отслеживание количества соединений для контроля лицензионной "чистоты".
* Для контроля подключения к базе данных.
* Для сбора статистики интенсивности работы с СУБД.
* Расследование проблем "зависших" соединений.
* И др.

Все просто, не так ли?

После этого мы можем двигаться дальше.

### Псс, бэкапы есть?

Второй вопрос - что там у Вас с резервным копированием.

#### Информация о бэкапах

Резервное копирование - очень важно. Об этом уже так много было сказано, но случаев когда им пренебрегают до сих пор очень много. Узнаем дату последнего бэкапа тех баз, которые расположены на изучаемом сервере.

```sql
SELECT  @@Servername AS ServerName ,
        d.Name AS DBName ,
        MAX(b.backup_finish_date) AS LastBackupCompleted
FROM    sys.databases d
        LEFT OUTER JOIN msdb..backupset b
                    ON b.database_name = d.name
                       AND b.[type] = 'D'
GROUP BY d.Name
ORDER BY d.Name;
```

Кроме этого, мы можем узнать куда последние бэкапы сохранялись (будь то какой-либо каталог  или виртуальное устройство для сохранения на ленту, или что-то другое).

```sql
SELECT  @@Servername AS ServerName ,
        d.Name AS DBName ,
        b.Backup_finish_date ,
        bmf.Physical_Device_name
FROM    sys.databases d
        INNER JOIN msdb..backupset b ON b.database_name = d.name
                                        AND b.[type] = 'D'
        INNER JOIN msdb.dbo.backupmediafamily bmf ON b.media_set_id = bmf.media_set_id
ORDER BY d.NAME ,
        b.Backup_finish_date DESC; 
```

Теперь мы знаем есть ли настроенное резервное копирование. Ну или хотя бы ручной запуск бэкапирования.

Резервное бэкапирование не настроено? Тогда пора заняться этим как можно скорее.

### Груз баз данных

Базы бывают разные: маленькие, средние, большие, а также неизвестного размера :) Последняя категория - самая страшная, ведь неизвестность не принесет ничего хорошего. Давайте же узнаем с чем мы имеем дело.

#### Список баз

Для начала узнаем список всех баз на сервере. Для этого есть несколько способов.

```sql
EXEC sp_helpdb; 
```

или

```sql
EXEC sp_Databases; 
```

или

```sql
SELECT  @@SERVERNAME AS Server ,
        name AS DBName ,
        recovery_model_Desc AS RecoveryModel ,
        Compatibility_level AS CompatiblityLevel ,
        create_date ,
        state_desc
FROM    sys.databases
ORDER BY Name; 
```

или

```sql
SELECT  @@SERVERNAME AS Server ,
        d.name AS DBName ,
        create_date ,
        compatibility_level ,
        m.physical_name AS FileName
FROM    sys.databases d
        JOIN sys.master_files m ON d.database_id = m.database_id
WHERE   m.[type] = 0 -- data files only
ORDER BY d.name; 
```

Все способы дают примерно ту же самую информацию, но с разной детализацией.

Сам по себе список баз даст мало полезного. Давайте посмотрим что там с их размером.

#### Размер баз

Размер базы в мегабайтах.

```sql
with fs
as
(
    select database_id, type, size * 8.0 / 1024 size
    from sys.master_files
)
select 
    name,
    (select sum(size) from fs where type = 0 and fs.database_id = db.database_id) DataFileSizeMB,
    (select sum(size) from fs where type = 1 and fs.database_id = db.database_id) LogFileSizeMB
from sys.databases db
```

После того, как стало известно о размере баз данных, можно посмотреть сколько место фактически используется.

```sql
SELECT SUM(unallocated_extent_page_count) AS [free pages],
    (SUM(unallocated_extent_page_count)*1.0/128) AS [free space in MB]
FROM sys.dm_db_file_space_usage;
```

Если доля неиспользованного места в базе высокая, то это может стать поводом для проведения шринка файлов данных базы. Но совсем не обязательно!

Еще может возникнуть вопрос где же эти базы хранятся.

#### Расположение файлов баз данных

Расположение файлов также можно определить несколькими способами. Вот два из них.

```sql
EXEC sp_Helpfile; 
```

или

```sql
SELECT  @@Servername AS Server ,
        DB_NAME() AS DB_Name ,
        File_id ,
        Type_desc ,
        Name ,
        LEFT(Physical_Name, 1) AS Drive ,
        Physical_Name ,
        RIGHT(physical_name, 3) AS Ext ,
        Size ,
        Growth
FROM    sys.database_files
ORDER BY File_id; 
```

Может пригодиться, если планируется изменять конфигурацию хранилища данных и по другим админским вопросам.

Но что скрывается за этими общими цифрами?

#### Размеры таблиц

Размер таблиц можно оценивать по количеству записей (это, конечно, менее точный способ, т.к. не учитывает сами данные) или непосредственно по занимаемому ими месту.

Самый простой способ определения количества записей - через обычное сканирование таблиц. Этот же способ наименее оптимальный с точки зрения производительности.

```sql
SELECT  'Select ''' + DB_NAME() + '.' + SCHEMA_NAME(SCHEMA_ID) + '.'
        + LEFT(o.name, 128) + ''' as DBName, count(*) as Count From ' + SCHEMA_NAME(SCHEMA_ID) + '.' + o.name
        + ';' AS ' Script generator to get counts for all tables'
FROM    sys.objects o
WHERE   o.[type] = 'U'
ORDER BY o.name;
```

Наиболее оптимальный путь - это использование кластерного индекса.

```sql
SELECT  @@ServerName AS Server ,
        DB_NAME() AS DBName ,
        OBJECT_SCHEMA_NAME(p.object_id) AS SchemaName ,
        OBJECT_NAME(p.object_id) AS TableName ,
        i.Type_Desc ,
        i.Name AS IndexUsedForCounts ,
        SUM(p.Rows) AS Rows
FROM    sys.partitions p
        JOIN sys.indexes i ON i.object_id = p.object_id
                              AND i.index_id = p.index_id
WHERE   i.type_desc IN ( 'CLUSTERED', 'HEAP' )
                             -- This is key (1 index per table) 
        AND OBJECT_SCHEMA_NAME(p.object_id) <> 'sys'
GROUP BY p.object_id ,
        i.type_desc ,
        i.Name
ORDER BY SchemaName ,
        TableName; 
```

Другой похожий метод - это использование DMV ["dm_db_partition_stats"](https://learn.microsoft.com/ru-ru/sql/relational-databases/system-dynamic-management-views/sys-dm-db-partition-stats-transact-sql?view=sql-server-ver16).

```sql
SELECT  @@ServerName AS ServerName ,
        DB_NAME() AS DBName ,
        OBJECT_SCHEMA_NAME(ddps.object_id) AS SchemaName ,
        OBJECT_NAME(ddps.object_id) AS TableName ,
        i.Type_Desc ,
        i.Name AS IndexUsedForCounts ,
        SUM(ddps.row_count) AS Rows
FROM    sys.dm_db_partition_stats ddps
        JOIN sys.indexes i ON i.object_id = ddps.object_id
                              AND i.index_id = ddps.index_id
WHERE   i.type_desc IN ( 'CLUSTERED', 'HEAP' )
                              -- This is key (1 index per table) 
        AND OBJECT_SCHEMA_NAME(ddps.object_id) <> 'sys'
GROUP BY ddps.object_id ,
        i.type_desc ,
        i.Name
ORDER BY SchemaName ,
        TableName;
```

Первый способ доступен и из синтаксиса запросов платформы 1С.

```
ВЫБРАТЬ
    КОЛИЧЕСТВО(*) КоличествоЗаписей
ИЗ <ИмяТаблицы>
```

Остальные - только с помощью T-SQL.

#### Размер таблиц

Количество записей - это хорошо. Но узнать размер хранимых данных в таблицах чаще всего более предпочтительный вариант.

```sql
SELECT
	a3.name AS [schemaname],
	a2.name AS [tablename],
	a1.rows as row_count,
	(a1.reserved + ISNULL(a4.reserved,0))* 8 AS [reserved], 
	a1.data * 8 AS [data],
	(CASE WHEN (a1.used + ISNULL(a4.used,0)) > a1.data THEN (a1.used + ISNULL(a4.used,0)) - a1.data ELSE 0 END) * 8 AS [index_size],
	(CASE WHEN (a1.reserved + ISNULL(a4.reserved,0)) > a1.used THEN (a1.reserved + ISNULL(a4.reserved,0)) - a1.used ELSE 0 END) * 8 AS [unused]
FROM
	(SELECT 
		ps.object_id,
		SUM (
			CASE
				WHEN (ps.index_id < 2) THEN row_count
				ELSE 0
			END
			) AS [rows],
		SUM (ps.reserved_page_count) AS reserved,
		SUM (
			CASE
				WHEN (ps.index_id < 2) THEN (ps.in_row_data_page_count + ps.lob_used_page_count + ps.row_overflow_used_page_count)
				ELSE (ps.lob_used_page_count + ps.row_overflow_used_page_count)
			END
			) AS data,
		SUM (ps.used_page_count) AS used
	FROM sys.dm_db_partition_stats ps
	GROUP BY ps.object_id) AS a1
LEFT OUTER JOIN 
	(SELECT 
		it.parent_id,
		SUM(ps.reserved_page_count) AS reserved,
		SUM(ps.used_page_count) AS used
	 FROM sys.dm_db_partition_stats ps
	 INNER JOIN sys.internal_tables it ON (it.object_id = ps.object_id)
	 WHERE it.internal_type IN (202,204)
	 GROUP BY it.parent_id) AS a4 ON (a4.parent_id = a1.object_id)
INNER JOIN sys.all_objects a2  ON ( a1.object_id = a2.object_id ) 
INNER JOIN sys.schemas a3 ON (a2.schema_id = a3.schema_id)
WHERE a2.type <> N'S' and a2.type <> N'IT'
ORDER BY reserved DESC
```

Скрипт дает информацию о размере зарезервированного места, размере данных и индексов, а также сколько свободного места из зарезервированного осталось доступно. Количество записей также доступно и подсчитывается с помощью DMV "dm_db_partition_stats".

Теперь мы знаем кто и как занимает место в исследуемых базах данных.

Отлично, теперь мы уже имеем представление о сервере, резервном копировании и базах данных, которые здесь находятся. Можно перейти к вопросам эффективности работы СУБД.

### Что там с индексами

Состояние индексов и их правильное построение в базе - залог эффективной работы запросов и приемлемого быстродействия. Проведем исследование индексов в базах данных.

#### Список индексов

Составим список таблиц и их индексов.

```sql
SELECT  @@Servername AS ServerName ,
        DB_NAME() AS DB_Name ,
        o.Name AS TableName ,
        i.Name AS IndexName
FROM    sys.objects o
        INNER JOIN sys.indexes i ON o.object_id = i.object_id
WHERE   o.Type = 'U' -- User table 
        AND LEFT(i.Name, 1) <> '_' -- Remove hypothetical indexes 
ORDER BY o.NAME ,
        i.name; 
```

Много ли индексов в Вашей базе данных?

Теперь можно посмотреть какие индексы полезные.

#### Статистика использования индексов

Индексы имеют свои издержки на обслуживание. Это и занимаемое место, и увеличение времени записи, а также потребность их реорганизации / ребилда после некоторого периода использования. Поэтому было бы не плохо понять какие индексы по-настоящему нужны. Для этого и нужна статистика использования индексов.

```sql
SELECT OBJECT_NAME(IX.OBJECT_ID) Table_Name
	   ,IX.name AS Index_Name
	   ,IX.type_desc Index_Type
	   ,SUM(PS.[used_page_count]) * 8 IndexSizeKB
	   ,IXUS.user_seeks AS NumOfSeeks
	   ,IXUS.user_scans AS NumOfScans
	   ,IXUS.user_lookups AS NumOfLookups
	   ,IXUS.user_updates AS NumOfUpdates
	   ,IXUS.last_user_seek AS LastSeek
	   ,IXUS.last_user_scan AS LastScan
	   ,IXUS.last_user_lookup AS LastLookup
	   ,IXUS.last_user_update AS LastUpdate
FROM sys.indexes IX
INNER JOIN sys.dm_db_index_usage_stats IXUS ON IXUS.index_id = IX.index_id AND IXUS.OBJECT_ID = IX.OBJECT_ID
INNER JOIN sys.dm_db_partition_stats PS on PS.object_id=IX.object_id
WHERE OBJECTPROPERTY(IX.OBJECT_ID,'IsUserTable') = 1
GROUP BY OBJECT_NAME(IX.OBJECT_ID) ,IX.name ,IX.type_desc ,IXUS.user_seeks ,IXUS.user_scans ,IXUS.user_lookups,IXUS.user_updates ,IXUS.last_user_seek ,IXUS.last_user_scan ,IXUS.last_user_lookup ,IXUS.last_user_update
```

Этим скриптом Вы можете получить информацию о количестве операций поиска, сканирования и некоторых других операций на индексах. В итоге можно составить список тех объектов, которых из базы можно удалить.

Для платформы 1С удаление неиспользуемых индексов штатными средствами не всегда возможно. Но если сильно захотеть...

Кроме этого, можно составить список индексов, которые имеют высокие издержки при использовании. Возможно, это "тяжелые" индексы, которые созданы на часто обновляемых таблицах или др. варианты.

```sql
SELECT TOP 1
    [Maintenance cost]  = (user_updates + system_updates)
       , [Retrieval usage] = (user_seeks + user_scans + user_lookups)
       , DatabaseName = DB_NAME()
       , TableName = OBJECT_NAME(s.[object_id])
       , IndexName = i.name
INTO #TempMaintenanceCost
FROM sys.dm_db_index_usage_stats s
    INNER JOIN sys.indexes i ON  s.[object_id] = i.[object_id]
        AND s.index_id = i.index_id
WHERE s.database_id = DB_ID()
    AND OBJECTPROPERTY(s.[object_id], 'IsMsShipped') = 0
    AND (user_updates + system_updates) > 0 -- Only report on active rows.
    AND s.[object_id] = -999
-- Dummy value to get table structure.
;

-- Loop around all the databases on the server.
EXEC sp_MSForEachDB    'USE [?];
-- Table already exists.
INSERT INTO #TempMaintenanceCost
SELECT TOP 10
       [Maintenance cost]  = (user_updates + system_updates)
       ,[Retrieval usage] = (user_seeks + user_scans + user_lookups)
       ,DatabaseName = DB_NAME()
       ,TableName = OBJECT_NAME(s.[object_id])
       ,IndexName = i.name
FROM   sys.dm_db_index_usage_stats s
INNER JOIN sys.indexes i ON  s.[object_id] = i.[object_id]
   AND s.index_id = i.index_id
WHERE s.database_id = DB_ID()
   AND i.name IS NOT NULL    -- Ignore HEAP indexes.
   AND OBJECTPROPERTY(s.[object_id], ''IsMsShipped'') = 0
   AND (user_updates + system_updates) > 0 -- Only report on active rows.
ORDER BY [Maintenance cost]  DESC
;
'
-- Select records.
SELECT TOP 10
    *
FROM #TempMaintenanceCost
ORDER BY [Maintenance cost]  DESC
-- Tidy up.
DROP TABLE #TempMaintenanceCost
```

Что ж, информация об использовании индексов у нас есть. Мы можем понять какие индексы избыточны и что-то с ними сделать. Но чаще всего проблема вовсе не в избыточности индексов, а в их недостаточности.

#### Отсутствующие индексы

SQL Server на столько хорош, что может поделиться информацией об отсутствующих индексах, наличие которых бы смогло повысить эффективность работы запросов.

```sql
SELECT 
	@@ServerName AS ServerName, -- Имя сервера
	DB_NAME() AS DBName, -- Имя базы
	t.name AS 'Affected_table',	-- Имя таблицы
	(LEN(ISNULL(ddmid.equality_columns, N'')
              + CASE WHEN ddmid.equality_columns IS NOT NULL
    AND ddmid.inequality_columns IS NOT NULL THEN ','
                     ELSE ''
                END) - LEN(REPLACE(ISNULL(ddmid.equality_columns, N'')
                                   + CASE WHEN ddmid.equality_columns
                                                             IS NOT NULL
    AND ddmid.inequality_columns
                                                             IS NOT NULL
                                          THEN ','
                                          ELSE ''
                                     END, ',', '')) ) + 1 AS K, -- Количество ключей в индексе
  COALESCE(ddmid.equality_columns, '')
        + CASE WHEN ddmid.equality_columns IS NOT NULL
    AND ddmid.inequality_columns IS NOT NULL THEN ','
               ELSE ''
          END + COALESCE(ddmid.inequality_columns, '') AS Keys, -- Ключевые столбцы индекса
  COALESCE(ddmid.included_columns, '') AS [include], -- Неключевые столбцы индекса
  'Create NonClustered Index IX_' + t.name + '_missing_'
        + CAST(ddmid.index_handle AS VARCHAR(20)) 
        + ' On ' + ddmid.[statement] COLLATE database_default
        + ' (' + ISNULL(ddmid.equality_columns, '')
        + CASE WHEN ddmid.equality_columns IS NOT NULL
    AND ddmid.inequality_columns IS NOT NULL THEN ','
               ELSE ''
          END + ISNULL(ddmid.inequality_columns, '') + ')'
        + ISNULL(' Include (' + ddmid.included_columns + ');', ';')
                                                  AS sql_statement, -- Команда для создания индекса
  ddmigs.user_seeks, -- Количество операций поиска
  ddmigs.user_scans, -- Количество операций сканирования
  CAST(( ddmigs.user_seeks + ddmigs.user_scans)
        * ddmigs.avg_user_impact AS BIGINT) AS 'est_impact', 
  avg_user_impact, -- Средний процент выигрыша
  ddmigs.last_user_seek, -- Последняя операция поиска
  ( SELECT DATEDIFF(Second, create_date, GETDATE()) Seconds
  FROM sys.databases
  WHERE     name = 'tempdb'
        ) SecondsUptime
FROM sys.dm_db_missing_index_groups ddmig
  INNER JOIN sys.dm_db_missing_index_group_stats ddmigs
  ON ddmigs.group_handle = ddmig.index_group_handle
  INNER JOIN sys.dm_db_missing_index_details ddmid
  ON ddmig.index_handle = ddmid.index_handle
  INNER JOIN sys.tables t ON ddmid.OBJECT_ID = t.OBJECT_ID
WHERE   ddmid.database_id = DB_ID()
ORDER BY est_impact DESC;
```

Результат - это таблица, в которой представлена информация о таблице, списке полей для индекса, команду T-SQL для создания этого индекса, а также оценка влияния на производительность предполагаемого индекса и статистика запросов, которые этот индекс будут использовать.

Информация очень ценная. Конечно, информация не должна восприниматься как истина. Нужно разумно подходить к тому, что предлагает SQL Server, ведь контекст запросов ему неизвестен. Многие индексы можно создать средствами платформы 1С (хотя бы примерно), но есть и те, что просто так в базу не добавить. В этом случае Вам может помочь информация из статьи ["Создаем свои индексы для баз 1С. Со своей структурой и настройками!"](https://ypermitin.github.io/sqlserver/2018/11/18/Создаем-свои-индексы-для-баз-1С.-Со-своей-структурой-и-настройками!.html).

Еще одним важным показателем состояния индексов является процент фрагментации.

#### Проверка фрагментации индексов

Чем выше процент фрагментации индекса в базе, тем меньше его эффективность. Почему? Все просто - части индекса разбросаны по файлу базы данных и для использования индекса все эти части нужно собрать. Чем больше фрагментация, тем сложнее это сделать. В случаях, когда процент фрагментации большой, СУБД может вообще отказаться от использования такого индекса.

```sql
SELECT
	DB_NAME([IF].database_id) AS [Имя базы] 
	,OBJECT_NAME(object_id) AS [Имя таблицы]	
	,OBJECT_NAME([IF].index_id) AS [Имя индкса]	
	,[IF].*
FROM sys.dm_db_index_physical_stats(DB_ID(), null, null, null, null) AS [IF]
WHERE avg_fragmentation_in_percent > 30
ORDER BY avg_fragmentation_in_percent
```

Скриптом выше можно посмотреть список индексов, процент фрагментации которых выше 30%. Далее нужно будет подумать об исправлении / улучшении обслуживания индексов.

Вы знаете, что делать с индексами дальше!

### Статистику бы проверить

С индексами разобрались, но для их корректной работы очень важно состояние статистики базы данных.

#### Состояние статистики

Для проверки состояния статистики можно использовать два скрипта. Первый с общей информацией.

```sql
select
    o.name AS [TableName],
    a.name AS [StatName],
    a.rowmodctr AS [RowsChanged],
    STATS_DATE(s.object_id, s.stats_id) AS [LastUpdate],
    o.is_ms_shipped,
    s.is_temporary,
    p.*
from sys.sysindexes a
    inner join sys.objects o
    on a.id = o.object_id
        and o.type = 'U'
        and a.id > 100
        and a.indid > 0
    left join sys.stats s
    on a.name = s.name
    left join (
SELECT
        p.[object_id]
, p.index_id
, total_pages = SUM(a.total_pages)
    FROM sys.partitions p WITH(NOLOCK)
        JOIN sys.allocation_units a WITH(NOLOCK) ON p.[partition_id] = a.container_id
    GROUP BY 
p.[object_id]
, p.index_id
) p ON o.[object_id] = p.[object_id] AND p.index_id = s.stats_id
order by
    a.rowmodctr desc,
    STATS_DATE(s.object_id, s.stats_id) ASC
```

Так мы узнаем список таблиц их объекты статистики, а также количество изменений с момента последнего обновления статистики и дату последнего обновления. Проверьте, есть ли в Вашей базе статистика, которая не обслуживалась много лет или месяцев? В этом плане часто можно увидеть сюрпризы.

Для расследования конкретных проблем с производительностью в части статистики можно использовать более подробный диагностический скрипт.

```sql
SET NOCOUNT ON;

DECLARE 
	@table_name nvarchar(max) = '<IndexName>.<TableName>'
	,@object_name nvarchar(max) = '<ObjectName>'
	,@stat_header_cmd nvarchar(max)
	,@the_histogram_cmd nvarchar(max)
	,@the_density_vector_cmd nvarchar(max);

SELECT @stat_header_cmd = 'DBCC SHOW_STATISTICS (''' + @table_name + ''', ''' + @object_name + ''') WITH  STAT_HEADER';
SELECT @the_histogram_cmd = 'DBCC SHOW_STATISTICS (''' + @table_name + ''', ''' + @object_name + ''') WITH HISTOGRAM';
SELECT @the_density_vector_cmd = 'DBCC SHOW_STATISTICS (''' + @table_name + ''', ''' + @object_name + ''') WITH DENSITY_VECTOR';

IF OBJECT_ID('tempdb..#the_stat_header') IS NOT NULL
	DROP TABLE #the_stat_header;
IF OBJECT_ID('tempdb..#the_histogram ') IS NOT NULL
	DROP TABLE #the_histogram;
IF OBJECT_ID('tempdb..#the_density_vector ') IS NOT NULL
	DROP TABLE #the_density_vector;

CREATE TABLE #the_stat_header (
    [Name] sql_variant NULL
,   [Updated] sql_variant NULL
,   [Rows] sql_variant NULL
,   [Rows Sampled] sql_variant NULL
,   [Steps] sql_variant NULL
,   [Density] sql_variant NULL
,   [Average key length] sql_variant NULL
,   [String index] sql_variant NULL
,   [Filter Expression] nvarchar(max) NULL
,   [Unfiltered Rows] sql_variant NULL
)
INSERT INTO #the_stat_header EXEC (@stat_header_cmd)

CREATE TABLE #the_density_vector (
    [All density] sql_variant
,   [Average Length] sql_variant
,   [Columns] sql_variant
)
INSERT INTO #the_density_vector EXEC (@the_density_vector_cmd)

CREATE TABLE #the_histogram (
    [RANGE_HI_KEY] sql_variant
,   [RANGE_ROWS] sql_variant
,   [EQ_ROWS] sql_variant
,   [DISTINCT_RANGE_ROWS]  sql_variant
,   [AVG_RANGE_ROWS] sql_variant
)
INSERT INTO #the_histogram EXEC (@the_histogram_cmd)

SELECT  
	-- Имя объекта статистики.
	[Name] AS [Имя]
	-- Дата и время последнего обновления статистики. 
	-- Функция STATS_DATE представляет собой альтернативный способ получения этих данных.
	,[Updated] AS [Обновлен]
	-- Общее число строк в таблице или индексированном представлении при последнем обновлении статистики. 
	-- Если статистика отфильтрована или соответствует отфильтрованному индексу, количество строк может быть меньше, чем количество строк в таблице.
	,[Rows] AS [Строка]
	-- Общее количество строк, выбранных для статистических вычислений. 
	-- Если имеет место условие «количество строк выборки < количество строк таблицы», 
	-- то отображаемые результаты определения гистограммы и вычисления плотности 
	-- представляют собой оценки, основанные на строках выборки.
	,[Rows Sampled] AS [Количество строк для стат. вычислений]
	-- Число шагов в гистограмме. Каждый шаг охватывает диапазон значений столбцов,
	-- за которым следует значение столбца, представляющее собой верхнюю границу. 
	-- Шаги гистограммы определяются в первом ключевом столбце статистики. Максимальное число шагов — 200.
	,[Steps] AS [Шаги]
	-- Рассчитывается как 1 / различающиеся значения для всех значений в первом ключевом столбце объекта статистики, 
	-- исключая возможные значения гистограммы. Это значение плотности не используется оптимизатором запросов 
	-- и отображается для обратной совместимости с версиями, выпущенными до SQL Server 2008.
	,[Density] AS [Плотность]
	-- Среднее число байтов на значение для всех ключевых столбцов в объекте статистики.
	,[Average key length] AS [Средняя длина ключа]
	-- Значение «Да» указывает, что объект статистики содержит сводную строковую статистику, 
	-- позволяющую уточнить оценку количества элементов для предикатов запроса, использующих оператор LIKE, 
	-- например WHERE ProductName LIKE '%Bike'. Сводная строковая статистика хранится отдельно от гистограммы 
	-- и создается в первом ключевом столбце объекта статистики, если он имеет тип char, varchar, nchar, nvarchar, varchar(max), nvarchar(max), text или ntext.
	,[String index] AS [Используется сводная строковая статистика]
	-- Предикат для подмножества строк таблицы, включенных в объект статистики. NULL — неотфильтрованная статистика. 
	,[Filter Expression] AS [Критерий фильтра]
	-- Общее количество строк в таблице перед применением критерия фильтра. 
	-- Если Filter Expression имеет значение NULL, то столбец Unfiltered Rows совпадает со столбцом Rows.
	,[Unfiltered Rows] AS [Количество строк без учета фильтра]
FROM #the_stat_header

SELECT
	-- Плотность равна 1 / различающиеся значения. В результатах отображаются плотности для каждого префикса столбцов объекта статистики, 
	-- по одной строке на плотность. Различающееся значение — это отдельный список значений столбцов на строку и на префикс столбцов. 
	-- Например, если объект статистики содержит ключевые столбцы (A, B, C), то в результатах приводится плотность отдельных списков значений 
	-- в каждом из следующих префиксов столбцов: (A), (A, B) и (A, B, C). 
	-- При использовании префикса (A, B, C) каждый из этих списков является отдельным списком значений: (3, 5, 6), (4, 4, 6), (4, 5, 6), (4, 5, 7). 
	-- При использовании префикса (A, B) одинаковые значения столбцов имеют следующие отдельные списки значений: (3, 5), (4, 4) и (4, 5).
	[All density] AS [Общая плотность]
	-- Средняя длина (в байтах) для хранения списка значений столбца для данного префикса столбца. 
	-- Если каждому значению в списке (3, 5, 6), например, требуется по 4 байта, то длина составляет 12 байт.
	,[Average Length] AS [Средняя длина]
	-- Имена столбцов в префиксе, для которых отображаются значения «Общая плотность» и «Средняя длина».
	,[Columns] AS [Столбцы]
FROM #the_density_vector

SELECT
	-- Верхнее граничное значение столбца для шага гистограммы. Это значение столбца называется также ключевым значением.
	[RANGE_HI_KEY] AS [Верхняя граница значения столбца]
	-- Предполагаемое количество строк, значение столбцов которых находится в пределах шага гистограммы, исключая верхнюю границу.
	,[RANGE_ROWS] AS [Предполагаемое количество строк]
	-- Предполагаемое количество строк, значение столбцов которых равно верхней границе шага гистограммы.
	,[EQ_ROWS] AS [Предполагаемое количество строк, равное верхней границе значений]
	-- Предполагаемое количество строк с различающимся значением столбца в пределах шага гистограммы, исключая верхнюю границу.
	,[DISTINCT_RANGE_ROWS] AS [Предполагаемое количество строк с различающимися значениями в шаге гистограммы]
	-- Среднее количество строк с повторяющимися значениями столбца в пределах шага гистограммы, исключая верхнюю границу. 
	-- Если значение DISTINCT_RANGE_ROWS больше 0, AVG_RANGE_ROWS вычисляется делением RANGE_ROWS на DISTINCT_RANGE_ROWS. 
	-- Если значение DISTINCT_RANGE_ROWS равно 0, AVG_RANGE_ROWS возвращает значение 1 для шага гистограммы.
	,[AVG_RANGE_ROWS] AS [Среднее количество строк с повторяющимися значениями в шаге гистограммы]
FROM #the_histogram

IF OBJECT_ID('tempdb..#the_stat_header') IS NOT NULL
	DROP TABLE #the_stat_header;
IF OBJECT_ID('tempdb..#the_histogram ') IS NOT NULL
	DROP TABLE #the_histogram;
IF OBJECT_ID('tempdb..#the_density_vector ') IS NOT NULL
	DROP TABLE #the_density_vector;
```

Если кратко, то так мы можем получить дополнительную информацию об объектах статистики, гистограмме распределения, плотности и многое другое. Обычно эту информацию не приходится использовать, только в каких-либо сложных расследованиях или экспериментах.

Нашли проблему в обслуживании? Обслужите статистику!

### Производительность - наше все!

На финал оставим скрипты для диагностики производительности. На самом деле очень много различных подходов для анализа проблем производительности. Как было сказано в начале статьи, только скриптами не всегда удается найти причину проблем и нужен полноценный мониторинг. Но общее направление для расследования понять точно можно.

Лакмусовой бумажкой работы СУБД является статистика по ожиданиям, с помощью которой можно понять что же не так со SQL Server.

```sql
WITH [Waits] AS
    (SELECT
        [wait_type],
        [wait_time_ms] / 1000.0 AS [WaitS],
        ([wait_time_ms] - [signal_wait_time_ms]) / 1000.0 AS [ResourceS],
        [signal_wait_time_ms] / 1000.0 AS [SignalS],
        [waiting_tasks_count] AS [WaitCount],
       100.0 * [wait_time_ms] / SUM ([wait_time_ms]) OVER() AS [Percentage],
        ROW_NUMBER() OVER(ORDER BY [wait_time_ms] DESC) AS [RowNum]
    FROM sys.dm_os_wait_stats
    WHERE [wait_type] NOT IN (
        N'BROKER_EVENTHANDLER', N'BROKER_RECEIVE_WAITFOR',
        N'BROKER_TASK_STOP', N'BROKER_TO_FLUSH',
        N'BROKER_TRANSMITTER', N'CHECKPOINT_QUEUE',
        N'CHKPT', N'CLR_AUTO_EVENT',
        N'CLR_MANUAL_EVENT', N'CLR_SEMAPHORE',
 
        -- Maybe uncomment these four if you have mirroring issues
        N'DBMIRROR_DBM_EVENT', N'DBMIRROR_EVENTS_QUEUE',
        N'DBMIRROR_WORKER_QUEUE', N'DBMIRRORING_CMD',
 
        N'DIRTY_PAGE_POLL', N'DISPATCHER_QUEUE_SEMAPHORE',
        N'EXECSYNC', N'FSAGENT',
        N'FT_IFTS_SCHEDULER_IDLE_WAIT', N'FT_IFTSHC_MUTEX',
 
        -- Maybe uncomment these six if you have AG issues
        N'HADR_CLUSAPI_CALL', N'HADR_FILESTREAM_IOMGR_IOCOMPLETION',
        N'HADR_LOGCAPTURE_WAIT', N'HADR_NOTIFICATION_DEQUEUE',
        N'HADR_TIMER_TASK', N'HADR_WORK_QUEUE',
 
        N'KSOURCE_WAKEUP', N'LAZYWRITER_SLEEP',
        N'LOGMGR_QUEUE', N'MEMORY_ALLOCATION_EXT',
        N'ONDEMAND_TASK_QUEUE',
        N'PREEMPTIVE_XE_GETTARGETSTATE',
        N'PWAIT_ALL_COMPONENTS_INITIALIZED',
        N'PWAIT_DIRECTLOGCONSUMER_GETNEXT',
        N'QDS_PERSIST_TASK_MAIN_LOOP_SLEEP', N'QDS_ASYNC_QUEUE',
        N'QDS_CLEANUP_STALE_QUERIES_TASK_MAIN_LOOP_SLEEP',
        N'QDS_SHUTDOWN_QUEUE', N'REDO_THREAD_PENDING_WORK',
        N'REQUEST_FOR_DEADLOCK_SEARCH', N'RESOURCE_QUEUE',
        N'SERVER_IDLE_CHECK', N'SLEEP_BPOOL_FLUSH',
        N'SLEEP_DBSTARTUP', N'SLEEP_DCOMSTARTUP',
        N'SLEEP_MASTERDBREADY', N'SLEEP_MASTERMDREADY',
        N'SLEEP_MASTERUPGRADED', N'SLEEP_MSDBSTARTUP',
        N'SLEEP_SYSTEMTASK', N'SLEEP_TASK',
        N'SLEEP_TEMPDBSTARTUP', N'SNI_HTTP_ACCEPT',
        N'SP_SERVER_DIAGNOSTICS_SLEEP', N'SQLTRACE_BUFFER_FLUSH',
        N'SQLTRACE_INCREMENTAL_FLUSH_SLEEP',
        N'SQLTRACE_WAIT_ENTRIES', N'WAIT_FOR_RESULTS',
        N'WAITFOR', N'WAITFOR_TASKSHUTDOWN',
        N'WAIT_XTP_RECOVERY',
        N'WAIT_XTP_HOST_WAIT', N'WAIT_XTP_OFFLINE_CKPT_NEW_LOG',
        N'WAIT_XTP_CKPT_CLOSE', N'XE_DISPATCHER_JOIN',
        N'XE_DISPATCHER_WAIT', N'XE_TIMER_EVENT')
    AND [waiting_tasks_count] > 0
    )
SELECT
    MAX ([W1].[wait_type]) AS [WaitType],
    CAST (MAX ([W1].[WaitS]) AS DECIMAL (16,2)) AS [Wait_S],
    CAST (MAX ([W1].[ResourceS]) AS DECIMAL (16,2)) AS [Resource_S],
    CAST (MAX ([W1].[SignalS]) AS DECIMAL (16,2)) AS [Signal_S],
    MAX ([W1].[WaitCount]) AS [WaitCount],
    CAST (MAX ([W1].[Percentage]) AS DECIMAL (5,2)) AS [Percentage],
    CAST ((MAX ([W1].[WaitS]) / MAX ([W1].[WaitCount])) AS DECIMAL (16,4)) AS [AvgWait_S],
    CAST ((MAX ([W1].[ResourceS]) / MAX ([W1].[WaitCount])) AS DECIMAL (16,4)) AS [AvgRes_S],
    CAST ((MAX ([W1].[SignalS]) / MAX ([W1].[WaitCount])) AS DECIMAL (16,4)) AS [AvgSig_S],
    CAST ('https://www.sqlskills.com/help/waits/' + MAX ([W1].[wait_type]) as XML) AS [Help/Info URL]
FROM [Waits] AS [W1]
INNER JOIN [Waits] AS [W2]
    ON [W2].[RowNum] <= [W1].[RowNum]
GROUP BY [W1].[RowNum]
HAVING SUM ([W2].[Percentage]) - MAX( [W1].[Percentage] ) < 95; -- percentage threshold
```

Запрос покажет что именно ожидает SQL Server и даст ссылку на информацию о данном типе ожидания. Отличная статья на эту тему (там же и был взят скрипт) ["SQL Server Wait Statistics (or please tell me where it hurts…)"](SQL Server Wait Statistics (or please tell me where it hurts…)) от [Paul Randal](https://www.sqlskills.com/blogs/paul/author/paul/).

Далее можно посмотреть на статистику использования процессорных ресурсов и дисковой подсистемы по базам.

#### Использование CPU и дисков по базам

Для CPU скрипт такой.

```sql
WITH
    DB_CPU_Stats
    AS
    (
        SELECT DatabaseID, DB_Name(DatabaseID) AS [DatabaseName], SUM(total_worker_time) AS [CPU_Time_Ms]
        FROM sys.dm_exec_query_stats AS qs
CROSS APPLY (SELECT CONVERT(int, value) AS [DatabaseID]
            FROM sys.dm_exec_plan_attributes(qs.plan_handle)
            WHERE attribute = N'dbid') AS F_DB
        GROUP BY DatabaseID
    )
SELECT ROW_NUMBER() OVER(ORDER BY [CPU_Time_Ms] DESC) AS [row_num],
    DatabaseName, [CPU_Time_Ms],
    CAST([CPU_Time_Ms] * 1.0 / SUM([CPU_Time_Ms]) OVER() * 100.0 AS DECIMAL(5, 2)) AS [CPUPercent]
FROM DB_CPU_Stats
WHERE DatabaseID > 4 -- system databases
    AND DatabaseID <> 32767
-- ResourceDB
ORDER BY row_num
OPTION
(RECOMPILE);
```

Для дисков ниже.

```sql
WITH DB_Disk_Reads_Stats

AS

(SELECT DatabaseID, DB_Name(DatabaseID) AS [DatabaseName], SUM(total_physical_reads) AS [physical_reads]

 FROM sys.dm_exec_query_stats AS qs

 CROSS APPLY (SELECT CONVERT(int, value) AS [DatabaseID] 

              FROM sys.dm_exec_plan_attributes(qs.plan_handle)

              WHERE attribute = N'dbid') AS F_DB

 GROUP BY DatabaseID)

SELECT ROW_NUMBER() OVER(ORDER BY [physical_reads] DESC) AS [row_num],

       DatabaseName, [physical_reads], 

       CAST([physical_reads] * 1.0 / SUM([physical_reads]) OVER() * 100.0 AS DECIMAL(5, 2)) AS [Physical_Reads_Percent]

FROM DB_Disk_Reads_Stats

WHERE DatabaseID > 4 -- system databases

AND DatabaseID <> 32767 -- ResourceDB

ORDER BY row_num OPTION (RECOMPILE);
```

Примерное представление о "тяжелых" системах это позволяет получить.


## Пока что все

В статье нет готового рецепта для решения всех проблем. Лишь скрипты. Скрипты для начала знакомства с сервером СУБД, получения узкой информации и получения сведений о потенциальных проблемах.

Дальше все зависит только от Вас!
