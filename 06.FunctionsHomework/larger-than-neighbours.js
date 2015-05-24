function onCheckClick()
{
    var array = jsConsole.read('#tb-text').split(' '),
        position = jsConsole.readInteger('#tb-index');

    for(var i in array) {
        array[i] *= 1;
    }

    console.log(smallerNeighbours(array, position));

    jsConsole.writeLine("Element at index " + position + " is larger than its TWO neighbour elements => " + smallerNeighbours(array, position));
}

function smallerNeighbours(array, position) {
    if (position == 0 || position == array.length - 1) {
        return "Only one neighbour.";
    } else {
        if (array[position] > array[position - 1] && array[position] > array[position + 1]) {
            return true;
        } else {
            return false;
        }
    }
}