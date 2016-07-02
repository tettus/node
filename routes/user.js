
 
//var assert = require('assert');

var  db = require('./db')
    ,profile= require('./profiles')
    ,mail = require('./email')
    ,index= require('./index');



function getWelcomeEmail(user,callback){
	
	var html="Welcome <b><span style='color:blue'>"+user.fullname+" ! </span> </b>,"
					+"<p>Thank you for registering with us.We wish you find your soul mate soon.." +
							"<p>Please feel free to ask any queries"
					+" or any feedback/suggetions so that we can improve the website and make"
					+" this a better experience."
	
					callback(html);
				
}


/*
 * Generate user id for new registration
 */
function getNextSequenceValue(category, callback) {

	var collection = db.get().collection("userseq");
	collection.findAndModify(
			{"category" : 1}, 
			[], 
			{"$inc" : {"userid" : 1}},

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
exports.register = function(req, res,next) {
	 
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
								"userid" : obj.value.userid+'',
								"fullname" : fullname,
								"phonenumber" : phonenumber,
								"email" : email,
								"password" : password,
								"status" : index.STATUS_IN_VERIFICATION,
								"dob" :"",
								"height":"",
								"weight":"",
								"gender":""
							};

							db.insertUser('user', newuser, function(user_res) {
								
								// sets a cookie with the user's info
						        req.session.user = newuser;
						        //delete user pwd from session
						        delete req.session.user.password;	
								 
								
								var content=getWelcomeEmail(newuser,function(content){
									// setup e-mail data with unicode symbols
									var mailOptions = {
									    from: 'imatriorg@gmail.com', // sender address
									    to: email, // list of receivers
									    subject: "Welcome to iMatriorg", // Subject line
									    text: content, // plaintext body
									    html: content // html body
									};
									
									//send registration email
									mail.sendmail(req,res,mailOptions);
									
								}); 
								
								
								
								res.render('myprofile', {
									title : 'Profile page',
									user: newuser
								});					 
							});
						  
					  }
					}else{
						 return next(err);
					}
				});

			}
		});
};



/***
 * authenticate after login
 */
exports.authenticate = function(req, res) {
	
	var email = req.param("email");
	var password = req.param("password");
	
	db.get().collection("user").findOne({"email":email}, function(err, user) {
		
		if(err){
			res.render('login', {
				title : 'Login',
				error :  "true",
				msg:"Unable to get details please try later."
			});
		}
		
		 if (!user) {
		      res.render('login', {title:"Login",error :  "true", msg: 'Invalid email or password.' });
		    } else {
		      if (req.body.password === user.password) {
		        // sets a cookie with the user's info
		        req.session.user = user;
		        //delete user pwd from session
		        delete req.session.user.password;		        
		        res.redirect('/profilelist');
		      } else {
		        res.render('login', {title:"Login",error :  "true", msg: 'Invalid email or password.' });
		      }
		    }
		 
	});
};


exports.profilelist = function(req, res) {
	res.render('profilelist', {
		title : 'Login'
	});	
};