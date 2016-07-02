/*
 * GET home page.
 */


var  email = require('./email');


function getHtml(req,res){	
		
}

exports.contactus = function(req, res){
  res.render('contactus', { title: 'Tettus' });
};

exports.sendMessage = function(req, res){
   
	var fullname= req.body.fullname;
	var emailto= req.body.emailto;
	var phonenumber= req.body.phonenumber;
	var body=req.body.message;
	
	var html= "<html><head></head><body> <div> <label><b>Phone number</b></label><span>"+phonenumber+"</span></div><div>"+body+"</div></body>";
		  
	
	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'noreply@imatri.in', // sender address
	    to: emailto, // list of receivers
	    subject: "Contact", // Subject line
	    text: body, // plaintext body
	    html: html // html body
	};
	
	email.sendmail(req,res,mailOptions);
	res.render('contactus', { title: 'Tettus' });
};



