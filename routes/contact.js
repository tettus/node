/*
 * GET home page.
 */


var  email = require('./email');


exports.contactus = function(req, res){
  res.render('contactus', { title: 'Tettus' });
};

exports.submitcontact = function(req, res){
    email.sendmail(req,res);
	res.render('contactus', { title: 'Tettus' });
};