function route(app)
{
    
var user  = require("./user");

user.route(app);

}


module.exports.route = route;


