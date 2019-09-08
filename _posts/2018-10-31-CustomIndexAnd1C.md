---
layout: post
title: Создаем свои индексы для баз 1С. Со своей структурой и настройками!
categories: [SQL Server, 1C]
---

Поговорим о неплатформенных индексах для информационных баз 1С. Об особенностях их использования, целесообразности и подводных камнях.

## О чем речь

Это всего лишь еще одна статья об избитой теме неплатформыенных индексов в информационных базах платформы 1С. Мы поговорим о "плохих" практиках тюнинга, которые с одной стороны запрещены лицензионным соглашением фирмы 1С, а с другой являются наиболее эффективным средством оптимизации производительности запросов. Эдакий запретный плод!

Не рекомендуется к прочтению, если к Вам относится хотя бы один из следующих пунктов:
- Используется файловый режим работы информационной базы
- Нет никаких проблем производительности и стабильности информационной системы
- Считаете большой ошибкой выход за пределы экосистемы платформы 1С
- Вы сотрудник фирмы "1С"

Все, что Вы прочитаете далее, должно остаться внутри Вашей головы и никогда не переходить в практическую плоскость. Еще раз повторяю: все что сказано далее - это плохие практики, нерекомендуемые фирмой "1С" и нарушающие ее лицензионное соглашение, противоречащие материалам подготовки к экзамену "1С:Эксперт по технологическим вопросам", снижающие карму и просто имеющие подводные камни планетарного масштаба.

![Последняя ошибка](/images/2018-10-31-CustomIndexAnd1C\LastError.png)

Будете читать дальше? Тогда отлично, поехали!

## Зачем все это

Платформа 1С создает множество индексов самостоятельно по настройкам объектов метаданных конфигурации. Также разработчики сами могут в ограниченном режиме влиять на создание и изменение индексов. Самую полную информацию о платформенных индексах [смотрите здесь](https://its.1c.ru/db/metod8dev/content/1590/hdoc).

Посмотрели? Задаетесь вопросом почему нужны еще какие-то дополнительные индексы?

Ответ на этот вопрос простой. Он даже проще, чем можно себе представить!

Индексы нужны для повышения эффективности запросов на чтение при поиске данных. При этом вариантов выборки данных, фильтров, группировок и порядка сортировки может быть огромное количество. Чем больше полей в таблице, тем больше этих вариантов. Даже чисто гипотетически трудно себе представить ситуацию, когда платформенные индексы могли бы полностью удовлетворить большую часть запросов. Частично - может быть, полностью - никогда.

Ситуация усугубляется еще и тем, что добавление индексов через свойство полей "Индексировать" в конфигураторе имеет примитивные возможности для их настройки. Фактически, Вы можете только выбрать три варианта (да и то не всегда):

- Не индексировать (с этим и так все понятно)
- Индексировать (индекс по выбранному полю + доп. поля для уникальности комбинации значений)
- Индексировать с [дополнительным упорядочиванием](https://its.1c.ru/db/metod8dev/content/2742/hdoc) (индекс по выбранному полю + поля упорядочивания, по которым обычно сортируют данные этой таблицы)

Повторюсь, что примеры того, как влияют эти настройки на индексы можно [посмотреть здесь](https://its.1c.ru/db/metod8dev/content/1590/hdoc). Почему же этих вариантов недостаточно?

Вот Вам пару вопросов для обдумывания:
- А что если нужно создать индекс сразу по нескольким реквизитам? 
- А если нужен индекс по пометке удаления?
- Как построить эффективный индекс по любому полю с типом "Булево"?
- Как добавить индексы в служебные таблицы, недоступные непосредственно в метаданных конфигурации (некоторые основные таблицы, таблицы итогов и др.?
- Можно ли сделать покрывающий индекс, чтобы исключить операции Lookup к основной таблице или кластерному индексу?

Таких вопросов можно задавать много. Вы говорите, что все это можно решить средствами платформы? Или что это все не нужно и разработчики конфигурации просто ошиблись в архитектуре. Тогда прошу напишите в комментариях Ваши решения, но у меня будет лишь пару вопросов:
1. Почему бы не использовать произвольные индексы на уровне базы данных с произвольной структурой и настройками? 
2. Для чего тогда были придуманы фильтрованные индексы, покрывающие индексы, произвольные составные индексы, если платформа 1С их не использует? От лукавого? :)

## А можно примеры?

Конечно, для наглядности рассмотрим в качестве примеров ответы на те самые вопросы, которые я написал выше. И так, погнали!

### А что если нужно создать индекс сразу по нескольким реквизитам

Предположим, что у нас есть справочник "ФизическиеЛица" следующей структуры (некоторые поля пропущены). В самой таблице примерно 2 млн. записей.

| Поле 1С | Имя SQL | Тип SQL |
| ------- | ------- | --- |
| Ссылка | _IDRRef | binary(16) |
| ПометкаУдаления | _Marked | binary(1) |
| Код | _Code | nvarchar(10) |
| Наименование | _Description | nvarchar(50) |
| ДатаРождения | _Fld11066 | datetime2(0) |
| Фамилия | _Fld105061 | nvarchar(50) |
| Имя | _Fld105062 | nvarchar(50) |
| Отчество | _Fld105063 | nvarchar(50) |
| ДатаСоздания | _Fld115447 | datetime2(0) |
| РазделительДанных | _Fld1551 | numeric(7,0) |

В конфигурации есть запрос поиска физического лица по комбинации полей Фамилия + Имя + Отчество + ДатаРождения.

```bsl
ВЫБРАТЬ
	ФизическиеЛица.Ссылка КАК Ссылка
ИЗ
	Справочник.ФизическиеЛица КАК ФизическиеЛица
ГДЕ
	ФизическиеЛица.Фамилия = &Фамилия
	И ФизическиеЛица.Имя = &Имя
	И ФизическиеЛица.Отчество = &Отчество
	И ФизическиеЛица.ДатаРождения = &ДатаРождения
```

Чтобы ускорить поиск и исключить операции полного сканирования таблицы справочника необходимо создать индекс. Какой бы индекс Вы создали средствами платформы?

Конечно, можно поставить свойство "Индексирование" в "Индексировать" для каждого реквизита, но что это даст? СУБД сможет использовать один индекс в каждой конкретной операции плана запроса, при этом также будет учитываться актуальность статистики. Запрос 1С конвертируется в такой SQL-запрос.

```sql
SELECT
	T1._IDRRef
FROM dbo._Reference477 T1
WHERE ((T1._Fld1551 = @P1)) -- Разделитель данных, есть во всех типовых конфигурациях
	AND ((T1._Fld105061 = @P2) -- Фамилия
	AND (T1._Fld105062 = @P3) -- Имя
	AND (T1._Fld105063 = @P4) -- Отчество
	AND (T1._Fld11066 = @P5)) -- Дата рождения
```

Взгляните на план его выполнения ниже (некоторые части разбиты на несколько строк для удобства чтения).

```
Nested Loops(Inner Join, OUTER REFERENCES:([T1].[_IDRRef], [T1].[_Fld1551]) OPTIMIZED)
  |--Merge Join(Inner Join, 
  |    |            MERGE:([T1].[_Fld1551], [T1].[_IDRRef])=([T1].[_Fld1551], [T1].[_IDRRef]), 
  |    |            RESIDUAL:([DB].[dbo].[_Reference477].[_Fld1551] as [T1].[_Fld1551] = [DB].[dbo].[_Reference477].[_Fld1551] as [T1].[_Fld1551] 
  |    |                AND [DB].[dbo].[_Reference477].[_IDRRef] as [T1].[_IDRRef] = [DB].[dbo].[_Reference477].[_IDRRef] as [T1].[_IDRRef]))
  |    |--Index Seek(OBJECT:([DB].[dbo].[_Reference477].[_Reference477_ByFieldFld11066] AS [T1]), 
  |    |                SEEK:([T1].[_Fld1551]=[@P1] AND [T1].[_Fld11066]=[@P5]) ORDERED FORWARD)                                            
  |    |--Index Seek(OBJECT:([DB].[dbo].[_Reference477].[_Reference477_ByFieldFld105062] AS [T1]), 
  |    |                SEEK:([T1].[_Fld1551]=[@P1] AND [T1].[_Fld105062]=[@P3]) ORDERED FORWARD)
  |--Clustered Index Seek(OBJECT:([DB].[dbo].[_Reference477].[_Reference477HPK] AS [T1]), 
  |                         SEEK:([T1].[_Fld1551]=[DB].[dbo].[_Reference477].[_Fld1551] as [T1].[_Fld1551] 
  |                             AND [T1].[_IDRRef]=[DB].[dbo].[_Reference477].[_IDRRef] as [T1].[_IDRRef]), 
  |                        WHERE:([DB].[dbo].[_Reference477].[_Fld105061] as [T1].[_Fld105061]=[@P2] 
```

Описание основных действий при выполнении плана запроса следующие.

| Порядок | Операция | Количество прочитанных строк | Описание |
| ------- | -------- | ---------------------------- | -------- |
| 1. | Index Seek | 94 | Поиск по индексу "_Reference477_ByFieldFld11066" для реквизита "ДатаРождения". Повезло, для выбранной даты рождения всего 94 значения, хорошая селективность. |
| 2. | Index Seek | 10006 | Поиск по индексу "_Reference477_ByFieldFld105062" для поля "Имя". Тут все намного хуже, т.к селективность у этого поля ниже, ведь имя у многих физических лиц может совпадать. |
| 3. | Merge Join | 2 | Объединение результатов 1 и 2 операции методом слияния. В результате получаем две фактически одинаковые строки. |
| 4. | Clustered Index Seek | 1 | Выполняется операция Key Lookup для получения полей запроса, которые не были получены в предыдущих операциях. Key Lookup как известно всегда достаточно тяжелая операция. |
| 5. | Nested Loops | 1 | Вложенным циклом соединяются результаты 3 и 4 операции и получаем итоговый результат запроса - всего 1 строку. |
| | | | |

Итог: 
- 419 логических чтений
- 11 миллисекунд времени выполнения 
- 16 миллисекунд CPU
- Выборка некоторых частей плана запроса отбирает 10000 записей, но в итоговый результат отбирается всего 1

Вот вам и индексы. 4 индекса, а эффективности никакой. Но нас ничто не остановит, мы создадим свой индекс с произвольными полями и нужной структурой!

```sql
CREATE UNIQUE NONCLUSTERED INDEX [_ByNameAndBirthday] ON [dbo].[_Reference477]
(
	[_Fld105061] ASC, -- Фамилия
	[_Fld105062] ASC, -- Имя
	[_Fld105063] ASC, -- Отчество
	[_Fld11066] ASC,  -- Дата рождения
	[_IDRRef] ASC     -- Ссылка
)
```

Выполним запрос поиска еще раз и вот результат!

```sql
Index Seek(OBJECT:([DB].[dbo].[_Reference477].[_ByNameAndBirthday] AS [T1]), 
    SEEK:([T1].[_Fld105061]=[@P2] AND [T1].[_Fld105062]=[@P3] 
        AND [T1].[_Fld105063]=[@P4] AND [T1].[_Fld11066]=[@P5]),  
    WHERE:([DB].[dbo].[_Reference477].[_Fld1551] as [T1].[_Fld1551]=[@P1]) ORDERED FORWARD) 
```

План запроса стал значительно проще.

| Порядок | Операция | Количество прочитанных строк | Описание |
| ------- | -------- | ---------------------------- | -------- |
| 1. | Index Seek | 1 | Операция поиска в некластеризованном индексе "_ByNameAndBirthday". Поскольку индекс содержит все необходимые поля выборки запроса, то обращение к кластерному индексу отсутствует, т.е. индекс является покрывающим. |
| | | | |

Итог: 
- 337 логических чтений
- 2 миллисекунд времени выполнения 
- 0 миллисекунд CPU (фактически значение незначительное, поэтому не было отловлено трассировкой)
- План выполнения содержит только одну операцию "Index Seek", которая фактически читает только 1 строку.

Пусть Вас не смущает, что запрос и в начальном варианте выполнялся быстро, ведь это только простой пример. Представьте рабочее окружение, тысячи или десятки тысяч запросов. Тогда разница даже на таких часто выполняемых запросах будет заметна!

Результаты говорят сами за себя. Создать подобный индекс средствами платформы 1С просто нет возможности. Но теперь Вы знаете, какой огромный потенциал для оптимизации у Вас есть.

### А если нужен индекс по пометке удаления

Еще один наглядный пример - это индекс по пометке удаления. Средствами платформы добавить индекс по пометке удаления нет возможности, т.к. это стандартный реквизит и настройка "Индексирование" для него просто недоступна. Немного приблизим задачу к настоящей и скажем, что нужно отбирать помеченные на удаление элементы с учетом реквизита "ДатаСоздания".

И так, платформа не даст создать такой индекс, но мы то знаем решение!

```sql
CREATE NONCLUSTERED INDEX [_ByDeletionMarkAndCreationDate] ON [dbo].[_Reference477]
(
	[_Marked] ASC,   -- Пометка удаления
	[_Fld115447] ASC,-- Дата создания
	[_IDRRef] ASC    -- Ссылка
)
-- Сделаем фильтрованный индекс
-- В индекс попадают только те записи, у которых установлена пометка удаления
WHERE [_Marked] = 0x01
```

Что это за условие "WHERE"? SQL Server поддерживает фильтрованные индексы, в которых можно ограничить какие данные в него попадут. Если нужна более подробная информация, то [Welcome](https://docs.microsoft.com/ru-ru/sql/relational-databases/indexes/create-filtered-indexes?view=sql-server-2017)! Самое главное, что нужно знать - фильтрованные индексы улучшают производительность, качество плана выполнения, расходы на обслуживание и хранение. Очень жаль, что платформа 1С не использует такие возможности СУБД.

Проверим новый индекс запросом.

```bsl
ВЫБРАТЬ
	ФизическиеЛица.Ссылка КАК Ссылка
ИЗ
	Справочник.ФизическиеЛица КАК ФизическиеЛица
ГДЕ
	ФизическиеЛица.ПометкаУдаления
	И ФизическиеЛица.ДатаСоздания МЕЖДУ &НачалоПериода И &КонецПериода
```

И вот план запроса.

```text
Nested Loops(Inner Join, OUTER REFERENCES:([Expr1007], [Expr1008], [Expr1009]))
  |--Merge Interval
  |    |--Concatenation
  |         |--Compute Scalar(DEFINE:(([Expr1002],[Expr1003],[Expr1001])
  |         |               =GetRangeWithMismatchedTypes([@P2],NULL,(22))))
  |              |--Constant Scan
  |         |--Compute Scalar(DEFINE:(([Expr1005],[Expr1006],[Expr1004])
  |         |               =GetRangeWithMismatchedTypes(NULL,[@P3],(42))))
  |              |--Constant Scan
  |--Index Seek(OBJECT:([DB].[dbo].[_Reference477].[_ByDeletionMarkAndCreationDate] AS [T1]), 
  |  SEEK:([T1].[_Marked]=0x01 AND [T1].[_Fld115447] > [Expr1007] AND [T1].[_Fld115447] < [Expr1008]),  
  |  WHERE:([DB].[dbo].[_Reference477].[_Fld1551] as [T1].[_Fld1551]=[@P1]) ORDERED FORWARD)  
```

То что надо! Подробно, как в прошлый раз, описывать план запроса не будем, но вот что стоит заметить: единственная значимая операция здесь - это "Index Seek", которая как-раз и использует наш новый индекс "_ByDeletionMarkAndCreationDate". Никаких обращений к основной таблице / кластерному индексу не выполнялось, то есть индекс полностью удовлетворяет условиям и полям выборки запроса, является покрывающим.

Итог:
- Время выполнения 7 миллисекунд
- Количество логических чтений = 459
- Время затраченное CPU 16 миллисекунд
- План запроса простейший, самая значимая часть - это поиск по индексу "_ByDeletionMarkAndCreationDate"
- Количество прочитанных строк - 3 (столько помеченных на удаление элементов за указанный период)

Для интереса создадим такой же индекс, но без фильтра по пометке удаления. Т.к. пример слишком простой, то разницы в результатах выполнения запроса мы не увидим, но размеры индексов будут разительно отличаться: 
- фильтрованный индекс занимает 1 страницу и включает в себя 3 строки конечного уровня.
- полный индекс занимает 10319 страниц и содержит 2451400 строк конечного уровня.

А если не видно разницы, то зачем платить больше? :)

Таким же способом можно добавлять индексы для любых полей с типом "Булево" и это всегда будет эффективнее, чем добавлять индексы платформенными средствами.

### Можно ли сделать покрывающий индекс

Конечно, и мы это уже сделали в двух предыдущих примерах, где созданные некластерные индексы полностью удовлетворяли условиям и выбираемым полям в запросе.

Покрывающий индекс - это такой индекс, который полностью удовлетворяет условиям запроса. В таких случаях в планах запроса будут отсутствовать операции типа Key Lookup, "добирающие" необходимые поля из таблицы или кластерного индекса (если у таблицы нет кластерного индекса, то операция называется RID Lookup).

Можно лишь добавить, что злоупотреблять покрывающими индексами не стоит и нужно хорошо подумать, прежде чем их создавать. Но это относится вообще ко всем индексам, подходите к ним с умом. Покрывающие индексы могут создаваться либо включением необходимых полей непосредственно в индексируемые поля, либо в покрывающие поля (INCLUDE). Например, можно создать индекс по ФИО + ДатеРождения, но дополнить его полями "Наименование" и "Код". О преимуществах индекса с включенными полями [можно ознакомиться здесь](https://docs.microsoft.com/ru-ru/sql/relational-databases/indexes/create-indexes-with-included-columns?view=sql-server-2017), но главное - это возможность значительно повысить производительность за счет включения в индекс всех необходимых для запроса полей без учета ограничения длины ключа и типов данных.

```sql
CREATE UNIQUE NONCLUSTERED INDEX [_IncludeIndex] ON [dbo].[_Reference477]
(
	[_Fld105061] ASC, -- Фамилия
	[_Fld105062] ASC, -- Имя
	[_Fld105063] ASC, -- Отчество
	[_Fld11066] ASC,  -- Дата рождения
	[_IDRRef] ASC     -- Ссылка
)
INCLUDE ( 	
	-- Включенные столбцы
	[_Code],		-- Код
	[_Description]  -- Наименование
)
```

Теперь, если выполнить запрос из предыдущего примера, но с выбором полей "Наименование" и "Код", то новый индекс позволит выполнить его максимально эффективно.

```bsl
ВЫБРАТЬ
	ФизическиеЛица.Ссылка КАК Ссылка,
	ФизическиеЛица.Наименование,
	ФизическиеЛица.Код
ИЗ
	Справочник.ФизическиеЛица КАК ФизическиеЛица
ГДЕ
	ФизическиеЛица.Фамилия = &Фамилия
	И ФизическиеЛица.Имя = &Имя
	И ФизическиеЛица.Отчество = &Отчество
	И ФизическиеЛица.ДатаРождения = &ДатаРождения
```

А теперь представьте какие возможности бы у нас были, если бы такие индексы можно было настраивать через метаданные конфигурации.

### Как добавить индексы в служебные таблицы

Рассмотрим еще один пример, когда неплатформенные индексы являются единственным эффективным решением. Оговорюсь - можно будет не создавать в этом случае индекс, а делать костыли в виде дополнительных объектов метаданных, которые обрастут различными обработчиками, проверками и т.д., но это явно не лучший путь.

Итак, у нас есть регистр бухгалтерии "Хозрасчетный". Думаю, что все с ним знакомы. В конфигурации есть запросы к физической таблице регистра нескольких видов.

```bsl
ВЫБРАТЬ
	Хозрасчетный.Регистратор,
	Хозрасчетный.НомерСтроки,
	Хозрасчетный.СчетКт,
	Хозрасчетный.Сумма
ИЗ
	РегистрБухгалтерии.Хозрасчетный КАК Хозрасчетный
ГДЕ
	Хозрасчетный.Активность = &Активность
	И Хозрасчетный.СчетДт = &СчетДт
	И Хозрасчетный.Период МЕЖДУ &НачалоПериода И &КонецПериода
```

А также вот такой запрос.

```bsl
ВЫБРАТЬ
	Хозрасчетный.Регистратор,
	Хозрасчетный.НомерСтроки,
	Хозрасчетный.СчетДт,
	Хозрасчетный.Сумма
ИЗ
	РегистрБухгалтерии.Хозрасчетный КАК Хозрасчетный
ГДЕ
	Хозрасчетный.Активность = &Активность
	И Хозрасчетный.СчетКт = &СчетКт
	И Хозрасчетный.Период МЕЖДУ &НачалоПериода И &КонецПериода
```

Индексов в основной таблице регистра бухгалтерии, которые бы удовлетворяли этим запросом, просто нет. Частично запросы покрываются индексом по счету ДТ и индексом по счету КТ, но с некоторыми оговорками:
1. Необходимо обязательно указать фильтр по организации, чтобы фильтр по периоду работал эффективно.
2. Платформенные индексы не учитывают флаг активности проводок, т.к. судя по всему изначально задумывалось, что большинство данных будет получаться из виртуальных таблиц (но это не точно :)
3. Нет ни одного покрывающего индекса, который бы полностью удовлетворял запросам в т.ч. и по выбираемым полям.

На индексы физической таблицы регистров бухгалтерии можно влиять в ограниченном режиме с помощью настроек метаданных. Но в любом случае, включать в индексы такие поля как "Активность", "СчетДТ", "СчетКТ" не получится. В этом случае можно создать два неплатформенных индекса.

```sql
-- Индекс для первого запроса
CREATE NONCLUSTERED INDEX [_CustomIndex1] ON [dbo].[_AccRg1595]
(
	[_Fld1551] ASC, -- Разделитель данных
	[_AccountDtRRef] ASC, -- Счет ДТ
	[_Period] ASC, -- Период
	[_Active] ASC -- Активность
)
INCLUDE ( 	[_RecorderTRef],
	[_RecorderRRef], -- Регистратор
	[_LineNo], -- Номер строки
	[_AccountCtRRef], -- Счет КТ
	[_Fld1599] -- Сумма
)

-- Индекс для второго запроса
CREATE NONCLUSTERED INDEX [_CustomIndex2] ON [dbo].[_AccRg1595]
(
	[_Fld1551] ASC, -- Разделитель данных
	[_AccountCtRRef] ASC, -- Счет ДТ
	[_Period] ASC, -- Период
	[_Active] ASC -- Активность
)
INCLUDE ( 	[_RecorderTRef],
	[_RecorderRRef], -- Регистратор
	[_LineNo], -- Номер строки
	[_AccountDtRRef], -- Счет КТ
	[_Fld1599] -- Сумма
)
```

Подробнее на этом примере останавливаться не будем, главное было показать, что таким подходом можно оптимизировать запросы к любым таблицам, в т.ч. и служебным, которые скрыты от разработчиков 1С: таблицы итогов, некоторые части физических таблиц и др.

Например, в одной из версий платформы были проблемы с таблицами итогов среза первых и среза последних для регистров сведений. Суть проблемы была в отсутствии кластерного индекса для этих таблиц, в результате чего запросы к ним выполнялись не самым оптимальным способом. Но с помощью "магии" неплатформенных индексов эту ситуацию можно было бы быстро исправить, а так пришлось бы ждать версии 8.3.13, в которой эта проблема была решена ([см. раздел "Оптимизации"](http://downloads.v8.1c.ru/content//Platform/8_3_13_1513/1cv8upd_8_3_13_1513.htm#199f74c5-0668-11e8-a3f7-0050569f678a)).

## А в чем подвох?

Самый главных подвох, подводный камень и просто неприятность - при реструктуризации базы данных средствами платформы 1С все те индексы, что Вы создадите скриптами самостоятельно - будут удалены. Вам потребуется заново запустить эти скрипты после реструктуризации.

Тут сразу стоит оговориться, что удалены они будут только у тех таблиц, которые непосредственно и подверглись реструктуризации. Но этот факт не особо успокаивает, ведь всегда есть вероятность того, что при развертывании пакета обновления для конфигурации разработчик / администратор забудет запустить этот скрипт и на следующий день программа будет работать не как ожидалось. Ну, если это было обновление от поставщика конфигурации, то конечно всегда можно выкрутиться, что это дело именно в обновлении и в следующем релизе все поправят :).

Не стоит забывать и про еще один подводный камень - это нарушение [лицензионного соглашения](http://v8.1c.ru/predpriyatie/questions_licence.htm#lrvs1cpp) фирмы "1С", а именно 65 пункта, в котором явно сказано, что использовать недокументированные возможности нельзя ни при каких обстоятельствах, даже если сильно хочется. Думайте сами - решайте сами.

На вопрос с лицензионным соглашением техническими средствами мы повлиять никак не сможем, но вот проблему сохранения и поддержки наших собственных индексов решить все таки можно. Как? Один из вариантов смотрите ниже.

## Идем своим путем

В далеком 2014 году [**на глаза попала статья**](https://www.brentozar.com/archive/2014/07/using-triggers-automatically-add-indexes/) от [Brent Ozar](https://github.com/BrentOzar) про костыльный подход создания индексов с помощью DDL-триггеров. Смысл его был в том, что при создании таблицы запускался наш произвольный скрипт, который бы и добавлял нужные индексы. Это действительно "особый" подход, только перейдите на эту страницу и посмотрите на изображение :)

Даже если и приходилось в то время создавать неплатформенные индексы, то заморачиваться с триггерами для их поддержки не приходилось. Достаточно было запускать нужные скрипты Job'ами в ночное время и проблема решалась.

Спустя пару лет встретился с еще одним материалом, на этот раз в центре сообщества разработчиков 1С - на [Инфостарте](https://infostart.ru/public/114634/). [Алексей Бочков](https://github.com/alekseybochkov) описывал подход по использованию сжатия таблиц и индексов средствами SQL Server, а в качестве инструмента сохранения сжатия при реструктуризации предлагал использовать тот же подход - через DDL-триггеры. Понял, что тема актуальна и используется многими. Особенно порадовал [комментарий от Михаила Максимова](http://forum.infostart.ru/forum86/topic51873/message1328825/#message1328825).

В той или иной степени несколько лет использовал DDL-триггеры для разных баз с целью упростить сопровождение индексов (создание новых и изменение платформенных), файловых групп, сжатия, сегментирования, логирования изменений БД и др. задач. Но когда различных произвольных скриптов стало слишком много, то частично решил задачу сопровождения следующим образом:
1. Создал служебную базу с настройками сжатия и произвольными правилами обработки событий создания таблиц и индексов в виде скриптов.
2. Добавил скрипты предоставления прав для служебных баз.
3. Создал глобальные триггеры обработки этих событий.
4. Для того, чтобы снизить риски ошибок скриптов в произвольных правилах, все неплатформенные индексы и другие произвольные действия выполняются после включения следующей настройки:

```sql
SET XACT_ABORT OFF;
```

Инструкция [XACT_ABORT](https://docs.microsoft.com/ru-ru/sql/t-sql/statements/set-xact-abort-transact-sql?view=sql-server-2017) указывает, выполняет ли SQL Server автоматический откат текущей транзакции, если инструкция языка Transact-SQL вызывает ошибку выполнения. В моем случае, если такая ошибка происходит, то реструктуризация продолжается в штатном режиме, а информация об ошибке записывается в таблицу логов для последующего разбора проблемы. Пример использования этой инструкции ниже.

```sql
CREATE TRIGGER [CustomSettingsMaintenance_OnTableCreate]
ON ALL SERVER 
AFTER CREATE_TABLE 
AS

BEGIN
	SET NOCOUNT ON;

	-- В случае возникновения ошибок продолжаем работу
	SET XACT_ABORT OFF;

	DECLARE @SchemaName SYSNAME,
		@TableName SYSNAME,
		@DatabaseName SYSNAME,
		@cmd nvarchar(max)

    	SELECT @TableName = EVENTDATA().value('(/EVENT_INSTANCE/ObjectName)[1]','SYSNAME')
		SELECT @SchemaName = EVENTDATA().value('(/EVENT_INSTANCE/SchemaName)[1]','SYSNAME')
		SELECT @DatabaseName = EVENTDATA().value('(/EVENT_INSTANCE/DatabaseName)[1]','SYSNAME');

	-- Здесь запускаем скрипт создания индекса 
	-- с учетом параметров @TableName, @SchemaName, @DatabaseName

	-- Возвращаем значение по умолчанию для ситуаций с ошибками в транзакции
  	SET XACT_ABORT ON;

END
```

Таким образом, удается поддерживать произвольные настройки баз данных платформы 1С, не нарушая работу штатных механизмов. Конечно, там не так радужно, но за несколько лет использования критических ошибок не было обнаружено, все живы и здоровы. Проблемы в основном возникают, если такими способами начинаем поддерживать файловые группы или сегментирование, там нужно учитывать некоторые нюансы.

Посмотреть примеры использования DDL-триггеров для поддержки индексов и других настроек [можно здесь](https://github.com/YPermitin/SQLServerTools/tree/master/1%D0%A1-Extended-Database-Settings-Maintenance). Если найдете проблему или будут вопросы - создавайте Issue, постараюсь ответить. По ссылке описание как создать служебную базу и триггеры, а также начать ее использование.

## Вместо заключения

Все, что написано выше, не является правильным подходом при разработке и поддержке баз данных. Но иногда просто нет выхода и приходится искать альтернативные пути решения проблем производительности и стабильности. То, что в мире больших баз считается нормой, для баз 1С применять очень сложно. Вспомните хотя бы сегментирование или простое использование файловых групп. Для 1С - это боль.

Цель всего этого донести, что имеется огромный потенциал для улучшения производительности и обслуживания баз данных 1С, но чтобы его использовать сейчас требуется некоторая хитрость и смекалка. Я очень надеюсь, что в одной из версий платформы 1С появится возможность использовать больше настроек баз данных для индексов, сегментирования, файловых групп и т.д., и в один прекрасный момент такие костыли станут уже больше не нужны.

>P.S. Повторю еще раз - ни в коем случае не делайте все то, что Вы здесь прочитали! Это плохие практики разработки, ни к чему хорошему они не приведут!

>P.P.S. Но если Вы все же решились, то желаю Вам удачи!