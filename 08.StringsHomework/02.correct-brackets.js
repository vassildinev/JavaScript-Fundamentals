/**
 * Write a JavaScript function to check if in a given expression the brackets are put correctly
 */

Array.prototype.peek = function () {
    return this[this.length - 1];
};

function evaluateBrackets() {
    var brackets = ['(', ')'];

    function separateBrackets(input) {
        if (input.length === 0) {
            console.log("INCORRECT_INPUT");
            return 'EXIT';
        }

        var result = [];

        for (var i = 0; i < input.length; i++) {
            if (brackets.indexOf(input[i]) !== -1) {
                result.push(input[i].toString());
            }
        }

        return result;
    }


    if(brackets === 'EXIT') {
        console.log("INCORRECT_BRACKETS");
        return;
    }

    var stack = [],
        queue = [];

    for (var i = 0, len = brackets.length; i < len; i++)
    {
        var currentBracket = brackets[i];

        if (currentBracket === "(") {
            stack.push(currentBracket);
        } else if (currentBracket === ")") {
            if (stack.indexOf("(") === -1 || stack.length == 0) {
                console.log("INCORRECT_BRACKETS");
                return;
            }

            while (stack.length != 0 && stack.peek() != "(") {
                var currentOperator = stack.pop();
                queue.unshift(currentOperator);
            }

            stack.pop();
        }
    }

    while (stack.length != 0) {
        if (brackets.indexOf(stack.peek()) !== -1) {
            console.log("INCORRECT_BRACKETS");
            return;
        }

        queue.unshift(stack.pop());
    }

    console.log("CORRECT_BRACKETS");
}

(function correctBrackets() {
    var input = '((a+b)/5-d)';

    console.log('Input string = ', '"' + input + '"', ' -> ');
    evaluateBrackets(separateBrackets(input));
    console.log('');

    input = '))a)5(';

    console.log('Input string = ', '"' + input + '"', ' -> ');
    evaluateBrackets(separateBrackets(input));
})();
