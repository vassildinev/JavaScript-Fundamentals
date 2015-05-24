/*
 Write a function that finds the youngest person in a given array of people and prints his/hers full name
 Each person has properties firstname, lastname and age.
 */

var Student = function (firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
};

function findYoungestPerson(studentArr) {
    var youngestStudent = studentArr[0];

    for(var i = 0, len = studentArr.length; i < len; i++) {
        var currentStudent = studentArr[i];
        if(currentStudent.age < youngestStudent) {
            youngestStudent = currentStudent;
        }
    }

    return youngestStudent;
}

(function youngestPerson() {
    var studentArr = [
        pesho = new Student('Petyr', 'Petrov', 18),
        gosho = new Student('Georgi', 'Georgiev', 20),
        stamat = new Student('Stamat', 'Stamatov', 19)
    ];

    console.log('All students:');
    console.log(studentArr);
    console.log('The youngest of them all: ', findYoungestPerson(studentArr));
})();
