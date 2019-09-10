---
layout: post
title: Редактируемый SELECT
categories: [JavaScript, JQuery]
---

<script src="//code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="//rawgithub.com/indrimuska/jquery-editable-select/master/dist/jquery-editable-select.min.js"></script>
<link href="//rawgithub.com/indrimuska/jquery-editable-select/master/dist/jquery-editable-select.min.css" rel="sty

Это простой пример редактируемого элемента SELECT, для реализации которого используется JavaScript-библиотека [JQuery](https://ru.wikipedia.org/wiki/JQuery).

## Что это?

### Редактируемый SELECT с поиском по вводу

<section id="Cities">
    <label id="LabelSelect">Город:</label>
    <select id="OriginalSelect" class="form-control">
        <option value="1">Москва</option>
        <option value="2">Санкт-Петербург</option>
        <option value="3">Новосибирск</option>
        <option value="4">Екатеринбург</option>
        <option value="5">Нижний Новгород</option>
        <option value="6">Казань</option>
        <option value="7">Челябинск</option>
        <option value="8">Омск</option>
        <option value="9">Самара</option>
        <option value="11">Ростов-на-Дону</option>
        <option value="12">Уфа</option>
        <option value="13">Красноярск</option>
        <option value="14">Пермь</option>
        <option value="15">Воронеж</option>
        <option value="16">Волгоград</option>
        <option value="17">Саратов</option>
        <option value="18">Краснодар</option>
        <option value="19">Тольятти</option>
        <option value="20">Тюмень</option>
    </select>
</section>

## Стандартный SELECT

Стандартный элемент SELECT не поддерживает возможность редактирования или поиска по вводу. Все действия с ним сводятся к выбору значения из выпадающего списка:

<section id="CitiesStandart">
    <label id="LabelSelectStandart">Город:</label>
    <select id="OriginalSelectStandart" class="form-control">
        <option value="1">Москва</option>
        <option value="2">Санкт-Петербург</option>
        <option value="3">Новосибирск</option>
        <option value="4">Екатеринбург</option>
        <option value="5">Нижний Новгород</option>
        <option value="6">Казань</option>
        <option value="7">Челябинск</option>
        <option value="8">Омск</option>
        <option value="9">Самара</option>
        <option value="11">Ростов-на-Дону</option>
        <option value="12">Уфа</option>
        <option value="13">Красноярск</option>
        <option value="14">Пермь</option>
        <option value="15">Воронеж</option>
        <option value="16">Волгоград</option>
        <option value="17">Саратов</option>
        <option value="18">Краснодар</option>
        <option value="19">Тольятти</option>
        <option value="20">Тюмень</option>
    </select>
</section>

Если в списке содержится большое количество значений, то работа с ним становится не удобной. Тем более, если при создании страницы в элемент будет добавлено очень большое количество элементов (например, список клиентов или список товаров), то это попросту увеличит объем разметки. 

При использовании редактируемого SELECT можно делать поиск по вводу для вводимого в поле текста, а также при необходимости реализовать динамическую загрузку значений для выбора с помощью AJAX-запросов,а не всех сразу.

## Реализация

К странице подключена библиотека ["jQuery Editable Select"](https://github.com/indrimuska/jquery-editable-select), а также собственный JS-файл "2019-09-08-EditableSelect.js". Он имеет следующее содержимое:

```js
<script>
        $(function () {
            $("#OriginalSelect").editableSelect();
        });
</script>
```

Именно метод "editableSelect()" используется для того, чтобы сделать SELECT редактируемым. В результате оригинальный элемент SELECT будет скрыт, а вместо него будет отображаться INPUT со списком выбора OL.

![SELECT до и после](/images/2019-09-08-EditableSelect/SELECT to INPUT.png)

<script id="editable-select" src="/scripts/201909/2019-09-08-EditableSelect.js" type="text/javascript"></script>