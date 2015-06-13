function solve(params) {
    var s = params[0];
    var count = 0;

    for(var i = 0; i <= parseInt(s / 4); i++) {
        for(var j = 0; j <= parseInt(s / 10); j++) {
            for(var k = 0; k <= parseInt(s / 3); k++) {
                if(4 * i + 10 * j + 3 * k === s) {
                    count++;
                }
            }
        }
    }

    console.log(count);
}