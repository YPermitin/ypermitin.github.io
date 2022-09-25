---
layout: post
title: Установка и настройка выделенного сервера Valheim на Ubuntu 20.04
categories: games
background: '/img/posts/2022/2022-05-26-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0%20%D0%B8%20%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0%20%D0%B2%D1%8B%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE%20%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%B0%20Valheim%20%D0%BD%D0%B0%20Ubuntu%2020.04/logo.png'
---

Простейшая инструкция по установке игрового сервера Valheim на Ubuntu 20.04 + полезная информация по теме.

## Настройка портов

Должны быть открыты порты по UDP:

```bash
2456 2457 2458 27060
```

При использовании UFW (Uncomplicated Firewall) делаем так:

```bash
sudo ufw allow 2456/udp
sudo ufw allow 2457/udp
sudo ufw allow 2458/udp
sudo ufw allow 27060/udp
```

## Подготовка операционной системы

Некоторые шаги для общей настройки сервера.

### Настройка часового пояса

Первым делом проверяем текущую дату и время, а также часовой пояс на сервере.

```bash
timedatectl
```

При необходимости меняем часовой пояс, чтобы он больше подходил для клиентов сервера.

```bash
sudo timedatectl set-timezone Europe/Moscow
```

Список всех доступных часовых поясов смотрим здесь так.

``` bash
timedatectl list-timezones
```

### Установка обновлений

Тут все стандартно. Проверяем наличие обновлений пакетов и устанавливаем обновления.

```bash
sudo apt update
sudo apt upgrade
```

## Установка Valheim Server

Для установки воспользуемся проектом [LinuxGSM](https://linuxgsm.com/). Сначала нам нужно установить все необходимые компоненты.

```bash
sudo dpkg --add-architecture i386; sudo apt update; sudo apt install curl wget file tar bzip2 gzip unzip bsdmainutils python util-linux ca-certificates binutils bc jq tmux netcat lib32gcc1 lib32stdc++6 steamcmd
```

```bash
sudo apt remove --purge nodejs npm
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt update && sudo apt install -y nodejs
npm install gamedig -g
sudo npm install gamedig -g
sudo npm update -g
sudo npm list -g gamedig
```

Переходим в каталог пользователя, от которого будет работать сервер, и создаем каталог для файлов приложения.

```bash
cd /home/<username>
mkdir linuxgsm
cd linuxgsm
```

После этого запускаем непосредственно установку сервера Valheim.

```bash
wget -O linuxgsm.sh https://linuxgsm.sh && chmod +x linuxgsm.sh && bash linuxgsm.sh vhserver
./vhserver install
```

Готово!

## Настройка сервера Valheim

Переходим в каталог с файлами конфигурации сервера.

```bash
cd ~/lgsm/config-lgsm/vhserver
ls
```

Делаем бэкап текущего файла конфигурации и заменяем конфигурацию стандартной.

```bash
mv common.cfg common.cfg.old
cp _default.cfg common.cfg
```

Далее открываем файл конфигурации в любимом редакторе и меняем его под себя.

```bash
mcedit common.cfg
```

Настройки, которые нужно поменять в первую очередь:

* **servername** - имя сервера.
* **serverpassword** - пароль для входа на сервер.
* **port** - порт сервера. По умолчанию 2456.
* **gameworld** - имя игрового мира. По умолчанию совпадает с именем сервера.
* **public** - поставить 1, если сервер должен быть виден сообществу.

И некоторые необязательные настройки:

* **stats** - позволить собирать статистику использования проекту LinuxGSM.
* **updateonstart** - обновление сервера при старте. Рекомендую включить.
* **Alert settings** - настройка уведомлений о событиях сервера, в т.ч. в Телеграм. Смотрите официальную документацию по каждому каналу доставки сообщений.

Также обратить внимание на настройки бэкапирования. Подробная информация в [официальной документации](https://docs.linuxgsm.com/).

## Настройка запуска сервера

Для автоматического запуска игрового сервера воспользуемся возможностями systemd.

```bash
sudo mcedit /etc/systemd/system/vhserver.service
```

Файл должен иметь примерно такое содержимое (поправьте пути к файлам искриптам).

```bash
[Unit]
Description=LinuxGSM Valheim Server
After=network-online.target
Wants=network-online.target

[Service]
Type=forking
User=<user>
WorkingDirectory=/home/<user>/linuxgsm
RemainAfterExit=yes 
ExecStart=/home/<user>/linuxgsm/vhserver start
ExecStop=/home/<user>/linuxgsm/vhserver stop
Restart=no

[Install]
WantedBy=multi-user.target
```

Замените <user> нужным значением, т.е. именем пользователя, от которого будет работать игровой сервер.

После этого обновляем настройки systemd и включаем службу.

```bash
sudo systemctl daemon-reload
sudo systemctl enable vhserver.service
```

Теперь сервер запускается автоматически!
  
## Бэкапирование

Для выполнения бэкапа сервера достаточно выполнить команду.
  
```bash
/home/user/linuxgsm/vhserver backup
```

Сервер будет остановлен и все файлы будут сохранены в архив по адресу "/home/<ser/linuxgsm/lgsm/backup". Далее можно отправлять их в облако для надежности.
  
Есть нюанс! По умолчанию файлы игрокового мира находятся вне каталога сервера Valheim. Если сам сервер мы установили в "/home/user/linuxgsm", то файлы игрового мира находятся в "/home/user/.config/unity3d/IronGate/Valheim/worlds". 

Рекомендую остановить сервер, переместить каталог "/home/user/.config/unity3d" в "/home/user/linuxgsm/unity3d", а в файле "/home/user/linuxgsm/lgsm/config-lgsm/vhserver/common.cfg" изменить параметр "savedir" на новое значение. 
  
После запустить сервер. Тогда бэкап игрового сервера будет включать и файлы игрового мира.
  
## Уведомления о действиях на сервере

Можно настроить уведомления в Telegram-канал о действиях на сервере:
  
* Вход/выход пользователя на сервер
* Респаун игроков
* Смерть игроков
* Событие общего сна на сервере, когда ночное время пропускается.
* [Случайные события](https://valheim.fandom.com/wiki/Events).
* Запуск сервера
* Остановка сервера
  
Для этого воспользуйтесь проектом [valheim-notify](https://github.com/Whiskey24/valheim-notify) от [Whiskey24](https://github.com/Whiskey24).
  
## Команды сервера

Только администраторы сервера могут запускать эти команды.

| Command | Args           | Description                                                  |
| ------- | -------------- | ------------------------------------------------------------ |
| help    |                | Список всех доступных команд                                 |
| kick    | name/ip/userID | Отключить пользователя                                       |
| ban     | name/ip/userID | Забанить пользователя                                        |
| unban   | /ip/userID     | Отменить бан пользователя                                    |
| banned  |                | Список забаненых пользователей                               |
| ping    |                | Проверить пинг сервера для диагностики задержек              |
| info    |                | Системная информация                                         |

## Полезные ссылки

* [Building a Dedicated Valheim Server on Ubuntu Server 20.04](https://jp-powers.com/building-a-dedicated-valheim-server-on-ubuntu-server-20-04/) - самая подробная инструкция по настройке выделенного сервера Valheim.
* [Valheim server commands list](https://ag.hyperxgaming.com/article/11422/valheim-server-commands-list) - список команд сервера.
* [Valheim Dedicated Server Setup on Ubuntu 20.04.1 LTS](https://gist.github.com/mattiasghodsian/c988e8c8954be46f35c33311f26f0c50) - еще одна краткая инструкция по настройке выделенного сервера Valheim.