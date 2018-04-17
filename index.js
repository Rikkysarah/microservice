var express           = require("express"),
    methodOverride    = require("method-override"),
    compress          = require("compression"),
    bodyParser        = require("body-parser"),
    User              = require('./model/user/user-db.js'),
    cookieParser      = require("cookie-parser"),
    logger            = require("morgan");
const    config       = require('./config');
const http            = require('http');
    // bcrypt            = require('bcrypt')
var app = express(router);

var router = require('./controllers/router.js');


app.enabled('trust proxy');

//  Use all the following middlewares before calling the home page.
app.use(logger('dev'));
app.use(compress());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: "Hey",
    resave: false,
    saveUninitialized: false
}));

app.get("/", function (req, res) {
    res.json({status:200,info:"welcome"})
})

router.route(app);



var mongoose            = require('mongoose');

mongoose.Promise = config.mongoose.Promise;

mongoose.connect(config.mongoose.connection, {useMongoClient: true})
.then(() => {
  console.log('Connected to mongodb!');
})
.catch(err => {
  console.log(err.message, err.name);                                                       
});



const server = http.createServer(app);


server.listen(config.port, () => {
    console.log('Awesome job, you have successfully hit the database !!!!');
    console.log(`Express server listening on port => ${config.port}`);
    console.log(`http://localhost:${config.port}`);
});


 

// // This allows you use the route funtions in the controller by exporting express to the route files using app.
// router.route(app);
// console.log("server started at " + port);




