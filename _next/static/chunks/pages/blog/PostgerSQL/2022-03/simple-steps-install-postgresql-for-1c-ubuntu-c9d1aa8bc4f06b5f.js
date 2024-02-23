(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[655],{3019:function(e,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/PostgerSQL/2022-03/simple-steps-install-postgresql-for-1c-ubuntu",function(){return n(9210)}])},9210:function(e,s,n){"use strict";n.r(s);var t=n(5893),r=n(9305);n(7294);var a=n(850);s.default=()=>(0,t.jsxs)(r.Xg,{blogcentered:!0,children:[(0,t.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Перед стартом"}),(0,t.jsx)(r.xv,{p:!0,children:"Инструкция с минимальным набором шагов по настройке сервера 1С:Предприятия 8.3.20 + PostgreSQL 14 на Ubuntu 20.04. В общем плане актуальна для других версий приложений и ОС. Клиентскую часть 1С здесь не рассматриваем."}),(0,t.jsx)(r.xv,{p:!0,children:"Многие вещи в инструкции не раскрыты и вся информация скорее для ознакомления с процессом, а для рабочего окружения нужно более вдумчиво подходить ко всем настройкам."}),(0,t.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Настройка ОС"}),(0,t.jsx)(r.xv,{p:!0,children:"Полностью описывать настройку ОС в части сети, дисковой подсистемы и прочего смысла нет. Остановимся только на важных моментах, связанных с работой PostgreSQL и платформы 1С."}),(0,t.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"Обновим систему"}),(0,t.jsx)(r.xv,{p:!0,children:"Рекомендую поставить все последние обновления перед продолжением."}),(0,t.jsx)(a.Z,{code:"\nsudo apt update\nsudo apt upgrade\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(r.e9,{newTab:!0,href:"/pages/blog/DevOps/2022-03/ubuntu-locale-settings.tsx",children:"Настройка локали"})})})}),(0,t.jsx)(r.xv,{p:!0,children:"Чтобы платформа 1С могла работать с базой данных PostgreSQL нужно, чтобы в системе были установлены необходимые локали."}),(0,t.jsx)(a.Z,{code:"\nsudo dpkg-reconfigure locales\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(r.xv,{p:!0,children:"Далее на первом шаге выбираем из списка локаль “ru_RU.UTF-8 UTF-8”. Эту же локаль на втором шаге выбираем как локаль по умолчанию."}),(0,t.jsx)(r.xv,{subtitle:!0,className:"mt-10 md:text",children:"Часовой пояс и время"}),(0,t.jsx)(r.xv,{p:!0,children:"Далее установим нужный часовой пояс в системе."}),(0,t.jsx)(a.Z,{code:"\nsudo timedatectl set-timezone Europe/Moscow\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(r.xv,{p:!0,children:"Текущие настройки можно посмотреть так."}),(0,t.jsx)(a.Z,{code:"\ntimedatectl show\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(r.xv,{p:!0,children:"А список доступных часовых поясов можно узнать так."}),(0,t.jsx)(a.Z,{code:"\ntimedatectl list-timezones\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Установка PostgreSQL"}),(0,t.jsxs)(r.xv,{p:!0,children:["Теперь установим СУБД PostgreSQL. “Ванильная” версия платформой 1С не поддерживается, поэтому скачаем сборку от компании PostgresPro. Для этого идем на сайт ",(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(r.e9,{newTab:!0,href:"https://1c.postgres.ru/",children:"1c.postgres.ru"})})}),", выбираем архитектуру, версию сборки, операционную систему и загружаем (будет отправлено письмо с информацией по указанным контактным данным с инструкцией по установке)."]}),(0,t.jsxs)(r.xv,{p:!0,children:["Есть сборка PostgreSQL от фирмы 1С, которую можно загрузить с ",(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(r.e9,{newTab:!0,href:"https://login.1c.ru/login?service=https%3A%2F%2Freleases.1c.ru%2Fpublic%2Fsecurity_check",children:"официального сайта"})})}),". Ее в инструкции не рассматриваем."]}),(0,t.jsx)(r.xv,{p:!0,children:"Далее обновляем доступные репозитории пакетов согласно инструкции."}),(0,t.jsx)(a.Z,{code:"\ncurl -o pgpro-repo-add.sh https://repo.postgrespro.ru/pg1c-14/keys/pgpro-repo-add.sh\nsudo sh pgpro-repo-add.sh\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(r.xv,{p:!0,children:"И устанавливаем PostgreSQL версии 14."}),(0,t.jsx)(a.Z,{code:"\napt-get install postgrespro-1c-14\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(r.xv,{p:!0,children:"Чтобы найти имя демона PostgreSQL выполним команду."}),(0,t.jsx)(a.Z,{code:"\nsystemctl --type=service | grep postgres\n\n# Пример вывода:\n#     postgrespro-1c-14.service\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(r.xv,{p:!0,children:"Теперь останавливаем сервис и удаляем созданный по умолчанию кластер."}),(0,t.jsx)(a.Z,{code:'\n# Останавливаем PostgreSQL\nsudo systemctl stop postgrespro-1c-14\n\n# Удаляем файлы ранее созданного при установке кластера\n# Вместо 1c-14 может быть другое название каталога, в зависимости от версии.\nrm -r /var/lib/pgpro/1c-14/data/*\n\n# Инициализируем новый кластер для 1С с нужной локалью (не обязательно, если по умолчанию локаль в системе "ru_RU.UTF-8").\nsudo /opt/pgpro/1c-14/bin/pg-setup initdb --tune=1c --locale=ru_RU.UTF-8\n\n# Запускаем PostgreSQL\nsudo systemctl start postgrespro-1c-14\n                ',className:"my-5",language:"bash"}),(0,t.jsx)(r.xv,{p:!0,children:"Готово. Дополнительно, но только в качестве примера, сделаем дополнительные шаги."}),(0,t.jsxs)(r.aV,{children:[(0,t.jsxs)("li",{children:["Разрешим подключение к СУБД с любых адресов. Для этого в файле конфигурации сервера (/var/lib/pgpro/1c-14/data/postgresql.conf) изменим строчку:",(0,t.jsx)(a.Z,{code:"\n# listen_addresses = 'localhost'\nlisten_addresses = '*'\n                    ",className:"my-5",language:"text"})]}),(0,t.jsxs)("li",{children:["Также разрешим подключение для всех пользователей по логину и паролю. В файле (/var/lib/pgpro/1c-14/data/pg_hba.conf) изменим разрешения для IPv4.",(0,t.jsx)(a.Z,{code:"\n# Было\n# # IPv4 local connections:\n# host    all             all             127.0.0.1/32            md5\n\n# Стало\n# IPv4 local connections:\nhost    all             all             0.0.0.0/0               password\nhost    all             all             127.0.0.1/32            md5\n                    ",className:"my-5",language:"text"}),(0,t.jsx)(r.xv,{p:!0,children:"Теперь доступ к СУБД имеется с любой машины и для любого пользователя."})]}),(0,t.jsxs)("li",{children:["Кстати, давайте создадим, опять же только для примера, пользователя PostgreSQL.",(0,t.jsx)(a.Z,{code:"\nsudo su postgres\n\npsql\n                    ",className:"my-5",language:"bash"})]}),(0,t.jsxs)("li",{children:["Далее SQL-командой создаем пользователя. Для 14 версии команда будет такая (для других см. документацию):",(0,t.jsx)(a.Z,{code:"\nCREATE USER username SUPERUSER PASSWORD 'passwordstring';\n\n                    ",className:"my-5",language:"sql"})]})]}),(0,t.jsx)(r.xv,{p:!0,children:"Настройки выше являются небезопасными и годятся только для локальных установок с целью тестирования и изучения. Будьте осторожны!"}),(0,t.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Установка сервера 1С"}),(0,t.jsx)(r.xv,{p:!0,children:"Начиная с версии 8.3.20 установка стала значительно проще (хотя может и с более ранних версий). С официального сайта скачиваем версию для Linux, в нашем случае она называется:"}),(0,t.jsx)(a.Z,{code:"\nТехнологическая платформа 1С:Предприятия (64-bit) для Linux\n                ",className:"my-5",language:"text"}),(0,t.jsx)(r.xv,{p:!0,children:"Копируем файл на наш сервер и распаковываем архив."}),(0,t.jsx)(a.Z,{code:'\n# Имя архива меняется в зависимости от версии платформы 1С\ntar -xvzf server64_8_3_20_1710.tar.gz\n\n# В итоге появится файл "setup-full-8.3.20.1710-x86_64.run" для установки. Он то нам и нужен. Запускаем.\nsudo ./setup-full-8.3.20.1710-x86_64.run\n                ',className:"my-5",language:"bash"}),(0,t.jsx)(r.xv,{p:!0,children:"Программа установки интерактивно спросит язык установки, выбираем:"}),(0,t.jsx)(a.Z,{code:"\n[16] Russian - Русский\n                ",className:"my-5",language:"text"}),(0,t.jsx)(r.xv,{p:!0,children:"Далее соглашаемся на выбор компонентов. Нас интересуют:"}),(0,t.jsx)(a.Z,{code:"\nСервер 1С:Предприятия 8 [y/N] : y\nИнтерфейсы на различных языках - Русский [Y/n] :y\n                ",className:"my-5",language:"text"}),(0,t.jsx)(r.xv,{p:!0,children:"Дожидаемся окончания процесса установки."}),(0,t.jsx)(a.Z,{code:"\nПожалуйста, подождите пока программа установит 1С:Предприятие на ваш компьютер.\n\n Установка\n 0% ______________ 50% ______________ 100%\n #########################################\n\n----------------------------------------------------------------------------\nЗавершена установка 1С:Предприятие на ваш компьютер.\n                ",className:"my-5",language:"text"}),(0,t.jsx)(r.xv,{p:!0,children:"После установки может потребоваться создать ссылку для службы. Перед этим проверим не создал ли установщик ссылку самостоятельно."}),(0,t.jsx)(a.Z,{code:"\nsudo systemctl --type=service | grep srv1cv83\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(r.xv,{p:!0,children:"Если предыдущая команда не находит службу, то создаем ее."}),(0,t.jsx)(a.Z,{code:"\n# Добавляем ссылку на файл службы\nsudo ln -s /opt/1cv8/x86_64/8.3.20.1710/srv1cv83 /etc/init.d/srv1cv83\n\n# Включаем службу\nsudo systemctl enable srv1cv83\nsudo systemctl restart srv1cv83\n\n# Проверяем результат, состояние службы\nsudo systemctl status srv1cv83\n                ",className:"my-5",language:"bash"}),(0,t.jsx)(r.xv,{p:!0,children:"Готово! Служба установлена и работает."}),(0,t.jsx)(a.Z,{code:"\n● srv1cv83.service - LSB: Starts and stops the 1C:Enterprise daemons\n     Loaded: loaded (/etc/init.d/srv1cv83; generated)\n     Active: active (exited) since Thu 2022-03-24 19:45:25 UTC; 1s ago\n       Docs: man:systemd-sysv-generator(8)\n    Process: 21186 ExecStart=/etc/init.d/srv1cv83 start (code=exited, status=0/SUCCESS)\n\nMar 24 19:45:20 app1cpg systemd[1]: Starting LSB: Starts and stops the 1C:Enterprise daemons...\nMar 24 19:45:20 app1cpg su[21230]: (to usr1cv8) root on none\nMar 24 19:45:20 app1cpg su[21230]: pam_unix(su-l:session): session opened for user usr1cv8 by (uid=0)\nMar 24 19:45:20 app1cpg su[21230]: pam_unix(su-l:session): session closed for user usr1cv8\nMar 24 19:45:25 app1cpg srv1cv83[21186]: Starting 1C:Enterprise 8.3 server: OK\nMar 24 19:45:25 app1cpg systemd[1]: Started LSB: Starts and stops the 1C:Enterprise daemons.\n                ",className:"my-5",language:"text"}),(0,t.jsx)(r.xv,{p:!0,children:"И еще немного информации."}),(0,t.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Послесловие"}),(0,t.jsx)(r.xv,{p:!0,children:"Как говорилось в самом начале, это лишь поверхностная инструкция по установке PostgreSQL + сервер 1С для Ubuntu 20.04. Многие аспекты даже не рассматривались:"}),(0,t.jsxs)(r.aV,{children:[(0,t.jsx)("li",{children:"Открытие портов для брэндмауэра"}),(0,t.jsx)("li",{children:"Настройка безопасности для СУБД"}),(0,t.jsx)("li",{children:"Тюнинг настроек PostgreSQL"}),(0,t.jsx)("li",{children:"Настройка использования лицензий 1С"}),(0,t.jsx)("li",{children:"И многое другое."})]}),(0,t.jsx)(r.xv,{p:!0,children:"Но для старта информация подходящая."}),(0,t.jsx)(r.xv,{p:!0,children:"Ниже ссылки на полезные материалы, в них некоторые моменты описаны более развернуто. В общем, вперед! К знаниям!"}),(0,t.jsx)(r.xv,{title:!0,className:"mt-10 md:text",children:"Полезные ссылки"}),(0,t.jsxs)(r.aV,{children:[(0,t.jsx)("li",{children:(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(r.e9,{newTab:!0,href:"https://losst.ru/ustanovka-servera-1s-na-ubuntu-20-04#1_%D0%97%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0_%D0%BD%D0%B5%D0%BE%D0%B1%D1%85%D0%BE%D0%B4%D0%B8%D0%BC%D1%8B%D1%85_%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D0%BE%D0%B2",children:"УСТАНОВКА СЕРВЕРА 1С НА UBUNTU 20.04"})})})}),(0,t.jsx)("li",{children:(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(r.e9,{newTab:!0,href:"https://rarus.ru/publications/20210927-ot-ekspertov-ustanovka-1c-linux-496320/",children:"От экспертов \xab1С‑Рарус\xbb: Установка серверной части 1С в Linux среде"})})})}),(0,t.jsx)("li",{children:(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(r.e9,{newTab:!0,href:"https://infostart.ru/1c/articles/1532020/",children:"Поднимаем сервер 1С на UBUNTU и PostgreSQL за 20 минут"})})})}),(0,t.jsx)("li",{children:(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(r.e9,{newTab:!0,href:"https://infostart.ru/1c/articles/1120161/",children:"Установка и настройка нескольких экземпляров сервера 1С: Предприятия 8.3 разных релизов на одном Ubuntu-server"})})})}),(0,t.jsx)("li",{children:(0,t.jsx)("b",{children:(0,t.jsx)("u",{children:(0,t.jsx)(r.e9,{newTab:!0,href:"https://infostart.ru/1c/articles/970225/",children:"Сервер 1С:Предприятие на Ubuntu 16.04 и PostgreSQL 9.6, для тех, кто хочет узнать его вкус. Рецепт от Капитана"})})})})]})]})},850:function(e,s,n){"use strict";n.d(s,{Z:function(){return o}});var t=n(5893),r=n(7294),a=n(4965),l=n(4275),c=n(7340);function i(){let e=(0,c._)(["\n  text-align: left;\n  overflow: hidden;\n  font-size: 14px;\n  border-radius: 6px;\n  overflow: auto;\n  max-height: 350px;\n\n  & .token-line {\n    line-height: 1.3em;\n    height: 1.3em;\n  }\n"]);return i=function(){return e},e}let d=n(964).ZP.pre(i());var o=e=>{let{code:s,className:c,language:i}=e;return(void 0!==n.g?n.g:window).Prism=a.p1,n(1354),n(9016),n(5266),n(2927),n(1315),n(7874),n(6862),(0,t.jsx)("div",{className:(0,l.GF)("bg-blue-500 md:p-5 p-2",c),children:(0,t.jsx)("div",{className:"shadow-lg",children:(0,t.jsx)(a.y$,{theme:a.np.vsDark,code:s,language:null!=i?i:i="tsx",children:e=>{let{className:s,style:n,tokens:a,getLineProps:l,getTokenProps:c}=e;return(0,t.jsx)(d,{className:s,style:n,children:a.map((e,s)=>(0,r.createElement)("div",{...l({line:e,key:s}),key:Math.random()},e.map((e,s)=>(0,r.createElement)("span",{...c({token:e,key:s}),key:Math.random()}))))})}})})})}},9305:function(e,s,n){"use strict";n.d(s,{Ee:function(){return c},Xg:function(){return a},aV:function(){return d},e9:function(){return o},o_:function(){return x},ty:function(){return i},xv:function(){return l}});var t=n(5152),r=n.n(t);let a=r()(()=>Promise.all([n.e(4838),n.e(4738),n.e(4817),n.e(1664),n.e(7167)]).then(n.bind(n,7167)),{loadableGenerated:{webpack:()=>[7167]}}),l=r()(()=>n.e(9179).then(n.bind(n,9179)),{loadableGenerated:{webpack:()=>[9179]}}),c=r()(()=>n.e(1974).then(n.bind(n,1974)),{loadableGenerated:{webpack:()=>[1974]}}),i=r()(()=>n.e(8547).then(n.bind(n,8547)),{loadableGenerated:{webpack:()=>[8547]}}),d=r()(()=>n.e(6806).then(n.bind(n,6806)),{loadableGenerated:{webpack:()=>[6806]}}),o=r()(()=>Promise.all([n.e(1664),n.e(1465)]).then(n.bind(n,1465)),{loadableGenerated:{webpack:()=>[1465]}});r()(()=>n.e(567).then(n.bind(n,567)),{loadableGenerated:{webpack:()=>[567]}}),r()(()=>Promise.all([n.e(2004),n.e(4139)]).then(n.bind(n,4139)),{loadableGenerated:{webpack:()=>[4139]}});let x=r()(()=>Promise.all([n.e(5507),n.e(7472),n.e(584),n.e(7870)]).then(n.bind(n,7870)),{loadableGenerated:{webpack:()=>[7870]}})}},function(e){e.O(0,[1102,2888,9774,179],function(){return e(e.s=3019)}),_N_E=e.O()}]);