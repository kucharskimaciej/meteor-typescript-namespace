declare var Tinytest;
declare var Namespace;

declare var foo; // for the typescript compiler

const teardown = ((root): Function => {
    return function() {
        if(root.foo)
            delete root.foo;
    }
})(this);

Tinytest.add("is a function", (test) => {
    test.instanceOf(Namespace, Function);
});

Tinytest.add("can be used on classes", (test) => {
    try {
        @Namespace("foo")
        class TestClass {}
    } catch (e) {
        test.fail("Should not throw an error when used on class")
    }

    teardown();
});

Tinytest.add("throws an error when used without namespace name", (test) => {
    test.throws(() => {
        @Namespace()
        class TestClass {}
    });
});

Tinytest.add("throws an error when used with empty namespace name", (test) => {
    test.throws(() => {
        @Namespace("")
        class TestClass {}
    });

    teardown();
});
Tinytest.add("throws an error when used on anything but class", (test) => {
   test.throws(() => {
       class Test {
           @Namespace("foo")
           method() {}
       }
   });
    teardown();
});

Tinytest.add("works for simple cases", (test) => {

    @Namespace("foo")
    class Test {}

    test.isNotUndefined(foo.Test);
    teardown();
});

Tinytest.add("works for multi-part namespaces", (test) => {

    @Namespace("foo.bar")
    class Test {}

    test.isNotUndefined(foo.bar.Test);
});

Tinytest.add("allows reusing namespaces", (test) => {

    @Namespace("foo.bar")
    class Test {}

    @Namespace("foo.bar")
    class Test2 {}


    test.isNotUndefined(foo.bar.Test);
    test.isNotUndefined(foo.bar.Test2);
    teardown();
});

Tinytest.add("allows nesting namespaces", (test) => {

    @Namespace("foo.bar")
    class Test {}

    @Namespace("foo.bar.baz")
    class Test2 {}


    test.isNotUndefined(foo.bar.Test);
    test.isNotUndefined(foo.bar.baz.Test2);
    teardown();
});

Tinytest.add("works with named functions", (test) => {
    Namespace("foo", function hello() {
        this.bar = "baz";
    });

    test.isNotUndefined(foo.hello.bar);
    teardown();
});

Tinytest.add("works with annonymous functions", (test) => {
    Namespace("foo", function t1() {
        this.bar = "baz";
    });

    Namespace("foo.t1", function() {
        test.isNotUndefined(this.bar);
        this.baz = "bar";
    });

    test.isNotUndefined(foo.t1.baz);
    teardown();
});

