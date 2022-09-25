---
layout: post
title: Установка Confluence + лицензия
categories: devOooops
background: '/img/posts/2022/2022-04-11-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0%20Confluence%20%2B%20%D0%BB%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F/logo.png'
---

---
**ВНИМАНИЕ!!!**

Информация ниже относительно настройки лицензии только для ознакомления и личного использования!
Для коммерческого использования обязательно купите лицензию! Для изучения включите демоверсию.
Далее информация только для ознакомления! Автор не несет ответственности за последствия!

---

## Подготовка

Установим все последние обновления.

```bash
apt update
apt upgrade
```

После установим нужны часовой пояс сервера.

```bash
timedatectl set-timezone Europe/Moscow
```

Проверим, что параметры установлены корректно.

```bash
date

# Пример вывода:
# Sun 10 Apr 2022 09:49:47 PM MSK
```

Не забываем установить Java:

```bash
apt-get install default-jdk
```

Идем дальше.

## Установим СУБД

Установка PostgreSQL для работы базы данных Confluence. На момент написания инструкции это 14 версия СУБД.

```bash
# Создаем файл конфигурации репозитория
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Импортируем ключ для подписи репозитория
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Обновляем список доступных пакетов
sudo apt-get update

# Устанавливаем последнюю версию PostgreSQL
sudo apt-get -y install postgresql
```

После чего нужно выполнить начальные настройки. В самом простом виде нужно добавить возможность подключения со всех адресов. В файле **postgresql.conf"" в параметр **listen_addresses** нужно поставить значение *****.

```bash
listen_addresses = '*'
```

Затем в файле **pg_hba.conf** добавим запись, чтобы пользователи могли подключаться с любого адреса с помощью логина и пароля.

```bash
# IPv4 local connections:
host  all   all   0.0.0.0/0   password
```

Перезапускаем PostgreSQL для принятия изменений.

```bash
systemctl restart postgresql
```

Остается добавить пользователя в PostgreSQL для приложения или других целей. Для простоты добавим привилигированного пользователя **confluence**.

```bash
sudo su postgres

psql
```

Далее запускаем команду SQL.

```sql
CREATE ROLE confluence LOGIN SUPERUSER PASSWORD 'passwordstring';
```

На рабочем окружении обязательно меняем настройки PostgreSQL для оптимальной работы СУБД. (Вот этот инструмент может помочь](https://pgtune.leopard.in.ua/#/).

Тепер можно приступить к установке Confluence.

## Установка Confluence

Скачиваем установщик Confluence [с официального сайта](https://www.atlassian.com/ru/software/confluence/download-archives).

```bash
wget https://www.atlassian.com/software/confluence/downloads/binary/atlassian-confluence-7.17.1-x64.bin
```

Делаем установщик доступным для запуска.

```bash
chmod a+x atlassian-confluence-7.17.1-x64.bin
```

И, внезапно, запускаем!

```bash
./atlassian-confluence-7.17.1-x64.bin

# По итогу каталог приложения будет: /opt/atlassian/confluence
# Каталог с данными: /var/atlassian/application-data/confluence
```

По окончанию установки можно перейти по адресу **http://<адрес_сервера>:8090** и проверить доступность приложения. Выполнять шаги мастера установки сейчас не требуется, нужно подготовить лицензию.

Интерактивно отвечаем на все вопросы. В основном, для большинства случаев, можно оставить параметры по умолчанию.

## Установка лицензии

---
**ВНИМАНИЕ!!!**

Информация ниже только для ознакомления и личного использования!
Для коммерческого использования обязательно купите лицензию! Для изучения включите демоверсию.
Далее информация только для ознакомления! Автор не несет ответственности за последствия!

---

Для изучения полнофункциональных возможностей Confluence можно воспользоваться [atlassian-agent](https://github.com/ipwnosx/Atlassian-Agent) и через него активировать лицензию на Confluence. Для этого идем по ссылке с репозитория [сюда](https://gitee.com/pengzhile/atlassian-agent/releases). Скачиваем [atlassian-agent-v1.3.1.tar.gz](https://gitee.com/pengzhile/atlassian-agent/attach_files/832832/download/atlassian-agent-v1.3.1.tar.gz).

```bash
wget https://gitee.com/pengzhile/atlassian-agent/attach_files/832832/download/atlassian-agent-v1.3.1.tar.gz
```

Для хранения агента создадим каталог и скопируем туда файл запуска приложения, предварительно распаковав архив.

```bash
mkdir /opt/atlassian/atlassian-agent
tar -xf atlassian-agent-v1.3.1.tar.gz 
cp atlassian-agent-v1.3.1/atlassian-agent.jar /opt/atlassian/atlassian-agent/atlassian-agent.jar
```

Согласно инструкции из репозитория, добавим установки переменной окружения **JAVA_OPTS** в файл **/opt/atlassian/confluence/bin/setenv.sh**. В самом начале файла нужно добавить такую строку:

```bash
export JAVA_OPTS="-javaagent:/opt/atlassian/atlassian-agent/atlassian-agent.jar ${JAVA_OPTS}"
```

А также добавим права пользователю Confluence на каталоги приложения (не обязательно, но лучше удостовериться):

```bash
chown -R confluence:confluence /opt/atlassian/atlassian-agent
chown -R confluence:confluence /opt/atlassian/confluence
chown -R confluence:confluence /var/atlassian/application-data
```

Остается перезапустить службу и можно приступить к регистрации.

```bash
systemctl restart confluence
```

Рекомендую перед этим перезапустить хост и проверить состояние службы.

```bash
reboot

# Ждем перезапуска...

systemctl status confluence
```

Если ошибок нет, то идем дальше.

## Регистрация

И так, заходим на страницу Confluence, выбираем установку продукта (Production Installation). на первой странице нам представят код вида **XXXX-XXXX-XXXX-XXXX**. Сохраните его для следующих шагов.

В консоли выполняем команду.

```bash
java -jar /opt/atlassian/atlassian-agent/atlassian-agent.jar -mail 'my@email.com' -n userName -o CompanyName -p conf -s XXXX-XXXX-XXXX-XXXX
```

В ответ Вы получите лицензионный ключ, который нужно ввести на веб-странице.

На следующем шаге выбираем "My own database", чтобы настроить параметры подключения к базе данных самостоятельно. Тут нужно ввести имя сервера БД, тип (в нашем случае PostgreSQL), порт (5432), имя базы (предварительно нужно создать пустую базу и дать доступ для пользователя), пользователя и пароль. Перед переходом на следующий этап, мастер создаст необходимые объекты базы данных.

Следующий шаг - это выбор с чего начать. Если установка происходит с нуля, то рекомендую создать пример сайта. Потом его можно удалить и вообще сделать с контеному все что необходимо. Также будет предлоежно подключиться к Jira в части настройки доступа, но в простых случаях можно остаться на системе управления пользователей самого Confluence.

Если выбрали второе, то настраивайте учетную запись администратора для продолжения. После чего создаете первое пространство и начинаете наводить порядок :)

## Что дальше

Далее по обстоятельствам настраиваете пространства, восстанавливайте данные из бэкапов, настраиваете доступы и так далее. В общем, можно работать :)

## Полезные ссылки

* [Atlassian Stack - Jira Confluence Bitbucket и остальное](https://forum.ru-board.com/topic.cgi?forum=35&topic=19000&start=1880)
* [Установка и настройка Jira на Ubuntu](https://www.dmosk.ru/miniinstruktions.php?mini=jira-ubuntu)
* [Docker installs JIRA and Confluence (cracked version)](https://programmer.group/docker-installs-jira-and-confluence-cracked-version.html)
* [atlassian-agent](https://github.com/hgqapp/atlassian-agent)
* [atlassian-agent by ipwnosx](https://github.com/ipwnosx/Atlassian-Agent)
* [Confluence installation fails with set up step error](https://confluence.atlassian.com/confkb/confluence-installation-fails-with-set-up-step-error-java-sql-sqlsyntaxerrorexception-user-lacks-privilege-or-object-not-found-bandana-390497283.html)
* [Installing Confluence on Linux](https://confluence.atlassian.com/doc/installing-confluence-on-linux-143556824.html)