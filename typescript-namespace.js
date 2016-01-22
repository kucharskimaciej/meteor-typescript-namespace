(function (root) {
    var pathSplitRegexp = new RegExp('\s*[.:]\s*');
    root.Namespace = function (name, fn) {
        if (fn === void 0) { fn = null; }
        var target;
        if (!name) {
            throw new Error("has to be used with a namespace name");
        }
        var path = name.split(pathSplitRegexp);
        target = root;
        for (var _i = 0; _i < path.length; _i++) {
            var subpackage = path[_i];
            if (!target[subpackage]) {
                target[subpackage] = {};
            }
            else if (typeof target[subpackage] !== 'object') {
                break;
            }
            target = target[subpackage];
        }
        if (!fn) {
            return function (fn) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                if (rest.length > 0) {
                    throw new Error("namespacing can only be used on classes");
                }
                target[fn.name] = fn;
            };
        }
        if (fn.name) {
            var result = {};
            fn.call(result);
            target[fn.name] = result;
        }
        else {
            fn.call(target);
        }
    };
})(this);
