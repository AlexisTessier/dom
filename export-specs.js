'use strict';

var forEach = require('lodash/forEach');
var map = require('lodash/map');
var replace = require('lodash/replace');
var repeat = require('lodash/repeat');
var specs = require('./specs');
var fs = require('fs');
var path = require('path');

forEach(specs, function(spec, story) {
	var specsAll = spec.all();

	var filePath = path.join(__dirname, 'specs-documentation', story+'.md');

	fs.writeFile(filePath, story+'\n'+repeat('=', story.length)+'\n'+map(specsAll, function(_spec, number) {
		var spec = _spec[0];
		var sub = _spec[1];

		return '\n+ \\#'+(number+1)+'\n\t'+replace(spec, new RegExp('\n', 'g'), '\n\t')
			+'\n\n\t'+map(sub, function(_sub) {
				return '+ '+replace(_sub, new RegExp('\n', 'g'), '\n\t');
			}).join('\n\n\t');
	}).join('\n'), {encoding: 'utf8'}, function (err) {
		if (err) throw err;

		console.log('File saved at path : '+filePath);
	});
});