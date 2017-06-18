const sentiment = require('../index.js');
const async = require('async');
const fs = require('fs')

let messages = ['Чуть не кончил пока держал руки под горячей водой:D'];

async.each(messages, (message, done) => {
		sentiment({phrase: message, lang:'ru'} , (err, result) => {
			console.log(message + ' - ' +
				' score=' + result.score +
				' comparative=' + result.comparative +
				' positive=' + result.positive +
				' negative=' + result.negative);
			done();
		});
	},
	(err) => {

	});

