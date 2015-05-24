/*
     Write a function that extracts the content of a html page given as text.
     The function should return anything that is in a tag, without the tags.
 */

(function extractTextFromHtml() {
    var text =
    "<html>\n" +
    "   <head>\n" +
    "       <title>Sample site</title>\n" +
    "   </head>\n" +
    "   <body>\n" +
    "       <div>text\n" +
    "           <div>more text</div>\n" +
    "           and more...\n" +
    "       </div>\n" +
    "       in body\n" +
    "   </body>\n" +
    "</html>",

        openBracketIndex = -1,
        closeBracketIndex = -1,

        result = '';

    text = text.split('\n');

    for(var i = 0, len = text.length; i < len; i++) {
        text[i] = text[i].trim();
    }

    text = text.join('');

    while(true) {
        debugger;
        openBracketIndex = text.indexOf('<');
        closeBracketIndex = text.indexOf('>', openBracketIndex);

        if(openBracketIndex === -1) {
            break;
        }

        text = text.slice(0, openBracketIndex) + text.slice(closeBracketIndex + 1);
    }

    console.log(text);
})();