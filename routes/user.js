
 
//var assert = require('assert');

var  db = require('./db')
    ,profile= require('./profiles')
    ,index= require('./index');
 

function mongoInsert(collection_name, data, cb) {
	var collection = db.get().collection(collection_name);
	collection.insert(data, function(err, res) {
		if (err) {
			console.log(err);
		} else {
			// console.log('Inserted into the ' + collection_name + ' collection');
			cb(res);
		}
	});
}



/*
 * Generate user id for new registration
 */
function getNextSequenceValue(category, callback) {

	var collection = db.get().collection("userseq");

	collection.findAndModify({
		"category" : 1
	}, [], {
		"$inc" : {
			"userid" : 1
		}
	},

	function(err, doc) {
		 
		return callback(err, doc);
	});
}

exports.login = function(req, res) {
	res.render('login', {
		title : 'Login'
	});
};

exports.registration = function(req, res) {
	res.render('registration', {
		title : 'Registration'
	});
};

/**
 * 
 */
exports.register = function(req, res) {
	 
	  getNextSequenceValue( 0, function(err, obj) {
		 
			if (err) {
				console.log(err);
			} else {
				var fullname = req.param("fullname");
				var countrycode = req.param("countrycode");
				var phonenumber = req.param("phonenumber");
				phonenumber=countrycode+phonenumber;
				var email = req.param("email");
				var password = req.param("password");
				
				
				
				db.get().collection("user").findOne({"email":email}, function(err, item) {
					if(!err){
					  if(item){
						 
							res.render('registration', {
								title : 'Registration',
								error : 'true',
								message:'Email Id already exists.'
							});							
						 
					  }else{

							var newuser = {
								"userid" : obj.value.userid,
								"fullname" : fullname,
								"phonenumber" : phonenumber,
								"email" : email,
								"password" : password,
								"status" : index.STATUS_IN_VERIFICATION
							};

							mongoInsert('user', newuser, function(user_res) {
								res.render('index', {
									title : 'Login'
								});					 
							});
						  
					  }
					}else{
						//send to error page
					}
				});

			}
		});
};

/*
 * login page
 */

exports.loginpage = function(req, res) {
	res.render('login', {
		title : 'Login'
	});	
};


exports.authenticate = function(req, res) {
	
	var email = req.param("email");
	var password = req.param("password");
	
	db.get().collection("user").findOne({"email":email}, function(err, item) {
		
		if(err){
			res.render('login', {
				title : 'Login',
				error :  "true",
				msg:"Unable to get details please try later."
			});
		}
		
		if(item!==null){
			console.log("item.password!==password "+(item.password!==password));
			if(item.password!==password){
				res.render('login', {
					title : 'Login',
					error :  "true",
					msg:"The email and password do not match."
				});				
			}else{
				profile.profilelist(req,res);
				
			}
			
		} else{
			console.log("Error:No record found for [ "+email+"]");
			res.render('login', {
				title : 'Login',
				error : "true",
				msg:"The email does not exist please register."
			});
		}
		 
	});
};


exports.profilelist = function(req, res) {
	res.render('profilelist', {
		title : 'Login'
	});	
};