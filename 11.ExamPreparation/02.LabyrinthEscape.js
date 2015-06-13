function Solve(args) {
    var makeArray = function (dims, arr) {
        if (dims[1] === undefined) {
            return new Array(dims[0]);
        }

        arr = new Array(dims[0]);

        for (var i=0; i<dims[0]; i++) {
            arr[i] = new Array(dims[1]);
            arr[i] = makeArray(dims.slice(1), arr[i]);
        }

        return arr;
        },
        dims = args[0].split(' ').map(Number),
        n = dims[0],
        m = dims[1],
        startPos = args[1].split(' ').map(Number),
        startPosR = startPos[0],
        startPosC = startPos[1],
        currentPosR = startPosR,
        currentPosC = startPosC,
        dirMatrix = [],
        numberMatrix = makeArray([n, m]),
        i, r, c, x = 1,
        sum = 0,
        cells = 0;

    for(i = 2, len = args.length; i < len; i++) {
        dirMatrix.push(args[i].split(''));
    }

    for(r = 0; r < n; r++) {
        for(c = 0; c < m; c++) {
            numberMatrix[r][c] = x;
            x++;
        }
    }

    while(true) {
        sum += numberMatrix[currentPosR][currentPosC];
        numberMatrix[currentPosR][currentPosC] = 0;

        switch(dirMatrix[currentPosR][currentPosC]) {
            case 'l':
                --currentPosC;
                break;
            case 'r':
                ++currentPosC;
                break;
            case 'd':
                ++currentPosR;
                break;
            case 'u':
                --currentPosR;
                break;
        }

        ++cells;

        if(0 > currentPosR || currentPosR >= n ||
            0 > currentPosC || currentPosC >= m) {
            return 'out ' + sum;
        }

        if(numberMatrix[currentPosR][currentPosC] === 0) {
            return 'lost ' + cells;
        }
    }
}

console.log(Solve([
        "5 8",
        "0 0",
        "rrrrrrrd",
        "rludulrd",
        "lurlddud",
        "urrrldud",
        "ulllllll"]


));