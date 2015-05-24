/*
 Write a function that makes a deep copy of an object.
 The function should work for both primitive and reference types.
*/

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

(function deepCopy() {
    // Test for reference type.
    console.log('Test for reference type.');

    var oldReferenceObject = {
            name: 'Pesho Goshov',
            age: 95
        },
        newReferenceObject = clone(oldReferenceObject);

    console.log('Old reference object before change = ', oldReferenceObject);
    console.log('New reference object before change = ',newReferenceObject);
    console.log('');

    oldReferenceObject.name = 'Gosho Peshov';

    console.log('Old reference object after change = ', oldReferenceObject);
    console.log('New reference object after change = ',newReferenceObject);
    console.log('');

    // Test for primitive type.
    console.log('Test for primitive type.');

    var oldPrimitiveObject = true,
        newPrimitiveObject = clone(oldPrimitiveObject);

    console.log('Old primitive object before change = ',oldPrimitiveObject);
    console.log('New primitive object before change = ',newPrimitiveObject);
    console.log('');

    oldPrimitiveObject = 'iChanged';

    console.log('Old primitive object after change = ',oldPrimitiveObject);
    console.log('New primitive object after change = ',newPrimitiveObject);
})();