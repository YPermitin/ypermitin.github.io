(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8037],{1273:function(n,e,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/SQLServer/2019-10/maintenance-is-not-easy",function(){return s(8485)}])},8485:function(n,e,s){"use strict";s.r(e);var d=s(5893),i=s(9305);s(7294);var c=s(1639),l=s(8754),t=s(5632),r=s(3906),x=s(6789),_=s(1652),a=s(6671),j=s(7105);e.default=()=>(0,d.jsxs)(i.Xg,{blogcentered:!0,children:[(0,d.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"История начинается"}),(0,d.jsx)(i.xv,{p:!0,children:"Вы обслуживаете базу данных среднего или большого размера? Имею ввиду размер от 100 ГБ и больше. Если да, то, возможно, с проблемами обслуживания индексов и статистик Вы уже сталкивались, а описание кейса в статье будет Вам знакомо. Если же Вы счастливчик и имеете дело со скромными по размеру системами, то информация ниже может пригодиться Вам в будущем."}),(0,d.jsx)(i.xv,{p:!0,children:"В любом случае, добро пожаловать! Рассказанный случай может быть полезен для всех."}),(0,d.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Подопытная база"}),(0,d.jsx)(i.xv,{p:!0,children:"Главным героем сегодня будет “Бухгалтерия предприятия 3”. Точный релиз не важен, т.к. структура регистра бухгалтерии редко меняется. Да и любая конфигурация, имеющая в своем составе этот тип регистра, потенциально могла бы быть сегодня в центре внимания."}),(0,d.jsx)(i.xv,{p:!0,children:"Интересуемые для нас характеристики подопытного:"}),(0,d.jsxs)(i.aV,{children:[(0,d.jsx)("li",{children:"Размер базы 3 ТБ."}),(0,d.jsx)("li",{children:"Работа с регистром бухгалтерии ведется очень интенсивная. В сутки на основной таблице регистра выполняется порядка 800 тысяч операций записи (вставка и обновление данных), а также 12 млн. операций чтения."}),(0,d.jsx)("li",{children:"Регистр большого размера. Взгляните на состав его таблиц и их размеры (данные получены с помощью этого отчета). В таблице присутствует информация о количестве записей, а также размере данных и индексов. Общий размер регистра больше 120 ГБ! Как Вам? (Свертку не предлагать!)"}),(0,d.jsx)(i.Ee,{className:"my-4",src:"/public/imp_assets/SQLServer/2019-10/maintenance-is-not-easy/1. Размер бухгалтерского регистра.png",alt:"Размер бухгалтерского регистра",size:j.h2.MEDIUM})]}),(0,d.jsxs)(i.xv,{p:!0,children:["Плюс ко всему, в базе настроено обслуживание индексов и статистики вне рабочего времени, ночью. Обслуживание настроено с помощью этого решения. ",(0,d.jsx)("b",{children:(0,d.jsx)("u",{children:(0,d.jsx)(i.e9,{newTab:!0,href:"https://github.com/YPermitin/SQLServerTools/tree/master/SQL-Server-Maintenance/Service-Database",children:"Обслуживание настроено с помощью этого решения."})})})]}),(0,d.jsx)(i.xv,{p:!0,children:"В основном все работает хорошо и на производительность жалоб не поступает. APDEX в зеленой зоне (ох уж этот APDEX). Но иногда возникают странные проблемы с подвисанием и блокировками во время проведения / отмены проведения документов."}),(0,d.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Двойная жизнь"}),(0,d.jsx)(i.xv,{p:!0,children:"Как это часто бывает, информационная система живет сложной жизнью. Днем она записывает / сохраняет документы при работе пользователей, а также формирует множество вариантов отчетов. Ночью же на сцену выходят “монстры”, называемые как “регламентные задания” с массовым изменением данных. Думаю, это обычная ситуация для многих."}),(0,d.jsx)(i.xv,{p:!0,children:"В периоды отчетности и закрытия ситуация может меняться, но незначительно. Без каких-либо предпосылок и предупреждений, в любой день, с самого раннего утра начинают поступать жалобы, что документы проводятся очень медленно, а иногда и вовсе появляется ошибка таймаута на ожидании блокировки на уровне СУБД (в заявках, конечно, пользователи не так пишут, обычно просто “Не работает!”). Чем больше активных пользователей в системе, тем больше жалоб и критичность проблемы."}),(0,d.jsx)(i.xv,{p:!0,children:"Сначала обычно начинают разбираться так:"}),(0,d.jsxs)(i.aV,{children:[(0,d.jsx)("li",{children:"Есть ли зависшие сеансы 1С или сессии на SQL-сервер. Если есть, то “убивают” их, предварительно сохранив всю доступную информацию о сеансе или сессии."}),(0,d.jsx)("li",{children:"Зависает конкретное действие в базе или нет. Если конкретное, то уже проще - можно попытаться решить, оптимизировать или, как минимум, собрать информацию."}),(0,d.jsx)("li",{children:"Проверяем отработало ли обслуживание индексов и статистик ночью. Возможно, произошла ошибка при работе job’а и теперь придется разбирать последствия весь оставшийся день, возможно даже обслуживать часть таблиц “на горячую” (обожаю так делать!)."}),(0,d.jsxs)("li",{children:["Проверяем загрузку оборудования с помощью мониторинга (он же у вас есть, не так ли?). Если проблема там, то решаем вопрос с администраторами что и как делать. Тут может оказаться что был выпущен новый функционал и 1Сники решили “отопить” всю серверную за счет увеличения нагрузки на железо. Можете уточнить у своих коллег делают ли они так ",":)"]}),(0,d.jsx)("li",{children:"В отчаянии перезагружаем сервер."})]}),(0,d.jsx)(i.xv,{p:!0,children:"Но в нашем случае ничего из вышеперечисленного не помогло! Жалобы продолжают поступать. Конечно, есть и другие способы диагностики, но не будем удлинять список, пойдем дальше."}),(0,d.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Опять эти блокировки!"}),(0,d.jsx)(i.xv,{p:!0,children:"Причина, как Вы уже могли догадаться, была в регистре бухгалтерии. Но лежит она не на поверхности. При проведении документов они сразу же формирую проводки, отложенного проведения нет. Именно операция записи движения и является проблемой."}),(0,d.jsx)(i.xv,{p:!0,children:"С помощью сбора данных со SQL Server, а именно причин таймаутов на блокировке (как собирать можно узнать здесь) выясняем, что проблемный запрос имеет следующий вид."}),(0,d.jsx)(a.Z,{code:'\nUPDATE T2 SET\n\n    -- Итог по ресурсу "Сумма"\n    _Fld9622 = T2._Fld9622 + T9._Fld9622,\n\n    -- Итог по ресурсу "ВалютнаяСуммаДт"\n    _Fld9623Dt = T2._Fld9623Dt + T9._Fld9623Dt, _Fld9623Ct = T2._Fld9623Ct \n        + T9._Fld9623Ct, _Fld9624Dt = T2._Fld9624Dt + T9._Fld9624Dt, \n\n    -- Итог по ресурсу "ВалютнаяСуммаКт"\n    _Fld9624Ct = T2._Fld9624Ct + T9._Fld9624Ct, _Fld9625Dt = T2._Fld9625Dt \n        + T9._Fld9625Dt, _Fld9625Ct = T2._Fld9625Ct + T9._Fld9625Ct, \n\n    -- Итог по ресурсу "СуммаПРДт"\n    _Fld9626Dt = T2._Fld9626Dt + T9._Fld9626Dt, _Fld9626Ct = T2._Fld9626Ct \n        + T9._Fld9626Ct, _Fld9627Dt = T2._Fld9627Dt + T9._Fld9627Dt, \n\n    -- Итог по ресурсу "СуммаВРКт"\n    _Fld9627Ct = T2._Fld9627Ct + T9._Fld9627Ct\n\nFROM #tt24 T9 WITH(NOLOCK) -- Таблица с заранее подготовленными данными\n    -- Таблица "ИтогиМеждуСчетами", именно в ней обновляются итоги данным запросом\n    INNER JOIN dbo._AccRgCT1188 T2\n    -- Соединения по:\n    -- Периоду\n    ON T9._Period = T2._Period \n        -- СчетДТ\n        AND T9._AccountDtRRef = T2._AccountDtRRef\n        -- Счет КТ\n        AND T9._AccountCtRRef = T2._AccountCtRRef AND T9._Fld9679RRef = T2._Fld9679RRef \n        -- Валюта ДТ\n        AND ((T9._Fld9620DtRRef = T2._Fld9620DtRRef OR T9._Fld9620DtRRef IS NULL AND T2._Fld9620DtRRef IS NULL))\n        -- Валюта КТ\n        AND ((T9._Fld9620CtRRef = T2._Fld9620CtRRef OR T9._Fld9620CtRRef IS NULL AND T2._Fld9620CtRRef IS NULL)) \n        -- Подразделение ДТ\n        AND ((T9._Fld9629DtRRef = T2._Fld9629DtRRef OR T9._Fld9629DtRRef IS NULL AND T2._Fld9629DtRRef IS NULL)) \n        -- Подразделение КТ\n        AND ((T9._Fld9629CtRRef = T2._Fld9629CtRRef OR T9._Fld9629CtRRef IS NULL AND T2._Fld9629CtRRef IS NULL)) \n        -- Служебный разделитель\n        AND T2._Splitter = @P9\n\n-- Фильтр по разделителю данных\nWHERE (T2._Fld9659 = @P2)\n                ',className:"my-5",language:"sql"}),(0,d.jsx)(i.xv,{p:!0,children:"При формировании записей движений платформа 1C выполняет множество запросов, ведь регистр бухгалтерии имеет сложную структуру и логику работы."}),(0,d.jsx)(i.xv,{p:!0,children:"В этом случае выполняется обновление информации в таблице итогов оборотов между счетами. Во временной таблице есть подготовленная информация для расчета новых значений итогов (это те данные, которые сохраняются при записи движений и на которые нужно откорректировать итоги) и платформа соединяет ее с данными непосредственно таблицы итогов."}),(0,d.jsx)(i.xv,{p:!0,children:"Вроде все хорошо, что же может пойти не так? Но если мы соберем дополнительную статистику, то увидим, что этот запрос выполняется порядка 30-60 секунд. То есть соединение данных двух таблиц выполняется очень долго, а в плане запроса обычно появляется операция “Table scan”. О ужас!"}),(0,d.jsx)(i.xv,{p:!0,children:"Поскольку для базы используется RCSI, то сканирование таблицы для обновления не блокирует всю таблицу. Лишь те записи, которые подходят под указанную аналитику (счет ДТ и КТ, подразделение ДТ и КТ, валюта ДТ и КТ и период (месяц)). Но так как сканирование выполняется до 60 секунд (а иногда и более), то при интенсивной работе есть вероятность появления таймаутов на таких блокировках, особенно если эта аналитика часто используется. Вот если бы RCSI не был бы включен, то блокировок было бы еще больше!"}),(0,d.jsx)(i.xv,{p:!0,children:"Но почему, почему запрос получился именно такой? Почему появились операции сканирования таблиц, ведь подходящие индексы для таблицы итогов есть? Вчера же все работало! Ох уж эта платформа 1С, она точно во всем виновата!"}),(0,d.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Почему так"}),(0,d.jsx)(i.xv,{p:!0,children:"Но почему? Почему так? Первое, что приходит в голову, так это проверить фрагментацию индексов у таблицы итогов регистра, вдруг обслуживание почему-то не отработало и поэтому SQL Server не использует индексы? СУБД считает их использование нецелесообразным, т.к. фрагментация слишком высокая. А если высокая, то затраты ресурсов при их использовании могут быть выше, чем старое доброе сканирование таблицы? Смотрим."}),(0,d.jsxs)(i.xv,{p:!0,children:["Проверим фрагментацию таким скриптом ",(0,d.jsx)("b",{children:(0,d.jsx)("u",{children:(0,d.jsx)(i.e9,{newTab:!0,href:"https://github.com/YPermitin/SQLServerTools",children:"(взят из репозитория SQLServerTools)"})})}),"."]}),(0,d.jsx)(a.Z,{code:"\nSELECT OBJECT_NAME(ips.OBJECT_ID)\n ,i.NAME\n ,ips.index_id\n ,index_type_desc\n ,avg_fragmentation_in_percent\n ,avg_page_space_used_in_percent\n ,page_count\nFROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'SAMPLED') ips\nINNER JOIN sys.indexes i ON (ips.object_id = i.object_id)\n AND (ips.index_id = i.index_id)\n-- Отбор по имени таблицы итогов, у которой мы расследуем проблему\nWHERE OBJECT_NAME(ips.OBJECT_ID) = '_AccRgCT1188'\nORDER BY avg_fragmentation_in_percent DESC\n                ",className:"my-5",language:"sql"}),(0,d.jsx)(i.xv,{p:!0,children:"Запустили и..."}),(0,d.jsxs)(c.b,{"aria-label":"Состояние индексов",children:[(0,d.jsxs)(l.J,{children:[(0,d.jsx)(t.j,{children:"Имя таблицы"},"c1"),(0,d.jsx)(t.j,{children:"Имя индекса"},"c2"),(0,d.jsx)(t.j,{children:"Идентификатор"},"c3"),(0,d.jsx)(t.j,{children:"Тип"},"c4"),(0,d.jsx)(t.j,{children:"Фрагментация, %"},"c5")]}),(0,d.jsxs)(r.y,{children:[(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_AccRgCT1188_ByDt_TRRRRRRRN"}),(0,d.jsx)(_.X,{children:"2"}),(0,d.jsx)(_.X,{children:"NONCLUSTERED INDEX"}),(0,d.jsx)(_.X,{children:"9,937536"})]},"1"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_AccRgCT1188_ByCt_TRRRRRRRN   _ByDt_TRRRRRRRN"}),(0,d.jsx)(_.X,{children:"3"}),(0,d.jsx)(_.X,{children:"NONCLUSTERED INDEX"}),(0,d.jsx)(_.X,{children:"9,223964"})]},"2"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_AccRgCT1188_ByPeriod_T"}),(0,d.jsx)(_.X,{children:"9"}),(0,d.jsx)(_.X,{children:"CLUSTERED INDEX"}),(0,d.jsx)(_.X,{children:"9,499961"})]},"3")]})]}),(0,d.jsx)(i.xv,{p:!0,children:"Все ОК! Фрагментация ниже 10%, это отлично!"}),(0,d.jsx)(i.xv,{p:!0,children:"Что ж, проблем с индексами нет. Давайте тогда посмотрим на состояние статистики. озьмем простой скрипт для анализа статистики."}),(0,d.jsx)(a.Z,{code:"\nselect\n    o.name AS [TableName],\n    a.name AS [StatName],\n    a.rowmodctr AS [RowsChanged],\n    STATS_DATE(s.object_id, s.stats_id) AS [LastUpdate],\n    o.is_ms_shipped,\n    s.is_temporary,\n    p.*\nfrom sys.sysindexes a\n    inner join sys.objects o\n    on a.id = o.object_id\n        and o.type = 'U'\n        and a.id > 100\n        and a.indid > 0\n    left join sys.stats s\n    on a.name = s.name\n    left join (\nSELECT\n        p.[object_id]\n, p.index_id\n, total_pages = SUM(a.total_pages)\n    FROM sys.partitions p WITH(NOLOCK)\n        JOIN sys.allocation_units a WITH(NOLOCK) ON p.[partition_id] = a.container_id\n    GROUP BY \np.[object_id]\n, p.index_id\n) p ON o.[object_id] = p.[object_id] AND p.index_id = s.stats_id\n-- Отбор по имени таблицы итогов, у которой мы расследуем проблему\nWHERE o.name = '_AccRgCT1188'\norder by\n    a.rowmodctr desc,\n    STATS_DATE(s.object_id, s.stats_id) ASC\n                ",className:"my-5",language:"sql"}),(0,d.jsx)(i.xv,{p:!0,children:"Выполняем и …"}),(0,d.jsxs)(c.b,{"aria-label":"Состояние статистики",children:[(0,d.jsxs)(l.J,{children:[(0,d.jsx)(t.j,{children:"Имя таблицы"},"c1"),(0,d.jsx)(t.j,{children:"Объект статистики"},"c2"),(0,d.jsx)(t.j,{children:"Количество записей с последнего обновления статистики"},"c3"),(0,d.jsx)(t.j,{children:"Дата последнего обновления статистики"},"c4")]}),(0,d.jsxs)(r.y,{children:[(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_WA_Sys_00000009_123123F"}),(0,d.jsx)(_.X,{children:"186755"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"1"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_AccRgCT1188_ByPeriod_T"}),(0,d.jsx)(_.X,{children:"173735"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"2"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_AccRgCT1188_ByDt_TRRRRRRRN"}),(0,d.jsx)(_.X,{children:"173735"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"3"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_AccRgCT1188_ByCt_TRRRRRRRN"}),(0,d.jsx)(_.X,{children:"173735"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"4"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_WA_Sys_00000001_123123F"}),(0,d.jsx)(_.X,{children:"173735"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"5"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_WA_Sys_00000002_123123F"}),(0,d.jsx)(_.X,{children:"173735"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"6"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_WA_Sys_00000003_123123F"}),(0,d.jsx)(_.X,{children:"173735"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"7"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_WA_Sys_00000014_123123F"}),(0,d.jsx)(_.X,{children:"173735"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"8"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_WA_Sys_00000008_123123F"}),(0,d.jsx)(_.X,{children:"173735"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"9"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_WA_Sys_00000007_123123F"}),(0,d.jsx)(_.X,{children:"173735"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"10"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_WA_Sys_00000006_123123F"}),(0,d.jsx)(_.X,{children:"173735"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"11"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_WA_Sys_00000005_123123F"}),(0,d.jsx)(_.X,{children:"173735"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"12"),(0,d.jsxs)(x.g,{children:[(0,d.jsx)(_.X,{children:"_AccRgCT1188"}),(0,d.jsx)(_.X,{children:"_WA_Sys_00000004_123123F"}),(0,d.jsx)(_.X,{children:"173735"}),(0,d.jsx)(_.X,{children:"01.10.2019 12:00"})]},"13")]})]}),(0,d.jsx)(i.xv,{p:!0,children:"Статистика обновлялась давно (допустим, 2 дня назад), а записей с момента обновления статистики было изменено более 170 тысяч."}),(0,d.jsx)(i.xv,{p:!0,children:"Бинго! Статистика стала неактуальной и SQL Server перестал использовать индексы в запросе. В начале статьи Вы могли видеть, что всего в таблице итогов между счетами примерно 415 тысяч записей. То есть, в таблице было потенциально изменено больше 30% всех данных, а статистика до сих пор не обновилась, что и не позволило СУБД использовать индексы должным образом."}),(0,d.jsx)(i.xv,{p:!0,children:"Но почему? Скрипт ведь обслуживания есть, он отработал."}),(0,d.jsx)(i.xv,{p:!0,children:"Да, обслуживание прошло ночью без ошибок, но до таблицы итогов между счетами оно просто не добралось! Сравните сами количество записей в других таблицах регистра и этой: 415 тыс. в таблице итогов и 103 млн. записей в основной таблице регистра. Разница существенная! Ночью были обслужены статистики больших таблиц, в которых изменения происходят чаще всего, а до мелких очередь просто не дошла. А ведь в базе есть не только регистр бухгалтерии, но и другие таблицы и пообъемнее!"}),(0,d.jsx)(i.xv,{p:!0,children:"В примере выше скрипт обслуживания статистик в первую очередь брал к обслуживанию те объекты, по которым больше всего изменилось записей. Даже если бы приоритет обслуживания определялся не по количеству изменений, а по % измененных строк от общего количества в таблице, то не факт, что очередь бы до нужного нам объекта дошла. По крайней мере на моей практике подход с определением приоритета обслуживания по % измененных записей часто давал сбой и делал не то, что следовало."}),(0,d.jsx)(i.xv,{p:!0,children:"Может возникнуть вопрос: “Почему же проблема “плавает” и не возникает каждый день?”. Вопрос справедливый и ответ простой: массовые изменения в бухгалтерском регистре происходят не каждый день и зависят от каких-то неизвестных обстоятельств. Например:"}),(0,d.jsxs)(i.aV,{children:[(0,d.jsx)("li",{children:"Внезапно понадобилось пересчитать итоги."}),(0,d.jsx)("li",{children:"Загрузить очень много документов."}),(0,d.jsx)("li",{children:"Перепровести регламентные операции закрытия."}),(0,d.jsx)("li",{children:"Да что угодно!"})]}),(0,d.jsx)(i.xv,{p:!0,children:"Плюс, в некоторых случаях обслуживание все же делает обновление статистики для этой таблицы, если в очереди нет других более тяжелых объектов к обслуживанию."}),(0,d.jsx)(i.xv,{p:!0,children:"Как же быть в таких ситуациях?"}),(0,d.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Как быть"}),(0,d.jsx)(i.xv,{p:!0,children:"ля начала определимся что нужно сделать для оперативного исправления проблемы. Таблица небольшая, поэтому мы можем обновить статистику “на горячую”, ведь кратковременное замедление в период работы скрипта лучше, чем блокировки, подвисания и таймауты на блокировках до конца рабочего дня (а то и больше, ведь следующее ночное обслуживание тоже может не добраться до нужного нам объекта)."}),(0,d.jsx)(i.xv,{p:!0,children:"Обновляем статистику “на горячую”. Возьмем более простой вариант скрипта обслуживания статистики и выполним его с отбором по таблице."}),(0,d.jsx)(a.Z,{code:"\nSET NOCOUNT ON;\n\nDECLARE -- Служебные переменные\n    @TableName SYSNAME\n    ,@IndexName SYSNAME\n    ,@SQL NVARCHAR(500);\n\nDECLARE todo CURSOR FOR\nSELECT\n    '\n    UPDATE STATISTICS [' + SCHEMA_NAME([o].[schema_id]) + '].[' + [o].[name] + '] [' + [s].[name] + ']\n        WITH FULLSCAN' + CASE WHEN [s].[no_recompute] = 1 THEN ', NORECOMPUTE' ELSE '' END + ';'\n    , [o].[name]\n    , [s].[name] AS [stat_name]\nFROM (\n    SELECT\n        [object_id]\n        ,[name]\n        ,[stats_id]\n        ,[no_recompute]\n        ,[last_update] = STATS_DATE([object_id], [stats_id])\n        ,[auto_created]\n    FROM sys.stats WITH(NOLOCK)\n    WHERE [is_temporary] = 0) s\n        LEFT JOIN sys.objects o WITH(NOLOCK) \n            ON [s].[object_id] = [o].[object_id]\n        LEFT JOIN (\n            SELECT\n                [p].[object_id]\n                ,[p].[index_id]\n                ,[total_pages] = SUM([a].[total_pages])\n            FROM sys.partitions p WITH(NOLOCK)\n                JOIN sys.allocation_units a WITH(NOLOCK) ON [p].[partition_id] = [a].[container_id]\n            GROUP BY \n                [p].[object_id]\n                ,[p].[index_id]) p \n            ON [o].[object_id] = [p].[object_id] AND [p].[index_id] = [s].[stats_id]\n        LEFT JOIN sys.sysindexes si\n    ON [si].[id] = [s].[object_id] AND [si].[indid] = [s].[stats_id]\nWHERE [o].[type] IN ('U', 'V')\n    AND [o].[is_ms_shipped] = 0\n    -- Отбор по имени таблицы итогов, у которой мы расследуем проблему\n    WHERE o.name = '_AccRgCT1188'\nORDER BY [rowmodctr] DESC;\n\nOPEN todo;\nWHILE 1=1\nBEGIN\n    FETCH NEXT FROM todo INTO @SQL, @TableName, @IndexName;\n\n    IF @@FETCH_STATUS != 0\n        BREAK;\n\n    EXEC sp_executesql @SQL;\nEND\n\nCLOSE todo;\nDEALLOCATE todo;\n\n                ",className:"my-5",language:"sql"}),(0,d.jsx)(i.xv,{p:!0,children:"В нашем случае скрипт отработает достаточно быстро."}),(0,d.jsx)(i.xv,{p:!0,children:"Окей, мы стабилизировали ситуацию! Блокировок больше нет, а система летает (и не падает)! Если бы таблица была очень большой, то потребовалось бы больше времени на обновление статистики, во время которого наблюдалось бы снижение производительности. Принимайте взвешенное решение, прежде чем запускать скрипт на продакшене."}),(0,d.jsx)(i.xv,{p:!0,children:"Но как предотвратить подобную аварию в будущем?"}),(0,d.jsx)(i.xv,{p:!0,children:"Работая над обслуживанием базы некоторое время начинаешь собирать информацию об особенностях ее работы. К таким особенностям относится и наш случай. Мы можем создать отдельный план обслуживания для индексов и статистик, актуальное состояние которых критично для функционирования всей системы. Так и поступим в нашем случае: добавим план обслуживания нашей “особенной” таблицы и ее статистик, который будет работать параллельно основному плану обслуживания. Расписание также можно выбрать на свое усмотрение. Конкретно в этом случае был настроен запуск каждые 4 часа, так как таблица небольшая, а изменений по ней много. Основной работе обслуживание никак не мешало и занимало обычно от 5 до 15 секунд на рабочем сервере."}),(0,d.jsx)(i.xv,{p:!0,children:"Скрипт для плана обслуживания можно сделать такой же, как и в выше. Правильно было бы также исключить из основного плана обслуживания те объекты, для которых созданы свои процессы обслуживания."}),(0,d.jsx)(i.xv,{p:!0,children:"Теперь одной проблемой обслуживания базы данных меньше!"}),(0,d.jsx)(i.xv,{title:!0,className:"mt-10 md:text",children:"Нет базы - нет проблем"}),(0,d.jsx)(i.xv,{p:!0,children:"Все, что описано выше, необязательно должно случиться с Вами! Это лишь одна из возможных проблем, которая может поджидать при увеличении размера базы данных и ее чувствительности к качественному обслуживанию индексов и статистики."}),(0,d.jsx)(i.xv,{p:!0,children:"Всю статью можно пересказать простыми словами: “Правильно обслуживайте индексы и статистику, тогда и проблем не будет”. Вот только не всегда однозначно можно сказать, как это сделать, а очевидные ответы бывают ошибочны. Те скрипты, что можно найти на просторах интернета или стандартные компоненты планов обслуживания SQL Server не являются полностью универсальными, как Вы могли убедиться из примера выше."}),(0,d.jsx)(i.xv,{p:!0,children:"Следите за своими базами, держите обслуживание эффективным!"})]})},9963:function(n,e,s){"use strict";var d,i;s.d(e,{b:function(){return d}}),(i=d||(d={})).Min="350px",i.Standard="700px",i.Large="1000x",i.Unlimited=""},6671:function(n,e,s){"use strict";var d=s(7340),i=s(5893),c=s(7294),l=s(4965),t=s(4275),r=s(964),x=s(9963);function _(){let n=(0,d._)(["\n        text-align: left;\n        overflow: hidden;\n        font-size: 14px;\n        border-radius: 6px;\n        overflow: auto;\n\n        & .token-line {\n            line-height: 1.3em;\n            height: 1.3em;\n        }\n    "]);return _=function(){return n},n}function a(){let n=(0,d._)(["\n        max-height: ","\n    "]);return a=function(){return n},n}e.Z=n=>{let{code:e,className:d,language:j,maxHeight:h=x.b.Standard}=n;(void 0!==s.g?s.g:window).Prism=l.p1,s(1354),s(9016),s(5266),s(2927),s(1315),s(7874),s(6862);let o=null!=h?h:x.b.Standard,R=r.ZP.pre(_()),T=(0,r.ZP)(R)(a(),o);return(0,i.jsx)("div",{className:(0,t.GF)("bg-blue-500 md:p-1 p-2",d),children:(0,i.jsx)("div",{className:"shadow-lg",children:(0,i.jsx)(l.y$,{theme:l.np.vsDark,code:e.trim(),language:null!=j?j:j="tsx",children:n=>{let{className:e,style:s,tokens:d,getLineProps:l,getTokenProps:t}=n;return(0,i.jsx)(T,{className:e,style:s,children:d.map((n,e)=>(0,c.createElement)("div",{...l({line:n,key:e}),key:Math.random()},n.map((n,e)=>(0,c.createElement)("span",{...t({token:n,key:e}),key:Math.random()}))))})}})})})}},9305:function(n,e,s){"use strict";s.d(e,{Ee:function(){return t},Xg:function(){return c},Y7:function(){return a},aV:function(){return x},e9:function(){return _},o_:function(){return j},ty:function(){return r},xv:function(){return l}});var d=s(5152),i=s.n(d);let c=i()(()=>Promise.all([s.e(4838),s.e(4738),s.e(1664),s.e(7167)]).then(s.bind(s,7167)),{loadableGenerated:{webpack:()=>[7167]}}),l=i()(()=>s.e(9179).then(s.bind(s,9179)),{loadableGenerated:{webpack:()=>[9179]}}),t=i()(()=>s.e(1974).then(s.bind(s,1974)),{loadableGenerated:{webpack:()=>[1974]}}),r=i()(()=>s.e(8547).then(s.bind(s,8547)),{loadableGenerated:{webpack:()=>[8547]}}),x=i()(()=>s.e(6806).then(s.bind(s,6806)),{loadableGenerated:{webpack:()=>[6806]}}),_=i()(()=>Promise.all([s.e(1664),s.e(1465)]).then(s.bind(s,1465)),{loadableGenerated:{webpack:()=>[1465]}});i()(()=>s.e(567).then(s.bind(s,567)),{loadableGenerated:{webpack:()=>[567]}});let a=i()(()=>Promise.all([s.e(2004),s.e(4139)]).then(s.bind(s,4139)),{loadableGenerated:{webpack:()=>[4139]}}),j=i()(()=>Promise.all([s.e(3811),s.e(7472),s.e(584),s.e(7870)]).then(s.bind(s,7870)),{loadableGenerated:{webpack:()=>[7870]}})}},function(n){n.O(0,[1102,3811,433,2888,9774,179],function(){return n(n.s=1273)}),_N_E=n.O()}]);