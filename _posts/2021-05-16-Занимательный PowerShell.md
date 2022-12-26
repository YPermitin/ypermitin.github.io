---
layout: post
title: Занимательный PowerShell
categories: powershell
background: '/img/posts/2021/2021-05-16-%D0%97%D0%B0%D0%BD%D0%B8%D0%BC%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/logo.png'
---

PowerShell. Что, зачем, как и почему?

## Оглавление

- [Что это и зачем](#что-это-и-зачем)
- [Немного об установке](#немного-об-установке)
- [Инструментарий](#инструментарий)
- [Спектр задач](#спектр-задач)
  - [Установка и настройка 1С](#установка-и-настройка-1с)
    - [Список установленных версий платформы](#список-установленных-версий-платформы)
    - [Установка одной командой](#установка-одной-командой)
  - [Управление службой](#управление-службой)
    - [Список установленных служб с информацией](#список-установленных-служб-с-информацией)
    - [Запуск, остановка, перезапуск](#запуск-остановка-перезапуск)
  - [Старый, добрый COM](#старый-добрый-com)
    - [Проверка регистрации COM](#проверка-регистрации-com)
    - [Регистрация COM](#регистрация-com)
    - [Отмена регистрации COM](#отмена-регистрации-com)
  - [Кластер под контролем](#кластер-под-контролем)
    - [Информация о кластере](#информация-о-кластере)
    - [Регистрация и запуск консоли управления кластером](#регистрация-и-запуск-консоли-кластера)
    - [Завершаем все сеансы](#завершаем-все-сеансы)
    - [Очистка сеансовых данных](#очистка-сеансовых-данных)
    - [Блокировка всех информационных баз](#блокировка-всех-информационных-баз)
    - [Контроль размера данных кластера](#контроль-размера-данных-кластера)
    - [Сохраняем ифнормацию о сеансах в базу PostgreSQL](#сохраняем-информацию-о-сеансах-в-базу-postgresql)
    - [Сохраняем ифнормацию о рабочих процессах в базу PostgreSQL](#сохраняем-информацию-о-рабочих-процессах-в-базу-postgresql)
  - [Прочь COM, да здравствует RAC](#прочь-com-да-здравствует-rac)
    - [Общий пример работы с RAC](#общий-пример-работы-с-rac)
  - [Запуск 1С](#запуск-1с)
  - [Великий SQL Server](#великий-sql-server)
    - [Пример работы с модулем DBATools](#пример-работы-с-модулем-dbatools)
    - [Пример создания сжатой тествой базы со скрытым shrink'ом](#пример-создания-сжатой-тестовой-базы-со-скрытым-shrinkом)
  - [Совсем немного PostgreSQL](#совсем-немного-postgresql)
    - [Пример вызова psql](#совсем-немного-postgresql)
  - [Вызов стороннего API](#вызов-стороннего-api)
    - [Пример вызова API сервера Zabbix](#пример-вызова-api-сервера-zabbix)
  - [Собственный бот](#собственный-бот)
    - [Отправка сообщений в Telegram](#отправка-сообщений-в-telegram)
  - [Отправка писем](#отправка-писем)
    - [Отправка электронной почты](#отправка-писем-через-yandexmail)
  - [Контролируй процессы](#контролируй-процессы)
    - [Список процессов](#список-процессов)
    - [Убить нельзя помиловать](#убить-нельзя-помиловать)
  - [Проверка свободного порта](#проверка-свободного-порта)
    - [Свободный ли порт?](#свободный-ли-порт)
  - [Удаленное управление](#удаленное-управление)
    - [Простейший пример настройки](#простейший-пример-настройки)
    - [Как использовать](#как-использовать)
  - [Еще, еще, еще](#еще-еще-еще)
  - [Меньше костылей](#меньше-костылей)
  - [В самом конце](#в-самом-конце)

## Что это и зачем

[PowerShell](https://learn.microsoft.com/ru-ru/powershell/scripting/overview?view=powershell-7.3) - это средство автоматизации от компании Microsoft с [открытым исходным кодом](https://github.com/PowerShell/PowerShell), которое поддерживается в Windows, Linux, MacOS и даже под ARM. Представляет из себя объектно-ориентированный программный движок и скриптовый язык с интерфейсом командной строки.

Обладает обширными возможностями и позволяет решать практически любые задачи администрирования. Благодаря тесной интеграции с платформой .NET позволяет использовать все ее возможности. А огромное сообщество гарантирует большое количество готовых скриптов и модулей на любой вкус, цвет, платформу и требования. Из-за всего этого имеет достаточно большую распространенность и сферу применения.

Фактически, статья показывает как начать разработку скриптов на PowerShell, с каких материалов можно начать и дает примеры скриптов для старта.

Упор был сделан на контекст платформы 1С (но есть информация и по SQL Server, PostgreSQL и общим вопросам администрирования), чтобы показать наличие уже готовых инструментов для решений администрирования и не уходить с головой в "около1Сные" скриптовые движки. Не мучайте администраторов, развивайтесь, коллеги! Становитесь частью экомистемы и команды, а не отдельным изолированным миром, тогда и наладяться отношения системных администраторов и разработчиков 1С.

## Немного об установке

Процесс установки PowerShell различается в зависимости от ОС, ее версии и т.д. Подробнее об установке и обновлении текущих версий рекомендую посмотреть [официальную документацию](https://learn.microsoft.com/ru-ru/powershell/scripting/install/installing-powershell?view=powershell-7.3).

Стоит отметить, что в операционной системе Windows есть встроенный движок "Windows PowerShell", который уже немного отстает от актуальных версий. Иногда можно встретить путаницу между Windows PowerShell и актуальной версией PowerShell, которая выпускается уже в кроссплатформенном варианте. Все примеры скриптов ниже тестировались именно на Windows PowerShell, но все новые разработки и скрипты стараюсь делать на актуальных версиях PowerShell, что и Вам рекомендую.

Подробно расписывать шаги установки смысла нет - посмотрите ссылку выше. Там подробная инструкция как для Windows, так и для Linux.

## Инструментарий

Еще немного хотелось бы сказать об инструментах для работы с PowerShell. В составе Windows с древних времен идет среда разработки "Windows PowerShell ISE", которой, конечно, можно пользоваться и сейчас. Но даже по внешнему виду можно понять, что она достаточно архаично выглядит, да и большинства удобств современных IDE там просто не найти. Поэтому лучший выбор - это использование [Visual Studio Code](https://code.visualstudio.com/).

<a href="/img/posts/2021/2021-05-16-%D0%97%D0%B0%D0%BD%D0%B8%D0%BC%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/logo.png" target="_blank">
<img 
  src="/img/posts/2021/2021-05-16-%D0%97%D0%B0%D0%BD%D0%B8%D0%BC%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/logo.png" 
  title="Пишем на PowerShell!" 
  class="img-fluid"
/>
</a>

Достаточно установить расширение "PowerShell" и Вы получите отладку, удобный редактор с автоподсказками и многое другое. В статье ["Использование Visual Studio Code для разработки в PowerShell"](https://learn.microsoft.com/ru-ru/powershell/scripting/dev-cross-plat/vscode/using-vscode?view=powershell-7.3) можно найти подробное описание что и как устанавливать, чтобы получить рабочую среду разработки. Также там есть описание дополнительных шагов настройки, которые в некоторых случаях могут понадобиться. Все вышесказанное актуально как для Windows, так и для Linux.

Еще немного слов про терминал. Как известно, в Windows работа с терминалом всегда была не очень удобной. Но с появлением [Windows Terminal](https://apps.microsoft.com/store/detail/9N0DX20HK701?hl=ru-ru&gl=RU) ситуация изменилась, хоть еще и есть куда стремиться. Теперь, как минимум, мы можем открывать несколько терминалов в одном окне и с разным типом. Вот, например, сразу один терминал PowerShell, два под Linux (через подсистему WSL) и один это старый добрый CMD.

<a href="/img/posts/2021/2021-05-16-%D0%97%D0%B0%D0%BD%D0%B8%D0%BC%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/Windows%20Terminal.png" target="_blank">
<img 
  src="/img/posts/2021/2021-05-16-%D0%97%D0%B0%D0%BD%D0%B8%D0%BC%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/Windows%20Terminal.png" 
  title="Windows Terminal" 
  class="img-fluid"
/>
</a>

Под Linux список инструментов для работы с терминалом намного больше и сами инструменты функциональней. Для себя использую простой терминал Gnome. Вот можете выбрать себе более подходящий.

## Спектр задач

И целой книги не хватит, чтобы описать и пройтись по всему спектру задач, которые решает PowerShell. Но мы и не собирались. Ниже приведено несколько скриптов, которые позволяют примерно понять что и зачем можно делать. Также они могут быть стартовой точкой для начала написания собственных скриптов или целых решений автоматизации.

Это лишь примеры скриптов, не являющиеся готовым решением, поэтому они не оформляются в какой-либо отдельный модуль или пакет. Скорее всего в Вашей ситуации их придется дорабатывать.

### Установка и настройка 1С

Начнем с простого - списка установленных версий 1С и команда установки.

#### Список установленных версий платформы

Из реестра Windows можно узнать список всех установленных версий 1С (32 и 64 битных).

```pwsh
$installedApps = New-Object System.Collections.ArrayList

Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\* |  
Where-Object {  ($_.DisplayName -like "*1C:Предприятие*") -or ($_.DisplayName -like "*1C:Enterprise*") } |
Select-Object DisplayName, DisplayVersion, Publisher, InstallDate, InstallLocation |
ForEach-Object {
    $installedApps.Add(
        [PSCustomObject] @{
            'DisplayName' = $_.DisplayName
            'DisplayVersion' = $_.DisplayVersion
            'Publisher' = $_.Publisher
            'InstallDate' = $_.InstallDate
            'InstallLocation' = $_.InstallLocation
        }
    ) | Out-Null;
}

Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | 
Where-Object {  ($_.DisplayName -like "*1C:Предприятие*") -or ($_.DisplayName -like "*1C:Enterprise*") } |
Select-Object DisplayName, DisplayVersion, Publisher, InstallDate, InstallLocation |
ForEach-Object {
    $installedApps.Add(
        [PSCustomObject] @{
            'DisplayName' = $_.DisplayName
            'DisplayVersion' = $_.DisplayVersion
            'Publisher' = $_.Publisher
            'InstallDate' = $_.InstallDate
            'InstallLocation' = $_.InstallLocation
        }
    ) | Out-Null;
}

$installedApps | Format-Table –AutoSize
```

```pwsh
<# Пример вывода

DisplayName                             DisplayVersion Publisher InstallDate InstallLocation
-----------                             -------------- --------- ----------- ---------------
1C:Предприятие 8 (x86-64) (8.3.16.1063) 8.3.16.1063    1С-Софт   20200106    C:\Program Files\1cv8\8.3.16.1063\
1C:Предприятие 8 (8.3.12.1924)          8.3.12.1924    1С-Софт   20200224    C:\Program Files (x86)\1cv8\8.3.12.1924\
1C:Предприятие 8 (8.3.5.1517)           8.3.5.1517     1C        20200110    C:\Program Files (x86)\1cv8\8.3.5.1517\
1C:Предприятие 8 (8.3.6.2530)           8.3.6.2530     1C        20200221    C:\Program Files (x86)\1cv8\8.3.6.2530\
#>
```

Теперь мы можем легко получить список установленных версий платформы 1С на хосте.

#### Установка одной командой

Как известно, установщики приложений от 1С имеют возможность запуска с указанием параметров в командной строке. Воспользуемся этим.

```pwsh
$installFilesDirectory = "C:\Soft\1C" # Каталог, где находится установочные файлы
Set-Location $installFilesDirectory;

$msiInstallerPath = "$installFilesDirectory\1CEnterprise 8 (x86-64).msi"
$adminstallrelogonPath = "$installFilesDirectory\adminstallrelogon.mst"
$lang1049Path = "$installFilesDirectory\1049.mst"

$DESIGNERALLCLIENTS = 1
$THICKCLIENT=1
$THINCLIENTFILE=1
$THINCLIENT=1
$WEBSERVEREXT=0
$SERVER=0
$CONFREPOSSERVER=0
$CONVERTER77=0
$SERVERCLIENT=0
$LANGUAGES='RU'

$params = '/i', 
          $msiInstallerPath,
          # Сокращенный интерфейс. По сути, при установке пользователь увидит только бегущую полосу прогресса. Можно указать /qn и юзер вообще ничего при установке не увидит.
          '/qr', 
          # Здесь мы подключаем рекомендованную фирмой 1С трансформацию adminstallrelogon.mst и пакет русского языка 1049.mst
          "TRANSFORMS=$adminstallrelogonPath;$lang1049Path", 
          # Это основные компоненты 1С:Предприятия, включая компоненты для администрирования, конфигуратор и толстый клиент. Без этого параметра ставится всегда только тонкий клиент, независимо от следующего параметра
          "DESIGNERALLCLIENTS=$DESIGNERALLCLIENTS",
          "THICKCLIENT=$THICKCLIENT", # Толстый клиент
          "THINCLIENTFILE=$THINCLIENTFILE", # Тонкий клиент, файловый вариант
          "THINCLIENT=$THINCLIENT", # Тонкий клиент
          "WEBSERVEREXT=$WEBSERVEREXT", # Модули расширения WEB-сервера
          "SERVER=$SERVER", # Сервер 1С:Предприятия
          "CONFREPOSSERVER=$CONFREPOSSERVER", # Сервер хранилища конфигураций
          "CONVERTER77=$CONVERTER77", # Конвертер баз 1С:Предприятия 7.7
          "SERVERCLIENT=$SERVERCLIENT", # Администрирование сервера
          "LANGUAGES=$LANGUAGES" # Язык установки – русский.
          $params
& msiexec.exe @params
```

Примерно этот же способ используют для установки 1С на множестве компьютеров, только каталог с установщиком находится в сетевом каталоге. Но вариантов установки, конечно же, много.

Проще простого, не так ли?

### Управление службой

Частой задачей может быть перезапуск службы 1С или по крайней мере просмотр их списка.

#### Список установленных служб с информацией

Просто получим список установленных служб Windows, где файл приложения "ragent.exe". Искать службу по имени не всегда надежно, ведь их могут зарегистрировать вручную под любым именем.

```pwsh
$services1C = Get-WmiObject win32_service | ?{$_.Name -like '*'} |
    Select Name, DisplayName, State, PathName | 
    Where-Object { $_.PathName  -Like "*ragent.exe*" };

$obj = [PSCustomObject] @{
    data = @($services1C | % {
        $serviceInfo = $_;
        [PSCustomObject] @{
            'Name' = $serviceInfo.Name
            'DisplayName' = $serviceInfo.DisplayName
            'PathName' = $serviceInfo.PathName
            'State' = $serviceInfo.State
        }
    }) 
}

$obj.data | Format-Table
```

Теперь у нас есть список с именем службы, ее состоянием и командой запуска.

#### Запуск, остановка, перезапуск

И еще несколько примеров скриптов. Первый - это запуск остановленных служб 1С.

```pwsh
$services1C = Get-WmiObject win32_service | ?{$_.Name -like '*'} |
    Select Name, DisplayName, State, PathName | 
    Where-Object { $_.PathName  -Like "*ragent.exe*" };

$obj = [PSCustomObject] @{
    data = @($services1C | % {
        $serviceInfo = $_;
        
        if($serviceInfo.State -eq 'Stopped')
        {
            $serviceName = $serviceInfo.Name;
            try
            {
                Start-Service $serviceName;
                Write-Host "Запущена служба ""$serviceName""" -ForegroundColor Green
            } catch
            {
                Write-Host "Ошибка при запуске службы ""$serviceName""" -ForegroundColor Red
                Write-Host "Подробно:" -ForegroundColor Red
                Write-Host $Error[0] -ForegroundColor Red
            }
        }        
    }) 
}
```

Далее остановка запущенных служб.

```pwsh
$services1C = Get-WmiObject win32_service | ?{$_.Name -like '*'} |
    Select Name, DisplayName, State, PathName | 
    Where-Object { $_.PathName  -Like "*ragent.exe*" };

$obj = [PSCustomObject] @{
    data = @($services1C | % {
        $serviceInfo = $_;

        if($serviceInfo.State -eq 'Running')
        {
            $serviceName = $serviceInfo.Name;
            try
            {
                Stop-Service $serviceName;
                Write-Host "Остановлена служба ""$serviceName""" -ForegroundColor Green
            } catch
            {
                Write-Host "Ошибка при остановке службы ""$serviceName""" -ForegroundColor Red
                Write-Host "Подробно:" -ForegroundColor Red
                Write-Host $Error[0] -ForegroundColor Red
            }
        }        
    }) 
}
```

И, конечно же, перезапуск.

```pwsh
$services1C = Get-WmiObject win32_service | ?{$_.Name -like '*'} |
    Select Name, DisplayName, State, PathName | 
    Where-Object { $_.PathName  -Like "*ragent.exe*" };

$obj = [PSCustomObject] @{
    data = @($services1C | % {
        $serviceInfo = $_;

        if($serviceInfo.State -eq 'Running')
        {
            $serviceName = $serviceInfo.Name;
            try
            {
                Restart-Service $serviceName;
                Write-Host "Перезапущена служба ""$serviceName""" -ForegroundColor Green
            } catch
            {
                Write-Host "Ошибка при перезапуске службы ""$serviceName""" -ForegroundColor Red
                Write-Host "Подробно:" -ForegroundColor Red
                Write-Host $Error[0] -ForegroundColor Red
            }
        }        
    }) 
}
```

Ничего особого тут нет, ничего сложного.

### Старый, добрый COM

До сих пор с 1С во многих компаниях работа выполняется через COM, в том числе и с сервером 1С. Вот несколько команд в помощь для работы с COM.

#### Проверка регистрации COM

Проверяем наличие зарегистрированных COM-объектов в системе для платформы 8.2 и 8.3.

```pwsh
try {
    $v83COMConnector = New-Object -COMObject "V83.COMConnector"
    Write-Host "Компонента "V83.COMConnector" зарегистрирована и готова к использованию." -ForegroundColor Green;
} 
catch {
    Write-Host "Компонента "V83.COMConnector" не зарегистрирована." -ForegroundColor Red;
}

try {
    $v82COMConnector = New-Object -COMObject "V82.COMConnector"
    Write-Host "Компонента "V82.COMConnector" зарегистрирована и готова к использованию." -ForegroundColor Green;
} 
catch {
    Write-Host "Компонента "V82.COMConnector" не зарегистрирована." -ForegroundColor Red;
}
```

Проверяются только компоненты, зарегистрированные по стандартному имени.

#### Регистрация COM

Еще один скрипт - это регистрация COM-компоненты. Будьте осторожны, т.к. здесь выполняется регистрация для всех установленных служб 1С. Обычно она одна и поэтому будет зарегистрирована только одна компонента. Но мало ли что у Вас на сервере...

```pwsh
$allServices1C = Get-WmiObject win32_service | ?{$_.Name -like '*'} |
    Select Name, DisplayName, State, PathName | 
    Where-Object { $_.PathName  -Like "*ragent.exe*" };

$allServices1C | % {

    $services1C = $_;
    $serviceExecPath = $services1C.PathName;
    $serviceExecPathRagent = $services1C.PathName.split('"')[1];
    $serviceDirectory = [System.IO.Path]::GetDirectoryName($serviceExecPathRagent);
    $comcntrPath = "$serviceDirectory\comcntr.dll";
    $regCommand = "regsvr32.exe ""$comcntrPath""";
    $platformVersion = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($serviceExecPathRagent).FileVersion

    Write-Host "Начало регистрации COM-компоненты 1С:Предприятия";
    Write-Host "Версия платформы: $platformVersion";
    Write-Host "Путь к DLL: ""$comcntrPath""";
    Write-Host "Команда регистрации компоненты: ""$regCommand""";

    try
    {
        cmd /c "$regCommand"
        Write-Host "Регистрация компоненты успешно выполнена!" -ForegroundColor Green
    } catch
    {
        Write-Host "Ошибка при регистрации компоненты!" -ForegroundColor Red
        Write-Host "Подробно:" -ForegroundColor Red
        Write-Host $Error[0] -ForegroundColor Red
    }
}
```

Не забывайте запускать скрипт с правами администратора для успешной регистрации COM.

#### Отмена регистрации COM

Аналогичная ситуация при отмене регистрации COM.

```pwsh
$allServices1C = Get-WmiObject win32_service | ?{$_.Name -like '*'} |
    Select Name, DisplayName, State, PathName | 
    Where-Object { $_.PathName  -Like "*ragent.exe*" };

$allServices1C | % {

    $services1C = $_;
    $serviceExecPath = $services1C.PathName;
    $serviceExecPathRagent = $services1C.PathName.split('"')[1];
    $serviceDirectory = [System.IO.Path]::GetDirectoryName($serviceExecPathRagent);
    $comcntrPath = "$serviceDirectory\comcntr.dll";
    $regCommand = "regsvr32.exe /u ""$comcntrPath""";
    $platformVersion = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($serviceExecPathRagent).FileVersion

    Write-Host "Начало отмены регистрации COM-компоненты 1С:Предприятия";
    Write-Host "Версия платформы: $platformVersion";
    Write-Host "Путь к DLL: ""$comcntrPath""";
    Write-Host "Команда регистрации компоненты: ""$regCommand""";

    try
    {
        cmd /c "$regCommand"
        Write-Host "Отмена регистрации компоненты успешно выполнена!" -ForegroundColor Green
    } catch
    {
        Write-Host "Ошибка при отмене регистрации компоненты!" -ForegroundColor Red
        Write-Host "Подробно:" -ForegroundColor Red
        Write-Host $Error[0] -ForegroundColor Red
    }
}
```

Также необходимы права администратора.

COM с нами еще надолго :)

### Кластер под контролем

Еще немного о взаимодействии с кластером 1С.

<a href="/img/posts/2021/2021-05-16-%D0%97%D0%B0%D0%BD%D0%B8%D0%BC%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/%D0%9A%D0%BB%D0%B0%D1%81%D1%82%D0%B5%D1%80%20%D0%BF%D0%BE%D0%B4%20%D0%BA%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D0%B5%D0%BC.gif" target="_blank">
<img 
  src="/img/posts/2021/2021-05-16-%D0%97%D0%B0%D0%BD%D0%B8%D0%BC%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/%D0%9A%D0%BB%D0%B0%D1%81%D1%82%D0%B5%D1%80%20%D0%BF%D0%BE%D0%B4%20%D0%BA%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D0%B5%D0%BC.gif" 
  title="Кластер под контролем"
  class="img-fluid"
/>
</a>

#### Информация о кластере

Получим немного информации о кластере 1С без COM, только по данным службы Windows.

```pwsh
$services1C = Get-WmiObject win32_service | ?{$_.Name -like '*'} |
    Select Name, DisplayName, State, PathName | 
    Where-Object { $_.PathName  -Like "*ragent.exe*" };

$obj = [PSCustomObject] @{
    data = @($services1C | % {
        $serviceInfo = $_
        $serviceExecPath = $serviceInfo.PathName

        $hash = [ordered]@{}
        $serviceExecPath.Split("-").Trim() | Where-Object { $_.Contains(" ") } | ForEach-Object { 
            $name, $value = $_ -split '\s+', 2
            $hash[$name] = $value
        }

        $parsePathAgentExe = $serviceExecPath.Substring(1, $serviceExecPath.Length -1)
        $parsePathAgentExe = $parsePathAgentExe.Substring(0, $parsePathAgentExe.IndexOf('"'))

        if(Test-Path $parsePathAgentExe)
        {
            $platformVersion = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($parsePathAgentExe).FileVersion
        } else
        {
            $platformVersion = ""
        }
        
        $clusterPath = $hash.d -replace '"', ''
        $clusterRegPort = $hash.regport
        $clusterPort = $hash.port
        $clusterPortRange = $hash.range
        $clusterRegPath = "$clusterPath\reg_$clusterRegPort"

        [PSCustomObject] @{
            'Name' = $serviceInfo.Name
            'DisplayName' = $serviceInfo.DisplayName            
            'State' = $serviceInfo.State
            'Version' = $platformVersion
            'ClusterPath' = $clusterPath
            'ClusterRegPort' = $clusterRegPort
            'ClusterPort' = $clusterPort
            'ClusterPortRange' = $clusterPortRange
            'ClusterRegPath' = $clusterRegPath
            'PathName' = $serviceInfo.PathName
        }
    }) 
}

$obj.data | Format-Table
```

Теперь мы можем получить имя службы, состояние, версию платформы, путь к каталогу кластера 1С, используемые порты и каталог кластера.

#### Регистрация и запуск консоли кластера

Бывает ли у Вас такое, что используется несколько версий 1С и необходимо запускать консоль администрирования серверов 1С разных версий? Этот скрипт должен помочь.

```pwsh
<#
Регистрация и запуск консоли администрирования нужной версии платформы 1С
#>

$installedApps = New-Object System.Collections.ArrayList
Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\* |  
Where-Object {  ($_.DisplayName -like "*1C:Предприятие*") -or ($_.DisplayName -like "*1C:Enterprise*") } |
Select-Object DisplayName, DisplayVersion, Publisher, InstallDate, InstallLocation |
ForEach-Object {
    $installedApps.Add(
        [PSCustomObject] @{
            'DisplayName' = $_.DisplayName
            'DisplayVersion' = $_.DisplayVersion
            'Publisher' = $_.Publisher
            'InstallDate' = $_.InstallDate
            'InstallLocation' = $_.InstallLocation
        }
    ) | Out-Null;
}
Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | 
Where-Object {  ($_.DisplayName -like "*1C:Предприятие*") -or ($_.DisplayName -like "*1C:Enterprise*") } |
Select-Object DisplayName, DisplayVersion, Publisher, InstallDate, InstallLocation |
ForEach-Object {
    $installedApps.Add(
        [PSCustomObject] @{
            'DisplayName' = $_.DisplayName
            'DisplayVersion' = $_.DisplayVersion
            'Publisher' = $_.Publisher
            'InstallDate' = $_.InstallDate
            'InstallLocation' = $_.InstallLocation
        }
    ) | Out-Null;
}

$menu = @{}
for ($i=1;$i -le $installedApps.count; $i++) 
{ 
    Write-Host "$i. $($installedApps[$i-1].DisplayName) ($($installedApps[$i-1].InstallLocation))" 
    $menu.Add($i,($installedApps[$i-1]))
}
[int]$answer = Read-Host 'Выберите установленную платформу 1С'
$selection = $menu.Item($answer)

if($null -ne $selection)
{
    $installLocation = $selection.InstallLocation
    $redminPath = Join-Path -Path $installLocation -ChildPath "bin\radmin.dll"
    $1cv8Path = (get-item $installLocation).parent.FullName
    $commonPath = Join-Path -Path $1cv8Path -ChildPath "common"    
    $consolePath = ""    

    $foundMscFiles = Get-Childitem –Path $commonPath | Where-Object { $_.Name -like "1CV8 Servers*.msc" }
    
    if($null -ne $foundMscFiles -and $foundMscFiles.Length -ge 0)
    {
        $consolePath = Join-Path -Path $commonPath -ChildPath $foundMscFiles[0].Name
    } else
    {
        Write-Host "Не найдена оснастка консоли администрирования (1CV8 Servers*.msc) в каталоге: $commonPath" -BackgroundColor Red
        return
    }    

    if(Test-Path $redminPath)
    {
        Write-Host "Начало регистрации компоненты radmin.dll" -BackgroundColor Blue
        regsvr32 /s $redminPath
        Write-Host "Успешно зарегистрирована компонента radmin.dll" -BackgroundColor Green

        C:\Windows\System32\mmc.exe $consolePath
    } else
    {
        Write-Host "Не найдена компонент radmin.dll по пути: $redminPath" -BackgroundColor Red
    }
} else
{
    Write-Host "Выбрано некорректное значение." -BackgroundColor Red
}
```

Для регистрации компонентов нужны права администратора. А куда без них...

#### Завершаем все сеансы

Пример скрипта, который завершит все сеансы 1С на сервере. Взаимодействие происходит через COM.

```pwsh
$services1C = Get-WmiObject win32_service | ?{$_.Name -like '*'} |
    Select Name, DisplayName, State, PathName | 
    Where-Object { $_.PathName  -Like "*ragent.exe*" };

$services1C | % {
    $serviceInfo = $_;
    $serviceExecPath = $services1C.PathName;
    $serviceExecPathRagent = $services1C.PathName.split('"')[1]
    
    $hash = [ordered]@{}
    $serviceExecPath.Split("-").Trim() | Where-Object { $_.Contains(" ") } | ForEach-Object { 
        $name, $value = $_ -split '\s+', 2
        $hash[$name] = $value
    }

    if([System.IO.File]::Exists($serviceExecPathRagent) -ne $true)
    {        
        break
    }
    
    $platformVersion = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($serviceExecPathRagent).FileVersion        
    $clusterPath = $hash.d -replace '"', ''
    $clusterRegPort = $hash.regport
    $clusterPort = $hash.port
    $clusterPortRange = $hash.range
    $clusterRegPath = "$clusterPath\reg_$clusterRegPort"

    $agentPort = $clusterPort;
    $agentAddress = "localhost";
    $clusterAdminName = ""; # Имя администратора кластера
    $clusterAdminPassword = ""; # Пароль администратора кластера
    $fullAgentAddress = "tcp://" + $agentAddress + ":" + $agentPort;

    $COMConnector = $null;
    try {
        if($platformVersion -like "8.2.*")
        {            
            $COMConnector = New-Object -COMObject "V82.COMConnector"
        }
        if($platformVersion -like "8.3.*")
        {
            $COMConnector = New-Object -COMObject "V83.COMConnector"
        }

        if($null -ne $COMConnector) {
            $serverAgent = $COMConnector.ConnectAgent($fullAgentAddress);
            $clusterList = $ServerAgent.GetClusters();
            foreach ($cluster in $clusterList) {
                $serverAgent.Authenticate($Cluster, $clusterAdminName, $clusterAdminPassword)        

                $serverSessionsData = $serverAgent.GetSessions($cluster);
                $serverSessions = $serverSessionsData.Count;
                $serverSessionsData | ForEach-Object {                
                    $itemSession = $_;
                    $serverAgent.TerminateSession($cluster, $itemSession)

                    $userName = $itemSession.userName
                    $sessionId = $itemSession.SessionID
                    Write-Host "Завершен сеанс $sessionId. Пользователь: $userName" -ForegroundColor Green
                }                
            }
        }

        $COMConnector = $null
    } 
    catch {
        Write-Host "Ошибка при выполнении скрипта." -ForegroundColor Red;
        Write-Host "Подробно:" -ForegroundColor Red
        Write-Host $Error[0] -ForegroundColor Red
    }
}
```

Будьте осторожны при запуске. Не сбросьте сеансы в рабочей базе в рабочее время :)

#### Очистка сеансовых данных

Периодически приходится чистить каталог сеансовых данных, особенно если встречаются непонятные "глюки" в работе сервера 1С.

```pwsh
<#
Очистка сеансовых данных 1С
#>

$services1C = Get-WmiObject win32_service | ? { $_.Name -like '*' } |
Select Name, DisplayName, State, PathName | 
Where-Object { $_.PathName -Like "*ragent.exe*" };

$services1C | % {
    $serviceInfo = $_
    $serviceName = $serviceInfo.Name

    # 1. Останавливаем службу 1С
    Write-Host "Stop service 1C: $serviceName" -BackgroundColor Blue
    Stop-Service -Name $serviceName -NoWait
    $svc = Get-Service $serviceName
    Write-Host $svc.Status
    $svc.WaitForStatus('Stopped')
    Write-Host $svc.Status
    # Дополнительное ожидание для освобождения файлов процессами после остановки службы
    Start-Sleep 15

    # 2. Ищем путь к каталогу с сеансовыми данными
    $serviceExecPath = $serviceInfo.PathName
    $hash = [ordered]@{}
    $serviceExecPath.Split("-").Trim() | Where-Object { $_.Contains(" ") } | ForEach-Object { 
        $name, $value = $_ -split '\s+', 2
        $hash[$name] = $value
    }
    $clusterPath = $hash.d -replace '"', ''
    $clusterRegPort = $hash.regport
    $clusterRegDirectory = Join-Path -Path $clusterPath -ChildPath "reg_$clusterRegPort"            
    $storageSessionDataSizeMb = 0
    Get-ChildItem $clusterRegDirectory | 
    Where-Object { $_.Name -like "snccntx*" } |
    ForEach-Object {
        $storageSessionDataPath = Join-Path -Path $clusterRegDirectory -ChildPath $_

        # 3. Удаляем каталоги с сеансовыми данными
        Write-Host "Remove session storage directory: $storageSessionDataPath" -BackgroundColor Blue
        Remove-Item -LiteralPath $storageSessionDataPath -Force -Recurse
    }

    # 4. Запускаем службу 1С
    Write-Host "Start service 1C: $serviceName" -BackgroundColor Blue
    Start-Service -Name $serviceName
}
```

COM не нужен, но права администратора все равно нужны для остановки и запуска служб.

#### Блокировка всех информационных баз

Еще один пример работы через COM - блокировка работы со всеми информационными базами.

```pwsh
$services1C = Get-WmiObject win32_service | ?{$_.Name -like '*'} |
    Select Name, DisplayName, State, PathName | 
    Where-Object { $_.PathName  -Like "*ragent.exe*" };

$services1C | % {
    $serviceInfo = $_;
    $serviceExecPath = $services1C.PathName;
    $serviceExecPathRagent = $services1C.PathName.split('"')[1]

    $hash = [ordered]@{}
    $serviceExecPath.Split("-").Trim() | Where-Object { $_.Contains(" ") } | ForEach-Object { 
        $name, $value = $_ -split '\s+', 2
        $hash[$name] = $value
    }

    if([System.IO.File]::Exists($serviceExecPathRagent) -ne $true)
    {        
        break
    }
    
    $platformVersion = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($serviceExecPathRagent).FileVersion        
    $clusterPath = $hash.d -replace '"', ''
    $clusterRegPort = $hash.regport
    $clusterPort = $hash.port
    $clusterPortRange = $hash.range
    $clusterRegPath = "$clusterPath\reg_$clusterRegPort"

    $agentPort = $clusterPort;
    $agentAddress = "localhost";
    $clusterAdminName = ""; # Имя администратора кластера
    $clusterAdminPassword = ""; # Пароль администратора кластера
    $fullAgentAddress = "tcp://" + $agentAddress + ":" + $agentPort;

    $COMConnector = $null;
    try {
        if($platformVersion -like "8.2.*")
        {            
            $COMConnector = New-Object -COMObject "V82.COMConnector"
        }
        if($platformVersion -like "8.3.*")
        {
            $COMConnector = New-Object -COMObject "V83.COMConnector"
        }

        if($null -ne $COMConnector) {
            $serverAgent = $COMConnector.ConnectAgent($SrvAddr);
            $clusterList = $ServerAgent.GetClusters();
            foreach ($cluster in $clusterList) {
                $serverAgent.Authenticate($Cluster, $clusterAdminName, $clusterAdminPassword)                   
                
                $workingProcesses = $serverAgent.GetWorkingProcesses($cluster)
                foreach ($workProcess in $workingProcesses) {
                    if($workProcess.Running -ne 1)
                    {
                        continue
                    }

                    $workProcessConnectionString = "tcp://"+$workProcess.HostName+":"+$workProcess.MainPort
                    $workProcessConnection= $COMConnector.ConnectWorkingProcess($workProcessConnectionString)
                    
                    # Здесь должна быть аутентификация пользователя, имеющего доступ к информационной базе                    
                    $infobaseUserName = ""                    
                    $infobaseUserPassword = ""                    
                    $workProcessConnection.AddAuthentication($infobaseUserName, $infobaseUserPassword)
                    $infoBases = $workProcessConnection.GetInfoBases()
                    $infoBases | ForEach-Object {                
                        $itemInfobase = $_;                        
                        # Установка запрета соединения с информационной базой
                        $itemInfobase.ConnectDenied = $true
                        $itemInfobase.DeniedMessage = "База недоступна. Ведутся регламентные работы. Отправьте SMS на номер 6666"
                        $itemInfobase.PermissionCode = "123456"                      
                        $itemInfobase.DeniedFrom = "2020-01-01 00:00:00"
                        $itemInfobase.DeniedTo = "2020-12-31 23:59:59"
                        # Блокировка регламентных заданий
                        $itemInfobase.ScheduledJobsDenied = $true
                        # Сохраняем измененные настройки
                        $workProcessConnection.UpdateInfoBase($itemInfobase);
                        
                        $infobaseName = $itemInfobase.Name

                        Write-Host "Установлена блокировка подключений к базе $infobaseName" -ForegroundColor Green
                        Write-Host "Установлена блокировка регламентных заданий в базе $infobaseName" -ForegroundColor Green                        
                    }
                    
                    break
                }
            }
        }

        $COMConnector = $null
    } 
    catch {
        Write-Host "Ошибка при выполнении скрипта." -ForegroundColor Red;
        Write-Host "Подробно:" -ForegroundColor Red
        Write-Host $Error[0] -ForegroundColor Red
    }
}
```

Не забудьте отправить SMS на указанный номер в примере скрипта :)

Ну а для снятия блокировки можно использовать следующий скрипт.

```pwsh
$services1C = Get-WmiObject win32_service | ?{$_.Name -like '*'} |
    Select Name, DisplayName, State, PathName | 
    Where-Object { $_.PathName  -Like "*ragent.exe*" };

$services1C | % {
    $serviceInfo = $_;
    $serviceExecPath = $services1C.PathName;
    $serviceExecPathRagent = $services1C.PathName.split('"')[1]
    
    $hash = [ordered]@{}
    $serviceExecPath.Split("-").Trim() | Where-Object { $_.Contains(" ") } | ForEach-Object { 
        $name, $value = $_ -split '\s+', 2
        $hash[$name] = $value
    }

    if([System.IO.File]::Exists($serviceExecPathRagent) -ne $true)
    {        
        break
    }
    
    $platformVersion = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($serviceExecPathRagent).FileVersion        
    $clusterPath = $hash.d -replace '"', ''
    $clusterRegPort = $hash.regport
    $clusterPort = $hash.port
    $clusterPortRange = $hash.range
    $clusterRegPath = "$clusterPath\reg_$clusterRegPort"

    $agentPort = $clusterPort;
    $agentAddress = "localhost";
    $clusterAdminName = ""; # Имя администратора кластера
    $clusterAdminPassword = ""; # Пароль администратора кластера
    $fullAgentAddress = "tcp://" + $agentAddress + ":" + $agentPort;

    $COMConnector = $null;
    try {
        if($platformVersion -like "8.2.*")
        {            
            $COMConnector = New-Object -COMObject "V82.COMConnector"
        }
        if($platformVersion -like "8.3.*")
        {
            $COMConnector = New-Object -COMObject "V83.COMConnector"
        }

        if($null -ne $COMConnector) {
            $serverAgent = $COMConnector.ConnectAgent($SrvAddr);
            $clusterList = $ServerAgent.GetClusters();
            foreach ($cluster in $clusterList) {
                $serverAgent.Authenticate($Cluster, $clusterAdminName, $clusterAdminPassword)                   
                
                $workingProcesses = $serverAgent.GetWorkingProcesses($cluster)
                foreach ($workProcess in $workingProcesses) {
                    if($workProcess.Running -ne 1)
                    {
                        continue
                    }

                    $workProcessConnectionString = "tcp://"+$workProcess.HostName+":"+$workProcess.MainPort
                    $workProcessConnection= $COMConnector.ConnectWorkingProcess($workProcessConnectionString)
                    
                    # Здесь должна быть аутентификация пользователя, имеющего доступ к информационной базе                    
                    $infobaseUserName = ""                    
                    $infobaseUserPassword = ""                    
                    $workProcessConnection.AddAuthentication($infobaseUserName, $infobaseUserPassword)
                    $infoBases = $workProcessConnection.GetInfoBases()
                    $infoBases | ForEach-Object {                
                        $itemInfobase = $_;                        
                        # Снятие запрета соединения с информационной базой
                        $itemInfobase.ConnectDenied = $false
                        # Снятие блокировки регламентных заданий
                        $itemInfobase.ScheduledJobsDenied = $false
                        # Сохраняем измененные настройки
                        $workProcessConnection.UpdateInfoBase($itemInfobase);
                        
                        $infobaseName = $itemInfobase.Name

                        Write-Host "Снята блокировка подключений к базе $infobaseName" -ForegroundColor Green
                        Write-Host "Снята блокировка регламентных заданий в базе $infobaseName" -ForegroundColor Green                        
                    }
                    
                    break
                }
            }
        }

        $COMConnector = $null
    } 
    catch {
        Write-Host "Ошибка при выполнении скрипта." -ForegroundColor Red;
        Write-Host "Подробно:" -ForegroundColor Red
        Write-Host $Error[0] -ForegroundColor Red
    }
}
```

Профит!

#### Контроль размера данных кластера

Еще один простой скрипт для получения размера сеансовых данных сервера 1С.

```pwsh
<#
Получение информации о размере каталога кластера 1С и каталога сеансовых данных
#>

function Get-Size {
    param([string]$pth)
    ((gci -path $pth -recurse | measure-object -property length -sum).sum / 1mb)
}

$services1C = Get-WmiObject win32_service | ? { $_.Name -like '*' } |
Select Name, DisplayName, State, PathName | 
Where-Object { $_.PathName -Like "*ragent.exe*" };

$obj = [PSCustomObject] @{
    data = @($services1C | % {
            $serviceInfo = $_
            $serviceExecPath = $serviceInfo.PathName

            $hash = [ordered]@{}
            $serviceExecPath.Split("-").Trim() | Where-Object { $_.Contains(" ") } | ForEach-Object { 
                $name, $value = $_ -split '\s+', 2
                $hash[$name] = $value
            }

            $clusterPath = $hash.d -replace '"', ''

            $clusterDataSize = 0
            if (Test-Path $clusterPath) {
                $clusterDataSize = Get-Size $clusterPath
            }

            $clusterRegPort = $hash.regport
            $clusterRegDirectory = Join-Path -Path $clusterPath -ChildPath "reg_$clusterRegPort"
            
            $storageSessionDataSizeMb = 0
            Get-ChildItem $clusterRegDirectory | 
            Where-Object { $_.Name -like "snccntx*" } |
            ForEach-Object {
                $storageSessionDataPath = Join-Path -Path $clusterRegDirectory -ChildPath $_
                $folderSize = Get-Size $storageSessionDataPath
                $storageSessionDataSizeMb = $storageSessionDataSizeMb + $folderSize
            }

            [PSCustomObject] @{
                'Name'              = $serviceInfo.Name
                'DisplayName'       = $serviceInfo.DisplayName        
                'ClusterPath'       = $clusterPath
                'ClusterFolderSizeMb' = $clusterDataSize
                'SessionStorageSizeMb' = $storageSessionDataSizeMb
            }
        }) 
}

$obj.data | Format-Table
```

Может пригодиться для отслеживания работы сервера.

#### Сохраняем информацию о сеансах в базу PostgreSQL

Многие системы мониторинга сохраняют информацию о сеансах. Следующие скрипты делают это, отправляя данные в базы данных PostgreSQL. Этот для сеансов.

```pwsh
<#
Перед работой скрипта сохранения информации о сеансах 1С необходимо создать базу данных PostgreSQL
с соответствующей таблицей и индексом.

CREATE TABLE public.sessions1c (
	servername varchar(25) NOT NULL,
	infobase varchar(25) NOT NULL,
	sessionid int8 NULL,
	started_at timestamp(0) NULL,
	last_active_at timestamp(0) NULL,
	host varchar(25) NULL,
	appid varchar(25) NULL,
	username varchar(50) NULL,
	work_process_id int8 NULL,
	connectionid int8 NULL,
	"period" timestamp(0) NOT NULL,
	db_proc_info int8 NULL,
	db_proc_took_at timestamp(0) NULL,
	db_proc_took int8 NULL,
	blocked_by_dbms int8 NULL,
	blocked_by_ls int8 NULL,
	duration_current_dbms int8 NULL,
	duration_last_5_min_dbms int8 NULL,
	duration_all_dbms int8 NULL,
	dbms_bytes_last_5_min int8 NULL,
	dbms_bytes_all int8 NULL,
	duration_current int8 NULL,
	duration_last_5_min int8 NULL,
	duration_all int8 NULL,
	calls_last_5_min int8 NULL,
	calls_all int8 NULL,
	bytes_last_5_min int8 NULL,
	bytes_all int8 NULL
);
CREATE INDEX sessions1c_period_idx ON public.sessions1c ("period" timestamp_ops,servername text_ops,infobase text_ops);

Также нужно установить ODBC-драйвер для работы с PostgreSQL: https://odbc.postgresql.org/
#>

# Настройки сервера PostgreSQL
$DBIP = "127.0.0.1" # Адрес сервера PostgreSQL
$DBPort = 5432 # Порт сервера PostgreSQL
$DBName = "MyDatabase" # База данных для сохранения информации
$DBUser = "MyUser" # Пользователь PostgreSQL
$DBPass = "MyPassword" # Пароль пользователь PostgreSQL
$DBConnectionString = "Driver={PostgreSQL UNICODE};Server=$DBIP;Port=$DBPort;Database=$DBName;Uid=$DBUser;Pwd=$DBPass;"

# Настройки сервера 1С
$server1CSettings = @()
# Добавляем настройки сервера 1С для сбора данных.
# Аналогично можно добавить сколько угодно серверов
$server1CSettings += New-Object PSCustomObject -Property @{
    agentPort = 1540 # Порт сервера 1С
    agentAddress = "my.server.1c.ru" # Адрес сервера 1С
    clusterAdminName = "" # Имя администратора кластера (пустой, если его нет)
    clusterAdminPassword = "" # Пароль администратора кластера (пустой, если его нет)
} # Сервер 1С для сбора данных

# Получаем информацию о сеансах для каждого сервера
$server1CSettings | ForEach-Object {  

    $COMConnector = $null
    try {
        $COMConnector = New-Object -COMObject "V83.COMConnector"
        # Для 8.2
        #$COMConnector = New-Object -COMObject "V82.COMConnector"
        Write-Host "Компонента "COMConnector" зарегистрирована и готова к использованию." -ForegroundColor Green;
    } 
    catch {
        Write-Host "Компонента "V82.COMConnector" не зарегистрирована." -ForegroundColor Red;
    }
    $DBConn = $null
    try {
        $DBConn = New-Object System.Data.Odbc.OdbcConnection
        $DBConn.ConnectionString = $DBConnectionString
        $DBConn.Open();
        Write-Host "Установлено соединение с базой данных мониторинга." -ForegroundColor Green;
    }
    catch {
        Write-Host "Не удалось установить соединение с базой данных мониторинга." -ForegroundColor Red;
        $DBConn = $null
    }

    $agentAddress = $_.agentAddress
    $agentPort = $_.agentPort
    $clusterAdminName = $_.clusterAdminName
    $clusterAdminPassword = $_.clusterAdminPassword
    $fullAgentAddress = "tcp://" + $agentAddress + ":" + $agentPort;

    $fullAgentAddress

    try {
        if($null -ne $COMConnector -and $null -ne $DBConn) {
            $serverAgent = $COMConnector.ConnectAgent($fullAgentAddress);
            $clusterList = $ServerAgent.GetClusters();
            foreach ($cluster in $clusterList) {
                $serverAgent.Authenticate($Cluster, $clusterAdminName, $clusterAdminPassword)        

                $period = Get-Date
                $serverSessionsData = $serverAgent.GetSessions($cluster);

                $serverSessionsData | ForEach-Object {                
                    $itemSession = $_;

                    $DBCmd = $DBConn.CreateCommand()
                    $DBCmd.Connection = $DBConn
                    $insertQuery = 
@"
        INSERT INTO sessions1c
        (
            period,
            servername,
            infobase,
            sessionid,
            started_at,
            last_active_at,
            host,
            appid,
            username,
            work_process_id,
            connectionid,
            db_proc_info,
            db_proc_took_at,
            db_proc_took,
            blocked_by_dbms,
            blocked_by_ls,
            duration_current_dbms,
            duration_last_5_min_dbms,
            duration_all_dbms,
            dbms_bytes_last_5_min,
            dbms_bytes_all,
            duration_current,
            duration_last_5_min,
            duration_all,
            calls_last_5_min,
            calls_all,
            bytes_last_5_min,
            bytes_all
        )
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
"@
                    $DBCmd.CommandText = $insertQuery

                    [void]$DBCmd.Parameters.Add("@period", [System.Data.Odbc.OdbcType]::varchar, 26)
                    [void]$DBCmd.Parameters.Add("@servername", [System.Data.Odbc.OdbcType]::varchar, 25)
                    [void]$DBCmd.Parameters.Add("@infobase", [System.Data.Odbc.OdbcType]::varchar, 25)
                    [void]$DBCmd.Parameters.Add("@sessionid", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@started_at", [System.Data.Odbc.OdbcType]::varchar, 26)
                    [void]$DBCmd.Parameters.Add("@last_active_at", [System.Data.Odbc.OdbcType]::varchar, 26)
                    [void]$DBCmd.Parameters.Add("@host", [System.Data.Odbc.OdbcType]::varchar, 25)
                    [void]$DBCmd.Parameters.Add("@appid", [System.Data.Odbc.OdbcType]::varchar, 25)
                    [void]$DBCmd.Parameters.Add("@username", [System.Data.Odbc.OdbcType]::varchar, 50)
                    [void]$DBCmd.Parameters.Add("@work_process_id", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@connectionid", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@db_proc_info", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@db_proc_took_at", [System.Data.Odbc.OdbcType]::varchar, 26)
                    [void]$DBCmd.Parameters.Add("@db_proc_took", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@blocked_by_dbms", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@blocked_by_ls", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@duration_current_dbms", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@duration_last_5_min_dbms", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@duration_all_dbms", [System.Data.Odbc.OdbcType]::Int)
                    [void]$DBCmd.Parameters.Add("@dbms_bytes_last_5_min", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@dbms_bytes_all", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@duration_current", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@duration_last_5_min", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@duration_all", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@calls_last_5_min", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@calls_all", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@bytes_last_5_min", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@bytes_all", [System.Data.Odbc.OdbcType]::BigInt)
                    
                    # Дата получения информации о сеансах
                    $DBCmd.Parameters["@period"].Value = $period.ToString("yyyy-MM-dd HH:mm:ss")
                    # Имя сервера 1С
                    $DBCmd.Parameters["@servername"].Value = $agentAddress
                    # Содержит описание информационной базы, с которой установлен сеанс.
                    if($itemSession.infoBase -ne $null)
                    {
                        $DBCmd.Parameters["@infobase"].Value = $itemSession.infoBase.Name                                             
                    } else
                    {
                        $DBCmd.Parameters["@infobase"].Value = ""
                    }
                    # Содержит номер сеанса. Целое число, уникальное среди всех сеансов данной информационной базы.
                    $DBCmd.Parameters["@sessionid"].Value = $itemSession.SessionID   
                    # Дата/ время начала сеанса.
                    $DBCmd.Parameters["@started_at"].Value = $itemSession.StartedAt.ToString("yyyy-MM-dd HH:mm:ss")
                    # Дата/ время последней активности сеанса.
                    $DBCmd.Parameters["@last_active_at"].Value = $itemSession.LastActiveAt.ToString("yyyy-MM-dd HH:mm:ss")
                    # Содержит имя или адрес компьютера, установившего сеанс.
                    $DBCmd.Parameters["@host"].Value = $itemSession.Host
                    # Содержит идентификатор приложения, установившего сеанс.
                    $DBCmd.Parameters["@appid"].Value = $itemSession.AppID
                    # Содержит имя аутентифицированного пользователя информационной базы.
                    $DBCmd.Parameters["@username"].Value = $itemSession.userName 
                    # Идентификатор активного рабочего процесса в терминах операционной системы.               
                    if($null -ne $itemSession.process)
                    {
                        $DBCmd.Parameters["@work_process_id"].Value = $itemSession.process.PID
                    } else
                    {
                        $DBCmd.Parameters["@work_process_id"].Value = 0
                    }
                    # Содержит идентификатор соединения. Позволяет различить разные соединения, 
                    # установленные одним и тем же приложением с одного и того же клиентского компьютера.
                    if($null -ne $itemSession.connection)
                    {
                        $DBCmd.Parameters["@connectionid"].Value = $itemSession.connection.ConnID
                    } else
                    {
                        $DBCmd.Parameters["@connectionid"].Value = 0
                    }              
                    # Содержит номер соединения с СУБД в терминах СУБД в том случае, если в момент получения списка выполняется запрос к СУБД, 
                    # открыта транзакция или определены временные таблицы (это означает, что захвачено соединение с СУБД). 
                    try {
                        $DBCmd.Parameters["@db_proc_info"].Value = [int]$itemSession.dbProcInfo
                    }
                    catch {
                        $DBCmd.Parameters["@db_proc_info"].Value = 0
                    }                
                    # Содержит момент времени, когда соединение с СУБД было захвачено данным сеансом последний раз.
                    $DBCmd.Parameters["@db_proc_took_at"].Value = $itemSession.dbProcTookAt.ToString("yyyy-MM-dd HH:mm:ss")
                    # Содержит время соединение с СУБД с момента захвата в миллисекундах.
                    $DBCmd.Parameters["@db_proc_took"].Value = $itemSession.dbProcTook                
                    # Содержит номер сеанса, который является причиной ожидания транзакционной блокировки
                    $DBCmd.Parameters["@blocked_by_dbms"].Value = $itemSession.blockedByDBMS
                    # Содержит номер сеанса, который является причиной ожидания управляемой транзакционной блокировки
                    $DBCmd.Parameters["@blocked_by_ls"].Value = $itemSession.blockedByLS
                    # Содержит интервал времени в миллисекундах, прошедший с момента начала выполнения запроса, в случае, если сеанс выполняет запрос к СУБД.
                    $DBCmd.Parameters["@duration_current_dbms"].Value = $itemSession.durationCurrentDBMS
                    # Содержит суммарное время исполнения запросов к СУБД от имени данного сеанса за последние 5 минут, в миллисекундах.
                    $DBCmd.Parameters["@duration_last_5_min_dbms"].Value = $itemSession.durationLast5MinDBMS
                    # Содержит суммарное время исполнения запросов к СУБД от имени данного сеанса с момента начала сеанса, в миллисекундах.
                    $DBCmd.Parameters["@duration_all_dbms"].Value = $itemSession.durationAllDBMS
                    # Содержит количество данных, переданных и полученных от СУБД от имени данного сеанса за последние 5 минут, в байтах.
                    $DBCmd.Parameters["@dbms_bytes_last_5_min"].Value = $itemSession.dbmsBytesLast5Min
                    # Содержит количество данных, переданных и полученных от СУБД от имени данного сеанса с момента начала сеанса, в байтах.
                    $DBCmd.Parameters["@dbms_bytes_all"].Value = $itemSession.dbmsBytesAll
                    # Содержит интервал времени в миллисекундах, прошедший с момента начала обращения, в случае, если сеанс выполняет обращение к серверу 1С:Предприятия.
                    $DBCmd.Parameters["@duration_current"].Value = $itemSession.durationCurrent
                    # Содержит время исполнения вызовов сервера 1С:Предприятия от имени данного сеанса за последние 5 минут, в миллисекундах.
                    $DBCmd.Parameters["@duration_last_5_min"].Value = $itemSession.durationLast5Min
                    # Содержит время исполнения вызовов сервера 1С:Предприятия от имени данного сеанса с момента начала сеанса, в секундах.
                    $DBCmd.Parameters["@duration_all"].Value = $itemSession.durationAll
                    # Содержит количество вызовов сервера 1С:Предприятия от имени данного сеанса за последние 5 минут.
                    $DBCmd.Parameters["@calls_last_5_min"].Value = $itemSession.callsLast5Min
                    # Содержит количество вызовов сервера 1С:Предприятия от имени данного сеанса с момента начала сеанса.
                    $DBCmd.Parameters["@calls_all"].Value = $itemSession.callsAll
                    # Содержит объем данных, переданных между сервером 1С:Предприятия и клиентским приложением данного сеанса за последние 5 минут, в байтах.
                    $DBCmd.Parameters["@bytes_last_5_min"].Value = $itemSession.bytesLast5Min
                    # Содержит объем данных, переданных между сервером 1С:Предприятия и клиентским приложением данного сеанса с момента начала сеанса, в байтах.
                    $DBCmd.Parameters["@bytes_all"].Value = $itemSession.bytesAll               
                
                    [void]$DBCmd.ExecuteNonQuery()
                }                            
            }
        }

        $COMConnector = $null
        $DBConn = $null
    } 
    catch {
        Write-Host "Ошибка при выполнении скрипта." -ForegroundColor Red;
        Write-Host "Подробно:" -ForegroundColor Red
        Write-Host $Error[0] -ForegroundColor Red
    }

    $COMConnector = $null
    $DBConn = $null
}
```

Внутри скрипта также команды для создания базы данных.

#### Сохраняем информацию о рабочих процессах в базу PostgreSQL

А это скрипт для рабочих процессов.

```pwsh
<#
Перед работой скрипта сохранения информации о рабочих процессах 1С необходимо создать базу данных PostgreSQL
с соответствующей таблицей и индексом.

CREATE TABLE public.work_processes1c (
	hostname varchar(25) NOT NULL,
	main_port int8 NOT NULL,
	sync_port int8 NOT NULL,
	"enable" bool NOT NULL,
	running int8 NOT NULL,
	connections int8 NOT NULL,
	started_at timestamp(0) NOT NULL,
	avg_call_time float8 NOT NULL,
	avg_server_call_time float8 NOT NULL,
	avg_db_call_time float8 NOT NULL,
	avg_back_call_time float8 NOT NULL,
	avg_lock_call_time float8 NOT NULL,
	selection_size int8 NOT NULL,
	avg_threads float8 NOT NULL,
	capacity int8 NOT NULL,
	memory_size int8 NOT NULL,
	memory_excess_time int8 NOT NULL,
	available_perfomance int8 NOT NULL,
	pid int8 NOT NULL,
	use int8 NOT NULL,
	is_enable bool NOT NULL,
	"period" timestamp(0) NOT NULL,
	servername varchar(25) NOT NULL
);
CREATE INDEX work_processes1c_period_idx ON public.work_processes1c USING btree (period, servername, hostname);

Также нужно установить ODBC-драйвер для работы с PostgreSQL: https://odbc.postgresql.org/
#>

# Настройки сервера PostgreSQL
$DBIP = "127.0.0.1" # Адрес сервера PostgreSQL
$DBPort = 5432 # Порт сервера PostgreSQL
$DBName = "MyDatabase" # База данных для сохранения информации
$DBUser = "MyUser" # Пользователь PostgreSQL
$DBPass = "MyPassword" # Пароль пользователь PostgreSQL
$DBConnectionString = "Driver={PostgreSQL UNICODE};Server=$DBIP;Port=$DBPort;Database=$DBName;Uid=$DBUser;Pwd=$DBPass;"

# Настройки сервера 1С
$server1CSettings = @()
# Добавляем настройки сервера 1С для сбора данных.
# Аналогично можно добавить сколько угодно серверов
$server1CSettings += New-Object PSCustomObject -Property @{
    agentPort = 1540 # Порт сервера 1С
    agentAddress = "my.server.1c.ru" # Адрес сервера 1С
    clusterAdminName = "" # Имя администратора кластера (пустой, если его нет)
    clusterAdminPassword = "" # Пароль администратора кластера (пустой, если его нет)
} # Сервер 1С для сбора данных

# Получаем информацию о рабочих процессах для каждого сервера
$server1CSettings | ForEach-Object {  

    $COMConnector = $null
    try {
        $COMConnector = New-Object -COMObject "V83.COMConnector"
        # Для 8.2
        #$COMConnector = New-Object -COMObject "V82.COMConnector"
        Write-Host "Компонента "COMConnector" зарегистрирована и готова к использованию." -ForegroundColor Green;
    } 
    catch {
        Write-Host "Компонента "V82.COMConnector" не зарегистрирована." -ForegroundColor Red;
    }
    $DBConn = $null
    try {
        $DBConn = New-Object System.Data.Odbc.OdbcConnection
        $DBConn.ConnectionString = $DBConnectionString
        $DBConn.Open();
        Write-Host "Установлено соединение с базой данных мониторинга." -ForegroundColor Green;
    }
    catch {
        Write-Host "Не удалось установить соединение с базой данных мониторинга." -ForegroundColor Red;
        $DBConn = $null
    }

    $agentAddress = $_.agentAddress
    $agentPort = $_.agentPort
    $clusterAdminName = $_.clusterAdminName
    $clusterAdminPassword = $_.clusterAdminPassword
    $fullAgentAddress = "tcp://" + $agentAddress + ":" + $agentPort;

    $fullAgentAddress

    try {
        if($null -ne $COMConnector -and $null -ne $DBConn) {
            $serverAgent = $COMConnector.ConnectAgent($fullAgentAddress);
            $clusterList = $ServerAgent.GetClusters();
            foreach ($cluster in $clusterList) {
                $serverAgent.Authenticate($Cluster, $clusterAdminName, $clusterAdminPassword)        

                $period = Get-Date
                $workingProcesses = $serverAgent.GetWorkingProcesses($cluster)
                foreach ($workProcess in $workingProcesses) {
                    
                    $DBCmd = $DBConn.CreateCommand()
                    $DBCmd.Connection = $DBConn
                    $insertQuery = 
@"
        INSERT INTO work_processes1c
        (
            period,
	        servername,
	        hostname,    
	        main_port,
	        sync_port,
	        enable,
	        running,
	        connections,
	        started_at,
	        avg_call_time,
	        avg_server_call_time,
	        avg_db_call_time,
	        avg_back_call_time,
	        avg_lock_call_time,
	        selection_size,
	        avg_threads,
	        capacity,
	        memory_size,
	        memory_excess_time,
	        available_perfomance,
	        pid,
	        use,
	        is_enable
        )
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
"@
                    $DBCmd.CommandText = $insertQuery

                    [void]$DBCmd.Parameters.Add("@period", [System.Data.Odbc.OdbcType]::varchar, 26)
                    [void]$DBCmd.Parameters.Add("@servername", [System.Data.Odbc.OdbcType]::varchar, 25)
                    [void]$DBCmd.Parameters.Add("@hostname", [System.Data.Odbc.OdbcType]::varchar, 25)
                    [void]$DBCmd.Parameters.Add("@main_port", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@sync_port", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@enable", [System.Data.Odbc.OdbcType]::Bit)
                    [void]$DBCmd.Parameters.Add("@running", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@connections", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@started_at", [System.Data.Odbc.OdbcType]::varchar, 26)
                    [void]$DBCmd.Parameters.Add("@avg_call_time", [System.Data.Odbc.OdbcType]::Double)
                    [void]$DBCmd.Parameters.Add("@avg_server_call_time", [System.Data.Odbc.OdbcType]::Double)
                    [void]$DBCmd.Parameters.Add("@avg_db_call_time", [System.Data.Odbc.OdbcType]::Double)
                    [void]$DBCmd.Parameters.Add("@avg_back_call_time", [System.Data.Odbc.OdbcType]::Double)
                    [void]$DBCmd.Parameters.Add("@avg_lock_call_time", [System.Data.Odbc.OdbcType]::Double)
                    [void]$DBCmd.Parameters.Add("@selection_size", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@avg_threads", [System.Data.Odbc.OdbcType]::Double)
                    [void]$DBCmd.Parameters.Add("@capacity", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@memory_size", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@memory_excess_time", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@available_perfomance", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@pid", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@use", [System.Data.Odbc.OdbcType]::BigInt)
                    [void]$DBCmd.Parameters.Add("@is_enable", [System.Data.Odbc.OdbcType]::Bit)

					# Дата получения информации о рабочих процессах
                    $DBCmd.Parameters["@period"].Value = $period.ToString("yyyy-MM-dd HH:mm:ss")
					# Имя сервера 1С
                    $DBCmd.Parameters["@servername"].Value = $agentAddress
					# Содержит имя или IP-адрес компьютера, на котором должен быть запущен рабочий процесс.
                    $DBCmd.Parameters["@hostname"].Value = $workProcess.HostName
					# Содержит номер основного IP-порта рабочего процесса. Этот порт выделяется динамически 
					# при старте рабочего процесса из диапазонов портов, определенных для соответствующего рабочего сервера.
                    $DBCmd.Parameters["@main_port"].Value = $workProcess.MainPort
                    $DBCmd.Parameters["@sync_port"].Value = $workProcess.SyncPort
					# Признак включения рабочего процесса
                    $DBCmd.Parameters["@enable"].Value = $workProcess.Enable
					# 0 – процесс неактивен (либо не загружен в память, либо не может выполнять клиентские запросы); 1 – процесс активен (работает).
                    $DBCmd.Parameters["@running"].Value = $workProcess.Running
					# Connections
                    $DBCmd.Parameters["@connections"].Value = $workProcess.connections
					# Содержит момент запуска рабочего процесса. Если процесс не запущен, то содержит нулевую дату.
                    $DBCmd.Parameters["@started_at"].Value = $workProcess.StartedAt.ToString("yyyy-MM-dd HH:mm:ss")
					# Показывает среднее время обслуживания рабочим процессом одного клиентского обращения. 
					# Оно складывается из: значений свойств AvgServerCallTime, AvgDBCallTime, AvgLockCallTime.
                    $DBCmd.Parameters["@avg_call_time"].Value = $workProcess.AvgCallTime
					# Показывает среднее время, затрачиваемое самим рабочим процессом на выполнение одного клиентского обращения.
                    $DBCmd.Parameters["@avg_server_call_time"].Value = $workProcess.AvgServerCallTime
					# Показывает среднее время, затрачиваемое рабочим процессом на обращения к серверу баз данных при выполнении одного клиентского обращения.
                    $DBCmd.Parameters["@avg_db_call_time"].Value = $workProcess.AvgDBCallTime					
                    $DBCmd.Parameters["@avg_back_call_time"].Value = $workProcess.AvgBackCallTime
					# Показывает среднее время обращения к менеджеру блокировок.
                    $DBCmd.Parameters["@avg_lock_call_time"].Value = $workProcess.AvgLockCallTime
					# Количество вызовов, по которым посчитана статистика.
                    $DBCmd.Parameters["@selection_size"].Value = $workProcess.SelectionSize
					# Показывает среднее количество клиентских потоков, исполняемых рабочим процессом кластера.
                    $DBCmd.Parameters["@avg_threads"].Value = $workProcess.AvgThreads
					# Относительная производительность процесса. 
					# Может находиться в диапазоне от 1 до 1000. Используется в процессе выбора рабочего процесса, к которому будет подсоединен очередной клиент. 
                    $DBCmd.Parameters["@capacity"].Value = $workProcess.Capacity
					# Содержит объем виртуальной памяти, занимаемой рабочим процессом, в килобайтах.
                    $DBCmd.Parameters["@memory_size"].Value = $workProcess.MemorySize
					# Содержит время, в течение которого объем виртуальной памяти рабочего процесса превышает критическое значение, установленное для кластера, в секундах.
                    $DBCmd.Parameters["@memory_excess_time"].Value = $workProcess.MemoryExcessTime
					# Средняя за последние 5 минут доступная производительность. 
					# Определяется по времени реакции рабочего процесса на эталонный запрос.
					# В соответствии с доступной производительностью кластер серверов принимает решение о распределении клиентов между рабочими процессами.
                    $DBCmd.Parameters["@available_perfomance"].Value = $workProcess.AvailablePerfomance
					# Идентификатор активного рабочего процесса в терминах операционной системы.
                    $DBCmd.Parameters["@pid"].Value = $workProcess.PID
					<#
					Определяет использование рабочего процесса кластером. Устанавливается администратором. 
						Возможные значения:
						0 – не использовать, процесс не должен быть запущен;
						1 – использовать, процесс должен быть запущен;
						2 – использовать как резервный, процесс должен быть запущен только при невозможности запуска процесса со значением 1 этого свойства.
					#>
                    $DBCmd.Parameters["@use"].Value = $workProcess.Use
					
                    if($null -ne $workProcess.IsEnables)
                    {
                        $DBCmd.Parameters["@is_enable"].Value = $workProcess.IsEnables
                    } else
                    {
                        $DBCmd.Parameters["@is_enable"].Value = -1
                    }

                    [void]$DBCmd.ExecuteNonQuery()
                }
            }
        }                
    } 
    catch {
        Write-Host "Ошибка при выполнении скрипта." -ForegroundColor Red;
        Write-Host "Подробно:" -ForegroundColor Red
        Write-Host $Error[0] -ForegroundColor Red
    }

    $COMConnector = $null
    $DBConn = $null
}
```

Принцип тот же, что и для сеансов.

### Прочь COM, да здравствует RAC

Работа через COM в какой-то мере устарела и все скрипты относятся теперь к легаси. Эффективнее теперь все подобные действия выполнять [через RAC](https://v8.1c.ru/platforma/administrirovanie-klastera-serverov/).

#### Общий пример работы с RAC

Вот пример скрипта для блокировки выполнения фоновых заданий для информационных баз.

```pwsh
# Функция для выполнения произвольной команды с аргументами
Function Execute-Command ($commandTitle, $commandPath, $commandArguments)
{
    $pinfo = New-Object System.Diagnostics.ProcessStartInfo
    $pinfo.FileName = $commandPath
    $pinfo.RedirectStandardError = $true
    $pinfo.RedirectStandardOutput = $true
    $pinfo.UseShellExecute = $false
    $pinfo.CreateNoWindow = $true
    $pinfo.WindowStyle = [System.Diagnostics.ProcessWindowStyle]::Hidden
    $pinfo.Arguments = $commandArguments

    $p = New-Object System.Diagnostics.Process
    $p.StartInfo = $pinfo
    $p.Start() | Out-Null
    $p.WaitForExit(100) | Out-Null
    
    $resultObject = [pscustomobject]@{
        commandTitle = $commandTitle
        stdout = $p.StandardOutput.ReadToEnd()
        stderr = $p.StandardError.ReadToEnd()
        ExitCode = $p.ExitCode
    }

    return $resultObject
}
# Функция для преобразования консольного вывода в список объектов
Function Convert-StdOut-ToObjectList($sourceResult)
{
    $collectionResult = New-Object System.Collections.ArrayList
    $paramsResult = $sourceResult -split [System.Environment]::NewLine

    $resultObject = $null
    
    $paramsResult | ForEach-Object {
        $paramResult = $_;
        $indexDelimeter = $paramResult.IndexOf(":");
        if($indexDelimeter -gt 0)
        {
            if($null -eq $resultObject)
            {
                $resultObject = New-Object -TypeName PSObject
            }

            $paramName = $paramResult.Substring(0, $indexDelimeter).Trim();        
            $paramValue = $paramResult.Substring($indexDelimeter + 1, $paramResult.Length - $indexDelimeter - 1).Trim();       
            if($null -ne $paramName -and $null -ne $paramValue)
            {
                $resultObject | Add-Member -MemberType NoteProperty -Name $paramName -Value $paramValue
            }
        } else
        {
            $collectionResult.Add($resultObject) | Out-Null;
            $resultObject = $null
        }
    }        

    return $collectionResult;
}

# Параметры
$platformVersion = "8.3.18.1208"
$racExecPath = "C:\Program Files\1cv8\" + $platformVersion + "\bin\rac.exe"

# Получаем список кластеров
$commandClusterInfoResult = Execute-Command -commandTitle "Clusters List" -commandPath $racExecPath -commandArguments " cluster list"
$commandClusterInfoResultAsObjectList = Convert-StdOut-ToObjectList($commandClusterInfoResult[0].stdout.ToString());
$commandClusterInfoResultAsObjectList | ForEach-Object {
    $clusterObject = $_
    if($clusterObject -eq $null)
    {
        continue
    }  

    # Получаем список информационных баз
    $clusterId = $clusterObject.cluster
    $commandInfobasesInfoArguments = " infobase summary list --cluster=" + $clusterId
    $commandInfobasesInfo = Execute-Command -commandTitle "Infobases List" -commandPath $racExecPath -commandArguments $commandInfobasesInfoArguments
    $commandInfobasesInfoAsObjectList = Convert-StdOut-ToObjectList($commandInfobasesInfo[0].stdout.ToString());

    $commandInfobasesInfoAsObjectList | ForEach-Object {
        $itemInfoBase = $_
        if($itemInfoBase -eq $null)
        {
            continue
        } 

        # Изменяем параметры информационной базы
        $infobaseId = $itemInfoBase.infobase
        $userName = """"""; # Имя пользователя информационной базы
        $userPassword = """"""; # Пароль пользователя информационной базы
        $commandInfobasesDisableJobs = " infobase update --cluster=" + $clusterId + " --infobase=" + $infobaseId + "  --infobase-user=" + $userName + "  --infobase-pwd=" + $userPassword + " --scheduled-jobs-deny=on"        
        $commandInfobasesInfo = Execute-Command -commandTitle "Infobases Scheduled Jobs Deny" -commandPath $racExecPath -commandArguments $commandInfobasesDisableJobs

        $infobaseName = $itemInfoBase.name
        Write-Host "Изменены настройки для базы $infobaseName" -ForegroundColor Green
    }
}
```

Для других действий необходимо изучить документацию по RAC.

[Вооооооооооооот тут скрипт.](https://www.powershellgallery.com/packages/1C.Utils/0.1.9/Content/1C.Utils.psm1)

Только не заставляйте переписать все скрипты с COM на RAC :)

### Запуск 1С

Пару лет назад был выпущен модуль ["1C.Utils"](https://www.powershellgallery.com/packages/1C.Utils/0.3.0). Там есть хороший скрипт для запуска приложений 1С.

Жаль, что модуль больше не обновляется, но даже эти наработки можно использовать.

### Великий SQL Server

Для работы со SQL Server также есть огромный функционал. Работу можно выполнять через ODBC, SMO и многими другими путями. Ниже два небольших примера.

#### Пример работы с модулем DBATools

Здесь мы будем использовать готовый модуль [DBATools](https://dbatools.io/), о возможностях которого нам не хватит и целой статьи рассказать.

```pwsh
<#
Пример запуска простого запроса с помощью DBATools
GitHub: https://github.com/sqlcollaborative/dbatools
#>

$instance = "localhost"

# Получаем список файлов баз данных
Get-DbaFile -SqlInstance $instance

# Читаем данные событий Extended Events
Get-DbaXESession -SqlInstance $instance -Session system_health | Read-DbaXEFile | Out-GridView

# Сбос доступа администратора
Reset-DbaAdmin -SqlInstance $instance -Login sqladmin -Verbose
Get-DbaDatabase -SqlInstance $instance -SqlCredential sqladmin
```

[На официальной странице] п(https://dbatools.io/)роекта Вы можете найти все что нужно.

#### Пример создания сжатой тестовой базы со скрытым shrink'ом

Еще один пример работы, но уже с помощью SMO. Здесь мы создаем копию базы данных с включенным сжатием PAGE. Может пригодиться для создания тестовых баз.

```pwsh
<#
    Экспериментальный скрипт для копирования базы данных по объектам.
    Для копирования используется SQL Servet Managment Object
    https://docs.microsoft.com/ru-ru/sql/relational-databases/server-management-objects-smo/overview-smo?view=sql-server-2017

    Этапы работы скрипта:
        1. Создаем соединения со SQL Server
        2. Создаем пустую базу данных назначения
        3. Передаем все объекты базы данных в в базу назначения (данные не передаются)
        4. Включаем сжатие для всех объектов базы данных
        5. Передаем все данные для ранее скопированных объектов
        6. Закрываем соединения со SQL Server

    TODO: Скрипт эксперементальный и не для рабочего окружения. 
    Требует серьезного рефакторинга и доработок.
#>

[string] $SourceSQLInstance = "localhost";
[string] $SourceDatabase = "source_db_name";
[string] $TargetSQLInstance = "localhost";
[string] $TargetDatabase = "target_db_name";

#$sourceConnStr = "Data Source=$SourceSQLInstance;Initial Catalog=$SourceDatabase;Integrated Security=True;"
#$TargetConnStr = "Data Source=$TargetSQLInstance;Initial Catalog=$TargetDatabase;Integrated Security=True;"
$sourceConnStr = "Data Source=$SourceSQLInstance;Initial Catalog=$SourceDatabase;User Id=<userName>;Password=<userPassword>;"
$TargetConnStr = "Data Source=$TargetSQLInstance;User Id=<userName>;Password=<userPassword>;"

Import-Module -Name SQLPS
write-host 'SQLPS module loaded'



write-host 'Connecting...'

$sourceSQLServer = New-Object Microsoft.SqlServer.Management.Smo.Server $SourceSQLInstance
$sourceDB = $sourceSQLServer.Databases[$SourceDatabase]
$sourceConn = New-Object System.Data.SqlClient.SQLConnection($sourceConnStr)
$sourceConn.Open()

$targetSQLServer = New-Object Microsoft.SqlServer.Management.Smo.Server $TargetSQLInstance
$targetDB = $sourceSQLServer.Databases[$TargetDatabase]
$targetConn = New-Object System.Data.SqlClient.SQLConnection($TargetConnStr)
$targetConn.Open()

write-host 'Connection established!'


write-host 'Creating target database...'

if ($targetDB) {
    $targetSQLServer.KillAllprocesses($TargetDatabase)
    $targetDB.Drop()
}
$targetDBNew = New-Object Microsoft.SqlServer.Management.Smo.Database($targetSQLServer, $TargetDatabase)
$targetDBNew.Create()

write-host 'Database created!'


write-host 'Transferring database objects...'

$ObjTransfer = New-Object -TypeName Microsoft.SqlServer.Management.SMO.Transfer -ArgumentList $SourceDB

$ObjTransfer.Options.AllowSystemObjects = $false
$ObjTransfer.Options.ContinueScriptingOnError = $false
$ObjTransfer.Options.Indexes = $true
$ObjTransfer.Options.IncludeIfNotExists = $true
$ObjTransfer.Options.DriAll = $true
$ObjTransfer.Options.SchemaQualify = $true
$ObjTransfer.Options.ScriptSchema = $true
$ObjTransfer.Options.ScriptData = $true
$ObjTransfer.Options.WithDependencies = $true

$ObjTransfer.CopyAllTables = $true
$ObjTransfer.Options.WithDependencies = $true
$ObjTransfer.Options.ContinueScriptingOnError = $true
$ObjTransfer.DestinationDatabase = $TargetDatabase
$ObjTransfer.DestinationServer = $TargetSQLInstance
$ObjTransfer.DestinationLoginSecure = $true;
$ObjTransfer.CopyAllDatabaseTriggers = $true;
$ObjTransfer.CopyAllDefaults = $true;
$ObjTransfer.CopyAllFullTextCatalogs = $true;
$ObjTransfer.CopyAllFullTextStopLists = $true;
$ObjTransfer.CopyAllPartitionFunctions = $true;
$ObjTransfer.CopyAllPartitionSchemes = $true;
$ObjTransfer.CopyAllPlanGuides = $true;
$ObjTransfer.CopyAllRoles = $true;
$ObjTransfer.CopyAllRules = $true;
$ObjTransfer.CopyAllSchemas = $true;
$ObjTransfer.CopyAllSearchPropertyLists = $true;
$ObjTransfer.CopyAllSequences = $true;
$ObjTransfer.CopyAllSqlAssemblies = $true;
$ObjTransfer.CopyAllStoredProcedures = $true;
$ObjTransfer.CopyAllSynonyms = $true;
$ObjTransfer.CopyAllTables = $true;
$ObjTransfer.CopyAllUsers = $true;
$ObjTransfer.CopyAllViews = $true;
$ObjTransfer.CopyAllXmlSchemaCollections = $true;
$ObjTransfer.CopySchema = $true;
$ObjTransfer.CopyData = $false;

$ObjTransfer.TransferData()

write-host 'Database objects transferred!'





write-host 'Enabling compression for database objects...'

$targetConn.ChangeDatabase($TargetDatabase);

$cmdObjectCompression = 
"declare @table_name sys.sysname, @IS_CLUSTERED bit, @SQL nvarchar(1000)
    declare @c cursor
    set @c = cursor local fast_forward for   
    select distinct s.name + '.' + o.name, coalesce( (select 1 from sys.indexes i where o.object_id = i.object_id and i.type_desc = 'CLUSTERED' ), 0 ) IS_CLUSTERED
    from sys.partitions p
      inner join sys.objects o on p.object_id = o.object_id and o.type_desc = 'USER_TABLE' and p.partition_number = 1
      inner join sys.schemas s on s.schema_id = o.schema_id
    where p.data_compression_desc = 'NONE'
    open @c
    fetch next from @c into @table_name, @IS_CLUSTERED
    while (@@fetch_status = 0) begin
      set @sql = 'ALTER INDEX ALL ON ' + @table_name + ' REBUILD WITH (DATA_COMPRESSION = PAGE);' -- DATA_COMPRESSION = PAGE / DATA_COMPRESSION = NONE
      execute (@sql)
      print @sql
      if ( @IS_CLUSTERED = 0 ) begin
        set @sql = 'ALTER TABLE ' + @table_name + ' REBUILD WITH (DATA_COMPRESSION = PAGE);' -- DATA_COMPRESSION = PAGE / DATA_COMPRESSION = NONE
        execute (@sql)
        print @sql
      end
      fetch next from @c into @table_name, @IS_CLUSTERED
    end";

$commandObjectCompression = new-object system.data.sqlclient.sqlcommand($cmdObjectCompression, $targetConn);
$commandObjectCompressionResult = $commandObjectCompression.ExecuteNonQuery();

write-host 'Compression for database objects enabled!'





write-host 'Transferring data...'

$sqlCmd = New-Object System.Data.SqlClient.SqlCommand
$sqlCmd.Connection = $sourceConn
$sqlCmd.CommandText = "
SELECT
	a3.name AS [schemaname],
	a2.name AS [tablename],
	a1.rows as row_count
FROM
	(SELECT 
		ps.object_id,
		SUM (
			CASE
				WHEN (ps.index_id < 2) THEN row_count
				ELSE 0
			END
			) AS [rows]
	FROM sys.dm_db_partition_stats ps
	GROUP BY ps.object_id) AS a1
INNER JOIN sys.all_objects a2  ON ( a1.object_id = a2.object_id ) 
INNER JOIN sys.schemas a3 ON (a2.schema_id = a3.schema_id)
WHERE
	a2.type <> N'S' and a2.type <> N'IT'
	AND a1.rows > 0
ORDER BY row_count DESC";

$Tables = @();
$reader = $sqlCmd.ExecuteReader()
while ($reader.Read()) {
    $Tables += $reader["tablename"]
}
$reader.Close()

$countTables = $Tables.Count;
$numberTable = 1;

foreach ($table in $Tables) {

    $numberTable = $numberTable + 1;
    Write-Host "$numberTable / $countTables"

    if($Tables.Contains($table) -eq $false)
    {
        continue;
    }

    $dataTransfer = New-Object -TypeName Microsoft.SqlServer.Management.SMO.Transfer -ArgumentList $SourceDB
    $dataTransfer.DestinationDatabase = $TargetDatabase
    $dataTransfer.DestinationServer = $TargetSQLInstance
    $dataTransfer.CopyData = $true
    $dataTransfer.CopySchema = $false
    $dataTransfer.CopyAllObjects = $false
    $dataTransfer.BatchSize = 10000
    $itemTableFilter = $dataTransfer.ObjectList.Add($sourceDB.Tables[$table]);
    $dataTransferResult = $dataTransfer.TransferData()
}

write-host 'Data transferred!'



write-host 'Closing connections...'

$sourceConn.Close()
$targetConn.Close()

write-host 'Connections closed!'
```

У такого подхода есть и еще один плюс - не нужно делать шринк, т.к. данные с нуля создаются в копии базы. Поэтому пустого зарезервированного места в файле данных просто не будет.

Капля в море, но нужно же с чего-то начинать :)

### Совсем немного PostgreSQL

Для работы с PostgreSQL также можно использовать PowerShell, даже если установка выполнена на Linux. Следующий скрипт показывает простейший вызов команд с помощью psql.

```pwsh
<#
Пример вызова PSQL из скрипта с установкой логина и пароля пользователя
#>

# Путь PostgreSQL
$pgDirectory = "C:\Program Files\PostgreSQL\13\bin"
# Устанавливаем текущий каталог PostgreSQL для простого вызова утилиты psql
# Альтернативный подход - добавить этот каталог в параметры окружения
Set-Location $pgDirectory;
# База данных для подключения
$pgDatabase = "postgres"
# Имя пользователя
$pgUser = "postgres"
# Пароль пользователя
$pgPassword = 'Pas$w0rd'
# psql не имеет параметра установки пароля явно в параметрах вызова,
# но вместо этого можно установить пароль через параметр окружения
$env:PGPASSWORD = $pgPassword;

# Выполнение произвольной команды
.\psql.exe -p 5432 -U $pgUser -d $pgDatabase -c 'select now()'

# Завершение всех соединений с указанной базой данных
#.\psql.exe -p 5432 -U $pgUser -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND datname = '$pgDatabase';"

# Выполнение скрипта из файла. Таким же образом можно выполнить восстановление из дампа (*.sql)
#.\psql.exe -p 5432 -U $pgUser -d $pgDatabase -1 -f $scriptFilePath
```

Фишкой здесь является установка пароля пользователя, от которого выполняется обращение к СУБД, т.к. psql не имеет такого параметра явно. В остальном ничего сложного.

Можно выполнять множество других действий, но для примера оставим только этот скрипт.

### Вызов стороннего API

Часто приходится иметь дело с различными REST-сервисами:

* Проверять их доступность
* Управлять учетными записями
* Автоматизировать настройку
* И др.

В этом случае с помощью PowerShell также можно решать поставленные задачи.

#### Пример вызова API сервера Zabbix

Например, с помощью следующего скрипта можно проверить доступность API сервера Zabbix.

```pwsh
<#
Пример вызова JSON-API Zabbix
#>
function CheckZabbixApi($zbxUserName, $zbxUserPassword, $zbxBaseUrl)
{
    $params = @{
        body =  @{
            "jsonrpc"= "2.0"
            "method"= "user.login"
            "params"= @{
                "user"= $zbxUserName
                "password"= $zbxUserPassword
            }
            "id"= 1
            "auth"= $null
        } | ConvertTo-Json
        uri = "$zbxBaseUrl/api_jsonrpc.php"
        headers = @{"Content-Type" = "application/json"}
        method = "Post"
    }

    $result = Invoke-WebRequest @params
    $statusCode = $result.StatusCode
    if($statusCode -ne 200)
    {
        throw "Wrong answer from API: $statusCode"
    }
}

# Пример использования
try
{
    CheckZabbixApi();
    Write-Host "API доступен!" -BackgroundColor Green
} catch
{
    Write-Host "API недоступен!" -BackgroundColor Red
}
```

Аналогично можно обращаться к любым REST-сервисам. Главное формировать запрос с учетом их требований.

Подобная тема актуальная и при работе с облаками (Azure, AWS и др.) или любыми другими сервисами.

### Собственный бот

Использование мессенджеров для уведомления о важных событиях мониторинга трудно переоценить. Ниже скрипт для отправки сообщений в Telegram.

#### Отправка сообщений в Telegram

Для отправки сообщений достаточно знать ID бота и идентификатор чата. 

```pwsh
# Настройки Телеграм
$telegramBotId = "<BotId>" # Идентификатор бота
$telegramChacId = "<ChatId>" # Идентификатор чата

Send-TelegramTextMessage `
    -BotToken $telegramBotId `
    -ChatID $telegramChacId `
    -Message "Hello from Telegram!" `
    -ParseMode Markdown `
    -Preview $false `
    -Notification $false `
    -Verbose
```

В результате сообщение будет отправлено и важное событие не будет пропущено. Вот служебные функции из скрипта выше.

```pwsh
<#
Функция для отправки сообщений в Telegram

Автор оригинального скрипта:
https://gist.github.com/techthoughts2

Сам скрипт взят отсюда:
https://gist.github.com/techthoughts2/8b1c20b1bf145103c71bc64704e272bc

Также есть более функциональный модуль для PowerShell:
https://github.com/techthoughts2/PoshGram
#>

<#
.Synopsis
    Sends Telegram text message via Bot API
.DESCRIPTION
    Uses Telegram Bot API to send text message to specified Telegram chat. Several options can be specified to adjust message parameters.
.EXAMPLE
    $bot = "#########:xxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxx"
    $chat = "-#########"
    Send-TelegramTextMessage -BotToken $bot -ChatID $chat -Message "Hello"
.EXAMPLE
    $bot = "#########:xxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxx"
    $chat = "-#########"

    Send-TelegramTextMessage `
        -BotToken $bot `
        -ChatID $chat `
        -Message "Hello *chat* _channel_, check out this link: [TechThoughts](http://techthoughts.info/)" `
        -ParseMode Markdown `
        -Preview $false `
        -Notification $false `
        -Verbose
.PARAMETER BotToken
    Use this token to access the HTTP API
.PARAMETER ChatID
    Unique identifier for the target chat
.PARAMETER Message
    Text of the message to be sent
.PARAMETER ParseMode
    Send Markdown or HTML, if you want Telegram apps to show bold, italic, fixed-width text or inline URLs in your bot's message. Default is Markdown.
.PARAMETER Preview
    Disables link previews for links in this message. Default is $false
.PARAMETER Notification
    Sends the message silently. Users will receive a notification with no sound. Default is $false
.OUTPUTS
    System.Boolean
.NOTES
    Author: Jake Morrison - @jakemorrison - http://techthoughts.info/
    This works with PowerShell Versions 5.1, 6.0, 6.1
    For a description of the Bot API, see this page: https://core.telegram.org/bots/api
    How do I get my channel ID? Use the getidsbot https://telegram.me/getidsbot
    How do I set up a bot and get a token? Use the BotFather https://t.me/BotFather
.COMPONENT
   PoshGram - https://github.com/techthoughts2/PoshGram
.FUNCTIONALITY
    https://core.telegram.org/bots/api#sendmessage
    Parameters 					Type 				Required 	Description
    chat_id 				    Integer or String 	Yes 		Unique identifier for the target chat or username of the target channel (in the format @channelusername)
    text 						String 				Yes 		Text of the message to be sent
    parse_mode 					String 				Optional 	Send Markdown or HTML, if you want Telegram apps to show bold, italic, fixed-width text or inline URLs in your bot's message.
    disable_web_page_preview 	Boolean 			Optional 	Disables link previews for links in this message
    disable_notification 		Boolean 			Optional 	Sends the message silently. Users will receive a notification with no sound.
    reply_to_message_id 	    Integer 			Optional 	If the message is a reply, ID of the original message
#>
function Send-TelegramTextMessage {
    [CmdletBinding()]
    Param
    (
        [Parameter(Mandatory = $true,
            HelpMessage = '#########:xxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxx')]
        [ValidateNotNull()]
        [ValidateNotNullOrEmpty()]
        [string]$BotToken, #you could set a token right here if you wanted
        [Parameter(Mandatory = $true,
            HelpMessage = '-#########')]
        [ValidateNotNull()]
        [ValidateNotNullOrEmpty()]
        [string]$ChatID, #you could set a Chat ID right here if you wanted
        [Parameter(Mandatory = $true,
            HelpMessage = 'Text of the message to be sent')]
        [ValidateNotNull()]
        [ValidateNotNullOrEmpty()]
        [string]$Message,
        [Parameter(Mandatory = $false,
            HelpMessage = 'HTML vs Markdown for message formatting')]
        [ValidateSet("Markdown", "HTML")]
        [string]$ParseMode = "Markdown", #set to Markdown by default
        [Parameter(Mandatory = $false,
            HelpMessage = 'Disables link previews')]
        [bool]$Preview = $false, #set to false by default
        [Parameter(Mandatory = $false,
            HelpMessage = 'Sends the message silently')]
        [bool]$Notification = $false #set to false by default
    )
    #------------------------------------------------------------------------
    $results = $true #assume the best
    #------------------------------------------------------------------------
    $payload = @{
        "chat_id"                   = $ChatID;
        "text"                      = $Message
        "parse_mode"                = $ParseMode;
        "disable_web_page_preview"  = $Preview;
        "disable_notification"      = $Notification
    }#payload
    #------------------------------------------------------------------------
    try {
        Write-Verbose -Message "Sending message..."

        # Раскоментируйте эту строку, если при отправке получаете ошибку вида 
        # "Не удалось создать безопасный канал SSL / TLS"
        #[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12   

        $eval = Invoke-RestMethod `
            -Uri ("https://api.telegram.org/bot{0}/sendMessage" -f $BotToken) `
            -Method Post `
            -ContentType "application/json" `
            -Body (ConvertTo-Json -Compress -InputObject $payload) `
            -ErrorAction Stop
        if (!($eval.ok -eq "True")) {
            Write-Warning -Message "Message did not send successfully"
            $results = $false
        }#if_StatusDescription
    }#try_messageSend
    catch {
        Write-Warning "An error was encountered sending the Telegram message:"
        Write-Error $_
        $results = $false
    }#catch_messageSend
    return $results
    #------------------------------------------------------------------------
}#function_Send-TelegramTextMessage
```

Очень удобно с этим работать, если оформить в модуль. Но это уже другая история.

Есть решения и для других мессенджеров (WhatsApp, Viber и т.д.), но рассматривать их сейчас не будем.

### Отправка писем

Электронная почта также до сих пор остается важным инструментом коммуникаций. Отправка туда сообщений иногда является самым универсальным способом уведомлений, ведь не все предпочитают одинаковые мессенджеры. А вот почта, по крайней мере корпоративная, есть почти всегда.

#### Отправка писем через Yandex.Mail

Этот скрипт отправляет почту через сервис Yandex.Mail.

```pwsh
<#
Пример скрипта отправки почтовых сообщений сервисом Yandex Mail.
Для других сервисов скрипт будет примерно таким же, но могут отличатсья параметры. См. инструкции сервиса.
#>

# Параметры почтового сервера
$serverSmtp = "smtp.yandex.ru" # Адрес сервера
$port = 587 # Порт
$From = "login@yandex.ru" # Отправитель
$To = "login@mail.ru" # Получатель
$subject = "Всем привет!" # Тема

$user = "login@yandex.ru" # Пользователь
$pass = '<Pas$w0rd>' # Пароль

# Формируем письмо
$mes = New-Object System.Net.Mail.MailMessage
$mes.From = $from # Отправитель
$mes.To.Add($to) # Добавляем получателя
$mes.Subject = $subject # Указываем тему
$mes.IsBodyHTML = $true # Устанавливаем флаг, что письмо в формате HTML
$mes.Body = "<h1>Доброго дня!</h1>" # Задаем тело письма

#Добавляем файл по указанному пути в качестве вложения
# $file = "C:\Docs\SomeDoc.xlsx"
# $att = New-object Net.Mail.Attachment($file)
# $mes.Attachments.Add($att) 

# Настраиваем подключение к почтовому серверу
$smtp = New-Object Net.Mail.SmtpClient($serverSmtp, $port)
$smtp.EnableSSL = $true # Включаем использование SSL
# Настраиваем данные аутентификации
$smtp.Credentials = New-Object System.Net.NetworkCredential($user, $pass); 

# Отправляем письмо
$smtp.Send($mes) 
# Очищаем данные присоединенных файлов
# $att.Dispose()
```

У Яндекс есть различные ограничения, о которых стоит прочитать в документации. Например, двухфакторная аутентификация уже не позволит таким способом отправлять почту. Есть и другие нюансы.

А Вы используете электронную почту для уведомлений?

### Контролируй процессы

Часто приходится управлять различными процессами в системе. Например, завершить зависшие процессы или узнать потребляемые ими ресурсы. Тут то на сцену выходит PowerShell :)

#### Список процессов

Примеры команд для получения информации о процессах различными способами.

```pwsh
<#
Примеры команд для управления процессами
#>

# 1. Получение списка всех активных процессов
Get-Process
<# Пример вывода
NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
------    -----      -----     ------      --  -- -----------
    16    13,52      19,33       0,00    4808   0 AdjustService
    33    56,60      27,76     109,02   18204   1 Agent
    15     3,80      12,36       0,00    5232   0 AGMService
    14     3,52      12,30       0,00    5216   0 AGSService
    51    91,05      96,21      14,02   15216   1 ApCent
    28    28,86      34,76       0,23   16380   1 ApplicationFrameHost
    11     8,20      14,98       0,06   23244   0 audiodg
#>

# 2. Получение информации о конкретном процессе
Get-Process -Id 18204
<# Пример вывода
 NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
     33    56,67      27,79     109,20   18204   1 Agent
#>

# 3. Получение процессов по имени (полному или по шаблону)
Get-Process -Name rph*
<# Пример вывода
 NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
     97    73,46      88,60       0,00    6804   0 rphost

Также можно применить несколько условий по отбором по имени.
#>
Get-Process -Name rph*,ragent,rmngr
<# Пример вывода
 NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
     73    46,81      34,77       0,00    1172   0 ragent
    108   108,90      64,94       0,00   17296   0 rmngr
     97    73,64      88,70       0,00    6804   0 rphost
#>
```

Проще простого!

#### Убить нельзя помиловать

Кроме получения информации о процессах нужно еще и уметь их останавливать.

```pwsh
# 1. Остановка процессов по имени
Stop-Process -Name rphost

# 2. Остановка процессов, которые не отвечают
Get-Process -Name rphost | Where-Object -FilterScript {$_.Responding -eq $false} | Stop-Process

# 3. Остановка процесса по тексту в заголовке. Может быть полезно для завершения процессов, у которых "всплыла" ошибка с Visual C++ Runtime.
$processData = Get-Process | Where-Object { $_.mainwindowhandle -ne 0 -and $_.ProcessName -eq '<Отбор по имени процесса>' } | Select-Object MainWindowTitle, ProcessName, Id

$processData | ForEach-Object {
    # Проверяем наличие нужного текста в заголовке приложения
    if ($_.MainWindowTitle -like '*Visual C++*') {
        Stop-Process -Id $_.Id
    }
}
```

В первом примере выполняется остановка процессов по имени. Во втором остановка процессов, которые не отвечают. А третий пример наиболее интересен - завершаются процессы, во время выполнения которых появилась ошибка вида "Visual C++ Runtime Library".

Вот такие процессы и будут завершены.

Имей власть над процессами и будешь властвовать над ОС :)

### Проверка свободного порта

Почти каждый сталкивался с проблемой, когда служба 1С могла не запускаться из-за занятого порта другим приложением. Для диагностики нужно проверить кто нужный порт занял. Тут на сцену выходит...

#### Свободный ли порт?

С помощью скрипта можно узнать кто и как занял порт.

```pwsh
<#
Пример скрипта для получения информации о том кто и какой порт использует.

Можно искать информацию для конкретного порта или процесса.
#>

netstat -ano | 
Where-Object{$_ -match 'LISTENING|UDP'} | 
ForEach-Object {
    $split = $_.Trim() -split "\s+"
    [pscustomobject][ordered]@{
        "Protocol" = $split[0]
        "LocalAddress" = $split[1]
        "ForeignAddress" = $split[2]
        # Some might not have a state. Check to see if the last element is a number. If it is ignore it
        "State" = if($split[3] -notmatch "\d+"){$split[3]}else{""}
        # The last element in every case will be a PID
        "ProcessName" = $(Get-Process -Id $split[-1]).ProcessName
        "ProcessId" = $split[-1]
    }
} |
# Where-Object{$_.ProcessId -eq 15151} | # Фильтр по идентификатору процесса
# Where-Object{$_.ProcessName -like 'rmng*'} | # Фильтр по имени приложения
# Where-Object{$_.LocalAddress -like '*:1560'} | # Фильтр по порту
Select Protocol, LocalAddress, ForeignAddress, State, ProcessName, ProcessId
```

Главное раскомментировать нужное условие для фильтрации результата.

Теперь можно не гадать, почему служба 1С не запустилась :)

### Удаленное управление

PowerShell позволяет выполнять скрипты / команды на удаленных машинах, что значительно упрощает решение задач администрирования. Решается это с помощью PSRemoting. Ранее все удаленные взаимодействия выполнялись через WinRM, теперь же появилась возможность работать и через SSH.

Ниже пример настройки для Windows и выполнение удаленной команды.

#### Простейший пример настройки

На обоих машинах нужно обязательно установить PowerShell и включить удаленное управление. Ниже пример скрипта для настройки.

```pwsh
<#
Простейшая настройка удаленного доступа через PSRemoting
Внимание! Скрипт не для рабочего окружения.

Подробнее можно прочитать:
https://www.howtogeek.com/117192/how-to-run-powershell-commands-on-remote-computers/
https://docs.microsoft.com/ru-ru/powershell/module/microsoft.powershell.core/about/about_remote_faq?view=powershell-7.1#can-i-create-a-persistent-connection
https://docs.microsoft.com/ru-ru/powershell/scripting/learn/remoting/running-remote-commands?view=powershell-7.1
#>

# Включаем использование PSRemoting
Enable-PSRemoting -Force

# Включаем доступ для других машин (в этом случае для всех)
Set-Item wsman:\localhost\client\trustedhosts *

# Перезапускаем службу WinRM
Restart-Service WinRM

# Проверяем доступ
Test-WsMan HostNameForTest
```

Нужно учитывать, что это лишь пример скрипта, который не годится для рабочего окружения.

#### Как использовать

После настройки можно выполнять любой скрипт на удаленной машине. Ниже пример перезапуска удаленного хоста.

```pwsh
<#
Пример выполнения простейшей команды
#>

# Перезапускаем удаленный компьютер
Invoke-Command -ComputerName HostName -ScriptBlock { 
    Restart-Computer -Force
} -credential UserName
```

Никто не мешает удаленно выполнить любой скрипт из тех, что были показаны выше.

Один PowerShell, чтоб править всеми ... хостами.

### Еще еще еще

На этом примеры скриптов закончим. Многие другие скрипты и примеры можно найти в таких источниках:

* [PowerShell](https://github.com/fleschutz/PowerShell) - набор публичных скриптов под разные задачи.
* [PowerShellTools](https://github.com/YPermitin/PowerShellTools) - еще один репозиторий со скриптами.

А теперь пойдем дальше.

## Меньше костылей

Создавать свои скрипты - это нормально, но некоторые задачи уже были решены до нас и мы можем этот опыт использовать. В контексте PowerShell это либо использовать скрипты других разработчиков, либо брать на вооружение целые готовые модули PowerShell от сообщества или компаний (обычно выпускают вместе с каким-либо продуктом, как это делает та же Microsoft).

* [Planet PowerShell](https://www.planetpowershell.com/) и [PowerShell.org](https://powershell.org/) - сообщество разработчиков PowerShell.

- [PoweShell Galery](https://www.powershellgallery.com/) - галерея готовых скриптов и решений на PowerShell. В разделе просмотра списка пакетов Вы можете найти такие популярные модули как:
  - [dbatools](https://dbatools.io/) - модуль автоматизации работы со SQL Server.
  - [AdminToolbox.ActiveDirectory](https://github.com/TheTaylorLee/AdminToolbox) - инструменты для управления Active Directory.
  - [SimplySql](https://github.com/mithrandyr/SimplySql) - удобный инструмент для формирования запросов к разным СУБД (SQL Server, PostgreSQL, Oracle и др.).

И очень много всего еще.

Есть даже 1C.Utils (о нем говорили выше) - небольшой набор инструментов для 1С, правда автор забросил его пару лет назад, а жаль.

В общем, готовых решений много, а участников сообщества еще больше!

## В самом конце

Все что я хотел сказать в этой статье, так это недооцененный инструмент для решения повседневных задач - PowerShell. Недооцененный именно в среде разработчиков 1С, тогда как в мире .NET, CI/CD и для управления некоторых облачных решений - PowerShell занял хорошие позиции.

Вместо использования готовых решений, сообщество и сама фирма "1С" пошли своим путем, создавая собственные инструменты автоматизации. Причем фирма "1С" проигнорировала труды сообщества в виде OneScript и создает собственный инструмент - 1С:Исполнитель.

Конечно, чем больше инструментов, тем лучше. Но средства автоматизации создаются не только для разработчиков 1С, но и для администраторов, DevOps'ов и других специалистов, которые могут и не иметь прямого отношения к 1С. А если администратору нужно будет автоматизировать процесс разворачивания клиентов 1С, сбор информации с сервера 1С или другую задачу автоматизации, то зачем ему изучать OneScript или 1С:Исполнитель? А ставить для их работы дополнительные компоненты, о которых в не1Сном сообществе не слышали и не могут доверять им.

Автор не противник OneScript или 1С:Исполнитель. Я фанат PowerShell и немного Bash. Понимаю, что коллеги проделали большую работу и продукт взлетел в определенном смысле. Но может сообществу 1С пора быть более открытым и не замыкаться свою экосистему саму на себя?