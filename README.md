# clear-dir

For quickly emptying a directory.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

This module is optimised for situations where you just want the directory to be empty as soon as possible, and actually deleting the files can wait till later. First it **moves** all the directory's children into a temp directory so it can call your callback immediately, then it resursively deletes everything from the temp dir in a background job.


## Usage 

```javascript
var clearDir = require('clear-dir');

clearDir(dir, emptiedCallback, finalCallback);
```

* `dir` – the directory to empty
* `emptiedCallback` – to be run when the contents have been cleared out of the directory
* `finalCallback` (optional) – to be run when the contents have been deleted from the temp location


## License

[The MIT License](http://opensource.org/licenses/MIT)


[npm-url]: https://npmjs.org/package/clear-dir
[npm-image]: https://badge.fury.io/js/clear-dir.png

[travis-url]: http://travis-ci.org/callumlocke/clear-dir
[travis-image]: https://secure.travis-ci.org/callumlocke/clear-dir.png?branch=master

[depstat-url]: https://david-dm.org/callumlocke/clear-dir
[depstat-image]: https://david-dm.org/callumlocke/clear-dir.png
