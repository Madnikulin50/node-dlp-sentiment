const smiles = require('../data/smiles.json')

/**
 * Remove special characters and return an array of tokens (words).
 * @param  {string} input Input string
 * @return {array}        Array of tokens
 */
module.exports = function(input) {
	
	let result = [];
	smiles.forEach((item) => {
		input = input.replace(item, (r) => {
			result.push(r);
			return '';
		});
	});

	result = result.concat(input
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=_`\"~()]/g, '')
        .split(' '));
	return result;
};