(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7776],{233:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/SQLServer/2019-02/cannot-insert-duplicate-key",function(){return r(607)}])},607:function(e,n,r){"use strict";r.r(n);var l=r(5893),s=r(9305);r(7294);var c=r(1639),d=r(8754),i=r(5632),x=r(3906),h=r(6789),j=r(1652),t=r(850),T=r(7105),_=r(1093);n.default=()=>{let{isOpen:e,onOpen:n,onOpenChange:r}=(0,_.q)();return(0,l.jsxs)(s.Xg,{blogcentered:!0,children:[(0,l.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"О чем речь"}),(0,l.jsxs)(s.xv,{p:!0,children:["Одним прекрасным днем, приходя на работу, Вы обнаруживаете странные ошибки в системе “Cannot insert duplicate key row in object 'dbo.","<имя таблицы>","' with unique index '","<имя индекса>",'\'". Ошибки могут появляться и на русском языке, если установлена соответствующая локализация: "Не удается вставить повторяющуюся строку в объект "dbo.',"<имя таблицы>",'" с уникальным индексом "',"<имя индекса>",'".']}),(0,l.jsx)(s.xv,{p:!0,children:"Появление ошибки может происходить при различных действиях, но единственное что их объединяет - это попытка изменения данных в базе данных (ну? а как иначе, ошибка то на уровне СУБД). Причем характерно это как для файлового режима работы, так и для клиент-серверных баз. В рамках статьи мы будет делать упор на работу через SQL Server, но все актуально и для PostgreSQL."}),(0,l.jsx)(s.xv,{p:!0,children:"Чаще всего подобные ошибки появляются при следующих действия:"}),(0,l.jsxs)(s.aV,{children:[(0,l.jsx)("li",{children:"Проведение документа, когда он изменяет данные в регистрах."}),(0,l.jsx)("li",{children:"Во время обменов данных между базами или другими информационными системами."}),(0,l.jsx)("li",{children:"При попытке изменить какой-либо документ в старом периоде, хотя много лет назад он мог проводиться без проблем."})]}),(0,l.jsx)(s.xv,{p:!0,children:"Обычно в таких случаях администраторы или разработчики запускают стандартный инструмент “Тестирование и исправление”, пересчитывают итоги и др. Но давайте разберемся почему так происходит и что стоит делать в тех или иных случаях."}),(0,l.jsx)(s.xv,{p:!0,children:"Все, что Вы прочитаете ниже, не является истиной, потому что случаев может быть очень много. Но материал может быть полезен для всех специалистов, обслуживающих базы 1С, т.к. даст понимание что СУБД все же хочет сказать."}),(0,l.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Суть проблемы"}),(0,l.jsx)(s.xv,{p:!0,children:"Вся проблема заключается в том, что платформа пытается добавить в таблицу запись с уже существующими ключевыми полями. Ключевые поля в нашем случае - это те поля, из которых состоит уникальный индекс таблицы. Платформа создает уникальные индексы почти всегда. Вот пример кластерного индекса документа."}),(0,l.jsx)(s.Ee,{className:"my-4",src:"/public/imp_assets/SQLServer/2019-02/cannot-insert-duplicate-key/1. Настройки индекса.png",alt:"Настройки индекса",size:T.h2.MEDIUM}),(0,l.jsx)(s.xv,{p:!0,children:"В этом случае индекс состоит из разделителя данных и ссылки, причем комбинация этих полей должны быть уникальными. Уникальность устанавливается и практически для всех остальных индексов. Вот, например, индекс по номеру документа."}),(0,l.jsx)(s.Ee,{className:"my-4",src:"/public/imp_assets/SQLServer/2019-02/cannot-insert-duplicate-key/2. Настройки уникальности.png",alt:"Настройки уникальности",size:T.h2.MEDIUM}),(0,l.jsx)(s.xv,{p:!0,children:"Для того, чтобы соблюдалась уникальность, последним полем добавлена ссылка, ведь номер документа может быть не уникальным (особенно в разных периодах, если нумерация повторяется ежегодно или ежемесячно), а ссылка уникальна практически всегда в рамках одной таблицы."}),(0,l.jsx)(s.xv,{p:!0,children:"Никто не может гарантировать, что в рамках одной информационной базы все GUID’ы в таблицах уникальны, т.к. всегда есть вероятность их повторения, особенно если данные из разных баз сливаются в одну. С таким даже сталкивался на практике, когда в двух базах в одной таблицы встретился один GUID у разных элементов!"}),(0,l.jsx)(s.xv,{p:!0,children:"Но вот уникальность идентификатора в рамках одной таблицы и в одной базе гарантировать можно, хотя бы за счет уникального кластерного индекса."}),(0,l.jsx)(s.xv,{p:!0,children:"Если при обмене будет попытка создать элемент с таким же идентификатором в одной таблице, то это приведет к ошибке на уровне СУБД. Пример такого поведения будет ниже."}),(0,l.jsx)(s.xv,{p:!0,children:"В этом и заключается проблема - в некоторых ситуациях платформа 1С из-за ошибок в прикладном коде или в самой технологической платформе пытается вставить запись с уникальным идентификатором, который уже есть в базе."}),(0,l.jsx)(s.xv,{p:!0,children:"Далее разберем несколько примеров таких случаев и возможные решения."}),(0,l.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Не могу создать документ"}),(0,l.jsx)(s.xv,{p:!0,children:"Иногда встречаются интеграции между системами, которые создают элементы в базе приемнике с такими же GUID’ами, как и в источнике. Это очень удобно, синхронизация по уникальным идентификаторам (ссылкам) самая надежная и простая. Но в этом случае есть бомба замедленного действия - что если в один прекрасный день уникальные идентификаторы для одного и того же объекта метаданных совпадут в разных базах?А если не уникальный?"}),(0,l.jsxs)(s.xv,{p:!0,children:["Конечно, Вы будете говорить что это маловероятно, что нет смысла думать об этом. Ну совпадет и ладно. Просто пересоздадим объект и все, зато код работает хорошо и выглядит просто. Самое плохое тут в том, что ошибка может появится в самый неподходящий момент, например, в закрытие месяца. Окажется что из-за совпадения идентификатора не создался документ партии и все полетело к ","%I$#@(^",". Интеграция ошибку не показала, а просто ее пропустила, никто не заметил и месяц уже закрыли. Все."]}),(0,l.jsx)(s.xv,{p:!0,children:"В типовых конфигурациях синхронизация объектов тоже выполняется по уникальным идентификаторам (ссылка), но через промежуточный объект - регистр сведений “СоответствияОбъектовИнформационныхБаз”, который решает описанную выше проблему. Регистр хранит соответствие объектов в разных системах и уже становится не важно, что идентификаторы между ними могут совпасть. Обмен все это решит, а соответствие запишется в эту таблицу. Хотя и тут бывают сложности, но это уже другая история."}),(0,l.jsx)(s.xv,{p:!0,children:"Вы можете воспроизвести подобную ошибку вставки просто выполнив подобный код."}),(0,l.jsx)(t.Z,{code:"\nGUID = Новый УникальныйИдентификатор();\n	\nНовЭлемент = Документы.ТестовыйДокумент.СоздатьДокумент();\nСсылкаНовогоЭлемента = Документы.ТестовыйДокумент.ПолучитьСсылку(GUID);\nНовЭлемент.УстановитьСсылкуНового(СсылкаНовогоЭлемента);\nНовЭлемент.Дата = ТекущаяДата();\nНовЭлемент.Записать();\n	\nНовЭлемент = Документы.ТестовыйДокумент.СоздатьДокумент();\nСсылкаНовогоЭлемента = Документы.ТестовыйДокумент.ПолучитьСсылку(GUID);\nНовЭлемент.УстановитьСсылкуНового(СсылкаНовогоЭлемента);\nНовЭлемент.Дата = ТекущаяДата();\n// При попытке записи объекта с тем же идентификатором\n// получим ошибку\nНовЭлемент.Записать();\n                ",className:"my-5",language:"bsl"}),(0,l.jsx)(s.xv,{p:!0,children:"Ошибка, например, может быть такой. Все зависит от названия таблиц для метаданных."}),(0,l.jsx)(s.Ee,{className:"my-4",src:"/public/imp_assets/SQLServer/2019-02/cannot-insert-duplicate-key/3. Ошибка при вставке неуникального значения.png",alt:"Ошибка при вставке неуникального значения",size:T.h2.MEDIUM}),(0,l.jsx)(s.xv,{p:!0,children:"В этом случае решением будет - делать соответствие объектов между обмениваемыми системами и не идти по правилу “один GUID для элемента во всех базах”."}),(0,l.jsx)(s.xv,{p:!0,children:"Это был самый простой случай, но он уже должен был Вас привести к мысли, что синхронизация по идентификаторам в обменах иногда может быть опасной. Вы можете не верить в это до последнего момента, но потом может быть уже поздно!"}),(0,l.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Проблема при записи регистров"}),(0,l.jsx)(s.xv,{p:!0,children:"Эта проблема наиболее интересная и сложная, да и встречается она чаще. Регистры, как Вы уже поняли, тоже имеют уникальные индексы по ключевым полям. Для регистров уникальность проверяется в разрезе их измерений."}),(0,l.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Простой пример"}),(0,l.jsx)(s.xv,{p:!0,children:"Есть независимый непериодический регистр сведений “ДанныеДоговоровКонтрагентов” с такой структурой."}),(0,l.jsx)(s.Ee,{className:"my-4",src:"/public/imp_assets/SQLServer/2019-02/cannot-insert-duplicate-key/4. Объект метаданных.png",alt:"Объект метаданных",size:T.h2.XS}),(0,l.jsx)(s.xv,{p:!0,children:"Если попытаться записать в него данные с повторяющимися значениями контрагента и договора, то мы поймаем такую ошибку."}),(0,l.jsx)(s.Ee,{className:"my-4",src:"/public/imp_assets/SQLServer/2019-02/cannot-insert-duplicate-key/5. Ошибка со стороны 1С.png",alt:"Ошибка со стороны 1С",size:T.h2.MEDIUM}),(0,l.jsx)(s.xv,{p:!0,children:"То есть платформа контролирует уникальность самостоятельно, в отличии от записи объектов (документов, справочников и т.д.) с одинаковой ссылкой. Это можно определить просто взглянув на сообщение об ошибке, там нет никаких признаков, что исключение появилось на уровне СУБД. Но рано радоваться, возьмем сложный пример - регистр бухгалтерии."}),(0,l.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Что же с данными моими стало"}),(0,l.jsx)(s.xv,{p:!0,children:"Думаю, с этим многие могли сталкиваться - при попытке провести документ прошлого периода возникает ошибка на таблицах регистра бухгалтерии примерно такого вида."}),(0,l.jsx)(s.Ee,{className:"my-4",src:"/public/imp_assets/SQLServer/2019-02/cannot-insert-duplicate-key/6. Проявление ошибки на стороне СУБД.png",alt:"Проявление ошибки на стороне СУБД",size:T.h2.MEDIUM}),(0,l.jsx)(s.xv,{p:!0,children:"История возникновения у каждого своя, но типичные случаи все же:"}),(0,l.jsxs)(s.aV,{children:[(0,l.jsx)("li",{children:"Нужно изменить записи бухгалтерского регистра в прошлом периоде"}),(0,l.jsx)("li",{children:"Нужно дозагрузить данные в текущий или прошлый период"}),(0,l.jsxs)("li",{children:["Нет никакой предыстории, просто при вводе новой операции вот такая ошибка ",":)","."]})]}),(0,l.jsx)(s.xv,{p:!0,children:"Прежде чем говорить о решении отметим, что регистр состоит из следующих таблиц."}),(0,l.jsxs)(c.b,{"aria-label":"Структура таблицы 1С",children:[(0,l.jsxs)(d.J,{children:[(0,l.jsx)(i.j,{children:"Метаданные"},"Metadata"),(0,l.jsx)(i.j,{children:"Назначение"},"Purpose"),(0,l.jsx)(i.j,{children:"Имя таблицы SQL"},"TableSQL")]}),(0,l.jsxs)(x.y,{children:[(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"РегистрБухгалтерии.Хозрасчетный"}),(0,l.jsx)(j.X,{children:"Основная"}),(0,l.jsx)(j.X,{children:"_AccRg786"})]},"1"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"РегистрБухгалтерии.Хозрасчетный"}),(0,l.jsx)(j.X,{children:"ИтогиПоСчетам"}),(0,l.jsx)(j.X,{children:"_AccRgAT0800"})]},"2"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"РегистрБухгалтерии.Хозрасчетный"}),(0,l.jsx)(j.X,{children:"ИтогиПоСчетамССубконто1"}),(0,l.jsx)(j.X,{children:"_AccRgAT1819"})]},"3"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"РегистрБухгалтерии.Хозрасчетный"}),(0,l.jsx)(j.X,{children:"ИтогиПоСчетамССубконто2"}),(0,l.jsx)(j.X,{children:"_AccRgAT2820"})]},"4"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"РегистрБухгалтерии.Хозрасчетный"}),(0,l.jsx)(j.X,{children:"ИтогиПоСчетамССубконто3"}),(0,l.jsx)(j.X,{children:"_AccRgAT3821"})]},"5"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"РегистрБухгалтерии.Хозрасчетный"}),(0,l.jsx)(j.X,{children:"ИтогиМеждуСчетами"}),(0,l.jsx)(j.X,{children:"_AccRgCT822"})]},"6"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"РегистрБухгалтерии.Хозрасчетный"}),(0,l.jsx)(j.X,{children:"ЗначенияСубконто"}),(0,l.jsx)(j.X,{children:"_AccRgED823"})]},"7"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"РегистрБухгалтерии.Хозрасчетный"}),(0,l.jsx)(j.X,{children:"НастройкиХраненияИтоговРегистраБухгалтерии"}),(0,l.jsx)(j.X,{children:"_AccRgOpt825"})]},"8")]})]}),(0,l.jsx)(s.xv,{p:!0,children:"Ошибка вставки не уникального значения была на таблице “_AccRgAT1819”, а эта таблица итогов по счетам с субконто 1. Пока это ничего не дает, рассмотрим варианты решения."}),(0,l.jsx)(s.xv,{p:!0,children:(0,l.jsx)("b",{children:"Если проблема у Вас горит и хочется попробовать сразу исправить ее рецептами ниже, то сразу говорю: “Ответственность за все действия лежит только на Вас! Делайте бэкап базы! А если не уверены в своих силах, то пригласите компетентного специалиста."})}),(0,l.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Вариант №1: Просто отключи итоги"}),(0,l.jsx)(s.xv,{p:!0,children:"Поистине, самый простой вариант, даже инструкцию можно не писать. Шаги простые:"}),(0,l.jsxs)(s.aV,{children:[(0,l.jsx)("li",{children:"Полностью отключаем итоги по регистру."}),(0,l.jsx)("li",{children:"Перепроводим / создаем / удаляем нужный документ."}),(0,l.jsx)("li",{children:"Включаем итоги обратно."})]}),(0,l.jsx)(s.xv,{p:!0,children:"Вот и все!"}),(0,l.jsxs)(s.xv,{p:!0,children:["Для ускорения пересчета итогов можно очистить таблицы (не для файловых баз) с помощью операции “TRUNCATE TABLE ","<ИмяТаблицы>",", тогда платформа не будет долго удалять старые записи итогов, а сразу перейдет к расчету новых. Не забудьте перед этим сделать бэкап! В нашем случае, удаление предыдущих итогов будет таким:"]}),(0,l.jsx)(t.Z,{code:"\n-- ИтогиПоСчетам\nTRUNCATE TABLE _AccRgAT0800;\n-- ИтогиПоСчетамССубконто1\nTRUNCATE TABLE _AccRgAT1819;\n-- ИтогиПоСчетамССубконто2\nTRUNCATE TABLE _AccRgAT2820;\n-- ИтогиПоСчетамССубконто3\nTRUNCATE TABLE _AccRgAT3821;\n-- ИтогиМеждуСчетами\nTRUNCATE TABLE _AccRgCT822;\n                ",className:"my-5",language:"sql"}),(0,l.jsx)(s.xv,{p:!0,children:"Но такой вариант подходит не всем. Вот его основные минусы, которые могут быть очень критичными для проводимых работ:"}),(0,l.jsxs)(s.aV,{type:T.RH.number,children:[(0,l.jsx)("li",{children:"На больших базах пересчет итогов может занимать сутки, двое и даже больше. Иногда это не “лезет” ни в какие технологические окна для обслуживания и пересчет выполнить просто невозможно."}),(0,l.jsxs)("li",{children:["Пересчет итогов может исправить некоторые старые, устоявшиеся ошибки. Все знают правило - если ошибка в данных не исправляется длительное время, то она превращается в особенность ",":)",". То есть пересчет может привести к повреждению старой отчетности и непредвиденным последствиям в поведении различных алгоритмов."]})]}),(0,l.jsx)(s.xv,{p:!0,children:"Применять его или нет - решать Вам, но если есть риск нестабильной работы системы после этого, то я бы не стал. Если же за “качеством” итогов Вы следите и пересчет для Вас обычное дело, то почему бы и нет? Дальше уже рассмотрим хардкорные варианты."}),(0,l.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Вариант №2: Удаление дублей записей"}),(0,l.jsx)(s.xv,{p:!0,children:"Можно попытаться найти дубли записей и что-то с ними сделать. В нашем случае для поиска дублей записей в таблице “_AccRgAT1819” можно воспользоваться таким скриптом:"}),(0,l.jsx)(t.Z,{code:"\nSELECT \n    COUNT(*) [RowCount],\n	-- Список измерений, которые содержатся в основном кластером индексе\n    [_Fld774],\n	[_AccountRRef],\n	[_Period],\n	[_Fld787RRef],\n	[_Value1_TYPE],\n	[_Value1_RTRef],\n	[_Value1_RRRef],\n	[_Fld788RRef],\n	[_Fld789RRef],\n	-- Разделитель записей в режиме разделения итогов\n	[_Splitter]\nFROM [dbo].[_AccRgAT1819]\nGROUP BY\n	-- Список измерений, которые содержатся в основном кластером индексе\n	[_Fld774],\n	[_AccountRRef],\n	[_Period],\n	[_Fld787RRef],\n	[_Value1_TYPE],\n	[_Value1_RTRef],\n	[_Value1_RRRef],\n	[_Fld788RRef],\n	[_Fld789RRef],\n	-- Разделитель записей в режиме разделения итогов\n	[_Splitter]\nHAVING COUNT(*) > 1\n                ",className:"my-5",language:"sql"}),(0,l.jsx)(s.xv,{p:!0,children:"В каждом случае скрипт выглядит по своему, но общий шаблон такой."}),(0,l.jsx)(t.Z,{code:"\nSELECT \n    COUNT(*) [RowCount],\n	-- Список измерений, которые содержатся в основном кластером индексе\n    'Список измерений. Можно посмотреть в основном кластерном индексе' AS [Измерения]\nFROM [dbo].[_AccRgAT1819]\nGROUP BY\n	-- Список измерений, которые содержатся в основном кластером индексе\n	'Список измерений. Можно посмотреть в основном кластерном индексе'\nHAVING COUNT(*) > 1\n                ",className:"my-5",language:"sql"}),(0,l.jsx)(s.xv,{p:!0,children:"После того как дубли записей будут найдены можно выполнить одно из следующих действий над ними:"}),(0,l.jsxs)(s.aV,{type:T.RH.number,children:[(0,l.jsx)("li",{children:"Удалить из базы, если они действительно не нужны. Стоит учесть, что нужно будет удалить не только из одной таблицы, но и из всех связанных таблиц регистра (таблиц итогов несколько, нужно это понимать)."}),(0,l.jsx)("li",{children:"Исправить данные как нужно с учетом также нескольких таблиц итогов."}),(0,l.jsx)("li",{children:"“Схлопнуть” данные по измерениям (полям кластерного индекса), тем самым убрав дубли."})]}),(0,l.jsx)(s.xv,{p:!0,children:"Готовых скриптов тут не будет, т.к. каждый случай требует своего подхода. Самое главное, чтобы все действия выполнял человек, компетентный в SQL-синтаксисе запросов. Сразу скажу, что в нашем примере дублей строк не было, то есть этот способ нам не подходит. Опыт показывает, что обычно дубли строк в таблице отсутствуют."}),(0,l.jsx)(s.xv,{p:!0,children:"Зато этим подходом можно найти случаи, когда дублей по полям индекса нет, но есть много дублей без учета поля-разделителя “_Splitter”, который используется при включенном разделении итогов. Платформа 1С иногда может вставить в таблицу итогов повторяющуюся запись с таким же значением разделителя. Ниже расскажу о возможных причинах такого поведения и как это обходить."}),(0,l.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Вариант №3: Отключаем уникальность индекса"}),(0,l.jsx)(s.xv,{p:!0,children:"Это 100% рабочий вариант, но только в качестве временного решения. Просто берем о перестраиваем индекс с отключением уникальности."}),(0,l.jsx)(s.Ee,{className:"my-4",src:"/public/imp_assets/SQLServer/2019-02/cannot-insert-duplicate-key/7. Отключаем уникальность.png",alt:"Отключаем уникальность",size:T.h2.SMALL}),(0,l.jsx)(s.xv,{p:!0,children:"После этого никаких проблем не будет при записи проблемного документа. Почему это временное решение?"}),(0,l.jsxs)(s.aV,{type:T.RH.number,children:[(0,l.jsx)("li",{children:"При реструктуризации платформа восстановит уникальность индекса, что приведет к той же ошибке, которую мы пытались обойти."}),(0,l.jsx)("li",{children:"Индекс будет работать менее эффективно после отключения уникальности."}),(0,l.jsx)("li",{children:"Если не разобраться почему появляются дубли записей в итогах, то можно столкнуться с еще более интересными последствиями в будущем."})]}),(0,l.jsx)(s.xv,{p:!0,children:"Но как временное решение способ идеальный. Можно отключить уникальность, а потом с помощью способов 1 или 2 исправить итоги. Или поискать причину дублей, просто проанализировав записи в итогах."}),(0,l.jsx)(s.xv,{subtitle:!0,className:"mt-10 md:text",children:"Вариант №4: Ручная корректировка данных"}),(0,l.jsx)(s.xv,{p:!0,children:"Самый хардкорный способ, доступный только постигшим дзен платформы 1С и принципы ее работы. Заключается в следующем - пишем SQL-запросы для ручной корректировки данных как в таблице движений и таблице субконто, так и в таблицах итогов."}),(0,l.jsx)(s.xv,{p:!0,children:"Это крайний вариант, когда другие способы не помогают. На практике было только один раз, и то его пришлось использовать из-за очень большого объема данных."}),(0,l.jsxs)(s.xv,{p:!0,children:["Примеров к нему нет смысла давать. Кому нужно, тот сам поймет и выстрадает ",":)","."]}),(0,l.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"А что все таки было"}),(0,l.jsx)(s.xv,{p:!0,children:"В нашем случае могли бы помочь 1, 2 и 4 способ, но что же все таки было? Почему создавались дубли записей? И почему дублей не было до попытки записать проблемный документ?"}),(0,l.jsx)(s.xv,{p:!0,children:"Ситуация для меня была очень интересной. Итоги пересчитывать было нельзя, дублей записей в таблице тоже не было. Отключил уникальность индекса и провел документ. Вот что появилось в таблице итогов (показана часть таблицы)."}),(0,l.jsxs)(c.b,{"aria-label":"Проблемные данные",children:[(0,l.jsxs)(d.J,{children:[(0,l.jsx)(i.j,{children:"Счет"},"c1"),(0,l.jsx)(i.j,{children:"Период"},"c2"),(0,l.jsx)(i.j,{children:"Вид субконто"},"c3"),(0,l.jsx)(i.j,{children:"Тип субконто"},"c4"),(0,l.jsx)(i.j,{children:"Значение субконто"},"c5"),(0,l.jsx)(i.j,{children:"Остаток"},"c6"),(0,l.jsx)(i.j,{children:"Оборот Дт"},"c7"),(0,l.jsx)(i.j,{children:"Оборот Кт"},"c8"),(0,l.jsx)(i.j,{children:"Оборот"},"c9")]}),(0,l.jsxs)(x.y,{children:[(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.12.4014 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"0.00"}),(0,l.jsx)(j.X,{children:"1000"}),(0,l.jsx)(j.X,{children:"0.00"}),(0,l.jsx)(j.X,{children:"1000"})]},"1"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.12.4014 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"0.00"}),(0,l.jsx)(j.X,{children:"-1000"}),(0,l.jsx)(j.X,{children:"0.00"}),(0,l.jsx)(j.X,{children:"-1000"})]},"2"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.01.4015 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"1000"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"})]},"3"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.01.4015 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"-1000"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"})]},"4"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.02.4015 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"1000"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"})]},"5"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.02.4015 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"-1000"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"})]},"6"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.03.4015 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"1000"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"})]},"7"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.03.4015 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"-1000"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"})]},"8"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.04.4015 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"1000"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"})]},"9"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.04.4015 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"-1000"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"})]},"10"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.05.4015 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"1000"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"})]},"11"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.05.4015 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"-1000"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"})]},"12"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.06.4015 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"1000"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"})]},"13"),(0,l.jsxs)(h.g,{children:[(0,l.jsx)(j.X,{children:"<ссылка>"}),(0,l.jsx)(j.X,{children:"01.06.4015 0:00"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"NULL"}),(0,l.jsx)(j.X,{children:"-1000"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"}),(0,l.jsx)(j.X,{children:"0"})]},"14")]})]}),(0,l.jsx)(s.xv,{p:!0,children:"При редактировании документа из него удалялась запись из табличной части, что приводило к удалению соответствующей записи и в регистре бухгалтерии. Документ из прошлого периода, 2014 года, поэтому при изменении платформа не удаляет записи из таблицы итого, а сторнирует их!"}),(0,l.jsx)(s.xv,{p:!0,children:"Но вот ошибка - запись сторно выполняется полностью с той же аналитикой, что и основная запись, что и приводит к исключению неуникальной записи в индексе. Одинаковое даже значение разделителя данных. Поэтому мы и не видели до этого дубли записей в таблице, их просто еще не было."}),(0,l.jsx)(s.xv,{p:!0,children:"Но почему в одних случаях изменение данных прошлых периодов проходит без ошибки, а в других мы наступаем на грабли и разбиваем себе лицо? И тут тоже все просто! Виновата некорректная аналитика по субконто. У счета в проводке должна стоять аналитика по 1 субконто. В таблице выше заметно, что тип, вид и значение субконто - все NULL! При подготовке данных для записи в таблицы регистра, платформа выполняет различные запросы, в которых можно заметить такие соединения как:"}),(0,l.jsx)(t.Z,{code:'\n-- Примеры соединения двух таблиц, где \n--  Т1 - временная таблица с подготовленными данными\n--  Т2 - таблица итогов "_AccRgAT1819"\nT1._Value1_TYPE = T2._Value1_TYPE AND T1._Value1_RTRef = T2._Value1_RTRef\n                ',className:"my-5",language:"sql"}),(0,l.jsx)(s.xv,{p:!0,children:"Но т.к. значение у этих полей NULL, то запрос возвращает не те данные, что ожидается, т.к. сравниваются значения NULL. SQL Server использует трехзначную логику, при сравнении значения с NULL всегда будет NULL. В этом случае один из запросов не обновляет текущие записи в таблице итогов как положено, т.к. просто не видит их. Пример запроса, в котором выполняется обновление существующих записей итогов, Вы можете увидеть под спойлером. Там же комментариями выделено проблемное место, из-за которого этот запрос не отрабатывает как нужно - не обновляет существующую запись итогов."}),(0,l.jsx)(t.Z,{code:"\nUPDATE T2 SET \n    _Fld790 = T2._Fld790 + T1._Fld790, \n    _TurnoverDt801 = T2._TurnoverDt801 + T1._TurnoverDt801, \n    _TurnoverCt802 = T2._TurnoverCt802 + T1._TurnoverCt802, \n    _Turnover803 = T2._Turnover803 + T1._Turnover803, \n    _Fld791 = T2._Fld791 + T1._Fld791, \n    _TurnoverDt804 = T2._TurnoverDt804 + T1._TurnoverDt804, \n    _TurnoverCt805 = T2._TurnoverCt805 + T1._TurnoverCt805, \n    _Turnover806 = T2._Turnover806 + T1._Turnover806, \n    _Fld792 = T2._Fld792 + T1._Fld792, \n    _TurnoverDt807 = T2._TurnoverDt807 + T1._TurnoverDt807, \n    _TurnoverCt808 = T2._TurnoverCt808 + T1._TurnoverCt808, \n    _Turnover809 = T2._Turnover809 + T1._Turnover809, \n    _Fld793 = T2._Fld793 + T1._Fld793, \n    _TurnoverDt810 = T2._TurnoverDt810 + T1._TurnoverDt810, \n    _TurnoverCt811 = T2._TurnoverCt811 + T1._TurnoverCt811, \n    _Turnover812 = T2._Turnover812 + T1._Turnover812, \n    _Fld794 = T2._Fld794 + T1._Fld794, \n    _TurnoverDt813 = T2._TurnoverDt813 + T1._TurnoverDt813, \n    _TurnoverCt814 = T2._TurnoverCt814 + T1._TurnoverCt814, \n    _Turnover815 = T2._Turnover815 + T1._Turnover815, \n    _Fld795 = T2._Fld795 + T1._Fld795, \n    _TurnoverDt816 = T2._TurnoverDt816 + T1._TurnoverDt816, \n    _TurnoverCt817 = T2._TurnoverCt817 + T1._TurnoverCt817, \n    _Turnover818 = T2._Turnover818 + T1._Turnover818\nFROM #tt57 T1 WITH(NOLOCK)\n    INNER JOIN dbo._AccRgAT1819 T2\n    ON T1._Period = T2._Period \n    AND T1._AccountRRef = T2._AccountRRef \n    AND T1._Fld787RRef = T2._Fld787RRef \n    AND ((T1._Fld788RRef = T2._Fld788RRef OR T1._Fld788RRef IS NULL AND T2._Fld788RRef IS NULL)) \n    AND ((T1._Fld789RRef = T2._Fld789RRef OR T1._Fld789RRef IS NULL AND T2._Fld789RRef IS NULL)) \n    AND T1._Fld774 = T2._Fld774 \n    -- Вот тут и проблема. Т.к. в таблице итогов эти поля имеют значения NULL,\n    -- то обновление этих записей просто не выполняется как нужно\n    AND T1._Value1_TYPE = T2._Value1_TYPE \n    AND T1._Value1_RTRef = T2._Value1_RTRef \n    AND T1._Value1_RRRef = T2._Value1_RRRef \n    AND T2._Splitter = @P1\nWHERE (T1._EDCount = @P2) AND (T2._Fld774 = @P3)\n                ",className:"my-5",language:"sql"}),(0,l.jsx)(s.xv,{p:!0,children:"В случае, если платформа не находит записи итогов для обновления, как это случилось в прошлом запросе, то выполняется попытка добавления недостающих записей итогов. Под спойлером запрос с комментариями в важных частях."}),(0,l.jsx)(t.Z,{code:'\nINSERT INTO dbo._AccRgAT1819(\n    _Period, \n    _AccountRRef, \n    _Fld787RRef, \n    _Fld788RRef, \n    _Fld789RRef, \n    _Fld774, \n    _Value1_TYPE, \n    _Value1_RTRef, \n    _Value1_RRRef, \n    _Fld790, \n    _TurnoverDt801, \n    _TurnoverCt802, \n    _Turnover803, \n    _Fld791, \n    _TurnoverDt804, \n    _TurnoverCt805, \n    _Turnover806, \n    _Fld792, \n    _TurnoverDt807, \n    _TurnoverCt808, \n    _Turnover809, \n    _Fld793, \n    _TurnoverDt810, \n    _TurnoverCt811, \n    _Turnover812, \n    _Fld794,\n    _TurnoverDt813, \n    _TurnoverCt814, \n    _Turnover815, \n    _Fld795, \n    _TurnoverDt816, \n    _TurnoverCt817, \n    _Turnover818, \n    _Splitter\n)\nSELECT\n    T1._Period,\n    T1._AccountRRef,\n    T1._Fld787RRef,\n    T1._Fld788RRef,\n    T1._Fld789RRef,\n    CAST(CASE WHEN (1=1) AND CASE WHEN 1=1 THEN CASE WHEN (T1._Fld774) = 0.0 OR (T1._Fld774) = 0.0 THEN 0 ELSE 2000000000 END + 2000000000 ELSE 0 END = 2000000000 THEN 0.0 END AS NUMERIC(7, 0)),\n    T1._Value1_TYPE,\n    T1._Value1_RTRef,\n    T1._Value1_RRRef,\n    T1._Fld790,\n    T1._TurnoverDt801,\n    T1._TurnoverCt802,\n    T1._Turnover803,\n    T1._Fld791,\n    T1._TurnoverDt804,\n    T1._TurnoverCt805,\n    T1._Turnover806,\n    T1._Fld792,\n    T1._TurnoverDt807,\n    T1._TurnoverCt808,\n    T1._Turnover809,\n    T1._Fld793,\n    T1._TurnoverDt810,\n    T1._TurnoverCt811,\n    T1._Turnover812,\n    T1._Fld794,\n    T1._TurnoverDt813,\n    T1._TurnoverCt814,\n    T1._Turnover815,\n    T1._Fld795,\n    T1._TurnoverDt816,\n    T1._TurnoverCt817,\n    T1._Turnover818,\n    CAST(0.0 AS NUMERIC(10, 0))\n-- К временной таблице "#tt57" присоединяется таблица итогов по 1 субконто "_AccRgAT1819"\nFROM #tt57 T1 WITH(NOLOCK)\n    LEFT OUTER JOIN dbo._AccRgAT1819 T2\n    ON (\n        T1._Period = T2._Period \n        AND T1._AccountRRef = T2._AccountRRef \n        AND T1._Fld787RRef = T2._Fld787RRef \n        AND ((T1._Fld788RRef = T2._Fld788RRef OR T1._Fld788RRef IS NULL AND T2._Fld788RRef IS NULL)) \n        AND ((T1._Fld789RRef = T2._Fld789RRef OR T1._Fld789RRef IS NULL AND T2._Fld789RRef IS NULL)) \n        AND T1._Fld774 = T2._Fld774 \n        -- Здесь проблемное соединение из-за значений NULL в полях субконто таблицы итогов\n        AND T1._Value1_TYPE = T2._Value1_TYPE \n        AND T1._Value1_RTRef = T2._Value1_RTRef \n        AND T1._Value1_RRRef = T2._Value1_RRRef \n        AND T2._Splitter = @P1\n       ) \n        AND (T2._Fld774 = @P2)\n-- Добавлена проверка, что вставка новой записи в таблицу итогов будет выполнена\n-- только если нет существующей записи в этой таблице.\n-- Из-за значений NULL "старая" запись не находится, поэтому и появляется эта операция\n-- вставки данных\nWHERE T2._Period IS NULL \n    AND T1._EDCount = @P3\n                ',className:"my-5",language:"sql"}),(0,l.jsx)(s.xv,{p:!0,children:"Но, поскольку запись итогов все же уже есть в таблице, то происходит ошибка “Cannot insert duplicate key”."}),(0,l.jsxs)(s.xv,{p:!0,children:["Проверить работу СУБД с NULL можно вот таким запросом. Попробуйте и поймете что тут к чему. Подробнее об обработке значений NULL ",(0,l.jsx)("b",{children:(0,l.jsx)("u",{children:(0,l.jsx)(s.e9,{newTab:!0,href:"https://learn.microsoft.com/en-us/sql/relational-databases/clr-integration-database-objects-types-net-framework/nullability-and-three-value-logic-comparisons?view=sql-server-ver16",children:"можно прочитать тут"})})}),"."]}),(0,l.jsx)(t.Z,{code:"\nВЫБРАТЬ\n	NULL ЕСТЬ NULL КАК Поле1,\n	NULL = NULL КАК Поле2,\n	NULL = ЛОЖЬ КАК Поле3,\n	NULL <> NULL КАК Поле4,\n	NULL ЕСТЬ НЕ NULL  КАК Поле5\n                ",className:"my-5",language:"text"}),(0,l.jsx)(s.xv,{p:!0,children:"Вот такие дела. Мы рассмотрели не самый простой пример с ошибкой дублирования записи в таблице. Бывают ошибки проще Теперь ты знаешьна других таблицах и объектах метаданных. Хотя и бывают ситуации еще сложнее, когда ошибка воспроизводится спонтанно, на разных документах. Основные причины ошибки те же самые, просто “интересных” данных в регистре уже намного больше."}),(0,l.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Не загружается DT’шник базы"}),(0,l.jsx)(s.xv,{p:!0,children:"Иногда подобная ошибка встречается при переводе базы из файлового варианта в клиент-серверный через загрузку-выгрузку DT-файла."}),(0,l.jsx)(s.xv,{p:!0,children:"На практике относительно мало работал с файловыми базами, но решать проблему удавалось двумя способами:"}),(0,l.jsxs)(s.aV,{type:T.RH.number,children:[(0,l.jsx)("li",{children:"Удалением или редактированием битых записей перед выгрузкой в DT. Это можно сделать через режим 1С:Предприятие, если проблема в основных таблицах. Или можно воспользоваться утилитой Tool1CD."}),(0,l.jsx)("li",{children:"В момент загрузки DT на SQL Server сделать триггер при создании и отключить ему уникальность с помощью скрипта. Далее уже анализировать проблему."})]}),(0,l.jsx)(s.xv,{p:!0,children:"Иногда может помочь штатное тестирование и исправление, но этот инструмент не является панацеей от всех болезней. А иногда он может и навредить, используйте с умом!"}),(0,l.jsx)(s.xv,{p:!0,children:"Способы не универсальные, нужно смотреть по ситуации."}),(0,l.jsx)(s.xv,{title:!0,className:"mt-10 md:text",children:"Что имеем в итоге"}),(0,l.jsx)(s.xv,{p:!0,children:"Какой сделать вывод? Проблемы вставки не уникальной записи - это не баг СУБД! Основные причины таких ошибок:"}),(0,l.jsxs)(s.aV,{type:T.RH.number,children:[(0,l.jsx)("li",{children:"Некорректные данные в таблицах, появившееся либо в результате некорректной работы программного кода, либо из-за ошибок платформы 1С, либо при изменении учета “на лету”, когда, например, изменяют состав субконто."}),(0,l.jsx)("li",{children:"Ошибки в коде прикладных решений."}),(0,l.jsx)("li",{children:"Плохое обслуживание итогов в регистрах, отсутствие проактивной сверки данных, при которой такие проблемы решались бы оперативней."})]}),(0,l.jsx)(s.xv,{p:!0,children:"К счастью, все подобные вопросы можно решить и в абсолютном большинстве случаев без жертв."}),(0,l.jsx)(s.xv,{p:!0,children:"Платформа 1С может быть более внимательной к данным, а разработчики прикладных решений дальновидней в плане архитектуры и инструментов сопровождения."}),(0,l.jsx)(s.xv,{p:!0,children:"Конечно, описать все подобные ситуации нельзя в рамках только одной публикации."})]})}},850:function(e,n,r){"use strict";r.d(n,{Z:function(){return j}});var l=r(5893),s=r(7294),c=r(4965),d=r(4275),i=r(7340);function x(){let e=(0,i._)(["\n  text-align: left;\n  overflow: hidden;\n  font-size: 14px;\n  border-radius: 6px;\n  overflow: auto;\n  max-height: 350px;\n\n  & .token-line {\n    line-height: 1.3em;\n    height: 1.3em;\n  }\n"]);return x=function(){return e},e}let h=r(964).ZP.pre(x());var j=e=>{let{code:n,className:i,language:x}=e;return(void 0!==r.g?r.g:window).Prism=c.p1,r(1354),r(9016),r(5266),r(2927),r(1315),r(7874),r(6862),(0,l.jsx)("div",{className:(0,d.GF)("bg-blue-500 md:p-5 p-2",i),children:(0,l.jsx)("div",{className:"shadow-lg",children:(0,l.jsx)(c.y$,{theme:c.np.vsDark,code:n,language:null!=x?x:x="tsx",children:e=>{let{className:n,style:r,tokens:c,getLineProps:d,getTokenProps:i}=e;return(0,l.jsx)(h,{className:n,style:r,children:c.map((e,n)=>(0,s.createElement)("div",{...d({line:e,key:n}),key:Math.random()},e.map((e,n)=>(0,s.createElement)("span",{...i({token:e,key:n}),key:Math.random()}))))})}})})})}},9305:function(e,n,r){"use strict";r.d(n,{Ee:function(){return i},Xg:function(){return c},aV:function(){return h},e9:function(){return j},o_:function(){return t},ty:function(){return x},xv:function(){return d}});var l=r(5152),s=r.n(l);let c=s()(()=>Promise.all([r.e(4838),r.e(4738),r.e(4817),r.e(1664),r.e(7167)]).then(r.bind(r,7167)),{loadableGenerated:{webpack:()=>[7167]}}),d=s()(()=>r.e(9179).then(r.bind(r,9179)),{loadableGenerated:{webpack:()=>[9179]}}),i=s()(()=>r.e(1974).then(r.bind(r,1974)),{loadableGenerated:{webpack:()=>[1974]}}),x=s()(()=>r.e(8547).then(r.bind(r,8547)),{loadableGenerated:{webpack:()=>[8547]}}),h=s()(()=>r.e(6806).then(r.bind(r,6806)),{loadableGenerated:{webpack:()=>[6806]}}),j=s()(()=>Promise.all([r.e(1664),r.e(1465)]).then(r.bind(r,1465)),{loadableGenerated:{webpack:()=>[1465]}});s()(()=>r.e(567).then(r.bind(r,567)),{loadableGenerated:{webpack:()=>[567]}}),s()(()=>Promise.all([r.e(2004),r.e(4139)]).then(r.bind(r,4139)),{loadableGenerated:{webpack:()=>[4139]}});let t=s()(()=>Promise.all([r.e(5507),r.e(7472),r.e(584),r.e(7870)]).then(r.bind(r,7870)),{loadableGenerated:{webpack:()=>[7870]}})},1093:function(e,n,r){"use strict";r.d(n,{q:function(){return x}});var l=r(8974),s=r(5897),c=r(7294),d=(null==globalThis?void 0:globalThis.document)?c.useLayoutEffect:c.useEffect;function i(e,n=[]){let r=(0,c.useRef)(e);return d(()=>{r.current=e}),(0,c.useCallback)((...e)=>{var n;return null==(n=r.current)?void 0:n.call(r,...e)},n)}function x(e={}){let{id:n,defaultOpen:r,isOpen:d,onClose:x,onOpen:h,onChange:j=()=>{}}=e,t=i(h),T=i(x),[_,a]=(0,s.zk)(d,r||!1,j),u=(0,c.useId)(),o=n||u,v=void 0!==d,R=(0,c.useCallback)(()=>{v||a(!1),null==T||T()},[v,T]),L=(0,c.useCallback)(()=>{v||a(!0),null==t||t()},[v,t]),N=(0,c.useCallback)(()=>{(_?R:L)()},[_,L,R]);return{isOpen:!!_,onOpen:L,onClose:R,onOpenChange:N,isControlled:v,getButtonProps:(e={})=>({...e,"aria-expanded":_,"aria-controls":o,onClick:(0,l.tS)(e.onClick,N)}),getDisclosureProps:(e={})=>({...e,hidden:!_,id:o})}}}},function(e){e.O(0,[1102,5507,433,2888,9774,179],function(){return e(e.s=233)}),_N_E=e.O()}]);