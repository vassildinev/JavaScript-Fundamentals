/*
 Write a function that creates a HTML <ul> using a template for every HTML <li>.
 The source of the list should be an array of elements.
 Replace all placeholders marked with –{…}– with the value of the corresponding property of the object.
 */

function stringFormat(formattingString, args) {
    var i = 0;
    while(true) {
        if(args[i] !== undefined) {
            while(formattingString.indexOf('{' + (i) +'}') !== -1) {
                formattingString = formattingString.replace('{' + (i) + '}', args[i]);
            }

            i++;
        } else {
            break;
        }
    }

    return formattingString;
}

function generateList(people, template) {
    var params = [],
        placeholderStart = -1,
        placeholderEnd = -1,
        attr = '',
        counter = 0,

        result = '';

    while(true) {
        placeholderStart = template.indexOf('-{');
        placeholderEnd = template.indexOf('}-');

        if(placeholderStart === -1) {
            break;
        }

        attr = template.substr(placeholderStart + 2, placeholderEnd - placeholderStart - 2);

        params.push(attr);

        template = template.replace('-{' + attr + '}-', '{' + counter + '}');

        counter++;
    }

    for(var person = 0, l = people.length; person < l; person++) {
        var data = [];

        for(var i = 0, len = params.length; i < len; i++) {
            data.push(people[person][params[i]]);
        }

        result += stringFormat('<li>{0}</li>', [stringFormat(template, data)]);
    }

    result = stringFormat('<ul>{0}</ul>', [result]);

    return result;
}

(function generate() {
    var people = [{name: 'Peter', age: 14}, {name: 'John', age: 16}, {name: 'Alex', age: 15}],
        template = document.getElementById('list-item').innerHTML.trim(),
        peopleList = generateList(people, template);

    document.getElementById('list-item-result').innerHTML = peopleList;
})();