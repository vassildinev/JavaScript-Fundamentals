function Solve(input) {
    var arr = input.map(Number),
        count = 1;

    for(var i = 1, len = arr[0]; i < len; i++) {
        if(arr[i + 1] < arr[i]) {
            count++;
        }
    }

    console.log(count);
}

Solve([
    "9",
    "1",
    "8",
    "8",
    "7",
    "6",
    "5",
    "7",
    "7",
    "6"
]);