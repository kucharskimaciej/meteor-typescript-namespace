# Namespace decorator for TypeScript classes

A pattern to simulate namespace behaviour in Typescript.

## Usage

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

## Installation

```
meteor add kucharskimaciej:typescript-namespace
```

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
meteor test-packages .
```