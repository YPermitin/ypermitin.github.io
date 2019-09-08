/** 
* @description This plugin allows you to make a select box editable like a text box while keeping it's select-option features
* @description no stylesheets or images are required to run the plugin
*
* @version 0.1
* @author YPermitin
* @email ypermitin@yandex.ru
* 
* @requires jQuery 1.9+
*
* @class editableSelect
*
* @example
*
* var selectBox = $('select').editableSelect();
*/

(function ($) {

    $.fn.editableSelect = function () {
        var instanceVar;

        this.each(function () {
            var originalSelect = $(this);
            // Проверяем на тип элемента
            if (originalSelect[0].tagName.toUpperCase() === "SELECT")
            {
                // Добавляем элемент INPUT, замещающего элемент SELECT
                var inputSelect = $("<input/>").first().insertAfter(originalSelect);
                // Получаем ID оригинала
                var objID = originalSelect.attr("id");

                // Добавляем события ввода значения в INPUT для поиска
                inputSelect.bind("input", function (elem) {
                    var originalSelectId = inputSelect.attr("id").replace("Editable", "");
                    var originalOptions = $("#" + originalSelectId).children("option");

                    var wrapper = $(inputSelect[0].parentNode);
                    var selectList = wrapper.children("ol").children("li");
                    selectList.remove();

                    var inputText = inputSelect.val();
                    originalSelect.children().each(function (index, value) {
                        var textValue = $(value).text();
                        if (textValue.toLowerCase().indexOf(inputText.toLowerCase()) != -1)
                            prepareOption(originalSelect, index, textValue);
                    });
                });

                // При наведении фокуса, если элемент пустой, заполнить первоначальный список выбора
                inputSelect.bind("focus", function (elem) {
                    if (inputSelect.val() == undefined
                        || inputSelect.val() == "")
                        inputSelect.trigger("input");
                });

                // Добавляем атрибуты из оригинального SELECT
                inputSelect.attr({
                    alt: originalSelect.attr("alt"),
                    title: originalSelect.attr("title"),
                    class: originalSelect.attr("class"),
                    name: originalSelect.attr("name") + "Editable",
                    disabled: originalSelect.attr("disabled"),
                    tabindex: originalSelect.attr("tabindex"),
                    id: objID + "Editable"
                });
                // Устанавливаем текущее значение INPUT как текст выбранного элемента SELECT
                inputSelect.val(originalSelect.find(":selected").text());
                // Создаем лист элементов для выбора, который будет использоваться элементом INPUT
                var selectList = $("<ol/>").css({
                    display: "none",
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    border: "solid 1px #ccc",
                    fontFamily: inputSelect.css("fontFamily"),
                    fontSize: inputSelect.css("fontSize"),
                    background: "#fff",
                    position: "absolute",
                    zIndex: 1000000
                }).insertAfter(inputSelect);
                // Добавляем элементы списка
                originalSelect.children().each(function (index, value) {
                    prepareOption(originalSelect, index, $(value).text());
                });
                // Привязываем события фокусировки элемента
                inputSelect.focus(function () {
                    selectList.fadeIn(100);
                }).blur(function () {
                    selectList.fadeOut(100);
                    setTimeout(function () { inputSelect.val(originalSelect.find(":selected").text()) }, 200);                    
                }).keyup(function (e) {
                    if (e.which == 13) inputSelect.trigger("blur");
                });
                // Скрываем оригинальный SELECT
                originalSelect.css({ visibility: "hidden", display: "none" });

                // Сохраняем INPUT для возврата функцией
                instanceVar = inputSelect
            } else {
                // Если переданный элемент не SELECT, то ничего не делаем
                return false;
            }
        });

        // Возвращаем созданный элемент INPUT
        return instanceVar;
    };

    /** private methods **/

    function prepareOption(itemlSelect, index, value) {
        var choosedValue = itemlSelect[0].options[index].value;
        var wrapper = $(itemlSelect[0].parentNode);

        var selectOption = $("<li value=" + choosedValue + ">" + value + "</li>").appendTo(wrapper.children("ol"));
        var inputSelect = wrapper.children("input");
        selectOption.css({
            padding: "3px",
            textAlign: "left",
            cursor: "pointer"
        }).hover(
   		function () {
   		    selectOption.css({ backgroundColor: "#eee" });
   		},
   		function () {
   		    selectOption.css({ backgroundColor: "#fff" });
   		});
        // При нажатии на элемент списка изменяем текущий элемент SELECT
        selectOption.click(function () {
            var originalSelectControl = $(inputSelect[0].parentNode).children("select");
            originalSelectControl.children().each(function (index, currentValue) {
                if ($(currentValue).val() == $(selectOption).val()) {
                    $(currentValue).attr("selected", "selected");
                } else {
                    $(currentValue).removeAttr("selected");
                }
            });
            setTimeout(function () {
                inputSelect.val(selectOption.text())
                // Обрабатываем события элементов
                originalSelectControl.trigger("change");
                inputSelect.trigger("change");
            }, 200);
        });
    }

}(jQuery));
