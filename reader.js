"use strict";

require('shelljs/global');

var fileName = process.argv[2];

var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader(fileName);

lr.on('error', function (err) {
	// 'err' contains error object
});

lr.on('line', function (apkName) {
  var app = exec('./run '+apkName, {silent:false}).stdout;
});

lr.on('end', function () {
	// All lines are read, file is closed now.
});
