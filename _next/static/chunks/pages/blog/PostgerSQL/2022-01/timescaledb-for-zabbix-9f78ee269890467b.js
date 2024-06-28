(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4578],{147:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/PostgerSQL/2022-01/timescaledb-for-zabbix",function(){return s(2161)}])},2161:function(e,n,s){"use strict";s.r(n);var t=s(5893),i=s(9305);s(7294);var l=s(6671),a=s(7105);n.default=()=>(0,t.jsxs)(i.Xg,{blogcentered:!0,children:[(0,t.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Предисловие"}),(0,t.jsx)(i.xv,{p:!0,children:"Очень краткое руководство для перевода существующей базы (PostgreSQL 13) от Zabbix 5.х (в принципе и для 4.х тоже подойдет) на рельсы TimescaleDB 2."}),(0,t.jsx)(i.xv,{p:!0,children:"Предполагаем, что на сервере уже установлен Zabbix, PostgreSQL 13 и все должным образом сконфигурировано. Вот несколько инструкций по этой теме:"}),(0,t.jsxs)(i.aV,{children:[(0,t.jsx)("li",{children:(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(i.e9,{newTab:!0,href:"/pages/blog/DevOps/2020-09/monitoring-and-simple-installation-zabbix.tsx",children:"Немного о мониторинге и простой установке Zabbix"})})})}),(0,t.jsx)("li",{children:(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(i.e9,{newTab:!0,href:"/pages/blog/DevOps/2020-10/zabbix-diagnostic.tsx",children:"Диагностика работы Zabbix"})})})}),(0,t.jsx)("li",{children:(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(i.e9,{newTab:!0,href:"/pages/blog/DevOps/2020-10/update-zabbix-4.0-to-5.0.tsx",children:"Обновляем Zabbix с 4.0 до 5.0 через грабли"})})})}),(0,t.jsx)("li",{children:(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(i.e9,{newTab:!0,href:"/pages/blog/DevOps/2021-04/simple-ubuntu-postgresql-apache-zabbix.tsx",children:"Простая инструкция установки Zabbix (Ubuntu + PostgreSQL + Apache)"})})})})]}),(0,t.jsx)(i.xv,{p:!0,children:"Так что сосредоточимся именно на установке и настройке TimescaleDB."}),(0,t.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Установка TimescaleDB"}),(0,t.jsxs)(i.xv,{p:!0,children:["Первым делом идем в официальную ",(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(i.e9,{newTab:!0,href:"https://docs.timescale.com/install/latest/self-hosted/installation-debian/",children:"документацию по установке на Ubuntu"})})}),". Инструкция включает шаги по установке PostgreSQL, что нас не интересует. Поэтому выполним только шаги для TimescaleDB."]}),(0,t.jsx)(i.xv,{p:!0,children:"Сначала добавим репозиторий TimescaleDB, чтобы установить необходимые пакеты расширения PostgreSQL."}),(0,t.jsx)(l.Z,{code:"\n# Добавляем репозиторий TimescaleDB\nsh -c \"echo 'deb https://packagecloud.io/timescale/timescaledb/debian/ $(lsb_release -c -s) main' > /etc/apt/sources.list.d/timescaledb.list\"\n\n# Обновляем локальный репозиторий\napt update\n                ",className:"my-5",language:"bash"}),(0,t.jsxs)(i.xv,{p:!0,children:["Примечание: в некоторых случаях сталкивался с тем, что ссылки в официальной документации были “битыми”. Решение находил ",(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(i.e9,{newTab:!0,href:"https://packagecloud.io/timescale/timescaledb/install",children:"вот здесь."})})})]}),(0,t.jsx)(i.xv,{p:!0,children:"Проверяем список доступных к установке пакетов TimescaleDB."}),(0,t.jsx)(l.Z,{code:"\napt-cache search timescaledb\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(i.xv,{p:!0,children:"Получим список различных версий, напирмер:"}),(0,t.jsx)(l.Z,{code:"\ntimescaledb-2-postgresql-11 - An open-source time-series database based on PostgreSQL, as an extension.\ntimescaledb-2-postgresql-12 - An open-source time-series database based on PostgreSQL, as an extension.\ntimescaledb-2-postgresql-13 - An open-source time-series database based on PostgreSQL, as an extension.\ntimescaledb-2-postgresql-14 - An open-source time-series database based on PostgreSQL, as an extension.\ntimescaledb-tools - A suite of tools that can be used with TimescaleDB.\n                ",className:"my-5",language:"text"}),(0,t.jsx)(i.xv,{p:!0,children:"Установим как-раз подходящий пакет для PostgreSQL 13."}),(0,t.jsx)(l.Z,{code:"\napt install timescaledb-2-postgresql-13\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(i.xv,{p:!0,children:"Готово! Пакет установлен, остается настроить PostgreSQL."}),(0,t.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Установка TimescaleDB"}),(0,t.jsx)(i.xv,{p:!0,children:"Теперь настроим PostgreSQL, начав с утилиты тюнинга настроек."}),(0,t.jsx)(l.Z,{code:"\ntimescaledb-tune\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(i.xv,{p:!0,children:"Или для “тихой” установки."}),(0,t.jsx)(l.Z,{code:"\nsudo timescaledb-tune --quiet --yes\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(i.xv,{p:!0,children:"После запуска будут предложены различные изменения настроек в файле конфигурации сервера “postgresql.conf”, которые нужно проверить и подтвердить, если все корректно. Будут изменены настройки самого сервера в части выделяемых ресурсов и прочего, а также настройки самого TimescaleDB."}),(0,t.jsxs)(i.xv,{p:!0,children:["Дополнительно можете ",(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(i.e9,{newTab:!0,href:"https://docs.timescale.com/timescaledb/latest/how-to-guides/configuration/telemetry/#disabling-telemetry",children:"отключить сбор анонимных сведений"})})})," об использовании TimescaleDB, добавив параметр в файл “postgresql.conf”."]}),(0,t.jsx)(l.Z,{code:"\ntimescaledb.telemetry_level=off\n                ",className:"my-5",language:"text"}),(0,t.jsxs)(i.xv,{p:!0,children:["Подробнее об утилите ",(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(i.e9,{newTab:!0,href:"https://github.com/timescale/timescaledb-tune",children:"timescaledb-tune."})})})]}),(0,t.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Включаем TimescaleDB для базы данных"}),(0,t.jsx)(i.xv,{p:!0,children:"Включаем расширение TimescaleDB для базы Zabbix. Для этого запускаем psql для базы zabbix. Допустим, от пользователя (внезапно) zabbix:"}),(0,t.jsx)(l.Z,{code:"\n# Переключаемся на пользователя zabbix, который имеет доступ к базе\nsudo su zabbix\n\n# Запускаем psql\npsql\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(i.xv,{p:!0,children:"Затем делаем включаем расширение TimescaleDB для базы."}),(0,t.jsx)(l.Z,{code:"\nCREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;\n\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(i.xv,{p:!0,children:"Для проверки, что расширение корректно установилось, выполним запрос:"}),(0,t.jsx)(l.Z,{code:"\nselect\n *\nfrom pg_catalog.pg_extension\nwhere extname = 'timescaledb'\n\n\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(i.xv,{p:!0,children:"В результате должны получить строку с описанием настроек расширения. В самой же базе данных появятся схемы (может отличаться от версии расширения):"}),(0,t.jsxs)(i.aV,{children:[(0,t.jsx)("li",{children:"_timescaledb_cache"}),(0,t.jsx)("li",{children:"_timescaledb_catalog"}),(0,t.jsx)("li",{children:"_timescaledb_config"}),(0,t.jsx)("li",{children:"_timescaledb_internal"}),(0,t.jsx)("li",{children:"timescaledb_experimental"}),(0,t.jsx)("li",{children:"timescaledb_information"})]}),(0,t.jsx)(i.xv,{p:!0,children:"Расширение готово для использования на таблицах."}),(0,t.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Настало время таблиц"}),(0,t.jsx)(i.xv,{p:!0,children:"Для базы Zabbix есть смысл использовать TimescaleDB для следующих таблиц истории:"}),(0,t.jsxs)(i.aV,{children:[(0,t.jsx)("li",{children:"history (секции по 1 дню)"}),(0,t.jsx)("li",{children:"history_log (секции по 1 дню)"}),(0,t.jsx)("li",{children:"history_str (секции по 1 дню)"}),(0,t.jsx)("li",{children:"history_text (секции по 1 дню)"}),(0,t.jsx)("li",{children:"trends (секции по 30 дней)"}),(0,t.jsx)("li",{children:"trends_uint (секции по 30 дней)"})]}),(0,t.jsx)(i.xv,{p:!0,children:"Для таблиц трендов, содержащих агрегированные данные, размер секции по периоду можно сделать значительно больше (30 дней вместо 1 в самый раз). Для детальной истории можно делать секции и меньше 1 дня, если данных за день очень много."}),(0,t.jsx)(i.xv,{p:!0,children:"Чтобы ускорить перенос данных в гипертаблицы (те, что создаются TimescaleDB) можно использовать следующих подход:"}),(0,t.jsxs)(i.aV,{type:a.RH.number,children:[(0,t.jsx)("li",{children:"Создаем пустую копию таблицы с постфиксом “_new”, причем без индексов."}),(0,t.jsx)("li",{children:"Создаем для новой таблицы гипертаблицу."}),(0,t.jsx)("li",{children:"Переносим данные из старой таблицы в новую."}),(0,t.jsx)("li",{children:"Удаляем старую таблицу"}),(0,t.jsx)("li",{children:"Переименовываем новую таблицу, чтобы имя было как у старой."}),(0,t.jsx)("li",{children:"Создаем индексы, которые не переносили на время переноса данных."}),(0,t.jsx)("li",{children:"(опционально) Не забываем поменять владельца таблицы или права на нее, чтобы Zabbix мог с ней работать."})]}),(0,t.jsx)(i.xv,{p:!0,children:"Вот полный текст скриптов для каждой таблицы. Рекомендую выполнять все эти действия частями."}),(0,t.jsx)(i.xv,{p:!0,children:"Это скрипты для таблиц с детальной историей метрик."}),(0,t.jsx)(l.Z,{code:"\nCREATE TABLE history_new (LIKE history INCLUDING DEFAULTS INCLUDING CONSTRAINTS EXCLUDING INDEXES);\nSELECT create_hypertable('history_new', 'clock', chunk_time_interval => 86400);\nINSERT INTO history_new SELECT * FROM history;\nCREATE INDEX history_1 on history (itemid,clock);\n-- При необходимости изменить владельца таблицы\n-- ALTER TABLE public.history OWNER TO zabbix;\n\nCREATE TABLE history_log_new (LIKE history_log INCLUDING DEFAULTS INCLUDING CONSTRAINTS EXCLUDING INDEXES);\nSELECT create_hypertable('history_log_new', 'clock', chunk_time_interval => 86400);\nINSERT INTO history_log_new SELECT * FROM history_log;\nDROP TABLE IF EXISTS history_log;\nALTER TABLE IF EXISTS history_log_new RENAME TO history_log;\nCREATE INDEX history_log_1 on history_log (itemid,clock);\n-- При необходимости изменить владельца таблицы\n-- ALTER TABLE public.history_log OWNER TO zabbix;\n\nCREATE TABLE history_str_new (LIKE history_str INCLUDING DEFAULTS INCLUDING CONSTRAINTS EXCLUDING INDEXES);\nSELECT create_hypertable('history_str_new', 'clock', chunk_time_interval => 86400);\nINSERT INTO history_str_new SELECT * FROM history_str;\nDROP TABLE IF EXISTS history_str;\nALTER TABLE IF EXISTS history_str_new RENAME TO history_str;\nCREATE INDEX history_str_1 on history_str (itemid,clock);\n-- При необходимости изменить владельца таблицы\n-- ALTER TABLE public.history_str OWNER TO zabbix;\n\nCREATE TABLE history_text_new (LIKE history_text INCLUDING DEFAULTS INCLUDING CONSTRAINTS EXCLUDING INDEXES);\nSELECT create_hypertable('history_text_new', 'clock', chunk_time_interval => 86400);\nINSERT INTO history_text_new SELECT * FROM history_text;\nDROP TABLE IF EXISTS history_text;\nALTER TABLE IF EXISTS history_text_new RENAME TO history_text;\nCREATE INDEX history_text_1 on history_text (itemid,clock);\n-- При необходимости изменить владельца таблицы\n-- ALTER TABLE public.history_text OWNER TO zabbix;\n\nCREATE TABLE history_uint_new (LIKE history_uint INCLUDING DEFAULTS INCLUDING CONSTRAINTS EXCLUDING INDEXES);\nSELECT create_hypertable('history_uint_new', 'clock', chunk_time_interval => 86400);\nINSERT INTO history_uint_new SELECT * FROM history_uint;\nDROP TABLE IF EXISTS history_uint;\nALTER TABLE IF EXISTS history_uint_new RENAME TO history_uint;\nCREATE INDEX history_uint_1 on history_uint (itemid,clock);\n-- При необходимости изменить владельца таблицы\n-- ALTER TABLE public.history_uint OWNER TO zabbix;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(i.xv,{p:!0,children:"А это скрипты для таблиц трендов."}),(0,t.jsx)(l.Z,{code:"\nCREATE TABLE trends_new (LIKE trends INCLUDING DEFAULTS INCLUDING CONSTRAINTS EXCLUDING INDEXES);\nSELECT create_hypertable('trends_new', 'clock', chunk_time_interval => 2592000);\nINSERT INTO trends_new SELECT * FROM trends;\nDROP TABLE IF EXISTS trends;\nALTER TABLE IF EXISTS trends_new RENAME TO trends;\n-- При необходимости изменить владельца таблицы\n-- ALTER TABLE public.trends OWNER TO zabbix;\n\nCREATE TABLE trends_uint_new (LIKE trends_uint INCLUDING DEFAULTS INCLUDING CONSTRAINTS EXCLUDING INDEXES);\nSELECT create_hypertable('trends_uint_new', 'clock', chunk_time_interval => 2592000);\nINSERT INTO trends_uint_new SELECT * FROM trends_uint;\nDROP TABLE IF EXISTS trends_uint;\nALTER TABLE IF EXISTS trends_uint_new RENAME TO trends_uint;\n-- При необходимости изменить владельца таблицы\n-- ALTER TABLE public.trends_uint OWNER TO zabbix;\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(i.xv,{p:!0,children:"Готово, теперь таблицы истории данных метрик хранятся с использованием TimescaleDB."}),(0,t.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Проверяем результат"}),(0,t.jsx)(i.xv,{p:!0,children:"Выполним запрос и проверим на какие части разделена таблица “history_uint”."}),(0,t.jsx)(l.Z,{code:"\nSELECT show_chunks('history_uint');\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(i.xv,{p:!0,children:"Увидим схожую картину."}),(0,t.jsx)(l.Z,{code:"\n...\n_timescaledb_internal._hyper_5_43_chunk\n_timescaledb_internal._hyper_5_44_chunk\n_timescaledb_internal._hyper_5_45_chunk\n_timescaledb_internal._hyper_5_46_chunk\n_timescaledb_internal._hyper_5_47_chunk\n...\n                ",className:"my-5",language:"text"}),(0,t.jsx)(i.xv,{p:!0,children:"Теперь запросы будут работать с отдельными секциями, а не со всей таблицей целиком, что позволит избавиться от полных сканирований таблицы (не всегда, конечно, особенно если запрос без условий корректных), а также ускорит операции вставки новых записей. Вот пример. Отберем все данные из таблицы, которые загружены после начала текущего дня (2022.01.07)."}),(0,t.jsx)(l.Z,{code:"\nexplain analyze\n\nselect \n *\nfrom public.history_uint\nwhere clock >= 1641513600 \n-- Значение 1641513600 предварительно получено через:\n-- extract(epoch from (timestamp '2022-01-07 00:00:00'))\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(i.xv,{p:!0,children:"В начале инструкции мы вставили “explain analyze”, чтобы получить фактический план выполнения запроса. Он как-раз ниже."}),(0,t.jsx)(l.Z,{code:"\nSeq Scan on _hyper_5_46_chunk  (cost=0.00..850.70 rows=44456 width=20) (actual time=0.005..3.216 rows=44779 loops=1)\n  Filter: (clock >= 1641513600)\nPlanning Time: 0.157 ms\nExecution Time: 4.141 ms\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(i.xv,{p:!0,children:"Итого, мы читаем только одну секцию таблицы, которая относится к текущему дню. Напомню, что выше мы создавали секции для этой таблицы по всем дням. В итоге и чтений меньше и сам запрос будет выполняться быстрее. Это все в общих чертах."}),(0,t.jsx)(i.xv,{p:!0,children:"Таким образом, мы получим ускорение запросов с таблицами метрик, а также ускорим саму вставку данных."}),(0,t.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Сжатие данных"}),(0,t.jsxs)(i.xv,{p:!0,children:["По мере устаревания данных обычно действует логика, что чем старее данные, тем реже к ним идет обращение. В этом случае старые партиции имеет смысл сжимать. TimescaleDB позволяет ",(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(i.e9,{newTab:!0,href:"https://blog.timescale.com/blog/building-columnar-compression-in-a-row-oriented-database/",children:"переводить старые секции из строкового представления в колоночное."})})})," Это позволяет производить эффективное сжатие этих данных."]}),(0,t.jsx)(i.xv,{p:!0,children:"Zabbix, начиная с версии 5.0, поддерживает сжатие данных средствами TimescaleDB. Чтобы его включить для существующей базы Zabbix нужно изменить настройки."}),(0,t.jsx)(l.Z,{code:"\nUPDATE config SET db_extension='timescaledb',hk_history_global=1,hk_trends_global=1;\nUPDATE config SET compression_status=1,compress_older='7d';\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(i.xv,{p:!0,children:"Профит, сжатие будет теперь корректно работать и сэкономит место. Для анализа эффективности сжатия можно использовать вот такой запрос, отображающий размер данных до и после сжатия."}),(0,t.jsx)(l.Z,{code:"\nselect\n chunk_schema,\n chunk_name,\n compression_status,\n before_compression_table_bytes,\n before_compression_index_bytes,\n before_compression_toast_bytes,\n before_compression_total_bytes,\n after_compression_table_bytes,\n after_compression_index_bytes,\n after_compression_toast_bytes,\n after_compression_total_bytes,\n node_name\nFROM chunk_compression_stats('history_uint')\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(i.xv,{p:!0,children:"На этом все, теперь хранение данных метрки в Zabbix выполняется максимально эффективно, при этом скорость выборки данных в отчетах Zabbix (или Grafana, если используется) также ускорится."}),(0,t.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Резервное копирование"}),(0,t.jsx)(i.xv,{p:!0,children:"Операции формирования бэкапа и восстановления не сильно отличаются от обычных операций при использовании TimescaleDB."}),(0,t.jsxs)(i.xv,{p:!0,children:["Подробнее можно прочитать ",(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(i.e9,{newTab:!0,href:"https://docs.timescale.com/timescaledb/latest/how-to-guides/backup-and-restore/pg-dump-and-restore/#restoring-an-entire-database-from-backup",children:"здесь"})})}),"                 и ",(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(i.e9,{newTab:!0,href:"https://docs.timescale.com/timescaledb/latest/how-to-guides/backup-and-restore/",children:"здесь"})})}),"."]}),(0,t.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Распределение по дискам"}),(0,t.jsx)(i.xv,{p:!0,children:"PostgreSQL с помощью табличных пространств позволяет распределять части базы данных по различным каталогам в системе, а значит и по физическим дискам."}),(0,t.jsx)(i.xv,{p:!0,children:"TimescaleDB позволяет секции таблиц также перемещать между табличными пространствами. Например, для таблицы “history_uing” перенесем одну из старых частей в другой табличное пространство."}),(0,t.jsx)(l.Z,{code:"\nselect move_chunk(\n '_timescaledb_internal._hyper_19_196_chunk',\n 'zabbix_new',\n 'zabbix_new'\n)\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(i.xv,{p:!0,children:"Таким образом “холодные” данные можно перемещать на HDD, а “горячие” хранить на SSD."}),(0,t.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Удаление секций"}),(0,t.jsx)(i.xv,{p:!0,children:"Не забываем, что старые секции можно удалять, освобождая место. Если, конечно, сжатие старых данных не устраивает."}),(0,t.jsx)(l.Z,{code:"\nSELECT drop_chunks(\n  '<Имя гипертаблицы>', \n  INTERVAL '24 hours' -- Период с которого нужно удалить старые секции\n);\n                ",className:"my-5",language:"sql"}),(0,t.jsx)(i.xv,{p:!0,children:"И с местом проблем не будет!"}),(0,t.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Послесловие"}),(0,t.jsx)(i.xv,{p:!0,children:"TimescaleDB позволяет максимально эффективно управлять хранением метрик Zabbix в базе PostgreSQL. Не использовать эти возможности было бы большим упущением."})]})},9963:function(e,n,s){"use strict";var t,i;s.d(n,{b:function(){return t}}),(i=t||(t={})).Min="350px",i.Standard="700px",i.Large="1000x",i.Unlimited=""},6671:function(e,n,s){"use strict";var t=s(7340),i=s(5893),l=s(7294),a=s(4965),r=s(4275),c=s(964),o=s(9963);function d(){let e=(0,t._)(["\n        text-align: left;\n        overflow: hidden;\n        font-size: 14px;\n        border-radius: 6px;\n        overflow: auto;\n\n        & .token-line {\n            line-height: 1.3em;\n            height: 1.3em;\n        }\n    "]);return d=function(){return e},e}function h(){let e=(0,t._)(["\n        max-height: ","\n    "]);return h=function(){return e},e}n.Z=e=>{let{code:n,className:t,language:x,maxHeight:_=o.b.Standard}=e;(void 0!==s.g?s.g:window).Prism=a.p1,s(1354),s(9016),s(5266),s(2927),s(1315),s(7874),s(6862);let b=null!=_?_:o.b.Standard,m=c.ZP.pre(d()),E=(0,c.ZP)(m)(h(),b);return(0,i.jsx)("div",{className:(0,r.GF)("bg-blue-500 md:p-1 p-2",t),children:(0,i.jsx)("div",{className:"shadow-lg",children:(0,i.jsx)(a.y$,{theme:a.np.vsDark,code:n.trim(),language:null!=x?x:x="tsx",children:e=>{let{className:n,style:s,tokens:t,getLineProps:a,getTokenProps:r}=e;return(0,i.jsx)(E,{className:n,style:s,children:t.map((e,n)=>(0,l.createElement)("div",{...a({line:e,key:n}),key:Math.random()},e.map((e,n)=>(0,l.createElement)("span",{...r({token:e,key:n}),key:Math.random()}))))})}})})})}},9305:function(e,n,s){"use strict";s.d(n,{Ee:function(){return r},Xg:function(){return l},Y7:function(){return h},aV:function(){return o},e9:function(){return d},o_:function(){return x},ty:function(){return c},xv:function(){return a}});var t=s(5152),i=s.n(t);let l=i()(()=>Promise.all([s.e(4838),s.e(4738),s.e(1664),s.e(7167)]).then(s.bind(s,7167)),{loadableGenerated:{webpack:()=>[7167]}}),a=i()(()=>s.e(9179).then(s.bind(s,9179)),{loadableGenerated:{webpack:()=>[9179]}}),r=i()(()=>s.e(1974).then(s.bind(s,1974)),{loadableGenerated:{webpack:()=>[1974]}}),c=i()(()=>s.e(8547).then(s.bind(s,8547)),{loadableGenerated:{webpack:()=>[8547]}}),o=i()(()=>s.e(6806).then(s.bind(s,6806)),{loadableGenerated:{webpack:()=>[6806]}}),d=i()(()=>Promise.all([s.e(1664),s.e(1465)]).then(s.bind(s,1465)),{loadableGenerated:{webpack:()=>[1465]}});i()(()=>s.e(567).then(s.bind(s,567)),{loadableGenerated:{webpack:()=>[567]}});let h=i()(()=>Promise.all([s.e(2004),s.e(4139)]).then(s.bind(s,4139)),{loadableGenerated:{webpack:()=>[4139]}}),x=i()(()=>Promise.all([s.e(3811),s.e(7472),s.e(584),s.e(7870)]).then(s.bind(s,7870)),{loadableGenerated:{webpack:()=>[7870]}})}},function(e){e.O(0,[1102,2888,9774,179],function(){return e(e.s=147)}),_N_E=e.O()}]);