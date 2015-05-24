/*
    Write a function that removes all elements with a given value.
    Attach it to the array type.
    Read about prototype and how to attach methods.
 */

Array.prototype.remove = function (value) {
    var arr = [];

    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] !== value) {
            arr.push(this[i]);
        }
    }

    for(var i = 0, len = this.length; i < len; i++) {
        this.pop();
    }

    for(i = 0, len = arr.length; i < len; i++) {
        this.push(arr[i]);
    }
};

(function removeElements() {
    var arr = [1,2,1,4,1,3,4,1,111,3,2,1,'1'],
        valueToRemove = 1;

    console.log('Array before removal: ', arr);
    arr.remove(1);
    console.log('');

    console.log('Value to remove: ', valueToRemove);
    console.log('Array after removal: ', arr);
})();