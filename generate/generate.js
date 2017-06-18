
const words = require('./en-words-src.json');
const negators = require('./en-negators-src.json');
const fs = require('fs');
const async = require('async');
const translate = require('./translate.js');

//const translate = require('translate');

var dst = {
	negators:[],
	words:[]
};

for (var i in negators)
{
	dst.negators.push({k:i, w:negators[i]});
}

for (var i in words)
{
	dst.words.push({k:i, w:words[i]});
}
fs.unlink(__dirname + '/data/en.json', (err) => {
	fs.writeFile(__dirname + '/data/en.json', JSON.stringify(dst, '\t'), (err) => {
		if (err)
			console.log(err);
	});
});

const languages = [
	{
		lang:"Russian",
		fn:"ru"
	}
];
/*
translate.text({input:"English", output:"Russian"}, "dog", (err, text) => {
			if (err)
				console.log(err);
			else
				console.log(text);
		});
	*/	
async.each(languages, (language, doneLanguage) => {
	var dstl = {
		negators:[],
		words:[]
	};

	async.eachSeries(dst.negators, (negator, doneNegator) => {
		translate.text({input:"English", output:language.lang}, negator.k, (err, text) => {
			if (err === null)
			{
				dstl.negators.push({k:text, w:negator.w});
				console.log("Translation for " + negator.k + "->" + text);
			}
			else
				console.log("No translations for " + negator.k);
			doneNegator();
		});
	},
	(err) => {
		console.log("All negators done");
		async.eachSeries(dst.words, (word, doneWord) => {
			if (word.k.length < 3)
			{
				dstl.words.push(word);
				console.log("Original for " + word.k + "->" + word.k);
				doneWord();
				return;
			}
			translate.text({input:"English", output:language.lang}, word.k, (err, text) => {
				if (err === null)
				{
					dstl.words.push({k:text, w:word.w});
					console.log("Translation for " + word.k + "->" + text);
				}
				else
					console.log("No translations for " + word.k);
				doneWord();
			});
		},
		(err) => {
			console.log("All words done");
			fs.unlink(__dirname + '/data/' + language.fn + '.json', (err) => {
				fs.writeFile(__dirname + '/data/' + language.fn + '.json', JSON.stringify(dstl, '\t'), (err) => {
					if (err)
						console.log(err);
				});
			});
		});
	});
	
});





