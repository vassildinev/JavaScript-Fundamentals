/**
 * Write a JavaScript function that finds how many times a substring is contained in a given text (perform case insensitive search).
 */

(function substring() {
    var input = "The text is as follows: We are living in an yellow submarine. We don't have anything else. inside the submarine is very tight. So we are drinking all the day. We will move out of it in 5 days.",
        subString = "in",
        count = 0;

    for (var i = 0, len = input.length, l = subString.length; i < len - l + 1; i++)
    {
        var currentSubString = input.substr(i, l);
        if (currentSubString === subString)
        {
            ++count;
        }
    }

    console.log(count);
})();