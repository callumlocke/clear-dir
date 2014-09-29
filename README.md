# clear-dir

For quickly emptying a directory. Good for clearing out `dist` before rebuilding.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]


## how it works

This package is for when you just want a directory to be empty as soon as possible.

First it **moves** all the directory's children into a temp directory (adjacent to the original directory) – this is a fast, non-recursive operation. Then it calls your callback. Then it spawns a new process to recursively delete the temp directory in the background. Finally it calls your second callback, if provided.


## usage

```js
var clearDir = require('clear-dir');

clearDir(dir, clearedCallback, finalCallback);
```

* `dir` – the directory to empty
* `clearedCallback` – function to be run when the contents have been cleared out of the directory
* `finalCallback` (optional) – function to be run when the contents have been deleted from the temp location

If the `dir` doesn't exist, it will be created (and then both your callbacks fired). This might sound weird, but the point of `clearDest` is to guarantee an empty folder that you can use immediately, so that's what it does.


## license

[The MIT License](http://opensource.org/licenses/MIT)


[npm-url]: https://npmjs.org/package/clear-dir
[npm-image]: https://badge.fury.io/js/clear-dir.png

[travis-url]: http://travis-ci.org/callumlocke/clear-dir
[travis-image]: https://secure.travis-ci.org/callumlocke/clear-dir.png?branch=master

[depstat-url]: https://david-dm.org/callumlocke/clear-dir
[depstat-image]: https://david-dm.org/callumlocke/clear-dir.png
