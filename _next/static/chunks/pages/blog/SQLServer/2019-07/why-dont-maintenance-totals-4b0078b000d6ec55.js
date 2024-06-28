(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[475],{6311:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/SQLServer/2019-07/why-dont-maintenance-totals",function(){return s(5588)}])},5588:function(e,n,s){"use strict";s.r(n);var l=s(5893),c=s(9305);s(7294);var i=s(1639),r=s(8754),x=s(5632),d=s(3906),j=s(6789),h=s(1652),X=s(6671),t=s(7105);n.default=()=>(0,l.jsxs)(c.Xg,{blogcentered:!0,children:[(0,l.jsx)(c.xv,{title:!0,className:"mt-10 md:text",children:"И снова об итогах"}),(0,l.jsx)(c.xv,{p:!0,children:"Вы сотрудник франчайзи “1С”? Может быть, Вы даже обновляете клиентов и следите за работоспособностью их информационных баз? Или Вы работаете в штате компании и работоспособность систем на базе платформы “1С” лежит на Ваших плечах? Если ответа “ДА” хотя бы на один вопрос, то эта статья для Вас!"}),(0,l.jsx)(c.xv,{p:!0,children:"Сегодня мы рассмотрим, с одной стороны, очень простой вопрос обслуживания итогов в регистрах. Но с другой стороны - вопрос простой, но настраивать подобающее обслуживание итогов часто никто не торопится."}),(0,l.jsx)(c.xv,{p:!0,children:"Не могу точно сказать для кого эта статья - для новичков или опытных программистов. Или администраторов? Думаю, что решать только Вам!"}),(0,l.jsx)(c.xv,{title:!0,className:"mt-10 md:text",children:"Как они работают"}),(0,l.jsx)(c.xv,{p:!0,children:"Платформа “1С” использует механизм итогов для оптимизации получения данных в запросах за большой период. Механизм итогов доступен в регистрах накопления, бухгалтерии и сведений. Именно благодаря ему мы можем формировать отчеты достаточно быстро за большой период времени. Не всегда, конечно, но это уже другая история :)."}),(0,l.jsx)(c.xv,{p:!0,children:"Но, прежде чем говорить об обслуживании итогов, давайте поверхностно рассмотрим их работу для каждого вида регистра. Мы не будем погружаться в особенности их работы на стороне СУБД, аспекты блокировок и другие связанные темы. Только принцип работы, только суть!"}),(0,l.jsx)(c.xv,{title:!0,className:"mt-10 md:text",children:"Регистры сведений"}),(0,l.jsx)(c.xv,{p:!0,children:"Начнем с простого - итогов регистров сведений. С некоторого момента, платформа поддерживает итоги среза первых / последних записей. Например, в последних типовых конфигурациях для регистра “Курсы валют” включены итоги среза последних. Под спойлером Вы найдете пример как данные в регистре отражаются на итогах этого регистра."}),(0,l.jsx)(c.xv,{p:!0,children:"Вот такие данные содержатся в самом регистре."}),(0,l.jsxs)(i.b,{"aria-label":"Данные регистра",children:[(0,l.jsxs)(r.J,{children:[(0,l.jsx)(x.j,{children:"Дата курса"},"c1"),(0,l.jsx)(x.j,{children:"Валюта"},"c2"),(0,l.jsx)(x.j,{children:"Курс"},"c3"),(0,l.jsx)(x.j,{children:"Кратность"},"c4")]}),(0,l.jsxs)(d.y,{children:[(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"12.06.2019"}),(0,l.jsx)(h.X,{children:"USD"}),(0,l.jsx)(h.X,{children:"64,516"}),(0,l.jsx)(h.X,{children:"1"})]},"1"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"12.06.2019"}),(0,l.jsx)(h.X,{children:"EUR"}),(0,l.jsx)(h.X,{children:"73,045"}),(0,l.jsx)(h.X,{children:"1"})]},"2"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"13.06.2019"}),(0,l.jsx)(h.X,{children:"USD"}),(0,l.jsx)(h.X,{children:"64,516"}),(0,l.jsx)(h.X,{children:"1"})]},"3"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"13.06.2019"}),(0,l.jsx)(h.X,{children:"EUR"}),(0,l.jsx)(h.X,{children:"73,045"}),(0,l.jsx)(h.X,{children:"1"})]},"4"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"14.06.2019"}),(0,l.jsx)(h.X,{children:"USD"}),(0,l.jsx)(h.X,{children:"64,631"}),(0,l.jsx)(h.X,{children:"1"})]},"5"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"14.06.2019"}),(0,l.jsx)(h.X,{children:"EUR"}),(0,l.jsx)(h.X,{children:"73,014"}),(0,l.jsx)(h.X,{children:"1"})]},"6"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"15.06.2019"}),(0,l.jsx)(h.X,{children:"USD"}),(0,l.jsx)(h.X,{children:"64,433"}),(0,l.jsx)(h.X,{children:"1"})]},"7"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"15.06.2019"}),(0,l.jsx)(h.X,{children:"EUR"}),(0,l.jsx)(h.X,{children:"72,699"}),(0,l.jsx)(h.X,{children:"1"})]},"8")]})]}),(0,l.jsx)(c.xv,{p:!0,children:"И вот такие данные будет содержать таблица итогов."}),(0,l.jsxs)(i.b,{"aria-label":"Данные итогов",children:[(0,l.jsxs)(r.J,{children:[(0,l.jsx)(x.j,{children:"Дата курса"},"c1"),(0,l.jsx)(x.j,{children:"Валюта"},"c2"),(0,l.jsx)(x.j,{children:"Курс"},"c3"),(0,l.jsx)(x.j,{children:"Кратность"},"c4")]}),(0,l.jsxs)(d.y,{children:[(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"15.06.2019"}),(0,l.jsx)(h.X,{children:"USD"}),(0,l.jsx)(h.X,{children:"64,433"}),(0,l.jsx)(h.X,{children:"1"})]},"1"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"15.06.2019"}),(0,l.jsx)(h.X,{children:"EUR"}),(0,l.jsx)(h.X,{children:"72,699"}),(0,l.jsx)(h.X,{children:"1"})]},"2")]})]}),(0,l.jsx)(c.xv,{p:!0,children:"Все просто - в итогах хранятся последние записи по периоду в разрезе измерений. Для регистра сведений “Курсы валют” это “Валюта”."}),(0,l.jsx)(c.xv,{p:!0,children:"Все логично - срез последних записей хранит последние по периоду записи в разрезе измерений регистра. При этом в итогах хранятся данные как измерений, так и ресурсов, и реквизитов."}),(0,l.jsx)(c.xv,{p:!0,children:"По такому же принципу работают итоги среза первых, только хранят они, внезапно, срез первых записей."}),(0,l.jsx)(c.xv,{title:!0,className:"mt-10 md:text",children:"Регистры накопления"}),(0,l.jsx)(c.xv,{p:!0,children:"Итоги регистров накопления уже интересней, чем у регистров сведений. О внутренних механизмах платформы и принципа работы с итогами Вы можете узнать на сайте ИТС. А сейчас рассмотрим лишь основное. Во-первых, регистры накопления бывают двух видов: оборотов и остатков. От вида регистра также зависит принцип построения и использования итогов."}),(0,l.jsx)(c.xv,{subtitle:!0,className:"mt-10 md:text",children:"Регистр оборотов"}),(0,l.jsx)(c.xv,{p:!0,children:"Для примера возьмем регистр накопления “Реализация услуг” из типовой конфигурации “Бухгалтерия предприятия 3.0”. Под спойлером пример данных в регистре и полученные итоги."}),(0,l.jsx)(c.xv,{p:!0,children:"Это пример данных."}),(0,l.jsxs)(i.b,{"aria-label":"Данные регистра",children:[(0,l.jsxs)(r.J,{children:[(0,l.jsx)(x.j,{children:"Период"},"c1"),(0,l.jsx)(x.j,{children:"Регистратор"},"c2"),(0,l.jsx)(x.j,{children:"Организация"},"c3"),(0,l.jsx)(x.j,{children:"Счет расходов"},"c4"),(0,l.jsx)(x.j,{children:"Номенклатурная группа"},"c5"),(0,l.jsx)(x.j,{children:"Подразделение"},"c6"),(0,l.jsx)(x.j,{children:"Сумма"},"c7")]}),(0,l.jsxs)(d.y,{children:[(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"14.03.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"Оказание услуг 1 от 14.03.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"90.02.1"}),(0,l.jsx)(h.X,{children:"Всякая всячина"}),(0,l.jsx)(h.X,{children:"Москва"}),(0,l.jsx)(h.X,{children:"2000"})]},"1"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"29.03.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"Оказание услуг 2 от 29.03.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"90.02.1"}),(0,l.jsx)(h.X,{children:"Всякая всячина"}),(0,l.jsx)(h.X,{children:"Москва"}),(0,l.jsx)(h.X,{children:"1000"})]},"2"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"17.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"Оказание услуг 3 от 17.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"90.02.1"}),(0,l.jsx)(h.X,{children:"Всякая всячина"}),(0,l.jsx)(h.X,{children:"Москва"}),(0,l.jsx)(h.X,{children:"500"})]},"3"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"19.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"Оказание услуг 4 от 19.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"90.02.1"}),(0,l.jsx)(h.X,{children:"Всякая всячина"}),(0,l.jsx)(h.X,{children:"Москва"}),(0,l.jsx)(h.X,{children:"600"})]},"4"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"30.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"Оказание услуг 5 от 30.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"90.02.1"}),(0,l.jsx)(h.X,{children:"Всякая всячина"}),(0,l.jsx)(h.X,{children:"Москва"}),(0,l.jsx)(h.X,{children:"5000"})]},"5"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"31.05.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"Оказание услуг 6 от 31.05.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"90.02.1"}),(0,l.jsx)(h.X,{children:"Всякая всячина"}),(0,l.jsx)(h.X,{children:"Москва"}),(0,l.jsx)(h.X,{children:"1000"})]},"6")]})]}),(0,l.jsx)(c.xv,{p:!0,children:"Движения регистра сформированы в период с марта по май 2019 года. Итоги в этом случае содержат сгруппированные данные по измерениям."}),(0,l.jsxs)(i.b,{"aria-label":"Данные итогов",children:[(0,l.jsxs)(r.J,{children:[(0,l.jsx)(x.j,{children:"Период"},"c1"),(0,l.jsx)(x.j,{children:"Организация"},"c3"),(0,l.jsx)(x.j,{children:"Счет расходов"},"c4"),(0,l.jsx)(x.j,{children:"Номенклатурная группа"},"c5"),(0,l.jsx)(x.j,{children:"Подразделение"},"c6"),(0,l.jsx)(x.j,{children:"Сумма"},"c7")]}),(0,l.jsxs)(d.y,{children:[(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"01.03.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"90.02.1"}),(0,l.jsx)(h.X,{children:"Всякая всячина"}),(0,l.jsx)(h.X,{children:"Москва"}),(0,l.jsx)(h.X,{children:"3000"})]},"1"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"01.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"90.02.1"}),(0,l.jsx)(h.X,{children:"Всякая всячина"}),(0,l.jsx)(h.X,{children:"Москва"}),(0,l.jsx)(h.X,{children:"1100"})]},"2"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"01.05.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"90.02.1"}),(0,l.jsx)(h.X,{children:"Всякая всячина"}),(0,l.jsx)(h.X,{children:"Москва"}),(0,l.jsx)(h.X,{children:"6000"})]},"3")]})]}),(0,l.jsx)(c.xv,{p:!0,children:"Итоги содержат сгруппированные данные по месяцам, а период записи - начало месяца."}),(0,l.jsx)(c.xv,{p:!0,children:"Таким образом, итоги оборотного регистра накопления содержат сгруппированные данные по измерениям на каждый месяц. Позволяют получать данные за период наиболее оптимальным способом, ведь записей читать придется меньше, иногда значительно меньше."}),(0,l.jsx)(c.xv,{subtitle:!0,className:"mt-10 md:text",children:"Регистр остатков"}),(0,l.jsx)(c.xv,{p:!0,children:"В качестве примера остаточного регистра возьмем “НДС предъявленный”. Пример снова под спойлером."}),(0,l.jsxs)(c.xv,{p:!0,children:["Вот пример данных регистра “НДС предъявленный”. Некоторые поля убраны (пустые, служебные, реквизиты регистра). Правильность данных с прикладной точки зрения не гарантируется ",":)","."]}),(0,l.jsxs)(i.b,{"aria-label":"Данные регистра",children:[(0,l.jsxs)(r.J,{children:[(0,l.jsx)(x.j,{children:"Вид операции"},"c1"),(0,l.jsx)(x.j,{children:"Период"},"c2"),(0,l.jsx)(x.j,{children:"Регистратор"},"c3"),(0,l.jsx)(x.j,{children:"Организация"},"c4"),(0,l.jsx)(x.j,{children:"Счет-фактура"},"c5"),(0,l.jsx)(x.j,{children:"Ставка НДС"},"c6"),(0,l.jsx)(x.j,{children:"Поставщик"},"c7"),(0,l.jsx)(x.j,{children:"Сумма без НДС"},"c8"),(0,l.jsx)(x.j,{children:"НДС"},"c9")]}),(0,l.jsxs)(d.y,{children:[(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"Приход"}),(0,l.jsx)(h.X,{children:"10.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"Поступление (акт, накладная) 1 от 10.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"Поступление (акт, накладная) 1 от 10.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"20%"}),(0,l.jsx)(h.X,{children:"ООО “Все есть”"}),(0,l.jsx)(h.X,{children:"3000"}),(0,l.jsx)(h.X,{children:"600"})]},"1"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"Приход"}),(0,l.jsx)(h.X,{children:"15.05.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"Поступление (акт, накладная) 2 от 15.05.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"Поступление (акт, накладная) 2 от 15.05.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"10%"}),(0,l.jsx)(h.X,{children:"ООО “Все есть”"}),(0,l.jsx)(h.X,{children:"5000"}),(0,l.jsx)(h.X,{children:"1000"})]},"2"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"Расход"}),(0,l.jsx)(h.X,{children:"20.06.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"Счет-фактура полученный 1 от 20.06.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"Поступление (акт, накладная) 1 от 10.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"20%"}),(0,l.jsx)(h.X,{children:"ООО “Все есть”"}),(0,l.jsx)(h.X,{children:"3000"}),(0,l.jsx)(h.X,{children:"600"})]},"3"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"Расход"}),(0,l.jsx)(h.X,{children:"23.06.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"Счет-фактура полученный 2 от 20.06.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"Поступление (акт, накладная) 2 от 15.05.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"10%"}),(0,l.jsx)(h.X,{children:"ООО “Все есть”"}),(0,l.jsx)(h.X,{children:"2500"}),(0,l.jsx)(h.X,{children:"500"})]},"4")]})]}),(0,l.jsx)(c.xv,{p:!0,children:"Движения сформированы с апреля по июнь 2019 года. Соответственно, итоги в этом случае будут хранить остатки на конец каждого месяца по комбинациям измерений. При этом итоги за май будут записаны на начало дня 1 июня."}),(0,l.jsxs)(i.b,{"aria-label":"Данные регистра",children:[(0,l.jsxs)(r.J,{children:[(0,l.jsx)(x.j,{children:"Период"},"c1"),(0,l.jsx)(x.j,{children:"Организация"},"c2"),(0,l.jsx)(x.j,{children:"Счет-фактура"},"c3"),(0,l.jsx)(x.j,{children:"Ставка НДС"},"c4"),(0,l.jsx)(x.j,{children:"Поставщик"},"c5"),(0,l.jsx)(x.j,{children:"Сумма без НДС"},"c6"),(0,l.jsx)(x.j,{children:"НДС"},"c7")]}),(0,l.jsxs)(d.y,{children:[(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"01.05.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"Поступление (акт, накладная) 1 от 10.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"20%"}),(0,l.jsx)(h.X,{children:"ООО “Все есть”"}),(0,l.jsx)(h.X,{children:"3000"}),(0,l.jsx)(h.X,{children:"600"})]},"1"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"01.06.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"Поступление (акт, накладная) 1 от 10.04.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"20%"}),(0,l.jsx)(h.X,{children:"ООО “Все есть”"}),(0,l.jsx)(h.X,{children:"3000"}),(0,l.jsx)(h.X,{children:"600"})]},"2"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"01.06.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"Поступление (акт, накладная) 2 от 15.05.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"10%"}),(0,l.jsx)(h.X,{children:"ООО “Все есть”"}),(0,l.jsx)(h.X,{children:"5000"}),(0,l.jsx)(h.X,{children:"1000"})]},"3"),(0,l.jsxs)(j.g,{children:[(0,l.jsx)(h.X,{children:"01.07.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"ООО “Копыта и Рога”"}),(0,l.jsx)(h.X,{children:"Поступление (акт, накладная) 2 от 15.05.2019 00:00:00"}),(0,l.jsx)(h.X,{children:"10%"}),(0,l.jsx)(h.X,{children:"ООО “Все есть”"}),(0,l.jsx)(h.X,{children:"2500"}),(0,l.jsx)(h.X,{children:"500"})]},"4")]})]}),(0,l.jsx)(c.xv,{p:!0,children:"В этом случае, на самом деле, тоже все просто:"}),(0,l.jsxs)(c.aV,{type:t.RH.number,children:[(0,l.jsx)("li",{children:"На начало мая имеем остаток от операции прихода в апреле."}),(0,l.jsx)("li",{children:"На начало июня сохраняется остаток с апрельской операции, а также добавляется строка с остатком от операции в мае. Именно поэтому в июньских остатках две записи."}),(0,l.jsx)("li",{children:"В июне был сделан расход, которых закрыл остаток по первой операции, а также расход с частичным закрытием второй операции. Поэтому в итогах добавлена запись по оставшейся сумме."})]}),(0,l.jsx)(c.xv,{p:!0,children:"Кроме того, есть текущие итоги, которые сохраняют информацию об остатках на самую последнюю дату. В таблице итогов они хранятся с датой “01.11.3999” и позволяют получить информацию об остатках на самый последний момент времени, который может быть зафиксирован в регистре."}),(0,l.jsx)(c.xv,{p:!0,children:"Таким образом, итоги по остаткам хранятся на начало месяца и отражают их состояние за предыдущий период. Очень удобно и эффективно."}),(0,l.jsx)(c.xv,{p:!0,children:"Итоги по остаткам используются очень часто и позволяют эффективно получать информацию о текущем состоянии каких-либо показателей (остатки номенклатуры, состояние взаиморасчетов и другое)."}),(0,l.jsx)(c.xv,{subtitle:!0,className:"mt-10 md:text",children:"Регистры бухгалтерии"}),(0,l.jsx)(c.xv,{p:!0,children:"Не менее интересным объектом с поддержкой хранения итогов является регистр бухгалтерии. Это настоящий рекордсмен по количеству таблиц с итогами. Возьмем для рассмотрения типовой регистр “Хозрасчетный” в той же “Бухгалтерии предприятия 3.0”. Всего в регистре можно насчитать 5 таблиц с итогами:"}),(0,l.jsx)(c.xv,{p:!0,children:"Итоги между счетами - для хранения итогов оборотов между корреспондирующими счетами"}),(0,l.jsxs)(c.aV,{children:[(0,l.jsx)("li",{children:"Итоги по счетам - для хранения итогов по счету в целом"}),(0,l.jsx)("li",{children:"Итоги по счетам с субконто 1 - итоги по счетам с 1 субконто"}),(0,l.jsx)("li",{children:"Итоги по счетам с субконто 2 - итоги по счетам с 2 субконто"}),(0,l.jsx)("li",{children:"Итоги по счетам с субконто 3 - итоги по счетам с 3 субконто"})]}),(0,l.jsx)(c.xv,{p:!0,children:"Чтобы не углубляться сейчас во внутренние механизмы регистра, отметим лишь, что в таблице итогов между счетами хранятся итоги только по оборотам. В остальных таблицах итогов хранятся итоги и по оборотам, и по остаткам. Также регистр бухгалтерии поддерживает текущие итоги, которые работают практически также, как и в регистре накопления."}),(0,l.jsx)(c.xv,{p:!0,children:"Теперь Вы знаете на сколько большим по размеру и тяжелым по использованию может быть регистр бухгалтерии. Ведь при формировании проводок платформе требуется поддерживать большое количество таблиц с итогами. А представьте что бы было, если план счетов поддерживал не три, а пять субконто!"}),(0,l.jsx)(c.xv,{title:!0,className:"mt-10 md:text",children:"Что же с обслуживанием"}),(0,l.jsx)(c.xv,{p:!0,children:"И так, мы быстрым шагом прошлись по механизму хранения итогов платформы, рассмотрели какие итоги бывают и у каких объектов. Что же здесь может такое случиться, что потребует обслуживания?"}),(0,l.jsx)(c.xv,{p:!0,children:"Самым “самообслуживаемым” объектом в части итогов является регистр сведений. Включили итоги по срезу последних и забыли. Ничего настраивать и обслуживать не нужно."}),(0,l.jsx)(c.xv,{p:!0,children:"С регистром накопления и бухгалтерии дело обстоит иначе. Для остаточных регистров накопления и любого регистра бухгалтерии обязательно в начале каждого месяца необходимо устанавливать период рассчитанных итогов. Если этого не сделать, то итоги по остаткам просто не будут рассчитаны. Соответственно, и использоваться они не будут."}),(0,l.jsx)(c.xv,{p:!0,children:"Во всех типовых конфигурациях имеется регламентное задание “Установка периода рассчитанных итогов” с расписанием на запуск каждое 5 число месяца в 01:00. Вот алгоритм обновления периода рассчитанных итогов."}),(0,l.jsx)(c.xv,{p:!0,children:"Эта функция получена из модулей “Библиотеки стандартных подсистем” и находится в общем модуле “УправлениеИтогамиИАгрегатамиСлужебный”."}),(0,l.jsx)(X.Z,{code:"\n// Рассчитывает итоги всех регистров бухгалтерии и накопления, у которых они включены.\nПроцедура РассчитатьИтоги() Экспорт\n	\n	ДатаСеанса = ТекущаяДатаСеанса();\n	РегистрНакопленияПериод  = КонецМесяца(ДобавитьМесяц(ДатаСеанса, -1)); // Конец прошлого месяца.\n	РегистрБухгалтерииПериод = КонецМесяца(ДатаСеанса); // Конец текущего месяца.\n	\n	Кэш = КэшПроверкиРазделения();\n	\n	// Расчет итогов для регистров накопления.\n	ВидОстатки = Метаданные.СвойстваОбъектов.ВидРегистраНакопления.Остатки;\n	Для Каждого РегистрМетаданные Из Метаданные.РегистрыНакопления Цикл\n		Если РегистрМетаданные.ВидРегистра <> ВидОстатки Тогда\n			Продолжить;\n		КонецЕсли;\n		Если Не ОбъектМетаданныхДоступенПоРазделению(Кэш, РегистрМетаданные) Тогда\n			Продолжить;\n		КонецЕсли;\n		РегистрНакопленияМенеджер = РегистрыНакопления[РегистрМетаданные.Имя];\n		Если РегистрНакопленияМенеджер.ПолучитьМаксимальныйПериодРассчитанныхИтогов() >= РегистрНакопленияПериод Тогда\n			Продолжить;\n		КонецЕсли;\n		РегистрНакопленияМенеджер.УстановитьМаксимальныйПериодРассчитанныхИтогов(РегистрНакопленияПериод);\n		Если Не РегистрНакопленияМенеджер.ПолучитьИспользованиеИтогов()\n			Или Не РегистрНакопленияМенеджер.ПолучитьИспользованиеТекущихИтогов() Тогда\n			Продолжить;\n		КонецЕсли;\n		РегистрНакопленияМенеджер.ПересчитатьТекущиеИтоги();\n	КонецЦикла;\n	\n	// Расчет итогов для регистров бухгалтерии.\n	Для Каждого РегистрМетаданные Из Метаданные.РегистрыБухгалтерии Цикл\n		Если Не ОбъектМетаданныхДоступенПоРазделению(Кэш, РегистрМетаданные) Тогда\n			Продолжить;\n		КонецЕсли;\n		РегистрБухгалтерииМенеджер = РегистрыБухгалтерии[РегистрМетаданные.Имя];\n		Если РегистрБухгалтерииМенеджер.ПолучитьМаксимальныйПериодРассчитанныхИтогов() >= РегистрБухгалтерииПериод Тогда\n			Продолжить;\n		КонецЕсли;\n		РегистрБухгалтерииМенеджер.УстановитьМаксимальныйПериодРассчитанныхИтогов(РегистрБухгалтерииПериод);\n		Если Не РегистрБухгалтерииМенеджер.ПолучитьИспользованиеИтогов()\n			Или Не РегистрБухгалтерииМенеджер.ПолучитьИспользованиеТекущихИтогов() Тогда\n			Продолжить;\n		КонецЕсли;\n		РегистрБухгалтерииМенеджер.ПересчитатьТекущиеИтоги();\n	КонецЦикла;\n	\n	// Регистрация даты.\n	Если РежимРаботыЛокальныйФайловый() Тогда\n		ПараметрыИтогов = ПараметрыИтоговИАгрегатов();\n		ПараметрыИтогов.ДатаРасчетаИтогов = НачалоМесяца(ДатаСеанса);\n		ЗаписатьПараметрыИтоговИАгрегатов(ПараметрыИтогов);\n	КонецЕсли;\nКонецПроцедуры\n                ",className:"my-5",language:"bsl"}),(0,l.jsx)(c.xv,{p:!0,children:"Установка периода рассчитанных итогов выполняется только для остаточных регистров накопления и регистров бухгалтерии. Для этого вызывается метод “УстановитьМаксимальныйПериодРассчитанныхИтогов” для менеджера регистра. Для регистров накопления передается конец предыдущего месяца, а для регистров бухгалтерии конец текущего месяца."}),(0,l.jsx)(c.xv,{p:!0,children:"Как проверить, что у Вас установлен актуальный период рассчитанных итогов? Самый простой способ - зайти в обработку “Управление итогами” через “Все функции ➡️ Стандартные ➡️ Управление итогами”. Там выбрать полные возможности и в показанной таблице проверить дату в колонке “Период итогов”."}),(0,l.jsx)(c.Ee,{className:"my-4",src:"/public/imp_assets/SQLServer/2019-07/why-dont-maintenance-totals/1. Инструмент управления итогами.png",alt:"Инструмент управления итогами",size:t.h2.MEDIUM}),(0,l.jsx)(c.xv,{p:!0,children:"Для регистров бухгалтерии это должен быть конец текущего месяца, а для остаточных регистров накопления - конец предыдущего месяца. Если даты обновлены, то все отлично. Если нет - значит либо еще не наступило 5 число месяца, либо регламентное задание по установке периода рассчитанных итогов у Вас не работает."}),(0,l.jsx)(c.xv,{p:!0,children:"Но и это еще не все! Есть еще как минимум две операции, которые необходимо планировать для итогов:"}),(0,l.jsxs)(c.aV,{children:[(0,l.jsxs)("li",{children:[(0,l.jsx)("b",{children:"Пересчет итогов"})," - помогает не только исправить “странные” возникающие ошибки в отчетах (хоть это и очень редко), но и исправить возможные проблемы с производительностью. Периодичность работ нужно выбирать по ситуации, но можно для начала запланировать их выполнение раз в квартал."]}),(0,l.jsxs)("li",{children:[(0,l.jsx)("b",{children:"Двигать минимальный период хранимых итогов."})," Здесь речь идет о настройке минимального периода хранимых итогов, который позволяет задать точный период “От” и “До”, за который итоги будут рассчитаны.",(0,l.jsx)(c.Ee,{className:"my-4",src:"/public/imp_assets/SQLServer/2019-07/why-dont-maintenance-totals/2. Установка периода итогов.png",alt:"Установка периода итогов",size:t.h2.MEDIUM})]})]}),(0,l.jsx)(c.xv,{p:!0,children:"Зачем их устанавливать? Если в базе хранятся данные за 10 лет, то вряд ли они все используются. Целесообразно проанализировать какие данные действительно используются и за какой период (например, только последние 5 лет) и ограничить период хранения итогов нужным значением. Данный подход похож на метод скользящего окна, который упрощает сопровождение больших объемов данных."}),(0,l.jsx)(c.xv,{p:!0,children:"Вот и все основные операции обслуживания."}),(0,l.jsx)(c.xv,{title:!0,className:"mt-10 md:text",children:"Заключение"}),(0,l.jsx)(c.xv,{p:!0,children:"Мы быстро пробежались по принципу работы механизма итогов платформы “1С” и рассмотрели основные направления работ по обслуживанию итогов. Список получился коротким:"}),(0,l.jsxs)(c.aV,{children:[(0,l.jsx)("li",{children:"Ежемесячное обновление периода рассчитанных итогов для регистра бухгалтерии и остаточных регистров накопления."}),(0,l.jsx)("li",{children:"Пересчет итогов для поддержки корректности данных и предотвращения проблем с производительностью."}),(0,l.jsx)("li",{children:"Актуализация периода хранения итогов, чтобы итоги хранились за действительно необходимый период времени."})]}),(0,l.jsx)(c.xv,{p:!0,children:"Мы не коснулись таких вопросов как:"}),(0,l.jsxs)(c.aV,{children:[(0,l.jsx)("li",{children:"Обслуживание индексов и статистик базы данных для таблиц итогов"}),(0,l.jsx)("li",{children:"Влияние этого механизма на производительность"}),(0,l.jsx)("li",{children:"Особые настройки таблиц итогов"}),(0,l.jsx)("li",{children:"И другое."})]}),(0,l.jsx)(c.xv,{p:!0,children:"Но цели такой и не ставилось."}),(0,l.jsx)(c.xv,{p:!0,children:"Проверьте свои итоги! Улучшите производительность отчетов!"})]})},9963:function(e,n,s){"use strict";var l,c;s.d(n,{b:function(){return l}}),(c=l||(l={})).Min="350px",c.Standard="700px",c.Large="1000x",c.Unlimited=""},6671:function(e,n,s){"use strict";var l=s(7340),c=s(5893),i=s(7294),r=s(4965),x=s(4275),d=s(964),j=s(9963);function h(){let e=(0,l._)(["\n        text-align: left;\n        overflow: hidden;\n        font-size: 14px;\n        border-radius: 6px;\n        overflow: auto;\n\n        & .token-line {\n            line-height: 1.3em;\n            height: 1.3em;\n        }\n    "]);return h=function(){return e},e}function X(){let e=(0,l._)(["\n        max-height: ","\n    "]);return X=function(){return e},e}n.Z=e=>{let{code:n,className:l,language:t,maxHeight:a=j.b.Standard}=e;(void 0!==s.g?s.g:window).Prism=r.p1,s(1354),s(9016),s(5266),s(2927),s(1315),s(7874),s(6862);let p=null!=a?a:j.b.Standard,v=d.ZP.pre(h()),m=(0,d.ZP)(v)(X(),p);return(0,c.jsx)("div",{className:(0,x.GF)("bg-blue-500 md:p-1 p-2",l),children:(0,c.jsx)("div",{className:"shadow-lg",children:(0,c.jsx)(r.y$,{theme:r.np.vsDark,code:n.trim(),language:null!=t?t:t="tsx",children:e=>{let{className:n,style:s,tokens:l,getLineProps:r,getTokenProps:x}=e;return(0,c.jsx)(m,{className:n,style:s,children:l.map((e,n)=>(0,i.createElement)("div",{...r({line:e,key:n}),key:Math.random()},e.map((e,n)=>(0,i.createElement)("span",{...x({token:e,key:n}),key:Math.random()}))))})}})})})}},9305:function(e,n,s){"use strict";s.d(n,{Ee:function(){return x},Xg:function(){return i},Y7:function(){return X},aV:function(){return j},e9:function(){return h},o_:function(){return t},ty:function(){return d},xv:function(){return r}});var l=s(5152),c=s.n(l);let i=c()(()=>Promise.all([s.e(4838),s.e(4738),s.e(1664),s.e(7167)]).then(s.bind(s,7167)),{loadableGenerated:{webpack:()=>[7167]}}),r=c()(()=>s.e(9179).then(s.bind(s,9179)),{loadableGenerated:{webpack:()=>[9179]}}),x=c()(()=>s.e(1974).then(s.bind(s,1974)),{loadableGenerated:{webpack:()=>[1974]}}),d=c()(()=>s.e(8547).then(s.bind(s,8547)),{loadableGenerated:{webpack:()=>[8547]}}),j=c()(()=>s.e(6806).then(s.bind(s,6806)),{loadableGenerated:{webpack:()=>[6806]}}),h=c()(()=>Promise.all([s.e(1664),s.e(1465)]).then(s.bind(s,1465)),{loadableGenerated:{webpack:()=>[1465]}});c()(()=>s.e(567).then(s.bind(s,567)),{loadableGenerated:{webpack:()=>[567]}});let X=c()(()=>Promise.all([s.e(2004),s.e(4139)]).then(s.bind(s,4139)),{loadableGenerated:{webpack:()=>[4139]}}),t=c()(()=>Promise.all([s.e(3811),s.e(7472),s.e(584),s.e(7870)]).then(s.bind(s,7870)),{loadableGenerated:{webpack:()=>[7870]}})}},function(e){e.O(0,[1102,3811,433,2888,9774,179],function(){return e(e.s=6311)}),_N_E=e.O()}]);