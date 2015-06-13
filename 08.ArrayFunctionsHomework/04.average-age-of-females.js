/*
 Write a function that calculates the average age of all females, extracted from an array of persons
 Use Array#filter
 Use only array methods and no regular loops (for, while)
 */

(function () {
    function createPerson(fname, lname, age, gender) {
        return {
            'firstName': fname,
            'lastName': lname,
            'age': age,
            'gender': gender
        }
    }

    var people = [
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Mariika', 'Peshova', 20, true),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Petyrka', 'Peshova', 15, true),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Georgia', 'Peshova', 21, true),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Masha', 'Peshova', 23, true),
        createPerson('Pesho', 'Peshov', 20, false)
    ];

    console.log(
        (function () {
            var avg = 0,
                filteredArr = people.filter(function (n) {return n.gender === true;});

            filteredArr.forEach(function (m) {avg += m.age;});

            return avg / filteredArr.length;
        }()));
}());