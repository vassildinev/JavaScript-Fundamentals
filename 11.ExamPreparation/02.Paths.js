function paths(args) {
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
    };

    var updatePosition = function (dir) {
        switch(dir) {
            case 'dl':
                currentPositionX--;
                currentPositionY++;
                break;
            case 'dr':
                currentPositionX++;
                currentPositionY++;
                break;
            case 'ur':
                currentPositionX++;
                currentPositionY--;
                break;
            case 'ul':
                currentPositionX--;
                currentPositionY--;
                break;
        }
    };

    var getState = function () {
        if(currentPositionX > cols - 1 || currentPositionX < 0 || currentPositionY > rows - 1 || currentPositionY < 0) {
            return 'success';
        } else if(operationalMatrix[currentPositionY][currentPositionX] === 0) {
            return 'fail';
        }
    };

    var stringFormat = function (formattingString) {
        var i = 1;

        if(arguments.length === 1) {
            return formattingString;
        } else {
            while(true) {
                if(arguments[i]) {
                    while(formattingString.indexOf('{' + (i - 1) +'}') !== -1) {
                        formattingString = formattingString.replace('{' + (i - 1) + '}', arguments[i]);
                    }

                    i++;
                } else {
                    break;
                }
            }
        }

        return formattingString;
    };

    var dimensions = args[0].split(' '),
        rows = dimensions[0],
        cols = dimensions[1],

        originalMatrix = [],
        operationalMatrix = makeArray([rows, cols]),

        points = 0;

    for(var r = 0; r < rows; r++) {
        originalMatrix.push(args[r + 1].split(' '));
    }

    for(r = 0; r < rows; r++) {
        for(var c = 0; c < cols; c++) {
            operationalMatrix[r][0] = Math.pow(2, r);
            if(c !== 0) {
                operationalMatrix[r][c] = operationalMatrix[r][c - 1] + 1;
            }
        }
    }

    var lastPositionX = 0,
        lastPositionY = 0,
        currentPositionX = 0,
        currentPositionY = 0;

    while(true) {
        points += operationalMatrix[currentPositionY][currentPositionX];
        operationalMatrix[currentPositionY][currentPositionX] = 0;

        lastPositionX = currentPositionX;
        lastPositionY = currentPositionY;

        var dir = originalMatrix[currentPositionY][currentPositionX];
        updatePosition(dir);

        var state  = getState();
        if(state === 'success') {
            console.log(stringFormat('successed with {0}', points));
            return;
        } else if(state === 'fail') {
            console.log(stringFormat('failed at ({0}, {1})', currentPositionY, currentPositionX));
            return;
        }
    }
}