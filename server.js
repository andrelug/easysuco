var newrelic = require('newrelic');
var express = require('express')
    , http = require('http')
    , mongoose = require('mongoose')
    , passport = require('passport')
    , flash = require('connect-flash')
    , session = require('express-session')
    , configDB = require('./config/database.js')
    , MongoStore = require('connect-mongo')(session)
    , multer = require('multer')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , cookieParser = require('cookie-parser')
    , cookieSession = require('cookie-session')
    , errorHandler = require('errorhandler')
    , responseTime = require('response-time')
    , morgan = require('morgan')
    , path = require('path');

var app = express();

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

var bonsaitssessions = mongoose.createConnection(configDB.url2);

require('./config/passport')(passport); // pass passport for configuration

process.env.TMPDIR = './public/tmp';

    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(methodOverride());
    app.use(session({ resave: true, saveUninitialized: true, store: new MongoStore({
        mongoose_connection: bonsaitssessions
    }), secret: 'blablabladfkdaskldsfblkablafdsa34', cookie: { maxAge: 518400000 }
    })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(require('stylus').middleware(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public'), {maxAge: 86400000}));

    app.enable('trust proxy');
    
    var multer = require('multer');
    app.use(multer({ dest: './public/tmp/'}));

var env = process.env.NODE_ENV || 'development';

if ('development' == env) {
   app.use(errorHandler());
}

// New Relic
app.locals.newrelic = newrelic;

// routes ======================================================================
require('./app/routes.js')(app, passport, mongoose); // load our routes and pass in our app and fully configured passport

app.use(function(req, res) {
    res.status(400);
    res.render('404', {title: '404: File Not Found'});
});
app.use(function(error, req, res, next) {
    res.status(500);
    res.render('500', {title:'500: Internal Server Error', error: error});
});

app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
