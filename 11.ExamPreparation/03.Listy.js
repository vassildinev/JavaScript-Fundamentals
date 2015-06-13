function Solve(args) {
    Array.prototype.foreach = function(action) {
        var res = [];

        for(var i = 0; i < this.length; i++) {
            res.push(action(this[i]));
        }

        return res;
    };

    var params = args.foreach(function (item) {
        item = item.replace(/def/g, '').trim();
        item = item.replace(/,\s+/g, ',');
        item = item.replace(/\s+,/g, ',');
        item = item.replace(/\[/g, ' [');
        item = item.replace(/\[\s+/g, '[');
        item = item.replace(/\s+\]/g, ']');
        item = item.replace(/\s\s+/g, ' ');
        return item;
    });

    var variables = [];

    for(var i = 0, len = params.length; i < len; i++) {
        var currentLine = params[i].split(' ');
        var lastIndex = currentLine.length - 1;
        var list = currentLine[lastIndex].replace('[', '').replace(']', '');
        var lastLineResult;

        for(var j in variables) {
            if(variables.hasOwnProperty(j)) {
                if (list.indexOf(j) > -1) {
                    var regex = new RegExp('\\b' + j + '\\b', 'g');
                    if(Array.isArray(variables[j])) {
                        list = list.replace(regex, '');
                        list = list.concat(',' + variables[j]);
                        continue;
                    }

                    list = list.replace(regex, variables[j]);
                }
            }
        }

        list = list.split(',');
        list = list.filter(function (item) {
            return !(item === '' || item === undefined || item === null);
        });
        list = list.map(Number);

        var lengthOfCurrentLine = currentLine.length;

        var result;
        var name;
        var cmd;

        if(lengthOfCurrentLine === 3) {name = currentLine[0];
            cmd = currentLine[1];
            result = parseCommand(cmd, list);

            variables[name + ''] = result;
        }

        else if(lengthOfCurrentLine === 2) {
            var nameOrCmd = currentLine[0];
            if(nameOrCmd !== 'sum' && nameOrCmd !== 'max' &&
               nameOrCmd !== 'avg' && nameOrCmd !== 'min') {
                name = nameOrCmd;
                variables[name + ''] = list;
            } else {
                cmd = nameOrCmd;
                result = parseCommand(cmd, list);
            }
        }
    }

    console.log(result);


    function parseCommand(cmd, list) {
        var res = 0;
        switch(cmd) {
            case 'sum':
                res = list.reduce(function (s, item) {
                    return s + item;
                }, 0);
                break;
            case 'max':
                res = list[0];
                list.forEach(function (item) {
                    if(item > res) {
                        res = item;
                    }
                });
                break;
            case 'min':
                res = list[0];
                list.foreach(function (item) {
                    if(item < res) {
                        res = item;
                    }
                });
                break;
            case 'avg':
                res = (list.reduce(function (s, item) {
                    return s + item;
                }, 0) / list.length) | 0;
                break;
        }

        return res;
    }
}

Solve([
    "def func sum[1, 2, 3, -6]",
    "def newList [func, 10, 1]",
    "def newFunc sum[func, 100, newList]",
    "[newFunc]"
]);