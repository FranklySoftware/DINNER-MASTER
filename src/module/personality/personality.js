"use strict"
const watson = require('watson-developer-cloud');
const personality_insights = watson.personality_insights({
    username: process.env.WATSON_PI_USERNAME,
    password: process.env.WATSON_PI_PASSWORD,
    version: 'v2'
});
let util = require('util');
exports.get = function (input){
	return new Promise((fulfill,reject)=>{
		personality_insights.profile({text: input, language: 'en'}, function (err, response) {
	        if (err){ return fulfill({ raw:null, big5:{ Openness:0, Conscientiousness:0, Extraversion:0, Agreeableness :0, EmotionalRange:0 } }); }
	        let big5 = {};
	            big5.Openness = {pct: response.tree.children[0].children[0].children[0].percentage*100,
                              children: response.tree.children[0].children[0].children[0].children};
	            big5.Conscientiousness = {pct: response.tree.children[0].children[0].children[1].percentage*100,
                              children: response.tree.children[0].children[0].children[1].children};
	            big5.Extraversion = {pct: response.tree.children[0].children[0].children[2].percentage*100,
                              children: response.tree.children[0].children[0].children[2].children};
	            big5.Agreeableness = {pct: response.tree.children[0].children[0].children[3].percentage*100,
                              children: response.tree.children[0].children[0].children[3].children};
	            big5.EmotionalRange = {pct: response.tree.children[0].children[0].children[4].percentage*100,
                              children: response.tree.children[0].children[0].children[4].children};
          console.info(util.inspect(response, {showhidden: false, depth: null}));
	        fulfill({ raw:response, big5 });
	    });
	});
}
