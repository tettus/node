/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), contact = require('./routes/contact'), profile = require('./routes/profiles'), http = require('http'), path = require('path'), db = require('./routes/db'), session = require('client-sessions');
var errors=require('./routes/errorhandler.js');

var app = express();

var url = 'mongodb://useru:useru4a0@ds045704.mlab.com:45704/tettu';

/***
 * function to check if login required
 */
function requireLogin(req, res, next) {
	if (!req.user) {
		res.render('login',{error:"true",msg:"Please login before proceeding."});
	} else {
		next();
	}
};

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('images', __dirname + '/images');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());


app.use(express.cookieParser());
app.use(session({
	cookieName : 'session',
	secret : '1hf;!!@^$%^&^dadfasdfs',
	duration : 30 * 60 * 1000,
	activeDuration : 5 * 60 * 1000,
}));

app.use(function(req, res, next) {
	if (req.session && req.session.user) {
		db.get().collection("user").findOne({
			userid : req.session.user.userid
		}, function(err, user) {
			if (user) {
				req.user = user;
				delete req.user.password; // delete the password from the session
				req.session.user = user; //refresh the session value
				res.locals.user = user;
			}
			// finishing processing the middleware and run the route
			next();
		});
	} else {
		next();
	}
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.use(errors.logErrors);
app.use(errors.clientErrorHandler);
app.use(errors.errorHandler);

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/login', user.login);

app.get('/logout', function(req, res) {
	req.session.reset();
	res.redirect('/');
});

app.post('/authenticatelogin', user.authenticate);
app.get('/registration', user.registration);
app.post('/register', user.register);

app.post('/saveprofile', profile.save);

app.get('/profilelist', profile.profilelist);
app.get('/searchprofiles', profile.searchprofiles);

//temp
app.get('/myprofile', requireLogin, profile.myprofile);

app.get('/viewprofile/:id', requireLogin, profile.viewprofile);

app.get('/contactus', contact.contactus);



//Connect to Mongo on start
db.connect(url, function(err) {
	if (err) {
		console.log('Unable to connect to Mongo.');
		process.exit(1);
	}
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
