function onSearchClick() {
    var arr = jsConsole.read('#tb-text').split(' '),
        pos = 0,
        i = 0;

    for(i in arr) arr[i] *= 1;

    for(var j = 0, len = arr.length; j < len; j++) {
        if(smallerNeighbours(arr, j)===true) {
            jsConsole.writeLine("Element at index " + j + " is the first element larger than its TWO neighbour elements");
            break;
        }
    }
}