concussion
==========
Read and write HTTP headers.  Wrap typical node.js headers POJO with functions
and methods to deal with case-sensitivity.

Example
-------
```js
var concussion = require("concussion"),
    headers = {"X-Foo": 42},
    concuss;

// use read function to read case-insensitive header name
assert(concussion.read(headers, "x-foo") === 42);

// use write function to write case-insensitive header name
concussion.write(headers, "x-foo", 23);
assert(headers["X-Foo"] === 23);

// use remove function to remove case-insensitive header name
concussion.remove(headers, "x-foo");
assert(headers["X-Foo"] === undefined);

// bind to headers object with concussion module function
concuss = concussion(headers);
concuss.write("X-Foo", 13);
assert(headers["X-Foo"] === 13);
```
