/*
     Write a function that checks if an array of person contains only people of age (with age 18 or greater)
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
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Pesho', 'Peshov', 20, false),
        createPerson('Pesho', 'Peshov', 20, false)
    ];

    console.log(people.every(function (n){return n.age > 18}));
})();