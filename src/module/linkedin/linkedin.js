"use strict"
let _ = require("underscore"),
	cheerio = require('cheerio'),
	request = require('request');
let fs = require('fs');

exports.get = function(url, html){
	let options = {
	  url: url,
		gzip:true,
		// headers: {
	  //   'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36',
		// 	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		// 	'Accept-Encoding':'gzip, deflate, sdch, br'
	  // }
	  headers: {
	    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Accept-Encoding':'gzip, deflate, sdch, br'
	  }
	};
	return new Promise(function (fulfill, reject){

			//let $ = cheerio.load(page);
			let $ = cheerio.load(html);
			let output = {};

			if (html){
				output.profileImage = $('.profile-picture img');
				output.bio = $('#summary-item-view p.description').html();
				output.skills = [];
				output.experience = [];
				output.endorsements = [];

				if( output.profileImage ){
					output.profileImage = $('.profile-picture img').attr("src");
				}else{
					output.profileImage = '';
				}

				$('.skills-section li .skill-pill .endorse-item-name').each(function(i, elm) {
					let skill = $(this).find('a').html();
					if(skill!==null) output.skills.push(skill);
				});
				$('#background-experience div.section-item').each(function(i, elm) {
					let position = {};
						position.job_title = $(this).find('header h4 a').html();
						position.company = $(this).find('header h5 span a').html();
						position.description = $(this).find('p.description').html();
					output.experience.push(position);
				});
				$('#endorsements div.endorsement-full ').each(function(i, elm) {
					output.endorsements.push( $(this).find('.endorsement-quote .description').html() );
				});
			}


			addConcat(output,(output)=>{
				fulfill(output);
			});

		//}); request
	});
}


function addConcat(output, callback){
	let concatJobs = _.map(output.experience,(job)=>{ return job.description; });
	let concatSkills = _.map(output.skills,(skill)=>{ return ' '+skill+' '; });

	let prep = [];
	if(output.bio!==null) prep.push(output.bio)
	prep.push(concatJobs)
	prep.push(concatSkills)
	prep.join(' . ')

	output.concat = prep.join(' . ');
	callback(output);
}
