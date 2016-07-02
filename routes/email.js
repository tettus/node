var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://imatriorg@gmail.com:Varadabless2@smtp.gmail.com');

// send mail with defined transport object
module.exports.sendmail =function(req, res,options) {
	
	transporter.sendMail(options, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	    return;
	});
};
	
	
	
	