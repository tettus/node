var  db = require('./db');
var assert = require('assert');


function displayProfilesList(req,res,result){
	
	res.render('profilelist', {
   		title : 'Profile',
   		data :result
   	});
	
}

/***
 * 
 */
exports.profilelist = function(req, res) {
	
		db.get().collection('user', function(err, collection) {
		if (!err) {
			collection.find().toArray(function(err, items) {
				console.log(items);
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
exports.searchprofiles = function(req, res) {
	
	var userid = req.param("userid");
	var star = req.param("star");
	console.log(" search userid"+userid);
	 
	db.get().collection('user', function(err, collection) {
		if (!err) {
			collection.find().toArray(function(err, items) {
				console.log(items);
				return displayProfilesList(req, res, items);
			});
		} else {
			// TO-DO
			console.log("Error occured"+err);
		}

	});
	
};
