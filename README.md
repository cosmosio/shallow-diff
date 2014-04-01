Shallow diff
=============

Make a shallow diff between two objects/arrays to get what has been updated/deleted/added or remains unchanged.
It will not traverse the whole structure, only the top level items/property.

Installation
============

```bash
npm install shallow-diff
```

How to use
==========

Require shallow-diff:

```bash
var diff = require("shallow-diff");
```

Get the diff between two objects:

```js
var base = {a:1, b:2, c:3, d:4, f:6};
var compared = {a:1, b:20, d: 4, e: 5};

diff(base, compared);
// returns
// {
//    unchanged: ["a", "d"],
//    updated: ["b"],
//    deleted: ["f"],
//    added: ["e"]
// }
```

Get the diff between two arrays:

```js
var base = [10, 20, 30]
var compared = [15, 20]

diff(base, compared);
// returns:
// {
//    unchanged: [1],
//    updated: [0],
//    deleted: [2],
//    added: []
// }
```

LICENSE
=======

MIT
