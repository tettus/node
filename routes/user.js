
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var  db = require('./db');
 

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
				var phonenumber = req.param("phonenumber");
				var email = req.param("email");
				var password = req.param("password");

				var newuser = {
					"userid" : obj.value.userid,
					"fullname" : fullname,
					"phonenumber" : phonenumber,
					"email" : email,
					"password" : password
				};

				mongoInsert('user', newuser, function(user_res) {
					res.render('index', {
						title : 'Login'
					});					 
				});
			}
		});
};


exports.authenticate = function(req, res) {
	
	 
};
