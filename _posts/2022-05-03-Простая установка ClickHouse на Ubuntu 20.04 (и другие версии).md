---
layout: post
title: Простые шаги по установке Clickhouse на Ubuntu 20.04 и другие версии.
categories: clickhouse
background: '/img/posts/2022/2022-05-03-%D0%9F%D1%80%D0%BE%D1%81%D1%82%D0%B0%D1%8F%20%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0%20ClickHouse%20%D0%BD%D0%B0%20Ubuntu%2020.04%20(%D0%B8%20%D0%B4%D1%80%D1%83%D0%B3%D0%B8%D0%B5%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8)/logo.png'
---

Набор действий для настройки локализации в системе Ubuntu 20.04 на русскую.

## Установка

Подробные сведения об установке можно найти в [официальной документации](https://clickhouse.com/docs/ru/getting-started/install). 

В Ubuntu будет выполнять установку из DEB-пакетов.

```bash
sudo apt-get install -y apt-transport-https ca-certificates dirmngr
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 8919F6BD2B48D754

echo "deb https://packages.clickhouse.com/deb stable main" | sudo tee \
    /etc/apt/sources.list.d/clickhouse.list
sudo apt-get update

sudo apt-get install -y clickhouse-server clickhouse-client
```

При установке будет запрошен пароль для пользователя **default**, поставьте его на свое усмотрение.

## Начальная настройка

Первым делом разрешим подключаться к серверу с других хостов.

Идем в файл **/etc/clickhouse-server/config.xml** и находим настройку **<listen_host>::</listen_host>**. Раскомментируем ее.

```
...
    <!-- Listen specified address.
         Use :: (wildcard IPv6 address), if you want to accept connections both with IPv4 and IPv6 from everywhere.
         Notes:
         If you open connections from wildcard address, make sure that at least one of the following measures applied:
         - server is protected by firewall and not accessible from untrusted networks;
         - all users are restricted to subset of network addresses (see users.xml);
         - all users have strong passwords, only secure (TLS) interfaces are accessible, or connections are only made via TLS interfaces.
         - users without password have readonly access.
         See also: https://www.shodan.io/search?query=clickhouse
      -->
    <listen_host>::</listen_host>
...
```

Далнее в файле **/etc/clickhouse-server/users.xml** разрешаем управление пользователями и их правами доступа через SQL-команды для пользователя default.

Находим **<access_management>1</access_management>** и раскомментируем ее.

```
...
            <!-- Settings profile for user. -->
            <profile>default</profile>

            <!-- Quota for user. -->
            <quota>default</quota>

            <!-- User can create other users and grant rights to them. -->
            <access_management>1</access_management>
...
```

Готово!

## Запускаем и проверяем

Далее запускаем демон сервера ClickHouse и подключаемся стандартным клиентом **clickhouse-client**.

```bash
sudo service clickhouse-server start
clickhouse-client # или "clickhouse-client --password" если был установлен пароль пользователю default
```

Подключение должно пройти успешно.

## Полезные ссылки

* [Репозиторий с полезной информацией по ClickHouse](https://github.com/YPermitin/ClickHouseTools)
* [Установка ClickHouse Server](https://clickhouse.com/docs/ru/getting-started/install)
* [Интерфейсы для работы с ClickHouse](https://clickhouse.com/docs/en/interfaces)
* [DBeaver - GUI-утилита для работы с ClickHouse и не только](https://github.com/dbeaver/dbeaver/wiki/Clickhouse)
