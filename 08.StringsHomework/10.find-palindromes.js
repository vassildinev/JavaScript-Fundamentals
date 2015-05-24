/*
    Write a program that extracts from a given text all palindromes, e.g. "ABBA", "lamal", "exe".
 */

(function findPalindromes() {
    var text = 'ABBA is a very popular music band. exe files rock! bla bla bla ala bala',
        words = text.split(' ');

    for(var i = 0, len = words.length; i < len; i++) {
        if(words[i].toLowerCase() === words[i].split('').reverse().join('').toLowerCase() && words[i].length > 1) {
            console.log(words[i]);
        }
    }
})();