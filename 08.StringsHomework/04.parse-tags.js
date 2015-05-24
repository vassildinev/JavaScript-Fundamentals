function performChange(text, action) {
    switch(action) {
        case 'upcase':
            return text.toUpperCase();
        case 'lowcase':
            return text.toLowerCase();
        case 'mixcase': {
            var i;
            text = text.split('');

            for(var j = 0, len = text.length; j < len; j++) {
                i = Math.random() * 100 | 0;
                i % 2 === 0 ? text[j] = text[j].toUpperCase() : text[j] = text[j].toLowerCase();
            }

            return text.join('');
        }
    }
}

(function parseTag () {
    var input = "<upcase>every </upcase><lowcase>TIME we touch </lowcase><mixcase>i GET <upcase>this </upcase>feeling</mixcase>",
        openTagStart = 0,
        openTagEnd = 0,
        closeTagStart = 0,
        closeTagEnd = 0;

    while(true) {
        closeTagStart = input.indexOf("</");

        if(closeTagStart === -1) {
            break;
        }

        closeTagEnd = input.indexOf(">", closeTagStart);

        var tagName = input.substr(closeTagStart + 2, closeTagEnd - closeTagStart - 2);

        openTagStart = input.lastIndexOf('<' + tagName + '>', closeTagStart);
        openTagEnd = input.indexOf('>', openTagStart);

        var content = input.slice(openTagEnd + 1, closeTagStart);

        input = input.slice(0, openTagStart) + performChange(content, tagName) + input.slice(closeTagEnd + 1);
    }

    console.log(input);

})();