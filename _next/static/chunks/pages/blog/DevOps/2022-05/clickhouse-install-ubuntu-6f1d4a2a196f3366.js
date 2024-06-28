(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2996],{490:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/DevOps/2022-05/clickhouse-install-ubuntu",function(){return t(7981)}])},7981:function(e,n,t){"use strict";t.r(n);var s=t(5893),r=t(9305);t(7294);var a=t(6671);n.default=()=>(0,s.jsxs)(r.Xg,{blogcentered:!0,children:[(0,s.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Установка"}),(0,s.jsxs)(r.xv,{p:!0,children:["Подробные сведения об установке можно найти в ",(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(r.e9,{newTab:!0,href:"https://clickhouse.com/docs/ru/getting-started/install",children:"официальной документации"})})}),"."]}),(0,s.jsx)(r.xv,{p:!0,children:"В Ubuntu будет выполнять установку из DEB-пакетов."}),(0,s.jsx)(a.Z,{code:'\nsudo apt-get install -y apt-transport-https ca-certificates dirmngr\nsudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 8919F6BD2B48D754\n\necho "deb https://packages.clickhouse.com/deb stable main" | sudo tee \\\n    /etc/apt/sources.list.d/clickhouse.list\nsudo apt-get update\n\nsudo apt-get install -y clickhouse-server clickhouse-client\n                ',className:"my-5",language:"bash"}),(0,s.jsx)(r.xv,{p:!0,children:"При установке будет запрошен пароль для пользователя default, поставьте его на свое усмотрение."}),(0,s.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Начальная настройка"}),(0,s.jsx)(r.xv,{p:!0,children:"Первым делом разрешим подключаться к серверу с других хостов."}),(0,s.jsx)(r.xv,{p:!0,children:"Идем в файл /etc/clickhouse-server/config.xml и находим настройку ::. Раскомментируем ее."}),(0,s.jsx)(a.Z,{code:"\n...\n    <!-- Listen specified address.\n         Use :: (wildcard IPv6 address), if you want to accept connections both with IPv4 and IPv6 from everywhere.\n         Notes:\n         If you open connections from wildcard address, make sure that at least one of the following measures applied:\n         - server is protected by firewall and not accessible from untrusted networks;\n         - all users are restricted to subset of network addresses (see users.xml);\n         - all users have strong passwords, only secure (TLS) interfaces are accessible, or connections are only made via TLS interfaces.\n         - users without password have readonly access.\n         See also: https://www.shodan.io/search?query=clickhouse\n      -->\n    <listen_host>::</listen_host>\n...\n                ",className:"my-5",language:"text"}),(0,s.jsx)(r.xv,{p:!0,children:"Далнее в файле /etc/clickhouse-server/users.xml разрешаем управление пользователями и их правами доступа через SQL-команды для пользователя default."}),(0,s.jsx)(r.xv,{p:!0,children:"Находим 1 и раскомментируем ее."}),(0,s.jsx)(a.Z,{code:"\n...\n            <!-- Settings profile for user. -->\n            <profile>default</profile>\n\n            <!-- Quota for user. -->\n            <quota>default</quota>\n\n            <!-- User can create other users and grant rights to them. -->\n            <access_management>1</access_management>\n...\n                ",className:"my-5",language:"text"}),(0,s.jsx)(r.xv,{p:!0,children:"Готово!"}),(0,s.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Запускаем и проверяем"}),(0,s.jsx)(r.xv,{p:!0,children:"Далее запускаем демон сервера ClickHouse и подключаемся стандартным клиентом clickhouse-client."}),(0,s.jsx)(a.Z,{code:'\nsudo service clickhouse-server start\nclickhouse-client # или "clickhouse-client --password" если был установлен пароль пользователю default\n                ',className:"my-5",language:"text"}),(0,s.jsx)(r.xv,{p:!0,children:"Подключение должно пройти успешно."}),(0,s.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Полезные ссылки"}),(0,s.jsxs)(r.aV,{children:[(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(r.e9,{newTab:!0,href:"https://github.com/YPermitin/ClickHouseTools",children:"Репозиторий с полезной информацией по ClickHouse"})})})}),(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(r.e9,{newTab:!0,href:"https://clickhouse.com/docs/ru/getting-started/install",children:"Установка ClickHouse Server"})})})}),(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(r.e9,{newTab:!0,href:"https://clickhouse.com/docs/en/interfaces",children:"Интерфейсы для работы с ClickHouse"})})})}),(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(r.e9,{newTab:!0,href:"https://github.com/dbeaver/dbeaver/wiki/Clickhouse",children:"DBeaver - GUI-утилита для работы с ClickHouse и не только"})})})})]})]})},9963:function(e,n,t){"use strict";var s,r;t.d(n,{b:function(){return s}}),(r=s||(s={})).Min="350px",r.Standard="700px",r.Large="1000x",r.Unlimited=""},6671:function(e,n,t){"use strict";var s=t(7340),r=t(5893),a=t(7294),l=t(4965),c=t(4275),i=t(964),d=t(9963);function o(){let e=(0,s._)(["\n        text-align: left;\n        overflow: hidden;\n        font-size: 14px;\n        border-radius: 6px;\n        overflow: auto;\n\n        & .token-line {\n            line-height: 1.3em;\n            height: 1.3em;\n        }\n    "]);return o=function(){return e},e}function u(){let e=(0,s._)(["\n        max-height: ","\n    "]);return u=function(){return e},e}n.Z=e=>{let{code:n,className:s,language:h,maxHeight:x=d.b.Standard}=e;(void 0!==t.g?t.g:window).Prism=l.p1,t(1354),t(9016),t(5266),t(2927),t(1315),t(7874),t(6862);let p=null!=x?x:d.b.Standard,m=i.ZP.pre(o()),b=(0,i.ZP)(m)(u(),p);return(0,r.jsx)("div",{className:(0,c.GF)("bg-blue-500 md:p-1 p-2",s),children:(0,r.jsx)("div",{className:"shadow-lg",children:(0,r.jsx)(l.y$,{theme:l.np.vsDark,code:n.trim(),language:null!=h?h:h="tsx",children:e=>{let{className:n,style:t,tokens:s,getLineProps:l,getTokenProps:c}=e;return(0,r.jsx)(b,{className:n,style:t,children:s.map((e,n)=>(0,a.createElement)("div",{...l({line:e,key:n}),key:Math.random()},e.map((e,n)=>(0,a.createElement)("span",{...c({token:e,key:n}),key:Math.random()}))))})}})})})}},9305:function(e,n,t){"use strict";t.d(n,{Ee:function(){return c},Xg:function(){return a},Y7:function(){return u},aV:function(){return d},e9:function(){return o},o_:function(){return h},ty:function(){return i},xv:function(){return l}});var s=t(5152),r=t.n(s);let a=r()(()=>Promise.all([t.e(4838),t.e(4738),t.e(1664),t.e(7167)]).then(t.bind(t,7167)),{loadableGenerated:{webpack:()=>[7167]}}),l=r()(()=>t.e(9179).then(t.bind(t,9179)),{loadableGenerated:{webpack:()=>[9179]}}),c=r()(()=>t.e(1974).then(t.bind(t,1974)),{loadableGenerated:{webpack:()=>[1974]}}),i=r()(()=>t.e(8547).then(t.bind(t,8547)),{loadableGenerated:{webpack:()=>[8547]}}),d=r()(()=>t.e(6806).then(t.bind(t,6806)),{loadableGenerated:{webpack:()=>[6806]}}),o=r()(()=>Promise.all([t.e(1664),t.e(1465)]).then(t.bind(t,1465)),{loadableGenerated:{webpack:()=>[1465]}});r()(()=>t.e(567).then(t.bind(t,567)),{loadableGenerated:{webpack:()=>[567]}});let u=r()(()=>Promise.all([t.e(2004),t.e(4139)]).then(t.bind(t,4139)),{loadableGenerated:{webpack:()=>[4139]}}),h=r()(()=>Promise.all([t.e(3811),t.e(7472),t.e(584),t.e(7870)]).then(t.bind(t,7870)),{loadableGenerated:{webpack:()=>[7870]}})}},function(e){e.O(0,[1102,2888,9774,179],function(){return e(e.s=490)}),_N_E=e.O()}]);