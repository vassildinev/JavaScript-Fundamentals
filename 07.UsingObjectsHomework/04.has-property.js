/*
    Write a function that checks if a given object contains a given property.
 */

var Car = function (make, model, yearOfProduction) {
    this.make = make;
    this.model = model;
    this.yearOfProduction = yearOfProduction;
}

function checkProperty(obj, property) {
    return obj.hasOwnProperty(property);
}

(function hasProperty() {
    var obj = new Car('BMW', 'X5', 2008);

    console.log('Car -> ', obj);
    console.log('Has property \'age\' -> ', checkProperty(obj, 'age'));
    console.log('Has property \'model\' -> ', checkProperty(obj, 'model'));
})();
