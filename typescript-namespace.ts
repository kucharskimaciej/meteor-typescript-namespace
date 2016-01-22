((root: any) => {
    // workaround for typescript compiler
    interface Function {
        name: string;
        call: (context:any) => any;
    }

    const pathSplitRegexp = new RegExp('\s*[.:]\s*');

    root.Namespace = (name: string, fn: Function = null) => {
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
            return (fn:Function, ...rest) => {
                if (rest.length > 0) {
                    throw new Error("namespacing can only be used on classes");
                }
                target[fn.name] = fn;
            };
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
    };
})(this);

