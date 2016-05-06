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
	
	var cursor =db.get().collection('user').find();
	var result=[];
	var counter=0;
	
	var total=0;
	cursor.count(function(error, tot) {
		total=tot;
	});
	console.log("total search" + total);

	cursor.each(function(err, doc) {
	      assert.equal(err, null);	
	      counter++;
	      result.push(doc);	     
	      
	      if(counter===total){
	    	  return displayProfilesList(req,res,result);
	      }
	});
	
};


/***
 * 
 */
exports.searchprofiles = function(req, res) {
	
	var userid = req.param("userid");
	var star = req.param("star");
	console.log(" search userid"+userid);
	var cursor =db.get().collection('user').find({ "userid": userid } );
	var result=[];
	var counter=0;
	
	var total=0;
	cursor.count(function(error, tot) {
		total=tot;
	});
	
	console.log("total search" + total);

	if (total === 0) {
		return displayProfilesList(req, res, result);
	} else {
		cursor.each(function(err, doc) {
			assert.equal(err, null);
			counter++;
			result.push(doc);

			if (counter === total) {
				return displayProfilesList(req, res, result);
			}
		});
	}
	
};
