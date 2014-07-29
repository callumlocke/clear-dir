'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var async = require('async');

var startTime = Date.now();
var id = 0;

function uniqueId() {
  return startTime + '_' + (id++);
}

module.exports = function emptyDir(dir, emptiedCallback, finalCallback) {
  var tempDir = dir + '__FOR_DELETION__' + uniqueId();

  fs.mkdir(tempDir, function (err) {
    if (err) throw err;

    fs.readdir(dir, function (err, files) {
      if (err) throw err;

      async.each(files, function (file, done) {
        fs.rename(path.join(dir, file), path.join(tempDir, file), done);
      }, function (err) {
        emptiedCallback(err);

        if (err) return;

        var rimraf = spawn(path.join(__dirname, 'node_modules', '.bin', 'rimraf'), [tempDir]);
        rimraf.on('close', function (code) {
          var err;
          if (code !== 0) err = new Error('rimraf exited with code: ' + code);

          if (finalCallback) finalCallback(err);
          else throw err;
        });
      });
    });
  });
};
