
/*
 * Image upload 
 */


var cloudinary = require('cloudinary');

cloudinary.config({ 
	  cloud_name: 'tettus', 
	  api_key: '661254856692892', 
	  api_secret: 'J3qPofSNPbjI3KPfqDD001yLbeU' 
});

module.exports.upload =function (req,res){
	
    var tmp_path = req.files.profilepic1.path;
	cloudinary.uploader.upload(tmp_path, function(result) { 
		  console.log(result) ;
    });
	
};