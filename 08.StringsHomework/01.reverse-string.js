/**
 * Write a JavaScript function that reverses a string and returns it.
 */

(function () {
    var str = 'qbylka',
        reversedString = str.split('').reverse().join('');

    console.log('String -> ', str);
    console.log('Reversed string -> ', reversedString);
})();
