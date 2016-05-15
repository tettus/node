var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://tettu%40ymail.com:Hello1%40%40smtp.mail.yahoo.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'noreply@imatri.in', // sender address
    to: 'sudharsan_tk@yahoo.co.in,sudharsan.tk@gmail.com', // list of receivers
    subject: 'Hello ', // Subject line
    text: 'Hello world ', // plaintext body
    html: '<b>Hello world </b>' // html body
};

// send mail with defined transport object
module.exports.sendmail =function(req, res) {
/*	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	    return;
	});*/
};
	
	
	
	