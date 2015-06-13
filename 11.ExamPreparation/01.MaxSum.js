function Solve(array) {
    var max = -Infinity,
        len = 2;

    array = array.map(Number);

    while(true) {
        for (var i = 0, length = array.length; i < length - len + 1; i++) {
            var s = 0, a = [];
            for (var j = i; j < i + len; j++) {
                s += array[j];
                a.push(array[j]);
            }

            if (s > max) {
                max = s;
            }
        }

        len++;

        if(len === length + 1) {
            break;
        }
    }

    return max;
}