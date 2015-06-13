/*
 Write a function that puts the value of an object into the content/attributes of HTML tags.
 */

(function test() {
    String.prototype.bind = function (obj) {
        var i,
            len,
            placeholders = this.match(/\w+="\w+"/g),
            objProperties = placeholders.reduce(function (arr, item) {
                var itemArr = item.split('=');

                arr[itemArr[0]] = itemArr[1].substring(1, itemArr[1].length - 1);

                return arr;
            }, []),
            result = this;

        if(objProperties['content']) {
            result = result.replace(/>(\w+)?</, '>' + obj[objProperties['content']] + '<');
        }

        if(objProperties['href']) {
            result = result.replace(/>(\w+)?</, ' href=' + '"' + obj[objProperties['href']] + '"' + result.match(/>(\w+)?</)[0]);
        }

        if(objProperties['class']) {
            result = result.replace(/>(\w+)?</, ' class=' + '"' + obj[objProperties['class']] + '"' + result.match(/>(\w+)?</)[0]);
        }

        return result;
    };

    var str, bindingString;

    str = '<div data-bind-content="name"></div>';
    console.log(str.bind({name: 'Steven'}));

    bindingString = '<a data-bind-content="name" data-bind-href="link" data-bind-class="name"></a>'
    console.log(bindingString.bind({name: 'Elena', link: 'http://telerikacademy.com'}));
}());