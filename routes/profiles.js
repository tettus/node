var  db = require('./db');
var assert = require('assert');
var iu = require('./imageupload');

/***
 * 
 * @param req
 * @param res
 * @param result
 */
function displayProfilesList(req,res,result){	
	var userid = req.param("userid");
	var star = req.param("star");	
	res.render('profilelist', {
   		title : 'Profile',
   		data :result,
        userid:userid,
        star:star
   	});	
}

/***
 * 
 */
exports.profilelist = function(req, res) {	
	
		db.get().collection('user', function(err, collection) {
		if (!err) {
			collection.find().toArray(function(err, items) {
				return displayProfilesList(req, res, items);
			});
		} else {
			// TO-DO
			console.log("Error occured"+err);
		}

	});
	
};


/***
 *  Search user object
 */
module.exports.searchprofiles = function(req, res) {
	
	var userid = req.param("userid");
	var star = req.param("star");
	///console.log(" search userid"+userid);
	 
	db.get().collection('user', function(err, collection) {
		if (!err) {
			collection.find({"userid":userid}).toArray(function(err, items) {
				console.log(items);
				return displayProfilesList(req, res, items);
			});
		} else {
			// TO-DO
			console.log("Error occured"+err);
		}

	});
	
};



module.exports.viewprofile =function(req,res){
	res.render('view-profile', {
   		title : 'Profile'  		 
   	});
	
};

/***
 * 
 */
module.exports.myprofile =function(req,res){	
	var user= req.user;	
     db.get().collection("user").findOne({"userid":req.user.userid}, function(err, result) {
		
		if(err){
			   res.render('error', {title:"error",error :  "true", msg: 'Unable to get details please try later.' });
		}else if (!result) {
		      res.render('error', {title:"error",error :  "true", msg: 'Unable to get details please try later.' });
		    } else {		      
		      res.render('myprofile', {	title : 'Profile'  , user :result   	});
		 }		 
	});	
     

};


/***
 * 
 */

module.exports.save =function(req,res,next){	 
	 var user= req.user;	
	 console.log(" befoe update"+req.body.height);	 
	 db.updateUser("user",req,function(err,doc){					
		if(!err){		
			res.render('myprofile', {
			           title : 'Profile',
			           user : doc.value
			 }); 
		} else{
			next();
		}		 
	 });	
};
