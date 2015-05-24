function onCountClick() {
    var text = jsConsole.read('#tb-text'),
        key = jsConsole.read('#tb-key'),
        isSensitive = jsConsole.read('#tb-sensitive') == 'true';

    jsConsole.writeLine('Count: ' + search(text, key, isSensitive));
}

function search(text, key, isSensitive) {
    isSensitive = isSensitive && true; //true->true, false->false
    var words = text.split(' '),
        count = 0;

    for(var i = 0, len = words.length; i < len; i++) {
        if(!isSensitive) {
            if(words[i].toLowerCase() === key.toLowerCase()) {
                ++count;
            }
        }

        else {
            if (words[i] === key) {
                ++count;
            }
        }
    }

    return count;
}