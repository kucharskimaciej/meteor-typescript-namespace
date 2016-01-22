# Namespace decorator/function for TypeScript compiled Meteor

A pattern to simulate namespace behaviour in Typescript.

## Usage

### as class decorator

```typescript
@Namespace("foo")
class Bar {
    get property() {
        return "Bar"
    }
}
```

```typescript
@Namespace("foo.bar")
class Baz extends foo.Bar {
  get property() {
        return "Baz"
  }
}
```

### with named function

Using a named function will create an additional level of the namespace:

```typescript
Namespace("foo", function bar() {
    this.baz = "test";
});

console.log(foo.bar.baz); // test
```

### with anonymous function

Using the `Namespace` function with an anonymous function let's you to add more stuff to an existing namespace (or create one). 
Unlike calling it with a named function, this will not create another level of namespace.

```typescript
Namespace("foo", function() {
    this.baz = "test";
});

console.log(foo.baz); // test
```

## Installation

```
meteor add kucharskimaciej:typescript-namespace
```

## Why not just use the `namespace` operator?

Following *typescript* code:
```typescript
namespace Foo {
    class Bar {}
}
```

compiles into:

```javascript
var Foo;
(function (Foo) {
    var Bar = (function () {
        function Bar() {
        }
        return Bar;
    })();
})(Foo || (Foo = {}));
```

Which generally works fine, but `Meteor` wraps the following code in an IIFE:
```javascript
(function () {
    var Foo;
    (function (Foo) {
        var Bar = (function () {
            function Bar() {
            }
            return Bar;
        })();
    })(Foo || (Foo = {}));
})();
```

This causes Foo to be a local variable not accessible outside the file.

## Build it && test it

Building (postinstall script):
```
npm install
```
or
```
npm run build
```


Testing:
```
npm test
```