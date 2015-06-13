/*
 Write a function that formats a string. The function should have placeholders, as shown in the example
 Add the function to the String.prototype
 */

(function test() {
    String.prototype.format = function (obj) {
        var i,
            len,
            placeholders = this.match(/#{\w+}/g),
            objProperties = placeholders.reduce(function (arr, item) {
                arr.push(item.substring(2, item.length - 1));

                return arr;
            }, []),
            result = this;

        for(i = 0, len = placeholders.length; i < len; i++) {
            result = result.replace(new RegExp(placeholders[i]), obj[objProperties[i]]);
        }

        return result;
    };

    var options = {name: 'John'};
    console.log('Hello, there! Are you #{name}?'.format(options));

    options = {name: 'John', age: 13};
    console.log('My name is #{name} and I am #{age}-years-old.'.format(options));
}());