((root: any) => {
    // workaround for typescript compiler
    interface Function {
        name: string;
    }

    const pathSplitRegexp = new RegExp('\s*[.:]\s*');

    root.Namespace = (name: string) => {
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

        return (fn: Function, ...rest) => {
            if(rest.length > 0) {
                throw new Error("namespacing can only be used on classes");
            }

            target[fn.name] = fn;
        };
    };
})(this);

