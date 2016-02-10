var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var teardown = (function (root) {
    return function () {
        if (root.foo)
            delete root.foo;
    };
})(this);
Tinytest.add("is a function", function (test) {
    test.instanceOf(Namespace, Function);
});
Tinytest.add("can be used on classes", function (test) {
    try {
        var TestClass = (function () {
            function TestClass() {
            }
            TestClass = __decorate([
                Namespace("foo"), 
                __metadata('design:paramtypes', [])
            ], TestClass);
            return TestClass;
        })();
    }
    catch (e) {
        test.fail("Should not throw an error when used on class");
    }
    teardown();
});
Tinytest.add("throws an error when used without namespace name", function (test) {
    test.throws(function () {
        var TestClass = (function () {
            function TestClass() {
            }
            TestClass = __decorate([
                Namespace(), 
                __metadata('design:paramtypes', [])
            ], TestClass);
            return TestClass;
        })();
    });
});
Tinytest.add("throws an error when used with empty namespace name", function (test) {
    test.throws(function () {
        var TestClass = (function () {
            function TestClass() {
            }
            TestClass = __decorate([
                Namespace(""), 
                __metadata('design:paramtypes', [])
            ], TestClass);
            return TestClass;
        })();
    });
    teardown();
});
Tinytest.add("throws an error when used on anything but class", function (test) {
    test.throws(function () {
        var Test = (function () {
            function Test() {
            }
            Test.prototype.method = function () { };
            Object.defineProperty(Test.prototype, "method",
                __decorate([
                    Namespace("foo"), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Test.prototype, "method", Object.getOwnPropertyDescriptor(Test.prototype, "method")));
            return Test;
        })();
    });
    teardown();
});
Tinytest.add("works for simple cases", function (test) {
    var Test = (function () {
        function Test() {
        }
        Test = __decorate([
            Namespace("foo"), 
            __metadata('design:paramtypes', [])
        ], Test);
        return Test;
    })();
    test.isNotUndefined(foo.Test);
    teardown();
});
Tinytest.add("works for multi-part namespaces", function (test) {
    var Test = (function () {
        function Test() {
        }
        Test = __decorate([
            Namespace("foo.bar"), 
            __metadata('design:paramtypes', [])
        ], Test);
        return Test;
    })();
    test.isNotUndefined(foo.bar.Test);
});
Tinytest.add("allows reusing namespaces", function (test) {
    var Test = (function () {
        function Test() {
        }
        Test = __decorate([
            Namespace("foo.bar"), 
            __metadata('design:paramtypes', [])
        ], Test);
        return Test;
    })();
    var Test2 = (function () {
        function Test2() {
        }
        Test2 = __decorate([
            Namespace("foo.bar"), 
            __metadata('design:paramtypes', [])
        ], Test2);
        return Test2;
    })();
    test.isNotUndefined(foo.bar.Test);
    test.isNotUndefined(foo.bar.Test2);
    teardown();
});
Tinytest.add("allows nesting namespaces", function (test) {
    var Test = (function () {
        function Test() {
        }
        Test = __decorate([
            Namespace("foo.bar"), 
            __metadata('design:paramtypes', [])
        ], Test);
        return Test;
    })();
    var Test2 = (function () {
        function Test2() {
        }
        Test2 = __decorate([
            Namespace("foo.bar.baz"), 
            __metadata('design:paramtypes', [])
        ], Test2);
        return Test2;
    })();
    test.isNotUndefined(foo.bar.Test);
    test.isNotUndefined(foo.bar.baz.Test2);
    teardown();
});
Tinytest.add("works with named functions", function (test) {
    Namespace("foo", function hello() {
        this.bar = "baz";
    });
    test.isNotUndefined(foo.hello.bar);
    teardown();
});
Tinytest.add("works with anonymous functions", function (test) {
    Namespace("foo", function t1() {
        this.bar = "baz";
    });
    Namespace("foo.t1", function () {
        test.isNotUndefined(this.bar);
        this.baz = "bar";
    });
    test.isNotUndefined(foo.t1.baz);
    teardown();
});
Tinytest.add("works with objects", function (test) {
    Namespace("foo", {
        bar: "baz"
    });
    test.isNotUndefined(foo.bar);
    test.equal(foo.bar, "baz");
    Namespace("foo", {
        bar: "bae",
        baz: "boo"
    });
    test.equal(foo.bar, "bae");
    test.equal(foo.baz, "boo");
    teardown();
});
