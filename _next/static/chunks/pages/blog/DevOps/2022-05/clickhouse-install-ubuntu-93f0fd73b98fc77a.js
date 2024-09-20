(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2996],{60490:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/DevOps/2022-05/clickhouse-install-ubuntu",function(){return t(61204)}])},61204:function(e,n,t){"use strict";t.r(n);var s=t(85893),r=t(44853);t(67294);var a=t(74313);n.default=()=>(0,s.jsxs)(r.Xg,{blogcentered:!0,children:[(0,s.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Установка"}),(0,s.jsxs)(r.xv,{p:!0,children:["Подробные сведения об установке можно найти в ",(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(r.e9,{newTab:!0,href:"https://clickhouse.com/docs/ru/getting-started/install",children:"официальной документации"})})}),"."]}),(0,s.jsx)(r.xv,{p:!0,children:"В Ubuntu будет выполнять установку из DEB-пакетов."}),(0,s.jsx)(a.Z,{code:'\nsudo apt-get install -y apt-transport-https ca-certificates dirmngr\nsudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 8919F6BD2B48D754\n\necho "deb https://packages.clickhouse.com/deb stable main" | sudo tee \\\n    /etc/apt/sources.list.d/clickhouse.list\nsudo apt-get update\n\nsudo apt-get install -y clickhouse-server clickhouse-client\n                ',className:"my-5",language:"bash"}),(0,s.jsx)(r.xv,{p:!0,children:"При установке будет запрошен пароль для пользователя default, поставьте его на свое усмотрение."}),(0,s.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Начальная настройка"}),(0,s.jsx)(r.xv,{p:!0,children:"Первым делом разрешим подключаться к серверу с других хостов."}),(0,s.jsx)(r.xv,{p:!0,children:"Идем в файл /etc/clickhouse-server/config.xml и находим настройку ::. Раскомментируем ее."}),(0,s.jsx)(a.Z,{code:"\n...\n    <!-- Listen specified address.\n         Use :: (wildcard IPv6 address), if you want to accept connections both with IPv4 and IPv6 from everywhere.\n         Notes:\n         If you open connections from wildcard address, make sure that at least one of the following measures applied:\n         - server is protected by firewall and not accessible from untrusted networks;\n         - all users are restricted to subset of network addresses (see users.xml);\n         - all users have strong passwords, only secure (TLS) interfaces are accessible, or connections are only made via TLS interfaces.\n         - users without password have readonly access.\n         See also: https://www.shodan.io/search?query=clickhouse\n      -->\n    <listen_host>::</listen_host>\n...\n                ",className:"my-5",language:"text"}),(0,s.jsx)(r.xv,{p:!0,children:"Далнее в файле /etc/clickhouse-server/users.xml разрешаем управление пользователями и их правами доступа через SQL-команды для пользователя default."}),(0,s.jsx)(r.xv,{p:!0,children:"Находим 1 и раскомментируем ее."}),(0,s.jsx)(a.Z,{code:"\n...\n            <!-- Settings profile for user. -->\n            <profile>default</profile>\n\n            <!-- Quota for user. -->\n            <quota>default</quota>\n\n            <!-- User can create other users and grant rights to them. -->\n            <access_management>1</access_management>\n...\n                ",className:"my-5",language:"text"}),(0,s.jsx)(r.xv,{p:!0,children:"Готово!"}),(0,s.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Запускаем и проверяем"}),(0,s.jsx)(r.xv,{p:!0,children:"Далее запускаем демон сервера ClickHouse и подключаемся стандартным клиентом clickhouse-client."}),(0,s.jsx)(a.Z,{code:'\nsudo service clickhouse-server start\nclickhouse-client # или "clickhouse-client --password" если был установлен пароль пользователю default\n                ',className:"my-5",language:"text"}),(0,s.jsx)(r.xv,{p:!0,children:"Подключение должно пройти успешно."}),(0,s.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Полезные ссылки"}),(0,s.jsxs)(r.aV,{children:[(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(r.e9,{newTab:!0,href:"https://github.com/YPermitin/ClickHouseTools",children:"Репозиторий с полезной информацией по ClickHouse"})})})}),(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(r.e9,{newTab:!0,href:"https://clickhouse.com/docs/ru/getting-started/install",children:"Установка ClickHouse Server"})})})}),(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(r.e9,{newTab:!0,href:"https://clickhouse.com/docs/en/interfaces",children:"Интерфейсы для работы с ClickHouse"})})})}),(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(r.e9,{newTab:!0,href:"https://github.com/dbeaver/dbeaver/wiki/Clickhouse",children:"DBeaver - GUI-утилита для работы с ClickHouse и не только"})})})})]})]})},87855:function(e,n,t){"use strict";var s,r;t.d(n,{b:function(){return s}}),(r=s||(s={})).Min="350px",r.Standard="700px",r.Large="1000x",r.Unlimited=""},74313:function(e,n,t){"use strict";var s=t(37340),r=t(85893),a=t(67294),l=t(14965),i=t(41240),c=t(41686),o=t(87855);function d(){let e=(0,s._)(["\n        text-align: left;\n        overflow: hidden;\n        font-size: 14px;\n        border-radius: 6px;\n        overflow: auto;\n\n        & .token-line {\n            line-height: 1.3em;\n            height: 1.3em;\n        }\n    "]);return d=function(){return e},e}function u(){let e=(0,s._)(["\n        max-height: ","\n    "]);return u=function(){return e},e}n.Z=e=>{let{code:n,className:s,language:h,maxHeight:x=o.b.Standard}=e;(void 0!==t.g?t.g:window).Prism=l.p1,t(61354),t(79016),t(35266),t(92927),t(51315),t(57874),t(86862);let m=null!=x?x:o.b.Standard,p=c.ZP.pre(d()),b=(0,c.ZP)(p)(u(),m);return(0,r.jsx)("div",{className:(0,i.GF)("bg-blue-500 md:p-1 p-2",s),children:(0,r.jsx)("div",{className:"shadow-lg",children:(0,r.jsx)(l.y$,{theme:l.np.vsDark,code:n.trim(),language:null!=h?h:h="tsx",children:e=>{let{className:n,style:t,tokens:s,getLineProps:l,getTokenProps:i}=e;return(0,r.jsx)(b,{className:n,style:t,children:s.map((e,n)=>(0,a.createElement)("div",{...l({line:e,key:n}),key:Math.random()},e.map((e,n)=>(0,a.createElement)("span",{...i({token:e,key:n}),key:Math.random()}))))})}})})})}},44853:function(e,n,t){"use strict";t.d(n,{Ee:function(){return i},Xg:function(){return a},Y7:function(){return u},aV:function(){return o},e9:function(){return d},o_:function(){return h},tf:function(){return x},ty:function(){return c},xv:function(){return l}});var s=t(5152),r=t.n(s);let a=r()(()=>Promise.all([t.e(9686),t.e(4738),t.e(4838),t.e(1664),t.e(8765)]).then(t.bind(t,28765)),{loadableGenerated:{webpack:()=>[28765]}}),l=r()(()=>Promise.all([t.e(9511),t.e(935)]).then(t.bind(t,30935)),{loadableGenerated:{webpack:()=>[30935]}}),i=r()(()=>Promise.all([t.e(328),t.e(7651)]).then(t.bind(t,47651)),{loadableGenerated:{webpack:()=>[47651]}}),c=r()(()=>Promise.all([t.e(9686),t.e(6979)]).then(t.bind(t,16979)),{loadableGenerated:{webpack:()=>[16979]}}),o=r()(()=>Promise.all([t.e(4159),t.e(7355)]).then(t.bind(t,87355)),{loadableGenerated:{webpack:()=>[87355]}}),d=r()(()=>Promise.all([t.e(1664),t.e(3220)]).then(t.bind(t,53220)),{loadableGenerated:{webpack:()=>[53220]}});r()(()=>t.e(3140).then(t.bind(t,43140)),{loadableGenerated:{webpack:()=>[43140]}});let u=r()(()=>Promise.all([t.e(2004),t.e(736)]).then(t.bind(t,50736)),{loadableGenerated:{webpack:()=>[50736]}}),h=r()(()=>Promise.all([t.e(8331),t.e(8876),t.e(7354),t.e(839),t.e(5394),t.e(5533)]).then(t.bind(t,48641)),{loadableGenerated:{webpack:()=>[48641]}}),x=r()(()=>Promise.all([t.e(8331),t.e(1664),t.e(7354),t.e(839),t.e(8496)]).then(t.bind(t,48496)),{loadableGenerated:{webpack:()=>[48496]}})}},function(e){e.O(0,[6443,2888,9774,179],function(){return e(e.s=60490)}),_N_E=e.O()}]);