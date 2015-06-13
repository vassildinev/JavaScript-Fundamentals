/* Extension method for fast iterating through a collection, does not operate on the original array. */
Array.prototype.foreach = function(action) {
    var res = [];

    for(var i = 0; i < this.length; i++) {
        res.push(action(this[i]));
    }

    return res;
};

/* Performs a deep copy of an array */
Array.prototype.copy = function () {
    var copiedArray = [];

    for(var i = 0; i < this.length; i++) {
        copiedArray.push(this[i]);
    }

    return copiedArray;
};

/* Removes empty entries in an array */
Array.prototype.removeEmptyEntries = function () {
    return this.filter(function(e){ return e.replace(/(\r\n|\n|\r|\s|null|undefined|0|"")/gm,"")});
};

/* Easily make a multidimensional array, e.g. var foo = makeArray([5, 4, 2]); */
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

/* Formatting strings made easy. */
function stringFormat(formattingString) {
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
}

/* replaceAll function */
String.prototype.replaceAll = function (what, withWhat) {
    return this.split(what).join(withWhat);
};

/* Substring between two substrings */
String.prototype.between = function (left, right) {
        var s = this,
            startPos = s.indexOf(left),
            endPos = s.indexOf(right, startPos + left.length);
        if (endPos == -1 && right != null)
            return '';
        else if (endPos == -1 && right == null)
            return s.substring(startPos + left.length);
        else
            return s.slice(startPos + left.length, endPos);
};

/* Remove all adjacent whitespaces from a string */
String.prototype.collapseWhitespace = function () {
    return this.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
};

/* Decodes html entities */
String.prototype.decodeHTMLEntities = function () {
    var ENTITIES = {"amp" : "&", "gt" : ">", "lt" : "<", "quot" : "\"", "apos" : "'", "AElig" : 198, "Aacute" : 193, "Acirc" : 194, "Agrave" : 192, "Aring" : 197, "Atilde" : 195, "Auml" : 196, "Ccedil" : 199, "ETH" : 208, "Eacute" : 201, "Ecirc" : 202, "Egrave" : 200, "Euml" : 203, "Iacute" : 205, "Icirc" : 206, "Igrave" : 204, "Iuml" : 207, "Ntilde" : 209, "Oacute" : 211, "Ocirc" : 212, "Ograve" : 210, "Oslash" : 216, "Otilde" : 213, "Ouml" : 214, "THORN" : 222, "Uacute" : 218,
        "Ucirc" : 219, "Ugrave" : 217, "Uuml" : 220, "Yacute" : 221, "aacute" : 225, "acirc" : 226, "aelig" : 230, "agrave" : 224, "aring" : 229, "atilde" : 227, "auml" : 228, "ccedil" : 231, "eacute" : 233, "ecirc" : 234, "egrave" : 232, "eth" : 240, "euml" : 235, "iacute" : 237, "icirc" : 238, "igrave" : 236, "iuml" : 239, "ntilde" : 241, "oacute" : 243, "ocirc" : 244, "ograve" : 242, "oslash" : 248, "otilde" : 245, "ouml" : 246, "szlig" : 223, "thorn" : 254, "uacute" : 250, "ucirc" : 251, "ugrave" : 249, "uuml" : 252, "yacute" : 253, "yuml" : 255, "copy" : 169, "reg" : 174, "nbsp" : 160, "iexcl" : 161, "cent" : 162, "pound" : 163, "curren" : 164, "yen" : 165, "brvbar" : 166, "sect" : 167, "uml" : 168, "ordf" : 170,
        "laquo" : 171, "not" : 172, "shy" : 173, "macr" : 175, "deg" : 176, "plusmn" : 177, "sup1" : 185, "sup2" : 178, "sup3" : 179, "acute" : 180, "micro" : 181, "para" : 182, "middot" : 183, "cedil" : 184, "ordm" : 186, "raquo" : 187, "frac14" : 188, "frac12" : 189, "frac34" : 190, "iquest" : 191, "times" : 215, "divide" : 247, "OElig;" : 338, "oelig;" : 339, "Scaron;" : 352, "scaron;" : 353, "Yuml;" : 376, "fnof;" : 402, "circ;" : 710, "tilde;" : 732, "Alpha;" : 913, "Beta;" : 914, "Gamma;" : 915, "Delta;" : 916, "Epsilon;" : 917, "Zeta;" : 918, "Eta;" : 919, "Theta;" : 920, "Iota;" : 921, "Kappa;" : 922, "Lambda;" : 923, "Mu;" : 924, "Nu;" : 925, "Xi;" : 926, "Omicron;" : 927, "Pi;" : 928, "Rho;" : 929, "Sigma;" : 931, "Tau;" : 932, "Upsilon;" : 933, "Phi;" : 934, "Chi;" : 935, "Psi;" : 936, "Omega;" : 937, "alpha;" : 945, "beta;" : 946, "gamma;" : 947, "delta;" : 948, "epsilon;" : 949, "zeta;" : 950, "eta;" : 951, "theta;" : 952, "iota;" : 953, "kappa;" : 954, "lambda;" : 955, "mu;" : 956, "nu;" : 957, "xi;" : 958, "omicron;" : 959, "pi;" : 960, "rho;" : 961, "sigmaf;" : 962, "sigma;" : 963, "tau;" : 964,
        "upsilon;" : 965, "phi;" : 966, "chi;" : 967, "psi;" : 968, "omega;" : 969, "thetasym;" : 977, "upsih;" : 978, "piv;" : 982, "ensp;" : 8194, "emsp;" : 8195, "thinsp;" : 8201, "zwnj;" : 8204, "zwj;" : 8205, "lrm;" : 8206, "rlm;" : 8207, "ndash;" : 8211, "mdash;" : 8212, "lsquo;" : 8216, "rsquo;" : 8217, "sbquo;" : 8218, "ldquo;" : 8220, "rdquo;" : 8221, "bdquo;" : 8222, "dagger;" : 8224, "Dagger;" : 8225, "bull;" : 8226, "hellip;" : 8230, "permil;" : 8240, "prime;" : 8242, "Prime;" : 8243, "lsaquo;" : 8249, "rsaquo;" : 8250, "oline;" : 8254, "frasl;" : 8260, "euro;" : 8364, "image;" : 8465, "weierp;" : 8472, "real;" : 8476, "trade;" : 8482, "alefsym;" : 8501, "larr;" : 8592, "uarr;" : 8593, "rarr;" : 8594, "darr;" : 8595, "harr;" : 8596, "crarr;" : 8629, "lArr;" : 8656, "uArr;" : 8657, "rArr;" : 8658, "dArr;" : 8659, "hArr;" : 8660, "forall;" : 8704, "part;" : 8706, "exist;" : 8707, "empty;" : 8709, "nabla;" : 8711, "isin;" : 8712, "notin;" : 8713, "ni;" : 8715, "prod;" : 8719, "sum;" : 8721, "minus;" : 8722, "lowast;" : 8727, "radic;" : 8730, "prop;" : 8733, "infin;" : 8734, "ang;" : 8736, "and;" : 8743, "or;" : 8744, "cap;" : 8745, "cup;" : 8746, "int;" : 8747, "there4;" : 8756, "sim;" : 8764, "cong;" : 8773, "asymp;" : 8776, "ne;" : 8800, "equiv;" : 8801, "le;" : 8804, "ge;" : 8805, "sub;" : 8834, "sup;" : 8835, "nsub;" : 8836, "sube;" : 8838, "supe;" : 8839, "oplus;" : 8853, "otimes;" : 8855, "perp;" : 8869, "sdot;" : 8901, "lceil;" : 8968, "rceil;" : 8969, "lfloor;" : 8970, "rfloor;" : 8971, "lang;" : 9001, "rang;" : 9002, "loz;" : 9674, "spades;" : 9824, "clubs;" : 9827, "hearts;" : 9829, "diams;" : 9830
    };

    var s = this;
    s = s.replace(/&#(\d+);?/g, function (_, code) {
        return String.fromCharCode(code);
    })
        .replace(/&#[xX]([A-Fa-f0-9]+);?/g, function (_, hex) {
            return String.fromCharCode(parseInt(hex, 16));
        })
        .replace(/&([^;\W]+;?)/g, function (m, e) {
            var ee = e.replace(/;$/, '');
            var target = ENTITIES[e] || (e.match(/;$/) && ENTITIES[ee]);

            if (typeof target === 'number') {
                return String.fromCharCode(target);
            }
            else if (typeof target === 'string') {
                return target;
            }
            else {
                return m;
            }
        });

    return s;
};

/* Escape HTML */
String.prototype.escapeHTML = function () {
    var reversedEscapeChars = {
         '<':'lt',
         '>':'gt',
         '"':'quot',
         "'":'apos',
         '&':'amp'
    };

    return this.replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; });
};

/* Checks if a string is null or undefined */
String.prototype.isEmpty = function () {
    return this === null || this === undefined ? true : /^[\s\xa0]*$/.test(this);
};

/* Padding */
String.prototype.pad = function(len, ch) {
    if (ch == null) ch = ' ';
    if (this.length >= len) return this;
    len = len - this.length;
    var left = new Array(Math.ceil(len / 2) + 1).join(ch);
    var right = new Array(Math.floor(len / 2) + 1).join(ch);
    return left + this + right;
};

String.prototype.padLeft = function(len, ch) {
    if (ch == null) ch = ' ';
    if (this.length >= len) return this;
    return new Array(len - this.length + 1).join(ch) + this;
};

String.prototype.padRight = function(len, ch) {
    if (ch == null) ch = ' ';
    if (this.length >= len) return this.s;
    return this + new Array(len - this.length + 1).join(ch);
};

/* Repeat a string N times */
String.prototype.repeat = function (times) {
    var arr = [];
        arr[times] = undefined;

    return arr.join(this);
};

/* Strip characters from a string */
String.prototype.strip = function() {
    var s = this;
    for(var i = 0, n = arguments.length; i < n; i++) {
        s = s.split(arguments[i]).join('');
    }
    return s;
};

/* Multi character split */
String.prototype.multiSplit = function() {
    var n = arguments.length,
        k = 1;
    if(n === 0) {
        return this.split('');
    }

    var str = this.split(arguments[0]);

    for(k = 1; k < n; k++) {
        var x = arguments[k];
        str = str
            .foreach(function (item) {
                return item.split(x);
            })
            .reduce(function (arr, item) {
                if(Array.isArray(item)) {
                    return arr.concat(item);
                }

                return arr.concat([item]);
            }, []);
    }

    return str.filter(function (item) {
        return !(item === undefined || item === '' || item === null);
    });
};

/* Remove html tags from string */
String.prototype.stripTags = function () {
    var s = this, args = arguments.length > 0 ? arguments : [''];

    function multiArgs(args, fn) {
        var result = [], i;
        for(i = 0; i < args.length; i++) {
            result.push(args[i]);
            if(fn) fn.call(args, args[i], i);
        }
        return result;
    }

    multiArgs(args, function(tag) {
        s = s.replace(new RegExp('<\/?' + tag + '[^<>]*>', 'gi'), '');
    });
    return s;
};

/* Replace tags with corresponding object properties */
String.prototype.template = function(obj, opening, closing) {
    var s = this;

    opening = opening || '{';
    closing = closing || '}';

    var open = opening.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$'),
        close = closing.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$'),
        r = new RegExp(open + '(.+?)' + close, 'g'),
        matches = s.match(r) || [];

    matches.forEach(function(match) {
        var key = match.substring(opening.length, match.length - closing.length);
        if (typeof obj[key] != 'undefined')
            s = s.replace(match, obj[key]);
    });
    return s;
};

/* Chop a string into equal sizes */
String.prototype.chop = function (step) {
    if (this == null) return [];
    var str = this;
    step = ~~step;
    return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
};

/* Levenstein - number of changes to get a string from another string*/
var levenstein = function (str1, str2) {
    'use strict';


    // Short cut cases
    if (str1 === str2) return 0;
    if (!str1 || !str2) return Math.max(str1.length, str2.length);

    // two rows
    var prevRow = new Array(str2.length + 1);

    // initialise previous row
    for (var i = 0; i < prevRow.length; ++i) {
        prevRow[i] = i;
    }

    // calculate current row distance from previous row
    for (i = 0; i < str1.length; ++i) {
        var nextCol = i + 1;

        for (var j = 0; j < str2.length; ++j) {
            var curCol = nextCol;

            // substitution
            nextCol = prevRow[j] + ( (str1.charAt(i) === str2.charAt(j)) ? 0 : 1 );
            // insertion
            var tmp = curCol + 1;
            if (nextCol > tmp) {
                nextCol = tmp;
            }
            // deletion
            tmp = prevRow[j + 1] + 1;
            if (nextCol > tmp) {
                nextCol = tmp;
            }

            // copy current col value into previous (in preparation for next iteration)
            prevRow[j] = curCol;
        }

        // copy last col value into previous (in preparation for next iteration)
        prevRow[j] = nextCol;
    }

    return nextCol;
};