'use strict';

const AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
const alchemy_language = new AlchemyLanguageV1({
  api_key: process.env.WATSON_ALCHEMY_KEY
});
let util = require('util');
exports.get = function(A_text){
	return new Promise((fulfill,reject)=>{
		let text = A_text.replace(/<(?:.|\n)*?>/gm, '');
		let parameters = {
		  extract: 'entities,keywords,sentiment,emotions,concepts,taxonomy',
		  sentiment: 1,
		  maxRetrieve: 5,
		  text
		};
		alchemy_language.combined(parameters,(err, response)=>{
			if(err){
				// Does not reject so other data is saved
				console.log('Alchemy Error ', err);
				return fulfill({});
			}
      console.info(util.inspect(response, {showhidden: false, depth: null}));

			fulfill(response);
		});
	});
}
