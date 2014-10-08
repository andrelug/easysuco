var newrelic = require('newrelic');
var express = require('express')
    , http = require('http')
    , mongoose = require('mongoose')
    , passport = require('passport')
    , flash = require('connect-flash')
    , configDB = require('./config/database.js')
    , MongoStore = require('connect-mongo')(express)
    , path = require('path');

var app = express();

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

var bonsaitssessions = mongoose.createConnection(configDB.url2);

require('./config/passport')(passport); // pass passport for configuration

process.env.TMPDIR = './public/tmp';

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser({ keepExtensions: true, uploadDir: "uploads" }));
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(express.session({ store: new MongoStore({
        mongoose_connection: bonsaitssessions
    }), secret: 'blablabladfkdaskldsfblkablafdsa34', cookie: { maxAge: 518400000 }
    })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(app.router);
    app.use(require('stylus').middleware(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public'), {maxAge: 86400000}));
    app.use(function(req, res) {
     res.status(400);
     res.render('404', {title: '404: File Not Found'});
     });
     app.use(function(error, req, res, next) {
     res.status(500);
     res.render('500', {title:'500: Internal Server Error', error: error});
     });
    app.enable('trust proxy');
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

// New Relic
app.locals.newrelic = newrelic;

// routes ======================================================================
require('./app/routes.js')(app, passport, mongoose); // load our routes and pass in our app and fully configured passport

app.use(function (error, req, res, next) {
    res.status(500);
    res.render('500.jade', {title: '500: Internal Server Error', error: error});
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
