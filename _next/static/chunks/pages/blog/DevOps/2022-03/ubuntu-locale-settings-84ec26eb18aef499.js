(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7575],{52:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/DevOps/2022-03/ubuntu-locale-settings",function(){return t(3771)}])},3771:function(e,n,t){"use strict";t.r(n);var a=t(5893),r=t(9305);t(7294);var l=t(850);n.default=()=>(0,a.jsxs)(r.Xg,{blogcentered:!0,children:[(0,a.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Перед началом"}),(0,a.jsx)(r.xv,{p:!0,children:"Здесь описан набор базовый действий для настройки локализации в системе Ubuntu 20.04 на русскую."}),(0,a.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Проверка доступной локали"}),(0,a.jsx)(l.Z,{code:"\nlocale -a | grep ru\n                ",className:"my-5",language:"bash"}),(0,a.jsx)(r.xv,{p:!0,children:"Если в системе установлены локали для русского языка, то можно увидеть примерно следующее."}),(0,a.jsx)(l.Z,{code:"\nru_RU\nru_RU.iso88595\nru_RU.koi8r\nru_RU.utf8\nru_UA\nru_UA.koi8u\nru_UA.utf8\nrussian\n                ",className:"my-5",language:"bash"}),(0,a.jsx)(r.xv,{p:!0,children:"Пустой вывод будет означать, что нужные локали не установлены."}),(0,a.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Установка локали"}),(0,a.jsx)(r.xv,{p:!0,children:"Перенастройка локалей выполняется командой."}),(0,a.jsx)(l.Z,{code:"\ndpkg-reconfigure locales\n                ",className:"my-5",language:"bash"}),(0,a.jsxs)(r.xv,{p:!0,children:["Далее нужно выбрать необходимые локали, например в нашем случае это ",(0,a.jsx)("b",{children:"ru_RU.UTF-8"}),". Там же в меню выберем локаль по умолчанию, в нашем примере тоже русскую."]}),(0,a.jsx)(r.xv,{p:!0,children:"Теперь локаль установлена и настроена. Необходимо переподключиться к консоли для использования новых настроек в сессии."}),(0,a.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Альтернативный путь установки локали"}),(0,a.jsx)(r.xv,{p:!0,children:"Устанавливаем соответствующий пакет."}),(0,a.jsx)(l.Z,{code:"\nsudo apt-get install language-pack-ru\n                ",className:"my-5",language:"bash"}),(0,a.jsx)(r.xv,{p:!0,children:"Далее обновление локали."}),(0,a.jsx)(l.Z,{code:"\nsudo update-locale LANG=ru_RU.UTF-8\n                ",className:"my-5",language:"bash"}),(0,a.jsx)(r.xv,{p:!0,children:"Далее перезаходим в систему и проверяем через коману."}),(0,a.jsx)(l.Z,{code:"\nlocale\n                ",className:"my-5",language:"bash"}),(0,a.jsx)(r.xv,{p:!0,children:"Результат должен быть таким."}),(0,a.jsx)(l.Z,{code:'\nLANG=ru_RU.utf8\nLC_CTYPE="ru_RU.utf8"\nLC_NUMERIC="ru_RU.utf8"\nLC_TIME="ru_RU.utf8"\nLC_COLLATE="ru_RU.utf8"\nLC_MONETARY="ru_RU.utf8"\nLC_MESSAGES="ru_RU.utf8"\nLC_PAPER="ru_RU.utf8"\nLC_NAME="ru_RU.utf8"\nLC_ADDRESS="ru_RU.utf8"\nLC_TELEPHONE="ru_RU.utf8"\nLC_MEASUREMENT="ru_RU.utf8"\nLC_IDENTIFICATION="ru_RU.utf8"\nLC_ALL=\n                ',className:"my-5",language:"text"}),(0,a.jsx)(r.xv,{p:!0,children:"Все в порядке."})]})},850:function(e,n,t){"use strict";t.d(n,{Z:function(){return i}});var a=t(5893),r=t(7294),l=t(4965),u=t(4275),s=t(7340);function c(){let e=(0,s._)(["\n  text-align: left;\n  overflow: hidden;\n  font-size: 14px;\n  border-radius: 6px;\n  overflow: auto;\n  max-height: 350px;\n\n  & .token-line {\n    line-height: 1.3em;\n    height: 1.3em;\n  }\n"]);return c=function(){return e},e}let d=t(964).ZP.pre(c());var i=e=>{let{code:n,className:s,language:c}=e;return(void 0!==t.g?t.g:window).Prism=l.p1,t(1354),t(9016),t(5266),t(2927),t(1315),t(7874),t(6862),(0,a.jsx)("div",{className:(0,u.GF)("bg-blue-500 md:p-5 p-2",s),children:(0,a.jsx)("div",{className:"shadow-lg",children:(0,a.jsx)(l.y$,{theme:l.np.vsDark,code:n,language:null!=c?c:c="tsx",children:e=>{let{className:n,style:t,tokens:l,getLineProps:u,getTokenProps:s}=e;return(0,a.jsx)(d,{className:n,style:t,children:l.map((e,n)=>(0,r.createElement)("div",{...u({line:e,key:n}),key:Math.random()},e.map((e,n)=>(0,r.createElement)("span",{...s({token:e,key:n}),key:Math.random()}))))})}})})})}},9305:function(e,n,t){"use strict";t.d(n,{Ee:function(){return s},Xg:function(){return l},Y7:function(){return o},aV:function(){return d},e9:function(){return i},o_:function(){return x},ty:function(){return c},xv:function(){return u}});var a=t(5152),r=t.n(a);let l=r()(()=>Promise.all([t.e(4838),t.e(4738),t.e(1664),t.e(7167)]).then(t.bind(t,7167)),{loadableGenerated:{webpack:()=>[7167]}}),u=r()(()=>t.e(9179).then(t.bind(t,9179)),{loadableGenerated:{webpack:()=>[9179]}}),s=r()(()=>t.e(1974).then(t.bind(t,1974)),{loadableGenerated:{webpack:()=>[1974]}}),c=r()(()=>t.e(8547).then(t.bind(t,8547)),{loadableGenerated:{webpack:()=>[8547]}}),d=r()(()=>t.e(6806).then(t.bind(t,6806)),{loadableGenerated:{webpack:()=>[6806]}}),i=r()(()=>Promise.all([t.e(1664),t.e(1465)]).then(t.bind(t,1465)),{loadableGenerated:{webpack:()=>[1465]}});r()(()=>t.e(567).then(t.bind(t,567)),{loadableGenerated:{webpack:()=>[567]}});let o=r()(()=>Promise.all([t.e(2004),t.e(4139)]).then(t.bind(t,4139)),{loadableGenerated:{webpack:()=>[4139]}}),x=r()(()=>Promise.all([t.e(3811),t.e(7472),t.e(584),t.e(7870)]).then(t.bind(t,7870)),{loadableGenerated:{webpack:()=>[7870]}})}},function(e){e.O(0,[1102,2888,9774,179],function(){return e(e.s=52)}),_N_E=e.O()}]);