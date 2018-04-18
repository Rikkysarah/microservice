const   express           = require("express"),
        session           = require("express-session"),
        compress          = require("compression"),
        bodyParser        = require("body-parser"),
        cookieParser      = require("cookie-parser"),
        mongoose          = require("mongoose"),
        logger            = require("morgan"),
        config            = require('./config');
        const morgan = require('morgan');
        const router = express.Router();

    const app = express();
    app.enabled('trust proxy');
        
    app.use(logger('dev'));
    app.use(compress());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(bodyParser.json());
    app.use(cookieParser());      
        

    mongoose.Promise = config.mongoose.Promise;
    
    mongoose.connect(config.mongoose.connection)
        .then(() => {
            console.log('Connected to mongodb!');
        })
        .catch(err => {
            console.log(err);;                                                       
        });
  
/**
 * Routes *
 */
app.use('/', require('./app/routes/index'));

app.listen(config.port, () => {
    console.log('Express server listening on port ' + config.port);
    console.log('http://localhost:' + config.port);
});