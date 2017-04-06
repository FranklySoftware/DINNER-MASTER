"use strict"

let	_ = require('underscore');
let util = require('util');
let dbUrl = process.env.DB_URL_PROD;

let MongoClient = require('mongodb').MongoClient,
    state = {};

exports.connect = function(){
    return new Promise((fulfill,reject)=>{
        if (state.db) { return; fulfill(); }
        console.log(dbUrl);
        MongoClient.connect( dbUrl, (err, mongodb)=>{
            if(err) {console.info(util.inspect(err, {showhidden: false, depth: null})); return reject;}
            state.db = mongodb;
            fulfill();
        });
    });
}
exports.get = function(){
    return state.db;
};
exports.close = function(done){
    return new Promise((fulfill,reject)=>{
        if (!state.db) return fulfill();
        state.db.close((err, result)=>{
            if(err) return reject();
            state.db = null;
            fulfill();
        });
    });
};
// DB : Read / Write -----
exports.saveItem = function(collection, item){

  let slug = item.name.replace(/ /g, '_');//remove embedded spaces
  slug.replace(/\W/g, '');//keep alpha only
  slug += '_' + Math.random().toString(36).substr(2, 9);

  item['slug'] = slug;

    return new Promise((fulfill,reject)=>{
        state.db.collection(collection).insert(item, (err, records)=>{
            if(err) return reject();
            fulfill(item);
        });
    });
}

exports.saveObject = function(collection, item){

  return new Promise((fulfill,reject)=>{
      state.db.collection(collection).insert(item,(err, records)=>{
          if(err) return reject();
          fulfill(item);
      });
  });
}

exports.upsertObject = function(collection, clause, item){

  return new Promise((fulfill,reject)=>{
      state.db.collection(collection).update(clause, item, {upsert: true, w: 1}, (err, records)=>{
          if(err) return reject();
          fulfill(item);
      });
  });
}

exports.removeObject = function(collection, clause, id){
  console.log(clause);
    return new Promise((fulfill,reject)=>{
        state.db.collection(collection).remove(clause,function(err, rowCount){
            if(err) return reject();
            fulfill();
        });
    });
}

exports.getProfileImage = function(id){

  return new Promise((fulfill,reject)=>{
    console.log('in getProfile Image:', id);
      state.db.collection('profile_image').find({slug: id}).toArray( function(err, docs){
          if(err) {console.log(err , 'no image from db'); return reject('no image in DB - ', err );}
          console.log(docs[0]);
          fulfill(docs[0]);
      });
  });
}

exports.removeGuest = function(id){
    return new Promise((fulfill,reject)=>{
        state.db.collection('guest').remove({slug:id},function(err, rowCount){
            if(err) return reject();
            fulfill();
        });
    });
}

exports.getGuests = function(req){
    return new Promise((fulfill,reject)=>{
      state.db.collection('guest').find().sort({'_id':-1}).toArray(function(err, users) {
        state.db.collection('profile_image').find({},{fields:{slug: 1}}).toArray( function(err, imageSlugs){
          let imageSlugHash = {};
          
          _.map(imageSlugs, function(o){imageSlugHash[o.slug]=1;});

          if(err) {console.log(err , 'no image entries from db');}

    			let output = [];
    			console.log('Get guests!');
    			if(!users||err) return reject( 'no users in DB - ', err );
    			_.each(users,(user)=>{
    					let userFields = [];

              let deleteButton = '<i class="fa fa-user-times fa-lg red" aria-hidden="true"></i>';
              let picIcon = '<span class="fa-stack fa-lg"> <i class="fa fa-square-o fa-stack-2x"></i> <i class="fa fa-user fa-stack-1x"></i> </span>';
              let imageClass = imageSlugHash[user.slug] ? 'guest-img-yes' : 'guest-img-no';
              let hasCustomPic = imageSlugHash[user.slug] ? 1 : 0;
              imageClass = imageClass == 'guest-img-no' && !user.profileImage ? 'guest-img-none' : imageClass;

              // userFields.push('<a class="guest-delete-button" href="/removeGuest/' + user.slug + '" onclick="return confirm(\'OK to DELETE this Guest?\')"></a>');
              userFields.push('<a class="" href="/removeGuest/' + user.slug + '" onclick="return confirm(\'OK to DELETE this Guest?\')">'+deleteButton+'</a>');
              userFields.push('<a class="'+ imageClass +'" href="#" onclick="doProfileImageUpload(\'' + user.slug + '\',\'' + user.name + '\',\'' + hasCustomPic +'\');return false;">'+ picIcon +'</a>');
              userFields.push('<a class="guest-dinner-link" target="_blank" href="http://' + req.headers.host + "/dinnerGuest/" + user.slug + '">' + user.name + "</a>");
              userFields.push('<a class="guest-dinner-link" target="_blank" href="http://' + req.headers.host + "/dinnerGuest/" + user.slug + '/json">View</a>');
    					userFields.push(user.name);
    					userFields.push(user.email);
    					userFields.push(user.company);
    					userFields.push(user.linkedin);
    					userFields.push(user.twitter);
              // userFields.push(user.title);
              // userFields.push(user.defaultCopy);
              // userFields.push(user.slug);
    					output.push(userFields);
    			});
    			fulfill(output);
        });

  		});



    });//end Promise
}
