/*
 Write a function that formats a string using placeholders.
 The function should work with up to 30 placeholders and all types.
 */

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

(function test() {
    var str = stringFormat('{0}, {1}, {3} text {2}', 1, 'Pesho', 'Gosho', 'haha');

    console.log(str);
})();