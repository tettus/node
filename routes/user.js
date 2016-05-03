
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://useru:useru4a0@ds045704.mlab.com:45704/tettu';

function mongoInsert(db, collection_name, data, cb) {
	var collection = db.collection(collection_name);
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
 * 
 */
function mongoInsert(db, collection_name, data, cb) {
	 
	var cursor =db.collection('restaurants').find( { "borough": "Manhattan" } );
	   cursor.each(function(err, doc) {
	      assert.equal(err, null);
	      if (doc != null) {
	         console.dir(doc);
	      } else {
	         callback();
	      }
	   });
}


/*
 * Generate user id for new registration
 */
function getNextSequenceValue(db, category, callback) {

	var collection = db.collection("userseq");

	collection.findAndModify({
		"category" : 1
	}, [], {
		"$inc" : {
			"userid" : 1
		}
	},

	function(err, doc) {
		console.log("Session: %j", doc);
		callback(err, doc);
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

	MongoClient.connect(url, function(err, db) {

		if (err) {
			console.log(err);
		} else {

			var userId = getNextSequenceValue(db, 0, function(err, obj) {
				 
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

					mongoInsert(db, 'user', newuser, function(user_res) {
						console.log(user_res);
						db.close();
					});
				}
			});

		}

		console.log('Disconnected from server successfully');
		res.render('index', {
			title : 'Login'
		});
	});

};


exports.authenticate = function(req, res) {
	
	MongoClient.connect(url, function(err, db) {

		if (err) {
			console.log(err);
		} else {

			var userId = getNextSequenceValue(db, 0, function(err, obj) {
				 
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

					mongoInsert(db, 'user', newuser, function(user_res) {
						console.log(user_res);
						db.close();
					});
				}
			});
		}
		console.log('Disconnected from server successfully');
		res.render('index', {
			title : 'Login'
		});
	});
	res.render('index', {
		title : 'Registration'
	});
};
