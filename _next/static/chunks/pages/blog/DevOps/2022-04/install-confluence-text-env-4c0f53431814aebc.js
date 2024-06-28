(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9418],{8979:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/DevOps/2022-04/install-confluence-text-env",function(){return a(8141)}])},8141:function(e,n,a){"use strict";a.r(n);var s=a(5893),l=a(9305);a(7294);var t=a(6671);n.default=()=>(0,s.jsxs)(l.Xg,{blogcentered:!0,children:[(0,s.jsx)(l.xv,{title:!0,className:"mt-10 md:text",children:"ВНИМАНИЕ!!!"}),(0,s.jsx)(l.xv,{p:!0,children:"Информация ниже относительно настройки лицензии только для ознакомления и личного использования! Для коммерческого использования обязательно купите лицензию! Для изучения включите демоверсию. Далее информация только для ознакомления! Автор не несет ответственности за последствия!"}),(0,s.jsx)(l.xv,{title:!0,className:"mt-10 md:text",children:"Подготовка"}),(0,s.jsx)(l.xv,{p:!0,children:"Установим все последние обновления."}),(0,s.jsx)(t.Z,{code:"\napt update\napt upgrade\n                ",className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"После установим нужны часовой пояс сервера."}),(0,s.jsx)(t.Z,{code:"\ntimedatectl set-timezone Europe/Moscow\n                ",className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"Проверим, что параметры установлены корректно."}),(0,s.jsx)(t.Z,{code:"\ndate\n\n# Пример вывода:\n# Sun 10 Apr 2022 09:49:47 PM MSK\n                ",className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"Не забываем установить Java:"}),(0,s.jsx)(t.Z,{code:"\napt-get install default-jdk\n                ",className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"Идем дальше."}),(0,s.jsx)(l.xv,{title:!0,className:"mt-10 md:text",children:"Установим СУБД"}),(0,s.jsx)(l.xv,{p:!0,children:"Установка PostgreSQL для работы базы данных Confluence. На момент написания инструкции это 14 версия СУБД."}),(0,s.jsx)(t.Z,{code:"\n# Создаем файл конфигурации репозитория\nsudo sh -c 'echo \"deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main\" > /etc/apt/sources.list.d/pgdg.list'\n\n# Импортируем ключ для подписи репозитория\nwget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -\n\n# Обновляем список доступных пакетов\nsudo apt-get update\n\n# Устанавливаем последнюю версию PostgreSQL\nsudo apt-get -y install postgresql\n                ",className:"my-5",language:"bash"}),(0,s.jsxs)(l.xv,{p:!0,children:["После чего нужно выполнить начальные настройки. В самом простом виде нужно добавить возможность подключения со всех адресов. В файле ",(0,s.jsx)("b",{children:"postgresql.conf"})," в параметр ",(0,s.jsx)("b",{children:"listen_addresses"})," нужно поставить значение ",(0,s.jsx)("b",{children:"*"}),"."]}),(0,s.jsx)(t.Z,{code:"\nlisten_addresses = '*'\n                ",className:"my-5",language:"text"}),(0,s.jsxs)(l.xv,{p:!0,children:["Затем в файле ",(0,s.jsx)("b",{children:"pg_hba.conf"})," добавим запись, чтобы пользователи могли подключаться с любого адреса с помощью логина и пароля."]}),(0,s.jsx)(t.Z,{code:"\n# IPv4 local connections:\nhost  all   all   0.0.0.0/0   password\n                ",className:"my-5",language:"text"}),(0,s.jsx)(l.xv,{p:!0,children:"Перезапускаем PostgreSQL для принятия изменений."}),(0,s.jsx)(t.Z,{code:"\nsystemctl restart postgresql\n                ",className:"my-5",language:"bash"}),(0,s.jsxs)(l.xv,{p:!0,children:["Остается добавить пользователя в PostgreSQL для приложения или других целей. Для простоты добавим привилигированного пользователя ",(0,s.jsx)("b",{children:"confluence"}),"."]}),(0,s.jsx)(t.Z,{code:"\nsudo su postgres\n\npsql\n                ",className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"Далее запускаем команду SQL."}),(0,s.jsx)(t.Z,{code:"\nCREATE ROLE confluence LOGIN SUPERUSER PASSWORD 'passwordstring';\n                ",className:"my-5",language:"sql"}),(0,s.jsxs)(l.xv,{p:!0,children:["На рабочем окружении обязательно меняем настройки PostgreSQL для оптимальной работы СУБД.",(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(l.e9,{newTab:!0,href:"https://pgtune.leopard.in.ua",children:"Вот этот инструмент может помочь"})})})]}),(0,s.jsx)(l.xv,{p:!0,children:"Тепер можно приступить к установке Confluence."}),(0,s.jsx)(l.xv,{title:!0,className:"mt-10 md:text",children:"Установка Confluence"}),(0,s.jsxs)(l.xv,{p:!0,children:["Скачиваем установщик Confluence с ",(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(l.e9,{newTab:!0,href:"https://www.atlassian.com/ru/software/confluence/download-archives",children:"с официального сайта."})})})]}),(0,s.jsx)(t.Z,{code:"\nwget https://www.atlassian.com/software/confluence/downloads/binary/atlassian-confluence-7.17.1-x64.bin\n                ",className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"Делаем установщик доступным для запуска."}),(0,s.jsx)(t.Z,{code:"\nchmod a+x atlassian-confluence-7.17.1-x64.bin\n                ",className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"И, внезапно, запускаем!"}),(0,s.jsx)(t.Z,{code:"\n./atlassian-confluence-7.17.1-x64.bin\n\n# По итогу каталог приложения будет: /opt/atlassian/confluence\n# Каталог с данными: /var/atlassian/application-data/confluence\n                ",className:"my-5",language:"bash"}),(0,s.jsxs)(l.xv,{p:!0,children:["По окончанию установки можно перейти по адресу ",(0,s.jsx)("b",{children:"http://<адрес_сервера>:8090"})," и проверить доступность приложения. Выполнять шаги мастера установки сейчас не требуется, нужно подготовить лицензию."]}),(0,s.jsx)(l.xv,{p:!0,children:"Интерактивно отвечаем на все вопросы. В основном, для большинства случаев, можно оставить параметры по умолчанию."}),(0,s.jsx)(l.xv,{title:!0,className:"mt-10 md:text",children:"Установка лицензии"}),(0,s.jsx)(l.ty,{}),(0,s.jsx)(l.xv,{p:!0,children:(0,s.jsx)("b",{children:"ВНИМАНИЕ!!!"})}),(0,s.jsx)(l.xv,{p:!0,children:(0,s.jsx)("b",{children:"Информация ниже только для ознакомления и личного использования! Для коммерческого использования обязательно купите лицензию! Для изучения включите демоверсию. Далее информация только для ознакомления! Автор не несет ответственности за последствия!"})}),(0,s.jsx)(l.ty,{}),(0,s.jsx)(l.xv,{p:!0,children:"Для изучения полнофункциональных возможностей Confluence можно воспользоваться atlassian-agent и через него активировать лицензию на Confluence. Скачиваем atlassian-agent-v1.3.1.tar.gz."}),(0,s.jsx)(t.Z,{code:"\nwget https://gitee.com/pengzhile/atlassian-agent/attach_files/832832/download/atlassian-agent-v1.3.1.tar.gz\n                ",className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"Для хранения агента создадим каталог и скопируем туда файл запуска приложения, предварительно распаковав архив."}),(0,s.jsx)(t.Z,{code:"\nmkdir /opt/atlassian/atlassian-agent\ntar -xf atlassian-agent-v1.3.1.tar.gz \ncp atlassian-agent-v1.3.1/atlassian-agent.jar /opt/atlassian/atlassian-agent/atlassian-agent.jar\n                ",className:"my-5",language:"bash"}),(0,s.jsxs)(l.xv,{p:!0,children:["Согласно инструкции из репозитория, добавим установки переменной окружения ",(0,s.jsx)("b",{children:"JAVA_OPTS"})," в файл ",(0,s.jsx)("b",{children:"/opt/atlassian/confluence/bin/setenv.sh"}),". В самом начале файла нужно добавить такую строку:"]}),(0,s.jsx)(t.Z,{code:'\nexport JAVA_OPTS="-javaagent:/opt/atlassian/atlassian-agent/atlassian-agent.jar ${JAVA_OPTS}"\n                ',className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"А также добавим права пользователю Confluence на каталоги приложения (не обязательно, но лучше удостовериться):"}),(0,s.jsx)(t.Z,{code:"\nchown -R confluence:confluence /opt/atlassian/atlassian-agent\nchown -R confluence:confluence /opt/atlassian/confluence\nchown -R confluence:confluence /var/atlassian/application-data\n                ",className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"Остается перезапустить службу и можно приступить к регистрации."}),(0,s.jsx)(t.Z,{code:"\nsystemctl restart confluence\n                ",className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"Рекомендую перед этим перезапустить хост и проверить состояние службы."}),(0,s.jsx)(t.Z,{code:"\nreboot\n\n# Ждем перезапуска...\n\nsystemctl status confluence\n                ",className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"Если ошибок нет, то идем дальше."}),(0,s.jsx)(l.xv,{title:!0,className:"mt-10 md:text",children:"Регистрация"}),(0,s.jsxs)(l.xv,{p:!0,children:["И так, заходим на страницу Confluence, выбираем установку продукта (Production Installation). На первой странице нам представят код вида ",(0,s.jsx)("b",{children:"XXXX-XXXX-XXXX-XXXX"}),". Сохраните его для следующих шагов."]}),(0,s.jsx)(l.xv,{p:!0,children:"В консоли выполняем команду."}),(0,s.jsx)(t.Z,{code:"\njava -jar /opt/atlassian/atlassian-agent/atlassian-agent.jar -mail 'my@email.com' -n userName -o CompanyName -p conf -s XXXX-XXXX-XXXX-XXXX\n                ",className:"my-5",language:"bash"}),(0,s.jsx)(l.xv,{p:!0,children:"На следующем шаге выбираем “My own database”, чтобы настроить параметры подключения к базе данных самостоятельно. Тут нужно ввести имя сервера БД, тип (в нашем случае PostgreSQL), порт (5432), имя базы (предварительно нужно создать пустую базу и дать доступ для пользователя), пользователя и пароль. Перед переходом на следующий этап, мастер создаст необходимые объекты базы данных."}),(0,s.jsx)(l.xv,{p:!0,children:"Следующий шаг - это выбор с чего начать. Если установка происходит с нуля, то рекомендую создать пример сайта. Потом его можно удалить и вообще сделать с контеному все что необходимо. Также будет предлоежно подключиться к Jira в части настройки доступа, но в простых случаях можно остаться на системе управления пользователей самого Confluence."}),(0,s.jsxs)(l.xv,{p:!0,children:["Если выбрали второе, то настраивайте учетную запись администратора для продолжения. После чего создаете первое пространство и начинаете наводить порядок ",":)"]}),(0,s.jsx)(l.xv,{title:!0,className:"mt-10 md:text",children:"Что дальше"}),(0,s.jsxs)(l.xv,{p:!0,children:["Далее по обстоятельствам настраиваете пространства, восстанавливайте данные из бэкапов, настраиваете доступы и так далее. В общем, можно работать ",":)"]}),(0,s.jsx)(l.xv,{title:!0,className:"mt-10 md:text",children:"Полезные ссылки"}),(0,s.jsxs)(l.aV,{children:[(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(l.e9,{newTab:!0,href:"https://forum.ru-board.com/topic.cgi?forum=35&topic=19000&start=1880",children:"Atlassian Stack - Jira Confluence Bitbucket и остальное"})})})}),(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(l.e9,{newTab:!0,href:"https://www.dmosk.ru/miniinstruktions.php?mini=jira-ubuntu",children:"Установка и настройка Jira на Ubuntu"})})})}),(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(l.e9,{newTab:!0,href:"https://programmer.group/docker-installs-jira-and-confluence-cracked-version.html",children:"Docker installs JIRA and Confluence (cracked version)"})})})}),(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(l.e9,{newTab:!0,href:"https://github.com/hgqapp/atlassian-agent",children:"atlassian-agent"})})})}),(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(l.e9,{newTab:!0,href:"https://github.com/ipwnosx/Atlassian-Agent",children:"atlassian-agent by ipwnosx"})})})}),(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(l.e9,{newTab:!0,href:"https://confluence.atlassian.com/confkb/confluence-installation-fails-with-set-up-step-error-java-sql-sqlsyntaxerrorexception-user-lacks-privilege-or-object-not-found-bandana-390497283.html",children:"Confluence installation fails with set up step error"})})})}),(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:(0,s.jsx)("u",{children:(0,s.jsx)(l.e9,{newTab:!0,href:"https://confluence.atlassian.com/doc/installing-confluence-on-linux-143556824.html",children:"Installing Confluence on Linux"})})})})]})]})},9963:function(e,n,a){"use strict";var s,l;a.d(n,{b:function(){return s}}),(l=s||(s={})).Min="350px",l.Standard="700px",l.Large="1000x",l.Unlimited=""},6671:function(e,n,a){"use strict";var s=a(7340),l=a(5893),t=a(7294),c=a(4965),i=a(4275),r=a(964),d=a(9963);function o(){let e=(0,s._)(["\n        text-align: left;\n        overflow: hidden;\n        font-size: 14px;\n        border-radius: 6px;\n        overflow: auto;\n\n        & .token-line {\n            line-height: 1.3em;\n            height: 1.3em;\n        }\n    "]);return o=function(){return e},e}function x(){let e=(0,s._)(["\n        max-height: ","\n    "]);return x=function(){return e},e}n.Z=e=>{let{code:n,className:s,language:h,maxHeight:u=d.b.Standard}=e;(void 0!==a.g?a.g:window).Prism=c.p1,a(1354),a(9016),a(5266),a(2927),a(1315),a(7874),a(6862);let p=null!=u?u:d.b.Standard,j=r.ZP.pre(o()),m=(0,r.ZP)(j)(x(),p);return(0,l.jsx)("div",{className:(0,i.GF)("bg-blue-500 md:p-1 p-2",s),children:(0,l.jsx)("div",{className:"shadow-lg",children:(0,l.jsx)(c.y$,{theme:c.np.vsDark,code:n.trim(),language:null!=h?h:h="tsx",children:e=>{let{className:n,style:a,tokens:s,getLineProps:c,getTokenProps:i}=e;return(0,l.jsx)(m,{className:n,style:a,children:s.map((e,n)=>(0,t.createElement)("div",{...c({line:e,key:n}),key:Math.random()},e.map((e,n)=>(0,t.createElement)("span",{...i({token:e,key:n}),key:Math.random()}))))})}})})})}},9305:function(e,n,a){"use strict";a.d(n,{Ee:function(){return i},Xg:function(){return t},Y7:function(){return x},aV:function(){return d},e9:function(){return o},o_:function(){return h},ty:function(){return r},xv:function(){return c}});var s=a(5152),l=a.n(s);let t=l()(()=>Promise.all([a.e(4838),a.e(4738),a.e(1664),a.e(7167)]).then(a.bind(a,7167)),{loadableGenerated:{webpack:()=>[7167]}}),c=l()(()=>a.e(9179).then(a.bind(a,9179)),{loadableGenerated:{webpack:()=>[9179]}}),i=l()(()=>a.e(1974).then(a.bind(a,1974)),{loadableGenerated:{webpack:()=>[1974]}}),r=l()(()=>a.e(8547).then(a.bind(a,8547)),{loadableGenerated:{webpack:()=>[8547]}}),d=l()(()=>a.e(6806).then(a.bind(a,6806)),{loadableGenerated:{webpack:()=>[6806]}}),o=l()(()=>Promise.all([a.e(1664),a.e(1465)]).then(a.bind(a,1465)),{loadableGenerated:{webpack:()=>[1465]}});l()(()=>a.e(567).then(a.bind(a,567)),{loadableGenerated:{webpack:()=>[567]}});let x=l()(()=>Promise.all([a.e(2004),a.e(4139)]).then(a.bind(a,4139)),{loadableGenerated:{webpack:()=>[4139]}}),h=l()(()=>Promise.all([a.e(3811),a.e(7472),a.e(584),a.e(7870)]).then(a.bind(a,7870)),{loadableGenerated:{webpack:()=>[7870]}})}},function(e){e.O(0,[1102,2888,9774,179],function(){return e(e.s=8979)}),_N_E=e.O()}]);