/*
 Write a function that groups an array of persons by first letter of first name and returns the groups as a JavaScript Object
 */

(function groupPeople() {
    function createPerson(fname, lname, age, isFemale) {
        return {
            'firstName': fname,
            'lastName': lname,
            'age': age,
            'isFemale': isFemale
        }
    }

    var people = [
        createPerson('Alex', 'Peshov', 20, false),
        createPerson('Mariika', 'Peshova', 20, true),
        createPerson('Stoicho', 'Peshov', 20, false),
        createPerson('Petyrka', 'Peshova', 15, true),
        createPerson('Boris', 'Peshov', 20, false),
        createPerson('Georgia', 'Peshova', 21, true),
        createPerson('Mario', 'Peshov', 12, false),
        createPerson('Stamat', 'Peshov', 20, false),
        createPerson('Masha', 'Peshova', 23, true),
        createPerson('Pesho', 'Peshov', 20, false)
    ],
        obj = {};

    people = people.sort(function (x, y) {
        return x.firstName[0] > y.firstName[0];
    });

    obj = people.reduce(function (obj, item) {
        if(!Array.isArray(obj[item.firstName[0]])) {
            obj[item.firstName[0].toLowerCase()] = [];
        }

        obj[item.firstName[0].toLowerCase()].push(item);

        return obj;
    }, {});

    console.log(obj);
}());