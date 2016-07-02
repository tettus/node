var MongoClient = require('mongodb').MongoClient;

var state = {
  db: null,
};

exports.connect = function(url, done) {
  if (state.db){
	  return done();
  }

  MongoClient.connect(url, function(err, db) {
    if (err){
    	return done(err);
    }
    state.db = db;
    done();
  });
};

exports.get = function() {
  return state.db;
};

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};





/****
 * Insert User 
 */
module.exports.insertUser=function (collection_name, data, cb) {
	var collection = this.get().collection(collection_name);
	collection.insert(data, function(err, res) {
		if (err) {
			console.log(err);
		} else {
			// console.log('Inserted into the ' + collection_name + ' collection');
			cb(res);
		}
	});
};

/***
 *  Update current user profile in the session
 */
module.exports.updateUser=function (collection_name, req,callback) {
	
	var collection = this.get().collection(collection_name);

	var options ={"new":"true"};
	collection.findAndModify(
			{ "email" : req.session.user.email },
			{}, 
			{
				 $set: {
					 "fullname":req.body.fullname,
					 "dob" :req.body.dob,
					 "height":req.body.height,
					 "weight":req.body.weight,
					 "gender":req.body.gender,
					 "star":req.body.star,
					 "gothram":req.body.gothram,
					 "category":req.body.category,
					 "subcategory":req.body.subcategory,
					 "mother":req.body.mother,
					 "father":req.body.father,
					 "qualification":req.body.qualification,
					 "workingIn":req.body.workingIn,
					 "currentcity":req.body.currentcity,
					 "expectation":req.body.expectation,
					 "hidephonenumber":req.body.hidephonenumber,
					 "phonenumber":req.body.phonenumber,
					 "email":req.body.email
				}
			},
			options,
			function(err, doc) {	
				console.log(doc);
				return callback(err, doc);
	});
	 
};


