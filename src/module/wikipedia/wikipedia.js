"use strict"
let _ = require("underscore"),
	fs = require('fs'),
	cheerio = require('cheerio'),
	request = require('request');

exports.get = function(url){
	let options = {
	  url: url,
		gzip:true,
	  headers: {
	    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Accept-Encoding':'gzip, deflate, sdch, br'
	  }
	};
		return new Promise(function (fulfill, reject){
		request(options, function (error, response, page) {
		  	if (error) return fulfill(false);
				console.log(page);
				fs.writeFileSync('/Users/francis.krout/Sites/havas-cognitive/wikipedia_data.html', page);
		  	let $ = cheerio.load(page);

		  	let output = {}
		  		output.concat = $('#layout-main').html().replace(/<\/?[^>]+(>|$)/g, "");

		  	fulfill(output);

		});



	});
}
