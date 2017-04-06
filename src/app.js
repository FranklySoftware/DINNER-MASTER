"use strict"

require('dotenv').config();

let express = require("express"),
	consolidate = require('consolidate'),
	_ = require('underscore'),
	mustache = require('mustache'),
	bodyParser = require('body-parser'),
	twitter = require("./module/twitter/twitter.js"),
	linkedin = require("./module/linkedin/linkedin.js");
	let multer  = require('multer'),
	upload = multer({ dest: 'uploads/' }),
	fs = require('fs');


let app = express();
	app.engine('html',consolidate.mustache);
	app.set('view engine','html');
	app.set('views','./client');
	app.use('/',express.static('./client'));
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

let route = require('./module/routes'),
	db = require('./module/db');

let selected = 'guest';

var auth = require('./module/basicAuth');
app.use('/registerGuest', auth.scopedBasicAuth({
    "localhost:8888": {
        username: "admin",
        password: "password",
    },
    "havas-cognitive-dinner.mybluemix.net": {
        username: "****",
        password: "****",
    }
}));

db.connect().then(startApp).catch(dbError);

function startApp(){

	app.get("/dinnerGuest/:id",(req,res)=>{
		console.log("/dinnerGuest");
		route.getDinnerComparison('guest',req.params.id).then((data)=>{
			data.me.defaultCopy = '';
			data.me.linkedinHTML = '';
			res.render('dinner2',{
				name: data.me.name,
				//profileImage: encodeURIComponent(data.me.profileImage),
				//profileImage: JSON.stringify(data.me.profileImage),
				json: JSON.stringify(data)
			});
		}).catch((err)=>{
			res.render('no-user',{});
		});
	});

	app.get("/dinnerGuest/:id/json",(req,res)=>{
		console.log("/dinnerGuest");
		route.getDinnerComparison('guest',req.params.id).then((data)=>{
			// res.render('json',{
			// 	name: data.me.name,
			// 	json: JSON.stringify(data)
			// });
			res.json(data);
		}).catch((err)=>{
			res.render('no-user',{});
		});
	});



	app.get('/contact_me/:name/:email/', function(req, res) {
		let contactme = require('./module/contactEmail');
			//contactme.sendEmail( req.params.first_name , req.params.last_name , req.params.email , req.params.ibm_id ,function(status,email){
			contactme.sendEmail( req.params.name , req.params.email ,function(status,email){
    		res.send('message sent');
				req.params.date = Date();
				db.saveObject('contact_request',req.params).then((item)=>{
					console.log('Request saved');
				});

    	});
	});

	app.get('/registerGuest',(req,res)=>{
		console.log("get request");
		db.getGuests(req).then((data)=>{
			res.render('form',{ json: JSON.stringify(data)});
		});
	});

	app.get('/removeGuest/:id',(req,res)=>{
		console.log("remove request");
		db.removeGuest(req.params.id).then(()=>{
			res.redirect('/registerGuest');
		});
	});


	app.post('/uploadImage', upload.single('pic'), (req,res)=>{
		console.log("image upload request: ", req.body.slug);
		console.log(req.file);
		fs.readFile(req.file.path, function (err, data) {
			let f = {};
			f.contentType = req.file.mimetype;
			f.data = data;
			f.slug = req.body.slug;
			db.upsertObject('profile_image', {slug:req.body.slug} ,f).then((item)=>{
				console.log('Image saved');

				res.redirect('/registerGuest');
			});

		});

	});

	app.post('/removeImage',(req,res)=>{
		console.log("remove image request");
		db.removeObject('profile_image', {slug:req.body.slug}).then(()=>{
			res.redirect('/registerGuest');
		});
	});


	app.post('/registerGuest',(req,res)=>{
		console.log("/registerGuest form:");
		console.log(req.body.guest);
		let person = req.body.guest;
		Promise.all([

			// User In --
			linkedin.get(person.linkedinURL, person.linkedinHTML),
			twitter.get(person.twitter),


		]).then((data)=>{

			let [ linkedinData, twitterData
			] = data;

			// User Data --
			person.twitterConcat = twitterData.concat;
			person.linkedinConcat = linkedinData.concat;
			person.watsonPrep = [ person.twitterConcat, person.linkedinConcat, person.defaultCopy ].join(' . ').toString();
			//person.watsonPrep = [ person.twitterConcat, person.linkedinConcat ].join(' . ').toString();
			person.digitalFootprint = person.watsonPrep.length; // Amount of chars retrieved
			person.skills = linkedinData.skills;
			person.profileImage = twitterData.profileImage || linkedinData.profileImage;


			runWatson(person,(person)=>{
				db.saveItem(selected,person).then((item)=>{
					console.log('Item saved : ');
					db.getGuests(req).then((data)=>{
						res.render('form',{ json: JSON.stringify(data)});
					});
				});
			});

		});

	});

	console.log(process.env.PORT, process.env.VCAP_APP_PORT);
	let port = process.env.PORT || process.env.VCAP_APP_PORT || 8888;
	app.listen(port);
	console.log("Listening on port "+port);
}


// WATSON Analysis ----------------------

let alchemy = require("./module/alchemy/alchemy"),
	personality = require("./module/personality/personality");

function runWatson(person,callback){

	console.log('Running watson');

	var watsonText = person.watsonPrep;
	if(watsonText.length<1000){  watsonText = watsonText+watsonText; }

	Promise.all([

		// User In --
		alchemy.get(watsonText),
		personality.get(watsonText),

	]).then((analysis)=>{

		let [ alchemy, personality
		 ] = analysis;

		person.industry = alchemy.taxonomy || [];
		person.subjects = alchemy.concepts || [];
		person.personality = personality.big5;


		delete person["watsonPrep"];
		delete person["twitterConcat"];
		delete person["linkedinConcat"];

		callback(person);

	}).catch((err)=>{
		person.industry = [];
		person.subjects = [];
		person.companyIndustry = [];
		person.companySubjects = [];
		console.log(err);
		callback(person);
	});

}


function dbError(err){
	console.log('DB fail :', err);
}
