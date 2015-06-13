function horsy(params) {

    Array.prototype.foreach = function (action) {
        var res = [];

        for(var i = 0; i < this.length; i++) {
            res.push(action(this[i]));
        }

        return res;
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

    var updatePointsAndPosition = function (dir) {
        points += matrixWithPoints[currentPosY][currentPosX];
        matrixWithPoints[currentPosY][currentPosX] = undefined;

        switch(dir) {
            case 1:
                currentPosX += 1;
                currentPosY -= 2;
                break;
            case 2:
                currentPosX += 2;
                currentPosY -= 1;
                break;
            case 3:
                currentPosX += 2;
                currentPosY += 1;
                break;
            case 4:
                currentPosX += 1;
                currentPosY += 2;
                break;
            case 5:
                currentPosX -= 1;
                currentPosY += 2;
                break;
            case 6:
                currentPosX -= 2;
                currentPosY += 1;
                break;
            case 7:
                currentPosX -= 2;
                currentPosY -= 1;
                break;
            case 8:
                currentPosX -= 1;
                currentPosY -= 2;
                break;
        }

        jumps += 1;
    };

    var getState = function () {
        if(currentPosX > dims[1] - 1 || currentPosX < 0 || currentPosY > dims[0] - 1 || currentPosY < 0) {
            return 'success';
        } else if(matrixWithPoints[currentPosY][currentPosX] === undefined) {
            return 'fail';
        }
    };

    var fillPoints = function (matrix) {
        for(var r = 0; r < dims[0]; r++) {
            for(var c = 0; c < dims[1]; c++) {
                if(c === 0) {
                    matrix[r][0] = Math.pow(2, r);
                } else {
                    matrix[r][c] = matrix[r][c - 1] - 1;
                }
            }
        }

        return matrix;
    };

    var dims = params[0].split(' '),
        originalMatrix = [],
        matrixWithPoints = makeArray([dims[0], dims[1]]),

        points = 0,
        jumps = 0,

        currentPosX = dims[1] - 1,
        currentPosY = dims[0] - 1;

    for(var i = 0; i < dims[0]; i++) {
        originalMatrix[i] = params[i + 1].split('').foreach(function (n) {return n | 0});
    }

    matrixWithPoints = fillPoints(matrixWithPoints);

    while(true) {
        if(getState() === 'fail') {
            console.log(stringFormat('Sadly the horse is doomed in {0} jumps', jumps));
            break;
        }

        if(getState() === 'success') {
            console.log(stringFormat('Go go Horsy! Collected {0} weeds', points));
            break;
        }

        updatePointsAndPosition(originalMatrix[currentPosY][currentPosX]);
    }
}