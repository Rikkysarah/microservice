const { cleanMongoError, polishData } = require("../utils/sanitizers");
var User   = require("../model/user/user-db.js");
    bcrypt = require('bcryptjs');
    crypto = require('crypto');
    mongoose = require('mongoose');
    jwt = require('jsonwebtoken');
    config = require('../config');


function route(app) {

    app.post("/register/user", function (req, res) {
        var token = crypto.randomBytes(3).toString('hex')
        var tokenExpires = Date.now() + 300000// 5 minutes
        var form = {
           
            phone:      req.body.phone,
            firstName:  req.body.firstName,
            lastName:   req.body.lastName,
            email:      req.body.email,
            password:   req.body.password,
            token,
            tokenExpires
        }
        
        var User   = require("../model/user/user-db.js");
        //Validate form
        let unsatisified_data = [];
        if(form.phone.length < 10 || form.phone.length > 11)
        unsatisified_data.push( ["phone", "Invalid phone number length"]);
        if(form.firstName.length < 2 || form.firstName.length > 15)
        unsatisified_data.push( ["firstName", "Name too short(<2) or too long(>15)"]);
        if(form.lastName.length < 2 || form.lastName.length > 15)
        unsatisified_data.push( ["lastName", "Name too short(<2) or too long(>15)"]);
        //   if(form.password.length < 6 || form.password.length > 16)
        //       unsatisified_data.push( ["password", "Password too short(<6) or too long(>16)"]);
        if((function(){ return false; })()) 
        unsatisified_data.push( ["email", "Invalid email"]);
        
        if(unsatisified_data.length > 0){
            res.json({
                status:             400,
                message:            "Data constraints not satisfied",
                unsatisified_data:  unsatisified_data
            });
        } else {
            User.isEmailUnique(email)
        .then(
            () => user.save(),
            () => {
                res.json({success: false, message: config.messages.EMAIL_NOT_UNIQUE})
            }
        )
        .then(() => {
            res.json({success: true});
        })
        .catch(error => {
            // utils.error(error);
            res.json({success: false})
        });
  
      }
  });

    //=============================================================================================
    // Stunts
    //=============================================================================================

    app.get("/register/user", function(req, res) {
        user.find({}, function (err, data){
            if (err) {
                console.log("error!")
                res.json({ 
                    status: 404,
                    message: "Infomation not found", 
                    err: err 
                });
            } else {
                res.json({ 
                    status: 200,
                    message: "welcome guys",
                    data: data
                });
            }
        })
    })

  
    app.post('/login/user', function (req, res, next) {
        if (req.body.email && req.body.password) {
            User.findOne({email, password}, {password: 0})
            .exec()
            .then(user => {
                if (user) {
                    user = JSON.parse(JSON.stringify(user));
                    jwt.sign(user, config.jwt.secret, config.jwt.options, (err, token) => {
                        res.json({
                            success: true,
                            user,
                            token,
                        });
                    });
                } else {
                    res.json({success: false, message: config.messages.INVALID_CREDENTIALS});
                }
            })
            .catch(error => {
                //utils.error(error);
                res.json({success: false});
            });
        };
    });
}
    
    

    

module.exports.route = route;