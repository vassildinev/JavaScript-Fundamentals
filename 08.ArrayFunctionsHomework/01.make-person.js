/*
     Write a functio for creating persons.
     Each person must have firstname, lastname, age and gender (true is female, false is male)
     Generate an array with ten person with different names, ages and genders
*/

(function makePerson() {
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
}());