"use strict"
const Twitter = require('twitter'),
	  _ = require("underscore");

const client = new Twitter({
	consumer_key: '***',
	consumer_secret: '***',
	access_token_key: '***',
	access_token_secret: '***'
});

exports.get = function(handle){

	return new Promise(function (fulfill, reject){

		if( handle === '' || handle === 'null' || handle === '?' ){ return fulfill(false); } // Check for twitter handle

		let params = {
			screen_name: handle,
			count:'500',
	        exclude_replies:'false'
		};
		client.get('statuses/user_timeline', params, function(err, tweets, response) {
			if(!err){
				console.log('Got tweets '+handle);
				let output = {};
					output.tweets = tweets;
					output.concat = _.map(output.tweets,(tweet)=>{ return tweet.text; }).join(' . ');
					// output.profileImage = 'dog.jpg'
				fulfill(output);
			}else{
				console.log('Twitter fail :'+handle);
				fulfill(false);
			}
		});
	});

};






//function getProfile(){
//}
//https://api.twitter.com/1.1/users/show.json?screen_name=twitterdev
