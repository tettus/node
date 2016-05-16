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

module.exports.mongoInsert=function (collection_name, data, cb) {
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
 * 
 */
module.exports.update=function mongoInsert(collection_name, req,callback) {
	
	var collection = this.get().collection(collection_name);
	console.log(" updating "+req.user._id);
	collection.findAndModify(
			 { "_id" : req.user._id },
			[], 
			{
				 $set: {
		    	     "userid":req.user.userid,
					 "dob" :req.param("dob"),
					 "height":req.param("height"),
					 "weight":req.param("weight"),
					 "gender":req.param("gender")
				}
			},

			function(err, doc) {
				console.log(" after update document"+doc);
				return callback(err, doc);
	});
	 
};


