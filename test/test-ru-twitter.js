const sentiment = require('../index.js');
const csv = require('csv-streamify')
const fs = require('fs')

var testCSV = function(in_Path)
{
	let parser = csv();
	let lines = 0;
	parser.on('data', function (line) {
		lines ++;
		let data = String(line).split(';');
		let message = data[3];
		sentiment({phrase: message, lang:'ru'} , (err, result) => {
			console.log(message + ' - ' +
				' score=' + result.score +
				' comparative=' + result.comparative +
				' positive=' + result.positive +
				' negative=' + result.negative);
		});
	});
 
	// now pipe some data into it 
	fs.createReadStream(in_Path).pipe(parser)
};


testCSV(__dirname + '/data/twitter-ru-pos.csv');
testCSV(__dirname + '/data/twitter-ru-neg.csv');
