function solve(params) {
    String.prototype.collapseWhitespace = function () {
        return this.replace(/[\s\xa0]+/g, '').replace(/^\s+|\s+$/g, '');
    };

    String.prototype.replaceAll = function (what, withWhat) {
        return this.split(what).join(withWhat);
    };

    String.prototype.regexIndexOf = function(regex, startpos) {
        var indexOf = this.substring(startpos || 0).search(regex);
        return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
    };

    Array.prototype.foreach = function(action) {
        var res = [];

        for(var i = 0; i < this.length; i++) {
            res.push(action(this[i]));
        }

        return res;
    };

    var answer = params.join('').replace(/\s+/g, ' ');

    while(answer.regexIndexOf(/[-.#>~ ]\w+ \w+\{/g) > -1) {
        var match = answer.regexIndexOf(/[-.#>~ ]\w+ \w+\{/g);
        var index = answer.indexOf(' ', match);
        answer = answer.split('');
        answer[answer.indexOf(' ', match)] = '@';
        answer = answer.join('');
    }

    answer = answer.collapseWhitespace().replaceAll('@', ' ').replaceAll(';}', '}');


    var arr = answer.split('}').filter(function (item) {
        return item !== '';
    }), res = [];

    arr = arr.foreach(function (item) {
        return item.split('{').filter(function (item) {
            return item !== '';
        });
    });

    for(var i = 0; i < arr.length; i++) {
        if(res[arr[i][0]] === undefined) {
            res[arr[i][0]] = '';
        }

        if(res[arr[i][0]] === '') {
            res[arr[i][0]] += arr[i][1];
        } else {
            res[arr[i][0]]  = res[arr[i][0]] + ';' + arr[i][1];
        }
    }

    var str = '', count = 1;

    for(var k in res) {
        if(res.hasOwnProperty(k)) {
            str += (k + '{' + res[k] + '}');
        }
    }

    arr = str;

    arr = arr.split('}').filter(function (item) {
        return item !== '';
    });

    arr = arr.foreach(function (item) {
        return item.split('{').filter(function (item) {
            return item !== '';
        });
    });

    answer = str;

    return arr;
}
console.log(solve(
[
"#the-big-b{",
"    color: yellow;",
"    size: big;",
"}",
".muppet{",
"    powers: all;",
"    skin: fluffy;",
"}",
".water-spirit {",
"    powers: water;",
"    alignment : not-good;",
"}",
"all{",
"    meant-for: nerdy-children;",
"}",
"    .muppet {",
"    powers: everything;",
"}",
"all .muppet {",
"    alignment : good ;",
"}",
".muppet+ .water-spirit{",
"    power: everything-a-muppet-can-do-and-water;",
"}",
"]"
]));
