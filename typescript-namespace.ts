((root: any) => {
    // workaround for typescript compiler
    interface Function {
        name?: string;
        call: (context:any) => any;
    }

    const pathSplitRegexp = new RegExp('\s*[.:]\s*');

    root.Namespace = function(name: string, fn: Function | any = null) {
        let target;

        if(!name) {
            throw new Error("has to be used with a namespace name");
        }

        const path = name.split(pathSplitRegexp);
        target = root;


        for (let subpackage of path) {

            if (!target[subpackage]) {
                target[subpackage] = {};
            } else if (typeof target[subpackage] !== 'object') {
                break;
            }

            target = target[subpackage];
        }

        if(!fn) {
            // is used as a class decorator
            return function (fn:Function) {
                if (arguments.length > 1) {
                    throw new Error("namespacing can only be used on classes");
                }
                target[fn.name] = fn;
            };
        }

        // assuming an object being passed in
        if(typeof fn !== "function") {
            Object.assign(target, fn);
            return target;
        }

        // is used with named function;
        // create next level of namespace and run the function
        if (fn.name) {
            let result = {};
            fn.call(result);
            target[fn.name] = result;
        } else {
            fn.call(target);


        }

        return target;
    };
})(this);

