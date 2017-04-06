"use strict" // Shared db connection - https://www.terlici.com/2015/04/03/mongodb-node-express.html

let _ = require('underscore'),
    arrayDiff = require('simple-array-diff'),
    async = require('async');

let helper = require('./helper.js'),
    db = require('./db'),
    personality = require('./personality/personality.js');

exports.getDinnerComparison = function(collection, id){
    return new Promise((fulfill,reject)=>{
        db.get().collection(collection).find().toArray(function(err, users) {

            console.log('Get comparison:'+id);
            //console.log(users)
            if(!users||err) return reject( 'no users in DB - ', err );

             // Find current user ---
            let me = _.find(users,{slug:id}); // Current user
            if(!me) return reject('User does not exist');

            let allSkills = [];
            let allSubjects = [];
            let digitalFootprints = [];
            //let sectorWatsonPrep = [];
            let digitalFootprintsTotal = 0;

            //need to avg personality for the group
            let openTotal = 0;
            let conTotal = 0;
            let extraTotal = 0;
            let agrTotal = 0;
            let emoTotal = 0;

            _.each(users,(user)=>{
                allSkills.push(user.skills);
                allSubjects.push(user.subjects);
                digitalFootprints.push(user.digitalFootprint);
                digitalFootprintsTotal += user.digitalFootprint;

                openTotal   += user.personality.Openness.pct;
                conTotal    += user.personality.Conscientiousness.pct;
                extraTotal  += user.personality.Extraversion.pct;
                agrTotal    += user.personality.Agreeableness.pct;
                emoTotal    += user.personality.EmotionalRange.pct;


            });

            let groupPersonality = {Openness: openTotal/users.length,
                                          Conscientiousness: conTotal/users.length,
                                          Extraversion: extraTotal/users.length,
                                          Agreeableness: agrTotal/users.length,
                                          EmotionalRange: emoTotal/users.length};
            me.groupPersonality = groupPersonality;

            // Merge all users skill arrays to one --
            allSkills = [].concat.apply([],allSkills);
            allSubjects = [].concat.apply([],allSubjects);

            let subjectOccurrenceMap = allSubjects.reduce(function (p, c) {
                p[c.text] = (p[c.text] || 0) + 1;
                return p;
            }, {});
            let mostCommonSubjects = Object.keys(subjectOccurrenceMap).sort(function (a, b) {
                return subjectOccurrenceMap[a] < subjectOccurrenceMap[b];
            });

            me.groupSubjects = mostCommonSubjects;
            console.log(mostCommonSubjects)
            // Append to user Object --
            //me.totalEventSkills = helper.countUniqueInArray(allSkills).length; // Count unique skills in array
            //me.totalEventSubjects = helper.countUniqueInSubjectsArray(allSubjects).length; // Count unique skills in array
            me.digitalFootprintPercentage = helper.calcPercent( me.digitalFootprint , Math.min.apply(null,digitalFootprints) , Math.max.apply(null,digitalFootprints) );
            me.groupDigitalFootprintPercentage = helper.calcPercent( digitalFootprintsTotal/digitalFootprints.length , Math.min.apply(null,digitalFootprints) , Math.max.apply(null,digitalFootprints) );

            db.getProfileImage(id).then((doc)=>{
              if (doc){
        			     let b64Image = doc.data.toString('base64');
                   me.profileImage = "data:"+doc.contentType+";base64,"+b64Image;
              }
              me.profileImage = me.profileImage || '/img/avatar.png';
              let out = { me };
              fulfill(out);
      		  });


        });
    });
}
