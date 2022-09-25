---
layout: post
title: Потоковая репликация PostgreSQL
categories: postgresql
background: '/img/posts/2022/2022-03-25-%D0%9F%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F%20%D1%80%D0%B5%D0%BF%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F%20PostgreSQL/logo.png'
---

Рассмотрим что такое потоковая реплиакция в PostgreSQL и как ее настроить.

**[Потоковая репликация (Streaming Replication)](https://wiki.postgresql.org/wiki/Streaming_Replication)** - это репликация, при которой от основного сервера PostgreSQL на реплики передается WAL (Write Ahead Log). И каждая реплика затем по этому журналу изменяет свои данные. Для настройки такой репликации все серверы должны быть одной версии, работать на одной ОС и архитектуре.

Шаги настройки:

1. Настройка master-сервера
2. Настройка доп. сервера (slave)
3. Тестирование репликации

Все действия в инструкции выполняются на PostgreSQL 14 и Ubuntu 20.04, но в целом инструкция актуальная для предыдущих (и возможно будущих) версий. Есть некоторые отличия версия PostgreSQL до 12 версии, о них смотрите в документации.

В нашем примере у нас будут два сервера:

* Основной (master) с адресом 192.168.233.140
* Дополнительный (slave) с адресом 192.168.233.141

Поехали!

## Настройка master-сервера

Первым делом открываем "postgresql.conf" и изменяем в нем параметры.

```bash
# Определяет как много информации записывать в WAL. 
# Со значением replica в журнал записываются данные для поддержки архивирования WAL и репликации.
# В т.ч. для запросов только на чтение.
# wal_level = hot_standby - для версий до 9.6
# https://www.postgresql.org/docs/9.6/runtime-config-wal.html
wal_level = replica

# Число одновременных подключений для резервных серверов. Жалательно установить на 1 подключение
# больше, чем фактическое количество резервных серверов, т.к. в случае неожиданного отключения
# старое соединение будет некоторое время использоваться.
# https://www.postgresql.org/docs/9.4/runtime-config-replication.html
max_wal_senders = 10

# Задает минимальный размер в мегабайтах сегментов файлов журнала, хранящихся в каталоге pg_wal, на случай,
# если резервному серверу потребуется извлечь их для потоковой репликации.
# В ранних версиях параметр назывался wal_keep_segments и указывал количество файлов, а не их размер.
# https://www.postgresql.org/docs/13/runtime-config-replication.html
wal_keep_size = 1024
```

Создадим пользователя **replication**, чтобы через него дополнительный сервер мог подключаться к основному.

```bash
sudo -u postgres psql
CREATE ROLE replication WITH REPLICATION PASSWORD '<superpassrowd>' LOGIN;
```

В файле pg_hba.conf разрешаем подключение этому пользователю.

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    replication     replication     192.168.233.0/24         md5
```

И перезапускаем PostgreSQL.

```bash
systemctl restart postgresql
```

## Настройка доп. сервера (slave)

Останавливаем PostgreSQL.

```bash
systemctl stop postgresql
```

Очищаем всё, что внутри data_directory, т.к. мы скопируем эти файлы с основного сервера.

```bash
rm -Rf /var/lib/pgsql/data/*
```

Копируем текущее состояние с основного сервера на дополнительный.

```bash
# В предыдущих версиях параметр wal-method=stream назывался xlog-method=stream,
# поэтому смотрите документацию для вашей версии PostgreSQL.
su postgres -c "pg_basebackup -h 192.168.233.140 -D /var/lib/pgsql/data -P -U replication --wal-method=stream"
```

Далее вносим изменения в файл postgresql.conf.

```bash
# Создает возможность выполнять запросы в момент восстановления транзакций.
# https://www.postgresql.org/docs/9.0/hot-standby.html
hot_standby = on

# Строка подключения к основному серверу
# https://www.postgresql.org/docs/12/runtime-config-replication.html
primary_conninfo = 'user=replication password=<superpassrowd> host=192.168.233.140 port=5432 sslmode=prefer sslcompression=1 krbsrvname=postgres'
```

Чтобы репликация заработала, также в каталоге с данными (обычно где файл конфигурации сервера) нужно создать файл standby.signal.

```bash
touch standby.signal
chown postgres:postgres standby.signal
```

Теперь все готово для запуска службы!

```bash
systemctl start postgresql
```

Профит!

## Тестирование репликации

Создадим на основном сервере базу AmazingReplication, а в ней таблицу "TestReplication".

```sql
CREATE TABLE "TestReplication" ("SomveValue" varchar(100));
INSERT INTO "TestReplication" VALUES ('test 1');
INSERT INTO "TestReplication" VALUES ('test 2');
INSERT INTO "TestReplication" VALUES ('test 3');
```

Практически сразу на дополнительном сервере появится эта база данных и можно выполнить запрос.

```sql
select
    *
from "TestReplication"
```

В результате мы должны получить три записи, которые мы добавили выше. Если так - то дело сделано.
А если нет, то Вам путь в логи сервера PostgreSQL для поиска проблем.

## Вместо заключения

PostgreSQL имеет множество [механизмов репликации данных](https://www.postgresql.org/docs/9.1/high-availability.html), которые позволяют организовать горизонтальное масштабирование, повысить уровень отказоустойчивости и так далее. Мы рассмотрели простую настройку [потоковой репликации](https://www.postgresql.org/docs/9.1/warm-standby.html#STREAMING-REPLICATION), которая чем-то похожа на [механизм групп высокой доступности AlwaysOn в SQL Server](https://github.com/YPermitin/SQLServerTools/tree/master/SQL-Server-AlwaysOn). Различний, конечно, очень много. Как и нюансов работы, но принцип тот же - передача записей лога транзакций на реплики.

Другая информация по PostgreSQL [может быть найдена в этом репозитории](https://github.com/YPermitin/PGTools).

## Полезные материалы

* [Трансляция журналов на резервные серверы](https://postgrespro.ru/docs/postgrespro/10/warm-standby)
* [Streaming Replication Protocol](https://www.postgresql.org/docs/9.5/protocol-replication.html)
* [Setup PostgreSQL 14 Streaming Replication](https://girders.org/postgresql/2021/11/05/setup-postgresql14-replication/)
* [Потоковая репликация в PostgreSQL](https://itproffi.ru/potokovaya-replikatsiya-v-postgresql/)
* [Как настроить репликацию в PostgreSQL](https://selectel.ru/blog/tutorials/how-to-set-up-replication-in-postgresql/)
* [Потоковая репликация в PostgreSQL и пример фейловера](https://eax.me/postgresql-replication/)
* [PostgreSQL 10 — Потоковая репликация с отработкой фейловера](https://adminguide.ru/2019/04/07/postgresql-10-потоковая-репликация-с-отработкой/)
