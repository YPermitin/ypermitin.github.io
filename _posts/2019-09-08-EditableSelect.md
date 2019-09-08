---
layout: post
title: Редактируемый SELECT
categories: [JavaScript, JQuery]
---

Это простой пример редактируемого элемента SELECT, для реализации которого используется JavaScript-библиотека [JQuery](https://ru.wikipedia.org/wiki/JQuery).

## Что это?

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

## Реализация

<script>
        $(function () {
            $("#OriginalSelect").editableSelect();
        });
</script>