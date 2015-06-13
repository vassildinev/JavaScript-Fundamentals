/*
 Write a function that finds the youngest male person in a given array of people and prints his full name
 Use only array methods and no regular loops (for, while)
 Use Array#find
 */

(function () {
    if (!Array.prototype.find) {
        Array.prototype.find = function(predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }

    function createPerson(fname, lname, age, isFemale) {
        return {
            'firstName': fname,
            'lastName': lname,
            'age': age,
            'isFemale': isFemale
        }
    }

    var people = [
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Mariika', 'Peshova', 20, true),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Petyrka', 'Peshova', 15, true),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Georgia', 'Peshova', 21, true),
        createPerson('Pesho', 'Peshov', 12, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Masha', 'Peshova', 23, true),
        createPerson('Pesho', 'Peshov', 20, false)
    ];

    console.log(
        people
            .sort(function (x, y) {
                    return x.age - y.age;
                })
            .find(function(item){
                return !item.isFemale;
            }));
}());