"use strict"

let helperSG = require('sendgrid').mail;
let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

function send(toSend, callback){
  console.log(JSON.stringify(toSend, null, 2))
  //console.log(JSON.stringify(toSend))
  console.log("API-KEY", process.env.SENDGRID_API_KEY)

  let requestBody = toSend;
  let emptyRequest = require('sendgrid-rest').request;

  let requestPost = JSON.parse(JSON.stringify(emptyRequest));
  requestPost.method = 'POST';
  requestPost.path = '/v3/mail/send';
  requestPost.body = requestBody;
  sg.API(requestPost, function (error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
    if(error){ return callback(true,response); }
    callback(false,response);

  })
}



exports.sendEmail = function(name,email,callback){

	  let from_email = new helperSG.Email(process.env.CONTACT_EMAIL_FROM);
	  let to_email = new helperSG.Email(process.env.CONTACT_EMAIL_TO);
	  let subject = "Cognitive Dinner - Contact Me Request";
	  //  var content = new helper.Content("text/plain", "some text here " + req.body.formData.email);
	  let body = 'name: ' + name + '<br>';
		body += 'email: ' + email + '<br>';
		body += 'has requested to be contacted regarding Cognitive Dinner<br>';
	  body += 'Date: ' + Date() + '<br>';


	  let content = new helperSG.Content("text/html", "<html><body>" + body + "</body></html>");
	  let mail = new helperSG.Mail(from_email, subject, to_email, content);

	  send( mail.toJSON() ,function(status,response){
	    //res.send('message sent');
     if(status){ return callback(true,email); }
     callback(false,email);
	  });


}
