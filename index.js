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

module.exports = function clearDir(dir, emptiedCallback, finalCallback) {
  var tempDir = dir + '_DELETING_' + uniqueId();

  fs.readdir(dir, function (err, files) {

    if (err) {
      if (err.code !== 'ENOENT') return emptiedCallback(err);

      // directory doesn't exist; create it and call both callbacks
      fs.mkdir(dir, function (err) {
        emptiedCallback(err);

        if (err) return;

        process.nextTick(finalCallback);
      });
      
      return;
    }

    fs.mkdir(tempDir, function (err) {
      if (err) return emptiedCallback(err);

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
          else if (err) throw err;
        });
      });
    });
  });
};
