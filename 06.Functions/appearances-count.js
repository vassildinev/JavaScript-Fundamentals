function onCountClick() {
    var numbers = jsConsole.read('#tb-text').split(' '),
        key = jsConsole.readInteger('#tb-key'),
        count = 0;

    count = countAppearances(numbers, key, count);
    jsConsole.writeLine(count);
}

function countAppearances(numbers, key, count) {
    for (var i = 0, len = numbers.length; i < len; i++) {
        numbers[i] *= 1;
        if (numbers[i] === key) {
            ++count;
        }
    }
    return count;
}

(function test() {
    var pesho = [1, 1, 1, 2, 2, 4, 77],
        gosho = 1,
        count = 0;

    jsConsole.writeLine('-----T E S T-----');
    jsConsole.writeLine('test array -> [1, 1, 1, 2, 2, 4, 77]');
    jsConsole.writeLine('test key -> ' + gosho);
    jsConsole.write('result -> ');
    jsConsole.write(countAppearances(pesho, gosho, count));
    jsConsole.writeLine('');

    gosho = 2;
    jsConsole.writeLine('test key -> ' + gosho);
    jsConsole.write('result -> ');
    jsConsole.write(countAppearances(pesho, gosho, count));
    jsConsole.writeLine('');

    gosho = 77;
    jsConsole.writeLine('test key -> ' + gosho);
    jsConsole.write('result -> ');
    jsConsole.writeLine(countAppearances(pesho, gosho, count));

    jsConsole.writeLine('------------------');
}) ();