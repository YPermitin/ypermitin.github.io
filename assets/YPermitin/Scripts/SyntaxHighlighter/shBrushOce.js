
/* version of 1C module for SyntaxHighliter + Composite C1 CMS */
/* created by Permitin Y.A. aka YPermitin */
/* http://www.develplatform.ru */

; (function () {
    // CommonJS
    typeof (require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush() {

        this.regexList = [
            // Числа
            { regex: /(^|\s|,|(|))((?:(![A-Za-zА-Яа-я]|^|\s|[;(),]))[\d]+(\.[\d]+)?|0x[a-f0-9]+)(?=\s|$|;|,|(|))/gi, css: 'number' },   
            // Однострочный комментарий
            { regex: SyntaxHighlighter.regexLib.singleLineCComments, css: 'comments' },
            // Строка в двойных кавычках
            { regex: /(["'])(?:(?!\1)[^\\]|\\|\\.)*\1/gi, css: 'string' },
            // Строка в одинарных кавычках   
            { regex: new RegExp('\'(?:\\?.)*?\'', 'gi'), css: 'string' },
            // Пунктуация
            { regex: /\+|\)|\(|\.|\,|\\|\*|=|\:|;|\&lt;|\&gt;|\[|\]|\?/g, css: 'punctuation' },
            // Ключевые слова
            { regex: new RegExp(GetKeywordsRegExp(), 'gi'), css: 'keyword' },
            // Теги препроцессора вида #Область и #КонецОбласти
            { regex: /^\s*#.*/gm, css: 'preprocessor' },
            // Теги препроцессора вида &Клиент and &Сервер
            { regex: /^\s*&.*/gm, css: 'preprocessor' },		                                                                                            
        ];
    }

    function GetKeywordsRegExp()
    {
        var keyWordsList = [
            { rus: 'Пока', eng: 'While'},
            { rus: 'Для', eng: 'For'},
            { rus: 'Новый', eng: 'New'},
            { rus: 'Прервать', eng: 'Break' },
            { rus: 'Попытка', eng: 'Try' },
            { rus: 'Исключение', eng: 'Except' },
            { rus: 'ВызватьИсключение', eng: 'Raise' },
            { rus: 'Иначе', eng: 'Else' },
            { rus: 'КонецПопытки', eng: 'EndTry' },
            { rus: 'Неопределено', eng: 'Undefined' },
            { rus: 'Функция', eng: 'Function'},
            { rus: 'Перем', eng: 'Var'},
            { rus: 'Возврат', eng: 'Return'},
            { rus: 'КонецФункции', eng: 'EndFunction'},
            { rus: 'NULL', eng: 'NULL'},
            { rus: 'Если', eng: 'If'},
            { rus: 'ИначеЕсли', eng: 'ElsIf'},
            { rus: 'Процедура', eng: 'Procedure'},
            { rus: 'КонецПроцедуры', eng: 'EndProcedure'},
            { rus: 'Тогда', eng: 'Then'},
            { rus: 'Знач', eng: 'Val'},
            { rus: 'Экспорт', eng: 'Export'},
            { rus: 'Или', eng: 'Or'},
            { rus: 'КонецЕсли', eng: 'EndIf'},
            { rus: 'Не', eng: 'Not'},
            { rus: 'Из', eng: 'In'},
            { rus: 'Каждого', eng: 'Each'},
            { rus: 'Истина', eng: 'True'},
            { rus: 'Ложь', eng: 'False'},
            { rus: 'По', eng: 'To'},
            { rus: 'Цикл', eng: 'Do'},
            { rus: 'КонецЦикла', eng: 'EndDo'}
        ];

        var keywords = '(^|\\s|[;(),])(';
        for (index = 0; index < keyWordsList.length; ++index) {

            keywordsElement = keyWordsList[index];

            keywords = keywords +
                keyWordsList[index].rus + '|' + keyWordsList[index].eng;

            if (index != keyWordsList.length - 1)
                keywords = keywords + '|';

        }
        keywords = keywords + ')(?=\\s|$|[;(),])';

        return keywords;
    }

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases = ['oce']; // Имя класса блока на странице, для которого будет использован этот скрипт

    SyntaxHighlighter.brushes.Bash = Brush;

    // CommonJS
    typeof (exports) != 'undefined' ? exports.Brush = Brush : null;
})();