---
layout: post
title: Отправка файлов в Yandex Disk через REST API из Bash
categories: devOooops
background: '/img/posts/2022/2022-04-04-%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D0%BA%D0%B0%20%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2%20%D0%B2%20Yandex%20Disk%20%D1%87%D0%B5%D1%80%D0%B5%D0%B7%20REST%20API%20%D0%B8%D0%B7%20Bash/logo.png'
---

Пример выгрузки файлов на Яндекс.Диск из Bash через [официальный REST API](https://yandex.ru/dev/disk/rest/).

## Подготовка токена для работы с API

Тут все просто.

1. Идем [по ссылке](https://oauth.yandex.ru/) и входим под нужной учетной записью Яндекса, после чего нажимаем "Зарегистрировать новое приложение".
2. Настраиваем новое приложение:
    * Заполняем название приложения и его описание.
    * Даем права для работы с API, а именно в разделе "Яндекс.Диск REST API" отмечаем "Доступ к информации о Диске" и "Доступ к папке приложения на Диске". 
    * В разделе "Платформы" устанавливаем флаг "Веб-сервисы", после чего заполняем параметр "Callback URL", нажав на "Подставить URL для разработки".
    * Другие параметры приложения используйте по необходимости.
3. После сохранения будет выполнено перенаправление на страницу с данными нового приложения. Сохраняем эту информацию себе.
4. Переходим по ссылке и разрешаем доступ приложения.
```
https://oauth.yandex.ru/authorize?response_type=token&client_id=<ЗдесьIdПриложенияИзПрошлогоПункта>
```
5. После подтверждения получим токен для работы с API, который будет действовать 1 год.
6. Профит!

## Отправляем файл

Вот простой скрипт для отправки файла на Яндекс.Диск. По необходимости в скрипт можно добавить проверки ошибок, логирование и так далее. Здесь лишь простейший пример.

```bash
#!/bin/bash

FILENAME="somefile.txt"
FILEPATH="/home/<username>/$FILENAME"
TOKEN='<ТокенЯндексДискAPI>'

# Простая функция для парсинга свойств из JSON
function parseJson()
{
    local output
    regex="(\"$1\":[\"]?)([^\",\}]+)([\"]?)"
    [[ $2 =~ $regex ]] && output=${BASH_REMATCH[2]}
    echo $output
}

# Функция для отправки файла
function sendFile
{
    echo "Start sending a file: $1"

    # Получаем URL для загрузки файла
    sendUrlResponse=`curl -s -H "Authorization: OAuth $TOKEN" https://cloud-api.yandex.net:443/v1/disk/resources/upload/?path=app:/$FILENAME&overwrite=true`
    sendUrl=$(parseJson 'href' $sendUrlResponse)
....
    # Отправляем файл
    sendFileResponse=`curl -s -T $FILEPATH -H "Authorization: OAuth $TOKEN" $sendUrl`
....
    echo "Completing a file upload: $1"
}

sendFile $FILEPATH
```

Найти эти файлы в веб-интерфейсе можно перейдя на Яндекс.Диск в браузере, далее зайти в папку "Приложения". В ней вы увидите подкаталог с именем приложения, там все файлы и будут расположены.

## Полезные ссылки

* [Официальная документация](https://yandex.ru/dev/disk/rest/)
* [Скрипт бекапа на Яндекс.Диск](https://neblog.info/skript-bekapa-na-yandeks-disk)
* [Bash скрипт создание резервных копий на Яндекс.Диск](https://www.poseti.net/articles/rezervnoe-kopirovanie-na-yandeks-disk)
* [Скрипт бекапа сайта и баз данных на яндекс диск с отправкой смс и удалением старых архивов](http://placecity.ru/idea/skripty/bekap-na-yandeks-disk)
