---
layout: post
title: Познавательный PowerShell
categories: powershell
background: '/img/posts/2022/2022-05-13-%D0%9F%D0%BE%D0%B7%D0%BD%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/logo.png'
---

Еще немного PowerShell нам в помощь.

## Мы снова здесь!

В прошлогодней статье ["Занимательный PowerShell"](https://ypermitin.github.io/powershell/2021/05/16/Занимательный-PowerShell.html) мы уже говорили про применение мощного скриптового языка PowerShell для решения насущных задач.

Сегодня мы пробежимся по новым скриптам и задачам, которые с их помощью можно решить. От задач связанных с платформой 1С, так и до более отдаленных.

В этот раз мы не будем рассматривать настройку окружения, различных инструментов для разработки скриптов на PowerShell и связанные с этим темы. Все это Вы можете посмотреть в предыдущей статье.

Итак, ближе к делу!

## Удаляйте журналы вовремя

Все мы знаем, что журналы регистрации платформа 1С хранит в каталоге кластера, а точнее в подкаталогах каждой информационной базы. Это не относится к файловым базам, но они нам не интересны.

С учетом того, что остается только текстовый вариант журнала, ведь из-за известных проблем SQLite-формата сама фирма "1С" отказывается от него (но это не точно?), встает задача периодической очистки файлов для освобождения места.

Чтобы делать очистку от старых записей журнала регистрации без остановки службы сервера 1С можно включить разделение файлов журнала по периоду. Например, по дням. Делается это в конфигураторе.

<a href="/img/posts/2022/2022-05-13-%D0%9F%D0%BE%D0%B7%D0%BD%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/1.%20%D0%A0%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B6%D1%83%D1%80%D0%BD%D0%B0%D0%BB%D0%B0%20%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D0%B8.png" target="_blank">
<img 
  src="/img/posts/2022/2022-05-13-%D0%9F%D0%BE%D0%B7%D0%BD%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/1.%20%D0%A0%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B6%D1%83%D1%80%D0%BD%D0%B0%D0%BB%D0%B0%20%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D0%B8.png" 
  title="Разделение журнала регистрации" 
  class="img-fluid"
/>
</a>

Тогда на каждый день мы будем получать новые файлы. В большинстве случаев старые файлы не будут заняты серверными процессами платформы 1С и могут быть спокойно удалены.

Затем берем скрипт очистки от файлов журнала регистрации.

В скрипте указываем количество дней, сколько должны файлы журнала регистрации храниться. Также можно указать ниже отбор по имени информационной базы.

Скрипт находит установленные службы 1С, для каждой из них анализирует каталог кластера и во всех каталогах с файлами журналов регистрации удаляет файлы формата "*.lgp". Путь к каталогам журналов регистрации получаем через анализ файла конфигурации кластера.

```posh
$limit = (Get-Date).AddDays(-15) # Файлы старше 15 дней
$services1C = Get-WmiObject win32_service | ?{$_.Name -like '*'} |
    Select Name, DisplayName, State, PathName | 
    Where-Object { $_.PathName  -Like "*ragent.exe*" };

$services1C | % {
    $serviceExecPath = $services1C.PathName;

    $hash = [ordered]@{}
    $serviceExecPath.Split("-").Trim() | Where-Object { $_.Contains(" ") } | ForEach-Object { 
        $name, $value = $_ -split '\s+', 2
        $hash[$name] = $value
    }

    $clusterPath = $hash.d -replace '"', ''
    $clusterRegPort = $hash.regport
    $clusterRegPath = "$clusterPath\reg_$clusterRegPort"
    $clusterConfigFile = "$clusterRegPath\1CV8Reg.lst"
    $clusterConfigFileExists = Test-Path $clusterConfigFile -PathType Leaf
    if($clusterConfigFileExists -eq $false)
    {
        $clusterConfigFile = "$clusterRegPath\1CV8Clst.lst"
    }
    $clusterConfigFileExists = Test-Path $clusterConfigFile -PathType Leaf
    if($clusterConfigFileExists -eq $true)
    {
        Select-String -Path $clusterConfigFile '\{[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12},\"[A-Za-z0-9-_]+\"' -AllMatches | 
        Foreach-Object {$_.Matches} | 
        ForEach-Object {
            $parsedString = $_.Value -split ","
            $ibGuid = $parsedString[0] -replace "{", "" 
            $ibName = $parsedString[1] -replace '"', ""
            
            # Фильтр по имени базы. По умолчанию все базы
            if($ibName -like "*")
            {
                $eventLogPath = "$clusterRegPath\$ibGuid\1Cv8Log"
                $eventLogPathExists = Test-Path $eventLogPath -PathType Container
                if($eventLogPathExists -eq $true)
                {
                    Write-Host "Infobase for clearing event log: $ibName"
                    Write-Host "Event log path: $eventLogPath"            
        
                    $logFilesData = Get-ChildItem -Path $eventLogPath *.lgp -Force | 
                    Where-Object { !$_.PSIsContainer -and $_.CreationTime -lt $limit } 
                    Write-Host "Log files to remove:"
                    $logFilesData                    
                    $logFilesData | Remove-Item -Force

                    $logFilesIndexes = Get-ChildItem -Path $eventLogPath *.lgx -Force | 
                    Where-Object { !$_.PSIsContainer -and $_.CreationTime -lt $limit } 
                    Write-Host "Log indexes files to remove:"
                    $logFilesIndexes                    
                    $logFilesIndexes | Remove-Item -Force
                }
            }
        }
    } else
    {
        Write-Host "Cluster config file not found: $clusterConfigFile"
    }
}
```

Под специфичные случаи скрипт можно поменять. Например, явно указав каталоги для очистки или добавив архивирование старых "*.lgp" файлов. В последнем случае не забудьте также сохранить файл с ссылочными данными "1Cv8.lgf".

В общем, не стесняйтесь изменять скрипт под себя!

Для регулярного запуска можно использовать планировщик Windows, создав в нем задачу с подобной командой:

```bash
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "<ПутьКФайлуСоСкриптом>.ps1"
```

Задача решена, теперь поехали дальше.

## Ох уж эти COM-объекты

В прошлой статье мы уже рассматривали действия по регистрации, удалению регистрации и проверке работы COM-компоненты платформы 1С. Теперь перейдем на другой уровень!

Всем известно, что на одном сервере могут быть зарегистрированы COM-компоненты разных версий платформы 1С. Но почему бы не автоматизировать этот процесс и выполнять регистрацию COM-компонентов по одному щелчку.

Принцип действия такой:

* Указываем список COM-компонентов для регистрации с именем (должно быть уникальным); путем до comcntr.dll нужной версии; а также именем и пользователем операционной системы, от имени которого будет работать компонента.
* Затем для каждой настройки устанавливается COM+-приложение.
* Далее регистрируется компонента в приложении.
* Обновляются настройки доступа.
* И на последнем шаге корректируются настройки реестра, т.к. установка каждой новой COM-компоненты ломает настройки ранее установленных COM'ов.

При этом, если ранее приложение и компонента уже были установлены, то предварительно они будут удалены.

```posh
# Предварительно перечислеяем COM-компоненты для регистрации с их путями до DLL, а также параметры авторизации для каждого приложения (пользователя и пароль)
# По указанному имени после регистрации можно будет обращаться к этому COM-компоненту из скриптов или самой платформы 1С.
# Поле CLSID не нужно заполнять (!!!). Оно будет заполнено автоматически присвоенным ID при регистрации компоненты.
$dllForRegistration =
@(
    [pscustomobject]@{Name="V8.2.19.130.COMConnector";DLLPath="C:\Program Files\1cv82\8.2.19.130\bin\comcntr.dll";UserName="yy\ypermitin";UserPassword="";CLSID=""},
    [pscustomobject]@{Name="V8.3.6.2530.COMConnector";DLLPath="C:\Program Files\1cv8\8.3.6.2530\bin\comcntr.dll";UserName="yy\ypermitin";UserPassword="";CLSID=""},
    [pscustomobject]@{Name="V8.3.8.2442.COMConnector";DLLPath="C:\Program Files\1cv8\8.3.8.2442\bin\comcntr.dll";UserName="yy\ypermitin";UserPassword="";CLSID=""}
);

function InstallApplication($comAdmin, $comObjectName, $DLLPath, $username = "", $userpassword = "") {

    $AppID = "{$(New-Guid)}".ToUpper();
    $AppName = $comObjectName -replace "\.", "_";
    $AppDesc = "Application for COM-component ""$AppName""";

    $Apps = $comAdmin.GetCollection("Applications")
    $Apps.Populate();

    $AppFound = $false
    $AppFoundedObject = $null
    $AppFoundIndex = -1;
    foreach ($App in $Apps ) {
        $AppFoundIndex = $AppFoundIndex + 1;
        if ($App.Name -eq $AppName ) {
            $AppFound = $true;
            $AppFoundedObject = $App;     
            break;       
        }
    }

    if($null -ne $AppFoundedObject)
    {
        $Apps.Remove($AppFoundIndex);
        $Apps.SaveChanges();
        Write-Host "$AppName removed" -ForegroundColor Red
        $AppFound = $false;
    }

    $NewApp = $null
    if (!($AppFound)) {
        $NewApp = $Apps.Add()
        $NewApp.Value("ID") = $AppID
        $NewApp.Value("Name") = $AppName
        $NewApp.Value("Description") = $AppDesc
        $NewApp.Value("ApplicationAccessChecksEnabled") = $True
        $NewApp.Value("AccessChecksLevel") = 1 #Component level
        $NewApp.Value("Activation") = "Local"

        if(![string]::IsNullOrEmpty($username) -and ![string]::IsNullOrEmpty($userpassword))
        {
            $NewApp.Value("Identity") = $username;
            $NewApp.Value("Password") = $userpassword;
        }

        $Apps.SaveChanges() # | Out-Null
        Write-Host "$AppName successfully registered" -ForegroundColor Green
    }
    Else {
        Write-Host "$AppName already exists, skipping" -ForegroundColor Green
    }

    $registeredApplication = [pscustomobject]@{
        AppId=$AppID;
        AppName=$AppName;
        AppDesc=$AppDesc;
        NewApp=$NewApp;
        DLLPath = $DLLPath;
        COMObjectName = $comObjectName;
    }
    $registeredApplication
}

function InstallComponent($comAdmin, $registeredApplication) {
    $AppDLL = $registeredApplication.DLLPath;
    $AppID = $registeredApplication.AppId;   
    $comAdmin.InstallComponent($AppID, $AppDLL, "", "");
    
    $Apps = $comAdmin.GetCollection("Applications")
    $Apps.Populate();
        
    $Comps = $Apps.GetCollection("Components", $AppID)
    $Comps.Populate();
    ForEach ($Comp in $Comps) {
        $comAdmin.AliasComponent($AppID, $($Comp.Key), $AppID, $($registeredApplication.COMObjectName), "") | Out-Null;
        break;
    }

    $Comps = $Apps.GetCollection("Components", $AppID)
    $Comps.Populate();
    $CompIndex = -1;
    $newCreatedComponent = $null;
    ForEach ($Comp in $Comps) {
        $CompIndex = $CompIndex + 1;
        if($Comp.Name -ne $registeredApplication.COMObjectName)
        {
            $Comps.Remove($CompIndex);
            $Comps.SaveChanges() | Out-Null;
        } else
        {
            $newCreatedComponent = $Comp;
        }
    }

    $registeredComponent = [pscustomobject]@{
        CLSID = $newCreatedComponent.Key
        Name = $newCreatedComponent.Name
    }
    $registeredComponent
}

function ConfigureSecurity($comAdmin, $registeredApplication, $registeredComponent, $username = "") {

    $AppID = $registeredApplication.AppId;   
    $CLSID = $registeredComponent.CLSID

    $Apps = $comAdmin.GetCollection("Applications")
    $Apps.Populate();

    # Добавляем права доступа на приложение и компоненты.
    #https://msdn.microsoft.com/en-us/library/windows/desktop/ms678849%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396
    $Roles = $Apps.GetCollection("Roles", $AppID)
    $Roles.Populate();

    $found = $false
    foreach ( $Role in $Roles ) {
        if ($Role.Key -eq "CreatorOwner") {
            $found = $true
        }
    }
    if (!($found)) {
        $Role = $Roles.Add()
        $Role.Value("Name") = "CreatorOwner"
    }
    $Roles.SaveChanges() | Out-Null;

    if(![string]::IsNullOrEmpty($username))
    {
        $Users = $Roles.GetCollection("UsersInRole", "CreatorOwner")
        $User = $Users.Add()
        $User.Value("User") = $username
        $Users.SaveChanges() | Out-Null;

        $Comps = $apps.GetCollection("Components", $AppID)
        $Comps.Populate();

        ForEach ($Comp In $Comps ) {
          If ($Comp.Key -eq $CLSID) {
              $ComponentFound = $True
          }
        }
        If ($ComponentFound ) {
            $RolesForComponent = $Comps.GetCollection("RolesForComponent", $CLSID)
            $RoleForComponent = $RolesForComponent.Add()
            $RoleForComponent.Value("Name") = "CreatorOwner"
            $RolesForComponent.SaveChanges() | Out-Null;
        }
        Else {
            Write-Warning "CLSID $CLSID not found"
        }
    }
}

$comAdmin = New-Object -comobject COMAdmin.COMAdminCatalog

# Выполнение регистрации всех компонентов
$dllForRegistration | ForEach-Object {   
    # Создаем приложение COM+ для каждой версии COM-компоненты
    $registeredApplication = InstallApplication $comAdmin $($_.Name) $($_.DLLPath) $($_.UserName) $($_.UserPassword)

    # Регистрируем COM-компонету в приложении и корректируем ее псевдоним
    $registeredComponent = InstallComponent $comAdmin $registeredApplication
    $_.CLSID = $registeredComponent.CLSID;

    # Обновить настройки доступа
    ConfigureSecurity $comAdmin $registeredApplication $registeredComponent $($_.UserName)
}

# Корректруем настройки реестра, "сломанные" после регистрации нескольких COM-компонентов 1C
$dllForRegistration | ForEach-Object {
    $destDLLPath = $($_.DLLPath);
    $itemCLSIDKey = "Registry::HKEY_CLASSES_ROOT\CLSID\$($_.CLSID)"
    if(Test-Path -Path $itemCLSIDKey)
    {
        $ItemCLSID = Get-Item -Path $itemCLSIDKey
        $procInfo = Get-ItemProperty "$($ItemCLSID.PSPath)\InprocServer32" -ErrorAction SilentlyContinue
        if($procInfo)
        {
            $dllPath = $procInfo.'(default)'
            if($destDLLPath -ne $dllPath)
            {
                Set-ItemProperty "$($ItemCLSID.PSPath)\InprocServer32" -Name '(default)' -Value $destDLLPath
                Write-Host "Fixed DLL path for ""$($_.Name)"" to ""$($destDLLPath)"" from ""$dllPath""" -ForegroundColor Green
            }
        }
    }
}
```

В результате мы получим установленные, зарегистрированные и готовые к использованию COM-компоненты платформы 1С. А если нужно будет добавить новую, то просто в скрипте дописываем настройку и запускаем еще разок!

В большинстве случаев перезагрузка сервера после этих манипуляций не нужна, но быть готовым к этому нужно.

Таким образом, одним кликом можно устанавливать множество COM-компонентов разных версий платформ 1С. И доустанавливать новые версии тоже. Не забывайте запускать скрипт с нужными привилегиями. Классная картина, не правда ли.

<a href="/img/posts/2022/2022-05-13-%D0%9F%D0%BE%D0%B7%D0%BD%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/2.%20COM-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B%20%D0%BD%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%B8%D1%85%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B9.png" target="_blank">
<img 
  src="/img/posts/2022/2022-05-13-%D0%9F%D0%BE%D0%B7%D0%BD%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/2.%20COM-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B%20%D0%BD%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%B8%D1%85%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B9.png" 
  title="Зарегистрированные COM-компоненты" 
  class="img-fluid"
/>
</a>

Но зарегистрировать и установить - это одно дело. Иногда нужно еще и узнать какие COM-компоненты уже зарегистрированы в системе. И тут могут быть сложности, ведь регистрацию можно выполнить как с помощью утилиты "regsvr32.exe", так и с помощь оснастки "Службы компонентов" (та, что на скрине выше). Так узнаем же!

Скрипт ниже получит список всех зарегистрированных COM-компонентов, покажет их CLSID, путь к DLL-файлу "comcntr.dll", а также название инструмента, с помощью которого компонента была зарегистрирована (службы компонентов (comexp.msc) или утилита regsvr32.exe).

Скрипт анализирует реестр на наличие установленных COM-компонентов.

```posh
$allComObjects = [System.Collections.ArrayList]@()

# Поиск COM-компонентов, зарегистрированных с помощью regsvr32.exe
Get-ChildItem HKLM:\Software\Classes -ea 0 | 
    Where-Object { 
        $_.PSChildName -match '^\w+\.\w+$' -and 
        (Get-ItemProperty "$($_.PSPath)\CLSID" -ea 0)
    } | ForEach-Object {
        $COMName = $_.PSChildName    
        $CLSIDProperty = Get-ItemProperty "$($_.PSPath)\CLSID"    
        $CLSID = $CLSIDProperty.'(default)' -replace '{', '' -replace '}', ''
        
        if($CLSID)
        {
            $itemCLSIDKey = "Registry::HKEY_CLASSES_ROOT\CLSID\{$CLSID}"
            if(Test-Path -Path $itemCLSIDKey)
            {
                $ItemCLSID = Get-Item -Path $itemCLSIDKey
                $procInfo = Get-ItemProperty "$($ItemCLSID.PSPath)\InprocServer32" -ErrorAction SilentlyContinue
                if($procInfo)
                {
                    $dllPath = $procInfo.'(default)'

                    if($dllPath -like '*comcntr.dll')
                    {
                        $COMObjectInfo = [PSCustomObject]@{
                            Name = $COMName
                            CLSID = $CLSID
                            DLLPath = $dllPath
                            RegisteredBy = "regsvr32.exe"
                        }

                        $allComObjects.Add($COMObjectInfo) | Out-Null
                    }
                }
            }
        }
    }

# Поиск COM-компонентов, зарегистрированных с помощью службы компонентов
$comAdmin = New-Object -com ("COMAdmin.COMAdminCatalog.1")
$applications = $comAdmin.GetCollection("Applications") 
$applications.Populate() 
foreach ($application in $applications)
{

    $components = $applications.GetCollection("Components",$application.key)
    $components.Populate()
    foreach ($component in $components)
    {
        $dllName = $component.Value("DLL")
        if($dllName -like "*comcntr.dll")
        {
            $COMName = $component.Name
            $CLSID = $component.Key -replace "{", "" -replace "}", ""
            #$component            

            $COMObjectInfo = [PSCustomObject]@{
                Name = $COMName
                CLSID = $CLSID
                DLLPath = $dllName
                RegisteredBy = "comexp.msc"
            }

            $allComObjects.Add($COMObjectInfo) | Out-Null
        }
    }
}

$allComObjects | Format-Table
```

Это может быть полезно перед установкой новых COM-компонентов, чтобы знать текущую ситуацию на сервере.

Также бывают случаи, когда компоненту одновременно регистрируют как с помощью regsvr32.exe, так и с помощью службы компонентов (comexp.msc). Что может приводить к их некорректной работе. Возможно, Вы даже сталкивались с тем, что компоненту зарегистрировали, сервер перезапустили, но все равно она не работает. Возможно, это тот самый случай.

Вот такой результат мы можем получить.

<a href="/img/posts/2022/2022-05-13-%D0%9F%D0%BE%D0%B7%D0%BD%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/3.%20%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA%20%D0%B7%D0%B0%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20COM-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BE%D0%B2.png" target="_blank">
<img 
  src="/img/posts/2022/2022-05-13-%D0%9F%D0%BE%D0%B7%D0%BD%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20PowerShell/3.%20%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA%20%D0%B7%D0%B0%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20COM-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BE%D0%B2.png" 
  title="Список зарегистрированных COM-компонентов" 
  class="img-fluid"
/>
</a>

Но и это еще не все! Иногда можно столкнуться с непонятными ошибками при регистрации компонентов. В качестве кардинального решения можно удалить все зарегистрированные компоненты, перезагрузить сервер и начать заново. В этом нам поможет новый скрипт!

Весь код здесь уже должен быть знаком по предыдущим скриптам. В реестре ищем зарегистрированные компоненты, а потом удаляем их нужным способом.

```posh
$allComObjects = [System.Collections.ArrayList]@()

# Поиск COM-компонентов, зарегистрированных с помощью regsvr32.exe
Get-ChildItem HKLM:\Software\Classes -ea 0 | 
    Where-Object { 
        $_.PSChildName -match '^\w+\.\w+$' -and 
        (Get-ItemProperty "$($_.PSPath)\CLSID" -ea 0)
    } | ForEach-Object {
        $COMName = $_.PSChildName    
        $CLSIDProperty = Get-ItemProperty "$($_.PSPath)\CLSID"    
        $CLSID = $CLSIDProperty.'(default)' -replace '{', '' -replace '}', ''
        
        if($CLSID)
        {
            $itemCLSIDKey = "Registry::HKEY_CLASSES_ROOT\CLSID\{$CLSID}"
            if(Test-Path -Path $itemCLSIDKey)
            {
                $ItemCLSID = Get-Item -Path $itemCLSIDKey
                $procInfo = Get-ItemProperty "$($ItemCLSID.PSPath)\InprocServer32" -ErrorAction SilentlyContinue
                if($procInfo)
                {
                    $dllPath = $procInfo.'(default)'

                    if($dllPath -like '*comcntr.dll')
                    {
                        $COMObjectInfo = [PSCustomObject]@{
                            Name = $COMName
                            CLSID = $CLSID
                            DLLPath = $dllPath
                            RegisteredBy = "regsvr32.exe"
                        }

                        $allComObjects.Add($COMObjectInfo) | Out-Null
                    }
                }
            }
        }
    }

# Поиск COM-компонентов, зарегистрированных с помощью службы компонентов
$comAdmin = New-Object -com ("COMAdmin.COMAdminCatalog.1")
$applications = $comAdmin.GetCollection("Applications") 
$applications.Populate() 
foreach ($application in $applications)
{

    $components = $applications.GetCollection("Components",$application.key)
    $components.Populate()
    foreach ($component in $components)
    {
        $dllName = $component.Value("DLL")
        if($dllName -like "*comcntr.dll")
        {
            $COMName = $component.Name
            $CLSID = $component.Key -replace "{", "" -replace "}", ""         

            $COMObjectInfo = [PSCustomObject]@{
                Name = $COMName
                CLSID = $CLSID
                DLLPath = $dllName
                RegisteredBy = "comexp.msc"
            }

            $allComObjects.Add($COMObjectInfo) | Out-Null
        }
    }
}

$allComObjects | ForEach-Object {
    if($_.RegisteredBy -eq "regsvr32.exe")    
    {
        $unregCommand = "regsvr32.exe /u ""$($_.DLLPath)""";
        cmd /c "$unregCommand"
        Write-Host "Регистрация компоненты ""$($_.Name)"" успешно отменена!" -ForegroundColor Red
    } elseif($_.RegisteredBy -eq "comexp.msc")  
    {
        $comAdmin = New-Object -comobject COMAdmin.COMAdminCatalog
        $Apps = $comAdmin.GetCollection("Applications")
        $Apps.Populate();
        $AppName = $_.Name -replace "\.", "_";
        $AppFoundedObject = $null
        $AppFoundIndex = -1;
        foreach ($App in $Apps ) {
            $AppFoundIndex = $AppFoundIndex + 1;
            if ($App.Name -eq $AppName ) {
                $AppFoundedObject = $App;     
                break;       
            }
        }
        if($null -ne $AppFoundedObject)
        {
            $Apps.Remove($AppFoundIndex) | Out-Null;
            $Apps.SaveChanges() | Out-Null;
            Write-Host "$AppName removed" -ForegroundColor Red
        }

        Write-Host "Регистрация компоненты ""$($_.Name)"" успешно отменена!" -ForegroundColor Red
    }
}
```

Проще простого!

Теперь Вы можете массово регистрировать и удалять COM-компоненты платформы 1С разных версий, а также просто получать список всех зарегистрированных компонентов на сервере.

## Немного Outlook

Что мы все об 1С?! Давайте посмотрим на другие задачи. Например, работу с Microsoft Outlook. Этот замечательный почтовый клиент из пакета MS Office есть во многих компаниях. И частенько можно получить задачу по загрузке контактов и групп контактов в почтовый клиент из файлов или других источников.

Ниже пример скрипта как загружать контакты и группы.

В примере скрипта можно найти пример создания контактов и групп контактов с заполнением основных полей.

```posh
# Исходные данные контактов, которые могут быть получены любым доступным способом (API, загрузка из файла и т.д.)
$contactsByGroup = @{}
$department = "Тюмень"
$contactListForGroup = New-Object System.Collections.Generic.List[System.Object];
$contactsByGroup.Add($department, $contactListForGroup);
$contactsByGroup[$department].Add(@{
    innerPhone = "+79220000000"
    fullName   = "Джон Генри"
    email      = "john123@corp.ru"
}); 

# Инициализация объекта приложения
$outlook = new-object -com Outlook.Application -ea 1;
# Текущая сессия рабоыт с приложением
$outlookSession = $outlook.session;
# Каталог контактов по умолчанию
$contactsFolder = $outlookSession.GetDefaultFolder(10);

$contactsByGroup.Keys | ForEach-Object {
    $contactGroupName = $_;

    # Выполняем поиск группы контактов. Если не смогли найти, то создаем.
    # В этом случае группа контактов - это список рассылки. Также можно создавать группу контактов,
    # вложенную непосредственно в группу. Тут кому как удобно.
    $subfolerItem = $null
    try
    {
        $subfolerItem = $contactsFolder.Items.Item($contactGroupName);
        $subfolerItem.Delete();
    } catch
    {
        # Действий не требуется
    }

    $dl = $contactsFolder.Items.Add("IPM.DistLIst");
    $dl.DLName = $contactGroupName;
    $dl.Save()  | Out-Null;
    $subfolerItem = $contactsFolder.Items.Item($contactGroupName);

    <#
    # Это пример создания вложенной группы.
    $subfolerItem = $null
    try
    {
        $subfolerItem = $contactsFolder.Folders.Item($contactGroupName);
        $subfolerItem.Delete();
    } catch
    {
        # Действий не требуется
    }
    $dl = $contactsFolder.Folders.Add("IPM.DistLIst");
    $dl.DLName = $contactGroupName;
    $dl.Save() | Out-Null;
    $subfolerItem = $contactsFolder.Folders.Item($contactGroupName);
    #>

    # Обходим контакты в кажой группе и создаем их. При этом в группу контактов (группу рассылки)
    #  добавляем нужные данные контактов.
    $contactsByGroup[$contactGroupName] | ForEach-Object {
        Write-Host "Контакт $($_.email) ($contactGroupName)..."

        $fullName = $_.fullName.Trim();  
        $email = $_.email.Trim();     

        # Если контакт уже существует, то удаляем его, чтобы создать заново.
        @($contactsFolder.Items).
            Where{ $_.MessageClass -eq "IPM.Contact" }.            
            Where{ $_.Email1Address -eq $email } | 
            ForEach-Object {
                $_.Delete();
                Write-Host " УДАЛЕН!"
            }      

        Write-Host " Начало создания контакта..."
        $newcontact = $contactsFolder.Items.Add()
        $newcontact.Title = $fullName;
        $newcontact.Email1Address = $_.email;
        $newcontact.Email1DisplayName = "$fullName ($email)"
        $newcontact.BusinessTelephoneNumber = $_.innerPhone;
        $newcontact.Department = $contactGroupName;
        $newcontact.Companies = "Моя компания"
        $newcontact.FullName = $fullName;
        # Заполняем другие свойства контакта в зависимости от задачи.
        $newcontact.Save();
        Write-Host " Контакт СОЗДАН!"
        
        # Создаем объект получаетеля для группы рассылки.
        # Если создается группа контактов, то это действие не требуется.
        # Получатель определяется по EMAIL, который передается в конструктор.
        $recipientByContact = $outlookSession.CreateRecipient($email);
        $recipientByContact.Resolve(); # Сопоставляем адрес с уже сущестующим контактом
        # $recipientByContact.Resolved # Тут должно быть TRUE, чтобы контакт был добавлен в список рассылки
        if($recipientByContact)
        {
            $subfolerItem.AddMember($recipientByContact);
            $subfolerItem.Save() | Out-Null;
        }
    }    
}
```

Ничего сложного! :)

Да, это намного проще, чем регистрировать COM-компоненты 1С разных версий :).

## Работаем с сервисами Yandex

У компании "Яндекс" множество полезных сервисов. С ними можно работать из bash, 1С и любых других языков и платформ, в том числе и из PowerShell.

В скрипте ниже пример обращения к сервису перевода из Яндекс.Облака.

Для понимания происходящего в скрипте ниже рекомендую также ознакомиться с [официальной документацией](https://yandex.ru/dev/webmaster/doc/dg/concepts/About.html), в которой можно найти ссылки на описание работы и с другими сервисами. Не только переводчиком. Тут можно прочитать [про получение IAM-токенов](https://ypermitin.github.io/devoooops/2022/04/04/Отправка-файлов-в-Yandex-Disk-через-REST-API-из-Bash.html).

```posh
# Шаг 1. Убедиться, что платежный аккаунт находится в статусе ACTIVE или TRIAL_ACTIVE (https://console.cloud.yandex.ru/billing?section=accounts)

# Шаг 2. Получите OAuth-токен в сервисе Яндекс.OAuth. Для этого перейдите по ссылке, нажмите Разрешить и скопируйте полученный OAuth-токен.
$yandexPassportOauthToken = "<OAuthТокен>"

# Шаг 3. Получаем IAM-токен (https://cloud.yandex.ru/docs/iam/operations/iam-token/create). 
# В примере ниже это будет выполняться через API, а не CLI.
# Время жизни IAM-токена — не больше 12 часов, но рекомендуется запрашивать его чаще, например каждый час.
$Body = @{ yandexPassportOauthToken = "$yandexPassportOauthToken" } | ConvertTo-Json -Compress
$iamToken = Invoke-RestMethod -Method 'POST' -Uri 'https://iam.api.cloud.yandex.net/iam/v1/tokens' -Body $Body -ContentType 'Application/json' | Select-Object -ExpandProperty iamToken

# Шаг 4. Получаем идентификатор облака. В примере берем только первый элемент.
$cloudInfo = Invoke-RestMethod -Method 'GET' -Uri 'https://resource-manager.api.cloud.yandex.net/resource-manager/v1/clouds' -Headers @{Authorization = "Bearer $iamToken"} -Body $Body -ContentType 'Application/json'
$cloudId = $cloudInfo.clouds[0].id

# Шаг 5. Получаем идентификатор любого каталога, на который у аккаунта есть роль editor или выше.
# Чтобы получить список каталогов с идентификаторами, воспользуйтесь методом list для ресурса Folder.
$folderInfo = Invoke-RestMethod -Method 'GET' -Uri "https://resource-manager.api.cloud.yandex.net/resource-manager/v1/folders?cloud_id=$cloudId" -Headers @{Authorization = "Bearer $iamToken"} -Body $Body -ContentType 'Application/json'
$folderId = $folderInfo.folders[0].id

# Шаг 6. Переводим текст
# Пошаговая инструкция https://cloud.yandex.ru/docs/translate/operations/translate
# Официальная документация https://cloud.yandex.ru/docs/translate/?utm_source=console&utm_medium=empty-page&utm_campaign=translate
$sourceLanguage = 'ru'; # Язык назначения
$targetLanguage = 'en'; # Язык назначения
$text = "Привет из космоса!", "Все будет хорошо!", "1С великолепна!!!"
$postData = @{
    sourceLanguageCode = $sourceLanguage
    targetLanguageCode = $targetLanguage    
    texts = $text
    folderId = $folderId
    glossaryConfig = @{
        glossaryData = @{
            glossaryPairs = @(
                @{
                    sourceText = "1С великолепна"
                    translatedText = ".NET is awesome"
                }
            )
        }
    }
}
$postDataAsJson = $postData | ConvertTo-Json -Depth 5
$operationResult = Invoke-RestMethod -Method 'POST' -ContentType 'application/json; charset=UTF-8' -Uri 'https://translate.api.cloud.yandex.net/translate/v2/translate' -Headers @{Authorization = "Bearer $iamToken"} -Body $postDataAsJson # -OutFile "D:\Trash\result.log"
$operationResult

Write-Host "Результаты перевода текста."
$operationResult.translations
$operationResult.translations | ForEach-Object {
    $_.text
}
```

В примере для разнообразия также используем глоссарий. В результате этот текст:

```
"Привет из космоса!"
"Все будет хорошо!"
"1С великолепна!!!"
```

Будет переведен вот в этот:

```
Результат перевода:
Greetings From Outer Space!
Everything will be fine!
.NET is awesome!!!
```

Профит! :)

Используя этот пример можно обращаться и к другим сервисом Яндекса.

## Заблокирован ли файл?

Еще задачей может быть проверка заблокирован ли файл другим приложением.

С помощью функции Test-FileLock можно проверить занят ли файл.

```posh
function Test-FileLock {
    param (
        [parameter(Mandatory = $true)][string]$Path,
        [parameter(Mandatory = $false)][System.IO.FileAccess]$AccessType = [System.IO.FileAccess]::Read
    )
    $oFile = New-Object System.IO.FileInfo $Path
  
    if ((Test-Path -Path $Path) -eq $false) {
        return $false
    }
  
    try {
        # [System.IO.FileAccess]::Read - проверяется возможность доступа к файлу только на чтение
        # Если нужно проверить доступ на запись, то параметр можно заменить на [System.IO.FileAccess]::ReadWrite
        $oStream = $oFile.Open([System.IO.FileMode]::Open, $AccessType, [System.IO.FileShare]::ReadWrite)
  
        if ($oStream) {
            $oStream.Close()
        }
        return $false
    }
    catch {
        # Файл заблокирован процессом
        return $true
    }
}

$testFile = "C:\swapfile.sys"
$fileLocked = Test-FileLock $testFile ([System.IO.FileAccess]::ReadWrite)
if ($fileLocked -eq $true) {
    Write-Host "Файл заблокирован другим приложением."
}
```

Может быть полезно во многих случаях.

## Надежное копирование файлов

Для надежного копирования файлов по сети можно использовать утилиты [Robocopy](https://learn.microsoft.com/ru-ru/windows-server/administration/windows-commands/robocopy). Из PowerShell это выглядит так.

В официальной документации можно найти описание всех параметров.

```posh
$source="C:\source"
$dest="D:\destination"

$what = @("/COPYALL","/B","/SEC","/MIR")
$options = @("/R:0","/W:0","/NFL","/NDL")

$cmdArgs = @("$source","$dest",$what,$options)
robocopy @cmdArgs
```

Сценарии использования тоже очень разнообразные: от копирования бэкапов, то синхронизации каталогов между серверами.

## Сессии Windows

И под конец самый простой пример - получаем список сессий Windows и завершаем их по необходимости.

Простые шаги.

```posh
# Список сессий Windows

query user

# Завершение пользовательского сеанса Windows по ID

logoff <ID сессии>
```

Простое решение :)

## Хватит, пожалуй

Порция примеров работы с PowerShell закончена. Но кейсов использования этого прекрасного инструмента бесконечное количество. Все самое интересное можно найти в официальной документации, GitHub и на других просторах интернета.

PowerShell еще вернется! Удачи в делах и хорошего настроения!
