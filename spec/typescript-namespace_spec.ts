declare var Tinytest;
declare var Namespace;

declare var foo; // for the typescript compiler

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
});
Tinytest.add("throws an error when used on anything but class", (test) => {
   test.throws(() => {
       class Test {
           @Namespace("foo")
           method() {}
       }
   });
});

Tinytest.add("works for simple cases", (test) => {

    @Namespace("foo")
    class Test {}

    test.ok(test.Test);
});

Tinytest.add("works for multi-part namespaces", (test) => {

    @Namespace("foo.bar")
    class Test {}

    test.ok(foo.bar.Test);
});

Tinytest.add("allows reusing namespaces", (test) => {

    @Namespace("foo.bar")
    class Test {}

    @Namespace("foo.bar")
    class Test2 {}


    test.ok(foo.bar.Test);
    test.ok(foo.bar.Test2);
});

Tinytest.add("allows nesting namespaces", (test) => {

    @Namespace("foo.bar")
    class Test {}

    @Namespace("foo.bar.baz")
    class Test2 {}


    test.ok(foo.bar.Test);
    test.ok(foo.bar.baz.Test2);
});