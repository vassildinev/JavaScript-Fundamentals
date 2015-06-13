(function replaceTags() {
    var text = '<p>Please visit <a href="http://academy.telerik.com">our site</a> to choose a training course. Also visit <a href="www.devbg.org">our forum</a> to discuss the courses.</p>',

        openTagStartIndex = -1,
        openTagEndIndex = -1,
        closeTagStartIndex = -1,
        closeTagEndIndex = -1,
        urlStartIndex = -1,
        urlEndIndex = -1,
        urlTextStartIndex = -1,
        urlTextEndIndex = -1;

    while(true) {
        closeTagStartIndex = text.indexOf('</a>');
        closeTagEndIndex = closeTagStartIndex + 3;

        if(closeTagStartIndex === -1) {
            break;
        }

        openTagStartIndex = text.lastIndexOf('<a', closeTagStartIndex);
        openTagEndIndex = text.indexOf('>', openTagStartIndex);

        urlStartIndex = text.indexOf('"', openTagStartIndex);
        urlEndIndex = text.indexOf('"', urlStartIndex + 1);

        urlTextStartIndex = openTagEndIndex;
        urlTextEndIndex = closeTagStartIndex;

        var url = text.substr(urlStartIndex + 1, urlEndIndex - urlStartIndex - 1),
            content = text.substr(urlTextStartIndex + 1, urlTextEndIndex - urlTextStartIndex - 1),
            result = '[URL=' + url + ']' + content + '[/URL]';

        text = text.slice(0, openTagStartIndex) + result + text.slice(closeTagEndIndex + 1);
    }

    console.log(text);
})();