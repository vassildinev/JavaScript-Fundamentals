function onReverseClick() {
    var number = jsConsole.read('#tb-rev');
    number = reverse(number);
    jsConsole.writeLine(parseFloat(number));
}

function reverse(number) {
    return number.split('').reverse().join('');
}