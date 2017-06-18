

var tokenize = require('./tokenize');

/**
 * These words "flip" the sentiment of the following word.
 */
var negators = {
    'cant': 1,
    'can\'t': 1,
    'dont': 1,
    'don\'t': 1,
    'doesnt': 1,
    'doesn\'t': 1,
    'not': 1,
    'non': 1,
    'wont': 1,
    'won\'t': 1,
    'isnt': 1,
    'isn\'t': 1
};

var findItem = function(in_ArrayOfData, in_Word)
{
  return in_ArrayOfData.find((item) => {
    if (item.k === in_Word)
      return true;
    return false;
  });
}

/**
 * Performs sentiment analysis on the provided input 'phrase'.
 *
 * @param {String} Input phrase
 * @param {Object} Optional sentiment additions to AFINN (hash k/v pairs)
 *
 * @return {Object}
 */
var langCache = {};

module.exports = function (in_Data, in_CB) {

    // Parse arguments
    if (typeof in_Data.phrase === undefined)
      in_Data.phrase = '';

    if (in_Data.inject  === undefined)
      in_Data.inject = null;

    if (typeof in_CB === 'undefined')
      in_CB = null;

    if (in_Data.lang === undefined)
      in_Data.lang = 'en';
    // Merge
    /*if (inject !== null) {
        afinn = Object.assign(afinn, inject);
    }*/
    var data = langCache[in_Data.lang];

    if (data === undefined) {
      data = require('../data/' + in_Data.lang + '.json');
      langCache[in_Data.lang] = data;
    }

    // Storage objects
    var tokens      = tokenize(in_Data.phrase),
        score       = 0,
        words       = [],
        positive    = [],
        negative    = [];

    // Iterate over tokens
    var len = tokens.length;
    while (len--) {
        var obj = tokens[len];

        var item = findItem(data.words, obj);

        if (item === undefined)
          continue;
        var s = item.w;

        // Check for negation
        if (len > 0) {
            var prevtoken = tokens[len-1];
            if (findItem(data.negators, prevtoken)) s = -s;
        }

        words.push(obj);
        if (s > 0) positive.push(obj);
        if (s < 0) negative.push(obj);

        score += s;
    }

    // Handle optional async interface
    var result = {
        score:          score,
        comparative:    tokens.length > 0 ? score / tokens.length : 0,
        tokens:         tokens,
        words:          words,
        positive:       positive,
        negative:       negative
    };

    if (in_CB === null) return result;
    process.nextTick(function () {
        in_CB(null, result);
    });
};
