/*global describe, before, it*/
'use strict';

var clearDir = require('..');
var fs = require('graceful-fs');
var rimraf = require('rimraf');
var async = require('async');
var path = require('path');
var expect = require('chai').expect;

var tmp = path.join(__dirname, 'tmp');

describe('empty-dir', function () {
  before(function (done) {
    rimraf.sync(tmp);
    fs.mkdirSync(tmp);

    var count = 6;
    var dirs = [];
    for (var i = 0; i < count; i++) {
      dirs.push(i.toString());
    }

    for (i = 0; i < count; i++) {
      var moreDirs = [];
      dirs.forEach(function (dir) {
        moreDirs.push(path.join(dir, i.toString()));
      });
      dirs = dirs.concat(moreDirs);
    }

    console.log('Directories to create:', dirs.length);

    var createTempStructure = function (done) {
      async.eachSeries(dirs, function (dir, done) {
        var fullDir = path.join(tmp, dir);
        fs.mkdir(fullDir, function (err) {
          if (err) return done(err);

          async.eachSeries(['a', 'b', 'c', 'd', 'e'], function (letter, done) {
            var filePath = path.join(fullDir, letter);
            fs.open(filePath, 'wx', function (err, fd) {
              if (err) return done(err);
              fs.close(fd, done);
            });
          }, done);
        });
      }, function (err) {
        if (err) throw err;
        done();
      });
    };

    console.time('Created tmp dir structure');
    createTempStructure(function () {
      console.timeEnd('Created tmp dir structure');

      console.time('Emptied');
      console.time('Deleted');

      clearDir(tmp, function () {
        console.timeEnd('Emptied');
      }, function () {
        console.timeEnd('Deleted');
        done();
      });
    });

  });
  
  it('empties the directory', function () {
    var contents = fs.readdirSync(tmp);
    expect(contents).to.have.length(0);
  });
});
