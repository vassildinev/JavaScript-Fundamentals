Array.prototype.copy = function () {
    var copiedArray = [];

    for(var i = 0; i < this.length; i++) {
        copiedArray.push(this[i]);
    }

    return copiedArray;
};

Array.prototype.foreach = function(action) {
    var copy = this.copy();

    for(var i = 0; i < copy.length; i++) {
        copy[i] = action(copy[i]);
    }

    return copy;
};

Array.prototype.removeEmptyEntries = function () {
    return this.filter(function(e){ return e.replace(/(\r\n|\n|\r|\s|null|undefined|0|"")/gm,"")});
};

function processInput(input) {
    var params = input.split('\n'),
        modelsCount = params[0] | 0,
        models = params.slice(1, modelsCount + 1),
        linesOfCode = params.slice(modelsCount + 2).join('\n'),
        sectionsCode = linesOfCode.slice(0, linesOfCode.indexOf('<!DOCTYPE html>')),
        htmlCode = linesOfCode.slice(linesOfCode.indexOf('<!DOCTYPE html>'));

    for (var i = 0; i < modelsCount; i++) {
        models[i] = models[i].split(':');
    }
    return {models: models, sectionsCode: sectionsCode, htmlCode: htmlCode};
}

function stringFormat(formattingString) {
    var i = 1;

    if(arguments.length === 1) {
        return formattingString;
    } else {
        while(true) {
            if(arguments[i]) {
                while(formattingString.indexOf('{' + (i - 1) +'}') !== -1) {
                    formattingString = formattingString.replace('{' + (i - 1) + '}', arguments[i]);
                }

                i++;
            } else {
                break;
            }
        }
    }

    return formattingString;
}

function handleProperties(models, htmlCode) {
    for(var i = 0, m = models.length; i < m; i++) {
        if(models[i][1].indexOf(',') === -1 && models[i] !== 'true' && models[i] !== 'false') {
            while(htmlCode.indexOf('@' + models[i][0]) !== -1) {
                htmlCode = htmlCode.replace('@' + models[i][0], models[i][1]);
            }
        }
    }

    return htmlCode;
}

function handleSections(sectionsCode, htmlCode) {
    var sections = sectionsCode.split('}\n').filter(function (n) { return n !== ''});
    for(var i = 0, len = sections.length; i < len; i++) {
        var sectionNameBeginIndex = sections[i].indexOf(' ') + 1,
            sectionNameEndIndex = sections[i].indexOf(' ', sectionNameBeginIndex),
            sectionName = sections[i].substr(sectionNameBeginIndex, sectionNameEndIndex - sectionNameBeginIndex),
            sectionContent = sections[i].substr(sectionNameEndIndex + 2).trim(),

            textToReplace = '@renderSection("' + sectionName + '")',
            indexofKliomba = htmlCode.indexOf(textToReplace),
            indexOfNbspStart = htmlCode.lastIndexOf('\n', indexofKliomba) + 1,

            precedingWhitespace = htmlCode.substr(indexOfNbspStart, indexofKliomba - indexOfNbspStart);


        sectionContent = precedingWhitespace + sectionContent.replace(/\n/g, '\n' + precedingWhitespace);
        textToReplace = precedingWhitespace + textToReplace;

        htmlCode = htmlCode.replace(textToReplace, sectionContent);
    }

    return htmlCode;
}

function handleConditionals(models, htmlCode) {
    for(var i = 0, len = models.length; i < len; i++) {
        var model = models[i];

        if(model[1] === 'true' || model[1] === 'false') {
            var ifStatement = '@if (' + model[0] + ') {';

            htmlCode = htmlCode.split('\n');
            var htmlCodeCopy = htmlCode.foreach(function(n){ return n.trim()}),

                ifStatementBegin = htmlCodeCopy.indexOf(ifStatement),
                ifStatementEnd = htmlCodeCopy.indexOf('}', ifStatementBegin);

            if(model[1] === 'true') {
                for(var j = ifStatementBegin + 1; j < ifStatementEnd; j++) {
                    htmlCode[j] = htmlCode[j].slice(4);
                }

                htmlCode[ifStatementBegin] = undefined;
                htmlCode[ifStatementEnd] = undefined;
            } else if(model[1] === 'false') {
                for(j = ifStatementBegin; j <= ifStatementEnd; j++) {
                    htmlCode[j] = undefined;
                }
            }

            htmlCode = htmlCode.filter(function(n) {return n !== undefined});
            htmlCode = htmlCode.join('\n');
        }
    }

    return htmlCode;
}

function handleEscapingAt(htmlCode) {
    while(htmlCode.indexOf('@@') !== -1) {
        htmlCode = htmlCode.replace('@@', '@');
    }

    return htmlCode;
}

function handleForeach(models, htmlCode) {
    while(htmlCode.indexOf('@foreach') !== -1) {
        var foreachIndexStart = htmlCode.indexOf('@foreach'),
            foreachIndexEnd = htmlCode.indexOf('\n', foreachIndexStart),
            foreachFirstLine = htmlCode.substr(foreachIndexStart, foreachIndexEnd - foreachIndexStart),

            foreachCollectionStart = foreachFirstLine.lastIndexOf(' ', foreachFirstLine.length - 3) + 1,
            foreachCollectionEnd = foreachFirstLine.lastIndexOf(')'),
            foreachCollectionAsString = foreachFirstLine.substr(foreachCollectionStart, foreachCollectionEnd - foreachCollectionStart),

            foreachCollection = models.filter(function(n){ return n[0] === foreachCollectionAsString})[0][1].split(','),

            foreachIndexIteratorStart = htmlCode.indexOf('var', foreachIndexStart) + 'var'.length + 1,
            foreachIndexIteratorEnd = htmlCode.indexOf(' ', foreachIndexIteratorStart),
            foreachIndexIterator = htmlCode.substr(foreachIndexIteratorStart, foreachIndexIteratorEnd - foreachIndexIteratorStart),

            foreachIndexIteratorInHtml = '@' + foreachIndexIterator,

            foreachContentStart = htmlCode.indexOf('{', foreachContentStart) + 2,
            foreachContentEnd = htmlCode.indexOf('}', foreachContentStart) - 5,

            foreachContent = htmlCode.substr(foreachContentStart, foreachContentEnd - foreachContentStart),

            foreachHtmlContent = [];

        while(foreachContent.indexOf(foreachIndexIteratorInHtml) !== -1) {
            foreachContent = foreachContent.replace(foreachIndexIteratorInHtml, '{0}');
        }

        for(var i = 0; i < foreachCollection.length; i += 1) {
            var currentSnippet = stringFormat(foreachContent, foreachCollection[i])
                                 .split('\n')
                                 .removeEmptyEntries()
                                 .foreach(function(n) {return n.slice(4)})
                                 .join('\n');

            foreachHtmlContent.push(currentSnippet);
        }

        foreachHtmlContent = foreachHtmlContent.join('\n');

        htmlCode = htmlCode.split('\n');
        var htmlCodeCopy = htmlCode.foreach(function(n){ return n.trim()}),

            originalHtmlToReplaceStart = htmlCodeCopy.indexOf(foreachFirstLine),
            originalHtmlToReplaceEnd = htmlCodeCopy.indexOf('}', originalHtmlToReplaceStart);

        for(i = originalHtmlToReplaceStart; i <= originalHtmlToReplaceEnd; i++) {
            htmlCode[i] = undefined;
        }

        htmlCode[originalHtmlToReplaceStart] = foreachHtmlContent;

        htmlCode = htmlCode.filter(function(n) {return n !== undefined});
        htmlCode = htmlCode.join('\n');
    }

    return htmlCode;
}

/* main function*/
(function main(input) {
    var bitsOfInformation = processInput(input),
        models = bitsOfInformation.models,
        sectionsCode = bitsOfInformation.sectionsCode,
        htmlCode = bitsOfInformation.htmlCode;

    htmlCode = handleProperties(models, htmlCode);
    htmlCode = handleSections(sectionsCode, htmlCode);
    htmlCode = handleConditionals(models, htmlCode);
    htmlCode = handleForeach(models, htmlCode);
    htmlCode = handleEscapingAt(htmlCode);

    console.log(htmlCode);
}(
'6\n'+
'title:Telerik Academy\n'+
'showSubtitle:true\n'+
'subTitle:Free training\n'+
'showMarks:false\n'+
'marks:3,4,5,6\n'+
'students:Pesho,Gosho,Ivan\n'+
'42\n'+
'@section menu {\n'+
'<ul id="menu">\n'+
'        <li>Home</li>\n'+
'        <li>About us</li>\n'+
'</ul>\n'+
'}\n'+
'@section footer {\n'+
'<footer>\n'+
'    Copyright Telerik Academy 2014\n'+
'</footer>\n'+
'}\n'+
'<!DOCTYPE html>\n'+
'<html>\n'+
'<head>\n'+
'    <title>Telerik Academy</title>\n'+
'</head>\n'+
'<body>\n'+
'    @renderSection("menu")\n'+
'    <h1>@title</h1>\n'+
'    @if (showSubtitle) {\n'+
'        <h2>@subTitle</h2>\n'+
'        <div>@@JustNormalTextWithDoubleKliomba ;)</div>\n'+
'    }\n'+
'\n'+
'    <ul>\n'+
'        @foreach (var student in students) {\n'+
'            <li>\n'+
'                @student\n'+
'            </li>\n'+
'            <li>Multiline @title</li>\n'+
'        }\n'+
'    </ul>\n'+
'    @if (showMarks) {\n'+
'        <div>\n'+
'            @marks\n'+
'        </div>\n'+
'        bul.“Alexander Malinov“ ¹33., Sofia, 1729, Bulgaria\n'+
'        academy.telerik.com\n'+
'        Telerik Software Academy 2014 6 of 6 facebook.com/TelerikAcademy\n'+
'    }\n'+
'\n'+
'    @renderSection("footer")\n'+
'</body>\n'+
'</html>'));