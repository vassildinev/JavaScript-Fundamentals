/*
 Write a function that groups an array of people by age, first or last name.
 The function must return an associative array, with keys - the groups, and values - arrays with people in these groups
 Use function overloading (i.e. just one function)
 */

var Person = function (fname, lname, age) {
    this.fname = fname;
    this.lname = lname;
    this.age = age;
};

Array.prototype.group = function (opts) {
    var groups = {},
        result = [];

    if(opts === 'fname') {
        for (var i = 0; i < this.length; i++) {
            var item = this[i];

            if (!groups[item.fname]) {
                groups[item.fname] = [];
            }

            groups[item.fname].push({
                lname: item.lname,
                age: item.age
            });
        }


        for (var x in groups) {
            if (groups.hasOwnProperty(x)) {
                var obj = {};
                obj[x] = groups[x];
                result.push(obj);
            }
        }
    }

    else if(opts === 'lname') {
        for (var i = 0; i < this.length; i++) {
            var item = this[i];

            if (!groups[item.lname]) {
                groups[item.lname] = [];
            }

            groups[item.lname].push({
                fname: item.fname,
                age: item.age
            });
        }


        for (var x in groups) {
            if (groups.hasOwnProperty(x)) {
                var obj = {};
                obj[x] = groups[x];
                result.push(obj);
            }
        }
    }

    else {
        for (var i = 0; i < this.length; i++) {
            var item = this[i];

            if (!groups[item.age]) {
                groups[item.age] = [];
            }

            groups[item.age].push({
                fname: item.fname,
                lname: item.lname
            });
        }


        for (var x in groups) {
            if (groups.hasOwnProperty(x)) {
                var obj = {};
                obj[x] = groups[x];
                result.push(obj);
            }
        }
    }
    
    return result;
};

(function grouping() {
    var arr = [
        new Person('Georgi', 'Ivanov', 20),
        new Person('Petyr', 'Ivanov', 20),
        new Person('Ivan', 'Petrov', 18),
        new Person('Ivan', 'Georgiev', 20),
        new Person('Stamat', 'Petrov', 19),
        new Person('Georgi', 'Stamatov', 20)
    ];

    var arr2 = arr.group('age');

    for(var i = 0, len = arr2.length; i < len; i++) {
        console.log(arr2[i]);
    }
})();


