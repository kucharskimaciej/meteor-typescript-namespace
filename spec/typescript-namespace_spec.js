var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
});
Tinytest.add("throws an error when used on anything but class", function (test) {
    test.throws(function () {
        var Test = (function () {
            function Test() {
            }
            Test.prototype.method = function () { };
            __decorate([
                Namespace("foo"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], Test.prototype, "method", null);
            return Test;
        })();
    });
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
    test.ok(test.Test);
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
    test.ok(foo.bar.Test);
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
    test.ok(foo.bar.Test);
    test.ok(foo.bar.Test2);
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
    test.ok(foo.bar.Test);
    test.ok(foo.bar.baz.Test2);
});
