/*
    Write a function that replaces non breaking white-spaces in a text with &nbsp;
*/

(function nbps() {
    var text = 'This is a text\nto  test the program.';

    while(text.split('').indexOf(' ') !== -1) {
        text = text.replace(' ', '&nbps;');
    }

    console.log(text);
})();