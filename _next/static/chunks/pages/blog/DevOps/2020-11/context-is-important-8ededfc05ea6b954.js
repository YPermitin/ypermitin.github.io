(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8008],{1522:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/DevOps/2020-11/context-is-important",function(){return s(108)}])},3841:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var s in t)Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}(t,{noSSR:function(){return n},default:function(){return c}});let l=s(260);s(5893),s(7294);let r=l._(s(8354));function i(e){return{default:(null==e?void 0:e.default)||e}}function n(e,t){return delete t.webpack,delete t.modules,e(t)}function c(e,t){let s=r.default,l={loading:e=>{let{error:t,isLoading:s,pastDelay:l}=e;return null}};e instanceof Promise?l.loader=()=>e:"function"==typeof e?l.loader=e:"object"==typeof e&&(l={...l,...e});let c=(l={...l,...t}).loader;return(l.loadableGenerated&&(l={...l,...l.loadableGenerated},delete l.loadableGenerated),"boolean"!=typeof l.ssr||l.ssr)?s({...l,loader:()=>null!=c?c().then(i):Promise.resolve(i(()=>null))}):(delete l.webpack,delete l.modules,n(s,l))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7309:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"LoadableContext",{enumerable:!0,get:function(){return l}});let l=s(260)._(s(7294)).default.createContext(null)},8354:function(e,t,s){"use strict";/**
@copyright (c) 2017-present James Kyle <me@thejameskyle.com>
 MIT License
 Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
*/Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return h}});let l=s(260)._(s(7294)),r=s(7309),i=[],n=[],c=!1;function d(e){let t=e(),s={loading:!0,loaded:null,error:null};return s.promise=t.then(e=>(s.loading=!1,s.loaded=e,e)).catch(e=>{throw s.loading=!1,s.error=e,e}),s}class a{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state={...this._state,error:this._res.error,loaded:this._res.loaded,loading:this._res.loading,...e},this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}}function x(e){return function(e,t){let s=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),i=null;function d(){if(!i){let t=new a(e,s);i={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return i.promise()}if(!c){let e=s.webpack?s.webpack():s.modules;e&&n.push(t=>{for(let s of e)if(t.includes(s))return d()})}function x(e,t){!function(){d();let e=l.default.useContext(r.LoadableContext);e&&Array.isArray(s.modules)&&s.modules.forEach(t=>{e(t)})}();let n=l.default.useSyncExternalStore(i.subscribe,i.getCurrentValue,i.getCurrentValue);return l.default.useImperativeHandle(t,()=>({retry:i.retry}),[]),l.default.useMemo(()=>{var t;return n.loading||n.error?l.default.createElement(s.loading,{isLoading:n.loading,pastDelay:n.pastDelay,timedOut:n.timedOut,error:n.error,retry:i.retry}):n.loaded?l.default.createElement((t=n.loaded)&&t.default?t.default:t,e):null},[e,n])}return x.preload=()=>d(),x.displayName="LoadableComponent",l.default.forwardRef(x)}(d,e)}function o(e,t){let s=[];for(;e.length;){let l=e.pop();s.push(l(t))}return Promise.all(s).then(()=>{if(e.length)return o(e,t)})}x.preloadAll=()=>new Promise((e,t)=>{o(i).then(e,t)}),x.preloadReady=e=>(void 0===e&&(e=[]),new Promise(t=>{let s=()=>(c=!0,t());o(n,e).then(s,s)})),window.__NEXT_PRELOADREADY=x.preloadReady;let h=x},108:function(e,t,s){"use strict";s.r(t);var l=s(5893),r=s(9305);s(7294);var i=s(7105);t.default=()=>(0,l.jsxs)(r.Xg,{blogcentered:!0,children:[(0,l.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Зачем мы здесь"}),(0,l.jsx)(r.xv,{p:!0,children:"Процессорные ресурсы и то, как работает с ними операционная система - тема на самом деле не простая. Бывают тривиальные ситуации, когда можно явно установить причины высокой нагрузки на CPU и их быстро исправить. С другой стороны, бывают и сложные случаи. Особенно, если в дело вмешивается виртуализация, проблемы оборудования или драйверов, ошибки в программном коде приложений или даже ядре системы."}),(0,l.jsx)(r.xv,{p:!0,children:"Нет, мы не будем рассматривать все возможные проблемы и способы их диагностики в одной публикации. Вместо этого мы начнем с простейшей истории проблем производительности с мощностями CPU. Заодно пройдем по всем доступным счетчикам производительности Windows, которые позволяют диагностировать работу процессорной подсистемы. Большая часть рассмотренных ниже показателей производительности актуальны и для *.nix-систем."}),(0,l.jsx)(r.xv,{p:!0,children:"И так, начнем с минимального объема теории."}),(0,l.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Не хочу читать"}),(0,l.jsx)(r.xv,{p:!0,children:"А читать придется, но не много. Рассмотрим основные показатели производительности, которые можно использовать для диагностики работы в части ЦП. Их не много, чуть больше десяти."}),(0,l.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"% загруженности процессора"}),(0,l.jsxs)(r.xv,{p:!0,children:["Счетчик ",(0,l.jsx)("b",{children:"”% загруженности процессора”"})," (\\Processor Information(_Total)\\% Processor Time) - всем известный показатель работы CPU, который можно увидеть в стандартном диспетчере задач."]}),(0,l.jsx)(r.xv,{p:!0,children:"Показывает процент времени, в котором ЦП выполняет инструкции, то есть выполняет какие-либо задачи. Включает себя % пользовательской нагрузки и % работы в привилегированном режиме."}),(0,l.jsx)(r.xv,{p:!0,children:"Вычисляется как 100% - % выполнения инструкций в потоке бездействия. Этот поток бездействия есть у каждого процессора и используется, когда нет другой нагрузки. Показатель является основным и демонстрирует средний % времени занятости CPU за определенное время."}),(0,l.jsx)(r.xv,{p:!0,children:"В некоторых случаях может показывать не совсем точные данные, т.к. процессор получает их по использованным ресурсам с определенным интервалом, равным тактам системных часов. В современны процессорах % может быть ниже реальных данных, т.к. CPU может затрачивать значительную часть времени на обработку потоков."}),(0,l.jsx)(r.xv,{p:!0,children:"В любом случае, это самый простой показатель для понимания общей нагрузки на CPU. Обычно с него и начинают анализ работы системы в части процессорных ресурсов."}),(0,l.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"% работы в пользовательском режиме"}),(0,l.jsxs)(r.xv,{p:!0,children:["Счетчик ",(0,l.jsx)("b",{children:"”% работы в пользовательском режиме”"})," (\\Processor Information(_Total)\\% User Time) - показатель % времени, которое процессор затрачивает на выполнение полезной нагрузки от Ваших приложений, служб и т.д. То есть то, для чего Вы его и купили сервер (или арендовали, если это облака)."]}),(0,l.jsx)(r.xv,{p:!0,children:"Входит в общий % загруженности процессора."}),(0,l.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"% работы в привилегированном режиме"}),(0,l.jsxs)(r.xv,{p:!0,children:["Счетчик ",(0,l.jsx)("b",{children:"”% работы в привилегированном режиме”"}),"  (\\Processor Information(_Total)\\% Privileged Time) - показатель % времени, которое процессор тратит на обработку запросов ядра, которые работают в привилегированном режиме."]}),(0,l.jsx)(r.xv,{p:!0,children:"Также входит в состав общего % загруженности процессора. В нормальной ситуации не превышает значения в 10%, в противном случае пора начать проводить диагностику. Значение под 20% и более - пора бить тревогу!"}),(0,l.jsxs)(r.xv,{p:!0,children:["Для более детального анализа нужно обращаться к таким счетчикам как ",(0,l.jsx)("b",{children:"”% времени прерываний”"}),", ",(0,l.jsx)("b",{children:"”% времени DPC”"}),", ",(0,l.jsx)("b",{children:"“Контекстных переключений/с”"})," и некоторым другим."]}),(0,l.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"% времени прерываний"}),(0,l.jsxs)(r.xv,{p:!0,children:["Счетчик ",(0,l.jsx)("b",{children:"”% времени прерываний”"})," (\\Processor Information(_Total)\\% Interrupt Time) - показатель % времени, которое процессор затрачивает на обработку прерываний от различных устройств. В этом режиме запускаются только подпрограммы, обслуживающие прерывания (фактически это функции драйверов устройство)."]}),(0,l.jsx)(r.xv,{p:!0,children:"Показатель позволяет неявно отслеживать активность работы устройств, которые эти прерывания создают (системный таймер, драйвера дисков, сетевых адаптеров и других периферийных устройств)."}),(0,l.jsx)(r.xv,{p:!0,children:"В идеальном мире значения этого показателя не должны превышать 5% или даже 1%. В других случаях можно говорить о потенциальных проблемах с “железом” или драйверами."}),(0,l.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"Процент времени бездействия"}),(0,l.jsxs)(r.xv,{p:!0,children:["Счетчик ",(0,l.jsx)("b",{children:"“Процент времени бездействия”"})," (\\Processor Information(_Total)\\% Idle Time) - счетчик показывает сколько % времени тратит ЦП на “ничего неделанье”, то есть фактически простаивает. О нем мы упоминали в описании показателя “% загруженности процессора”."]}),(0,l.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"% времени C1, % времени C2, % времени C3"}),(0,l.jsxs)(r.xv,{p:!0,children:["Счетчики ",(0,l.jsx)("b",{children:"”% времени C1, % времени C2, % времени C3”"}),":"]}),(0,l.jsxs)(r.aV,{children:[(0,l.jsx)("li",{children:"\\Processor Information(_Total)\\% C1 Time"}),(0,l.jsx)("li",{children:"\\Processor Information(_Total)\\% C2 Time"}),(0,l.jsx)("li",{children:"\\Processor Information(_Total)\\% C3 Time"})]}),(0,l.jsx)(r.xv,{p:!0,children:"Интересные счетчики для отслеживания состояния работы ЦП. Они показывают % времени, которое процессор находится в каждом из C-состояний (C-State). Каждое из состояний характеризуется пониженным энергопотреблением, а также различным временем перехода в обычный режим."}),(0,l.jsx)(r.xv,{p:!0,children:"Для высоконагруженных систем может быть не очень хорошим показателем, т.к. для выхода из этих режимов нужно время, что может влиять на скорость работы ЦП. Поэтому для серверов часто дают рекомендации выключать режимы энергосбережения."}),(0,l.jsx)(r.xv,{p:!0,children:"Показатель входит в общий процент простоя. Все эти состояния позволяют сохранять контекст работы и достаточно быстро к нему возвращаться при выходе из режима энергосбережения. Не все процессоры поддерживают эти режимы работы."}),(0,l.jsx)(r.xv,{p:!0,children:"Стоит на них обращать внимание, если даже при низких нагрузках производительность недостаточна."}),(0,l.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"% времени DPC"}),(0,l.jsxs)(r.xv,{p:!0,children:["Счетчик ",(0,l.jsx)("b",{children:"”% времени DPC”"})," (\\Processor Information(_Total)\\% DPC Time) - показатель % времени, которое процессор затрачивает на прием и обслуживание отложенного вызова процедур (Deferred Procedure Call — DPC). Эти вызовы выполняются в привилегированном режиме, поэтому данный показатель входит в рассмотренный выше ",(0,l.jsx)("b",{children:"”% работы в привилегированном режиме”"}),". Значения этого счетчика всегда небольшие. Иначе можно говорить о проблемах в используемом ПО."]}),(0,l.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"C1-переходов/сек, C2-переходов/сек, C3-переходов/сек"}),(0,l.jsxs)(r.xv,{p:!0,children:["Счетчики ",(0,l.jsx)("b",{children:"“C1-переходов/сек, C2-переходов/сек, C3-переходов/сек”"}),":"]}),(0,l.jsxs)(r.aV,{children:[(0,l.jsx)("li",{children:"\\Processor Information(_Total)\\C1 Transitions/sec"}),(0,l.jsx)("li",{children:"\\Processor Information(_Total)\\C2 Transitions/sec"}),(0,l.jsx)("li",{children:"\\Processor Information(_Total)\\C3 Transitions/sec"})]}),(0,l.jsx)(r.xv,{p:!0,children:"Счетчики показывают количество переходов между состояниями за 1 секунду. Выше мы рассматривали % времени в каждом из C-состояний и эти показатели косвенно связаны с количеством переходов. Чем больше таких переходов, тем больше процессор тратит ресурсов на выполнение этих переходов. В последнем случае нужно задуматься об отключении использования этих режимов. Чем меньше таких переходов, тем лучше."}),(0,l.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"Прерываний/сек"}),(0,l.jsxs)(r.xv,{p:!0,children:["Счетчик ",(0,l.jsx)("b",{children:"“Прерываний/сек”"})," (\\Processor Information(_Total)\\Interrupts/sec) - показатель количества прерываний за 1 секунду. Косвенно связан с показателем ",(0,l.jsx)("b",{children:"”% времени прерываний”"}),", который мы рассматривали выше."]}),(0,l.jsx)(r.xv,{p:!0,children:"При наличии высоких значений можно говорить о потенциальных проблемах с оборудованием или драйверами устройств. Счетчик не включает прерывания DPC, т.к. они учитываются в своем отдельном показателе."}),(0,l.jsxs)(r.xv,{p:!0,children:["Совместно с показателем ",(0,l.jsx)("b",{children:"”% времени прерываний”"})," дает более полную картину о влиянии прерываний на общую работу ЦП."]}),(0,l.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"Длина очереди процессора"}),(0,l.jsxs)(r.xv,{p:!0,children:["Счетчик ",(0,l.jsx)("b",{children:"“Длина очереди процессора”"})," (\\System\\Processor Queue Length) - показатель длины очереди запросов к ЦП. Высокие значения могут говорить о:"]}),(0,l.jsxs)(r.aV,{children:[(0,l.jsx)("li",{children:"Недостаточной мощности ЦП или количестве ядер."}),(0,l.jsx)("li",{children:"Неоптимальной работе ПО, в т.ч. и драйверов. ( Или и первое и второе."}),(0,l.jsx)("li",{children:"Переходы между состояниями пониженного энергопотребления (выше об этом говорили)"}),(0,l.jsx)("li",{children:"И некоторые другие моменты."})]}),(0,l.jsx)(r.xv,{p:!0,children:"Лучше всего анализировать этот показатель в динамике совместно с другой информацией о работе ЦП."}),(0,l.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"Контекстных переключений/с"}),(0,l.jsxs)(r.xv,{p:!0,children:["Счетчик ",(0,l.jsx)("b",{children:"“Контекстных переключений/с”"})," (\\System\\Context Switches Per Second). Windows, как и *.nix, является операционной системой ",(0,l.jsx)("b",{children:(0,l.jsx)("u",{children:(0,l.jsx)(r.e9,{newTab:!0,href:"https://ru.wikipedia.org/wiki/%D0%92%D1%8B%D1%82%D0%B5%D1%81%D0%BD%D1%8F%D1%8E%D1%89%D0%B0%D1%8F_%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%BD%D0%BE%D1%81%D1%82%D1%8C",children:"вытесняющей многозадачности."})})}),". Это значит, что в один и тот же момент может быть запущено множество различных процессов и потоков, между которым ОС должна справедливо (а может и нет) делить ресурсы процессора. Процесс разделения ресурсов выполняется путем прекращения выполнения одной задачи с сохранением информации о ее состоянии и восстановление состояния задачи, к которой переходит процессор. Это и есть переключение контекста, количество которых данный показатель собирает."]}),(0,l.jsx)(r.xv,{p:!0,children:"Высокие значения могут говорить о большой пропускной способности ЦП в распределении нагрузки. Показатель следует анализировать в динамике, т.к. каждая система индивидуальна в этой части (зависит от ПО, количества ядер и т.д.)"}),(0,l.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"О показателях выше"}),(0,l.jsx)(r.xv,{p:!0,children:"Это не полный список, но в большинстве случаев достаточно и этого набора показателей. На постоянной основе есть смысл собирать:"}),(0,l.jsxs)(r.aV,{children:[(0,l.jsx)("li",{children:"% загруженности процессора"}),(0,l.jsx)("li",{children:"% работы в пользовательском режиме"}),(0,l.jsx)("li",{children:"% работы в привилегированном режиме"}),(0,l.jsx)("li",{children:"Процент времени бездействия"}),(0,l.jsx)("li",{children:"% времени прерываний"}),(0,l.jsx)("li",{children:"Длина очереди процессора"}),(0,l.jsx)("li",{children:"Контекстных переключений/с"})]}),(0,l.jsx)(r.xv,{p:!0,children:"Все остальные - по ситуации."}),(0,l.jsx)(r.xv,{p:!0,children:"Теперь можно посмотреть на практике как эти показатели себя ведут в тех или иных ситуациях."}),(0,l.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Исходная задача"}),(0,l.jsx)(r.xv,{p:!0,children:"Поставим простую задачу, чтобы было интересней разбираться с перечисленными показателями. Нужно разобраться почему тормозит некоторый сервер, на котором установлен сервер 1С и периодически возникают пиковые нагрузки CPU до 100%. Из основных характеристик сервера - 8 ядер, частота 3.6 GHz, 16 ГБ RAM. Ничего сверхъестественного. Вот так эта нагрузка выглядит в диспетчере задач."}),(0,l.jsx)(r.Ee,{className:"my-4",src:"/public/imp_assets/DevOps/2020-11/context-is-important/1. CPU.png",alt:"CPU",size:i.h2.MEDIUM}),(0,l.jsx)(r.xv,{p:!0,children:"На самом деле найти причину достаточно просто, но мы пойдем сложным путем, пройдя через все счетчики производительности. И так, поехали!"}),(0,l.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Базовые показатели"}),(0,l.jsx)(r.xv,{p:!0,children:"В первую очередь посмотрим на три базовых показатели нагрузки на CPU:"}),(0,l.jsxs)(r.aV,{children:[(0,l.jsx)("li",{children:(0,l.jsx)(r.xv,{className:"bg-red-500",children:"% загруженности процессора"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.xv,{className:"bg-green-500",children:"% работы в пользовательском режиме"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.xv,{className:"bg-blue-500",children:"% работы в привилегированном режиме"})})]}),(0,l.jsx)(r.xv,{p:!0,children:"Вот так появление этой нагрузки выглядит в системном мониторе (он же perfmon)."}),(0,l.jsx)(r.Ee,{className:"my-4",src:"/public/imp_assets/DevOps/2020-11/context-is-important/2. Базовые показатели.gif",alt:"Базовые показатели",size:i.h2.MEDIUM}),(0,l.jsxs)(r.xv,{p:!0,children:["Как мы видим, общий ",(0,l.jsx)(r.xv,{text:!0,color:"red",children:"% загруженности процессора"})," доходит до 100 на продолжительное время. При этом ",(0,l.jsx)(r.xv,{text:!0,color:"blue",children:"% работы в привилегированном режиме"})," держится выше 10%, а иногда доходит и до 60%! Явно что-то не так, но что?"]}),(0,l.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Копнем глубже"}),(0,l.jsx)(r.xv,{p:!0,children:"Дополнительно посмотрим на другие показатели:"}),(0,l.jsxs)(r.aV,{children:[(0,l.jsx)("li",{children:(0,l.jsx)(r.xv,{className:"bg-red-500",children:"% времени DPC"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.xv,{className:"bg-green-500",children:"% времени прерываний"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.xv,{className:"bg-blue-500",children:"Процент времени бездействия"})})]}),(0,l.jsx)(r.xv,{p:!0,children:"На графике это будет выглядеть так."}),(0,l.jsx)(r.Ee,{className:"my-4",src:"/public/imp_assets/DevOps/2020-11/context-is-important/3. Копнем глубже.gif",alt:"Копнем глубже",size:i.h2.MEDIUM}),(0,l.jsxs)(r.xv,{p:!0,children:["Ничего особенного здесь не видим. ",(0,l.jsx)(r.xv,{text:!0,color:"blue",children:"Процент времени бездействия"})," упал до 0, что соответствует общей нагрузке под 100%, которую мы видели на предыдущем графике. Показатели ",(0,l.jsx)(r.xv,{text:!0,color:"red",children:"% времени DPC"})," и ",(0,l.jsx)(r.xv,{text:!0,color:"green",children:"% времени прерываний"})," находятся на минимальном уровне. Значит явных проблем с драйверами, железом или ПО нету. И мы все еще ничего не узнали, пойдем дальше."]}),(0,l.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Какое состояние"}),(0,l.jsx)(r.xv,{p:!0,children:"Проверим состояния процессора в части энергосбережения. Может быть дело в этом? (что вряд ли, но взглянем для интереса):"}),(0,l.jsxs)(r.aV,{children:[(0,l.jsxs)("li",{children:[(0,l.jsx)(r.xv,{text:!0,color:"red",children:"% времени C1, "}),(0,l.jsx)(r.xv,{text:!0,color:"green",children:"% времени C2, "}),(0,l.jsx)(r.xv,{text:!0,color:"blue",children:"% времени C3"})]}),(0,l.jsxs)("li",{children:[(0,l.jsx)(r.xv,{text:!0,color:"red",children:"C1-переходов/сек, "}),(0,l.jsx)(r.xv,{text:!0,color:"green",children:"C2-переходов/сек, "}),(0,l.jsx)(r.xv,{text:!0,color:"blue",children:"C3-переходов/сек"})]})]}),(0,l.jsx)(r.xv,{p:!0,children:"Количество переключений в секунду отображены пунктиром, а проценты сплошной линией. Вот такой получился график."}),(0,l.jsx)(r.Ee,{className:"my-4",src:"/public/imp_assets/DevOps/2020-11/context-is-important/4. Какое состояние.gif",alt:"Какое состояние",size:i.h2.MEDIUM}),(0,l.jsx)(r.xv,{p:!0,children:"Переходов в состояние ниже C1 нет, а они бы были самыми дорогими. Если состояние С1 в рабочим режим переходит за ~10 нс, то C2 уже необходимо 100 нс, а для C3 - 50 мкс. В общем, дело точно не в энергосбережении, и это хорошо! Пойдемте дальше."}),(0,l.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Все в очередь"}),(0,l.jsxs)(r.xv,{p:!0,children:["Посмотрим как ведет себя показатель ",(0,l.jsx)(r.xv,{text:!0,color:"red",children:"длины очереди к процессору"}),". Вот что мы увидим."]}),(0,l.jsx)(r.Ee,{className:"my-4",src:"/public/imp_assets/DevOps/2020-11/context-is-important/5. Все в очередь.gif",alt:"Все в очередь",size:i.h2.MEDIUM}),(0,l.jsxs)(r.xv,{p:!0,children:["Видимо большую очередь к ЦП, при этом держится она длительное время, хоть значения очереди и изменяются иногда до 0. Получается, что у нашего сервера просто не хватает мощи переваривать взваливаемую на него нагрузку. Но прежде чем пойти посмотреть какие именно процессы виновны в происходящем, посмотрим что ",(0,l.jsx)(r.xv,{text:!0,color:"blue",children:"там с переключениями контекста"}),"."]}),(0,l.jsx)(r.Ee,{className:"my-4",src:"/public/imp_assets/DevOps/2020-11/context-is-important/6.1 Узнаем правду.gif",alt:"Узнаем правду",size:i.h2.MEDIUM}),(0,l.jsx)(r.xv,{p:!0,children:"На графике масштаб изначально 0.001, то есть в спокойном состоянии было около 8 тысяч переключений контекста. Затем мы видим резкий всплеск в момент возросшей нагрузки на ЦП, после чего показатель к предыдущим значениям практически не возвращался. То есть явно возросло количество активных потоков, которые требуют процессорных мощностей. Именно поэтому нужно анализировать этот показатель в динамике, чтобы было с чем сравнивать."}),(0,l.jsx)(r.xv,{p:!0,children:"Настал момент посмотреть что за процессы все это вытворяют."}),(0,l.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Узнаем правду"}),(0,l.jsx)(r.xv,{p:!0,children:"Перейдем в старый и добрый диспетчер задач и посмотрим какие процессы в ТОП’е. И о чудо!"}),(0,l.jsx)(r.Ee,{className:"my-4",src:"/public/imp_assets/DevOps/2020-11/context-is-important/6.2 Узнаем правду.gif",alt:"Узнаем правду",size:i.h2.MEDIUM}),(0,l.jsx)(r.xv,{p:!0,children:"Это рабочие процессы сервера 1С! Вот это поворот! Идем в консоль кластера, чтобы понять кто и что делает на сервере."}),(0,l.jsx)(r.Ee,{className:"my-4",src:"/public/imp_assets/DevOps/2020-11/context-is-important/7. Сеансы.png",alt:"Сеансы",size:i.h2.MEDIUM}),(0,l.jsx)(r.xv,{p:!0,children:"Большое количество фоновых задания. В колонке “Процессорное время” теперь можно отследить кто съедает процессорные ресурсы, но не в нашем случае. И обратите внимание на названия информационных баз в первой колонке. Видите странность? (нет, я не про имена). Да, баз достаточно много, причем фоновое задание запускается каждое в отдельной информационной базе. Но что это за задания?"}),(0,l.jsx)(r.xv,{p:!0,children:"Идем в журнал регистрации и видим там это."}),(0,l.jsx)(r.Ee,{className:"my-4",src:"/public/imp_assets/DevOps/2020-11/context-is-important/8. Журнал регистрации 1С.png",alt:"Журнал регистрации 1С",size:i.h2.MEDIUM}),(0,l.jsx)(r.xv,{p:!0,children:"Да, в каждой информационной базе аналогичная картина - каждую минуту запускается фоновое задание обновления полнотекстового индекса. Но неужели это задание так может нагружать сервер?"}),(0,l.jsx)(r.xv,{p:!0,children:"В нормальных ситуациях - нет. Но если на сервере столько баз…"}),(0,l.jsx)(r.xv,{p:!0,children:"В общем, в чем проблема понятна. 100 баз на одном сервере с 8 ядрами. А ведь нагрузку могут создавать не только фоновые задания обновления индекса ППД, но и остальное (отчеты, проведение документов и многое, многое другое). Можно услышать оправдание такой настройки - но базы то не большие и в каждой работает по 1 пользователю. Как мы видим, это далеко не аргумент в создании такой конфигурации."}),(0,l.jsx)(r.xv,{p:!0,children:"Какое тут решение? Думаю, Вы и сами догадываетесь о возможных решениях. Можете написать в комментариях, если есть что сказать. Но если Ваш ответ - нужно отключать полнотекстовый поиск, потому что он тормозит, то Вы не правы. Все служит своим целям, поэтому лучше сначала разобраться с настоящими причинами проблем."}),(0,l.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Мониторинг и сбор информации"}),(0,l.jsx)(r.xv,{p:!0,children:"Мы рассмотрели основные показатели CPU и их краткое описание. На небольшом и простом примере вживую увидели как эти показатели меняются. Но заходить на сервер каждый раз и проверять счетчики работы ЦП - дело не благодарное, ведь никогда точно не знаешь в какой момент проблема появится."}),(0,l.jsx)(r.xv,{p:!0,children:"Очевидно, что нужен мониторинг на постоянно основе. Решений для этого достаточно много, но самым распространенным остается использование Zabbix. На Инфостарт не одна статья написана по этой теме. Ссылки на них добавил в конце публикации, а также вот еще некоторый материал, который может пригодиться:"}),(0,l.jsxs)(r.aV,{children:[(0,l.jsx)("li",{children:(0,l.jsx)("b",{children:(0,l.jsx)("u",{children:(0,l.jsx)(r.e9,{newTab:!0,href:"/pages/blog/DevOps/2020-09/monitoring-and-simple-installation-zabbix.tsx",children:"Немного о мониторинге и простой установке Zabbix"})})})}),(0,l.jsx)("li",{children:(0,l.jsx)("b",{children:(0,l.jsx)("u",{children:(0,l.jsx)(r.e9,{newTab:!0,href:"/pages/blog/DevOps/2020-10/zabbix-diagnostic.tsx",children:"Диагностика работы Zabbix"})})})}),(0,l.jsx)("li",{children:(0,l.jsx)("b",{children:(0,l.jsx)("u",{children:(0,l.jsx)(r.e9,{newTab:!0,href:"/pages/blog/DevOps/2020-10/update-zabbix-4.0-to-5.0.tsx",children:"Обновляем Zabbix с 4.0 до 5.0 через грабли"})})})})]}),(0,l.jsx)(r.xv,{p:!0,children:"Внедрение, развертывание и настройкам мониторинга - отдельная обширная тема. Но, по крайней мере, теперь Вы знаете с чего начать."}),(0,l.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"История не из мира Highload"}),(0,l.jsx)(r.xv,{p:!0,children:"Это была простая история с предсказуемой концовкой. Даже можно сказать - очень упрощенная история. Цель была очень проста - показать какие показатели диагностики ЦП имеются в наличии у каждого под рукой и дать им краткое описание. Как бонус, на графиках мы посмотрели их изменение при возникновении пиковых нагрузок и докопались до истины."}),(0,l.jsx)(r.xv,{p:!0,children:"В будущем рассмотрим более сложные примеры связанные с виртуализацией, облаками и прочими ужасами современного мира ИТ. А пока что все."}),(0,l.jsx)(r.xv,{p:!0,children:"Всего хорошего и производительного!"})]})},9305:function(e,t,s){"use strict";s.d(t,{Ee:function(){return c},Xg:function(){return i},aV:function(){return a},e9:function(){return x},o_:function(){return o},ty:function(){return d},xv:function(){return n}});var l=s(5152),r=s.n(l);let i=r()(()=>Promise.all([s.e(4838),s.e(4738),s.e(4817),s.e(1664),s.e(7167)]).then(s.bind(s,7167)),{loadableGenerated:{webpack:()=>[7167]}}),n=r()(()=>s.e(9179).then(s.bind(s,9179)),{loadableGenerated:{webpack:()=>[9179]}}),c=r()(()=>s.e(1974).then(s.bind(s,1974)),{loadableGenerated:{webpack:()=>[1974]}}),d=r()(()=>s.e(8547).then(s.bind(s,8547)),{loadableGenerated:{webpack:()=>[8547]}}),a=r()(()=>s.e(6806).then(s.bind(s,6806)),{loadableGenerated:{webpack:()=>[6806]}}),x=r()(()=>Promise.all([s.e(1664),s.e(1465)]).then(s.bind(s,1465)),{loadableGenerated:{webpack:()=>[1465]}});r()(()=>s.e(567).then(s.bind(s,567)),{loadableGenerated:{webpack:()=>[567]}}),r()(()=>Promise.all([s.e(2004),s.e(4139)]).then(s.bind(s,4139)),{loadableGenerated:{webpack:()=>[4139]}});let o=r()(()=>Promise.all([s.e(5507),s.e(7472),s.e(584),s.e(7870)]).then(s.bind(s,7870)),{loadableGenerated:{webpack:()=>[7870]}})},5152:function(e,t,s){e.exports=s(3841)}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=1522)}),_N_E=e.O()}]);