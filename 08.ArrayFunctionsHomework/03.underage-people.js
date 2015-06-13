/*
 Write a function that prints all underaged persons of an array of person
 Use Array#filter and Array#forEach
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
        createPerson('Gosho', 'Peshov', 15, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Stamat', 'Peshov', 12, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Qnaki', 'Manaki', 17, false),
        createPerson('Pesho', 'Peshov', 20, false)
    ];

    console.log(people.filter(function (n){return n.age < 18}));
}());