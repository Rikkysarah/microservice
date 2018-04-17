// var db = global.db;
var mongoose = require("mongoose");
    bcrypt = require('bcryptjs');


// MONGOOSE MODEL CONFIGURATION
const UserSchema = new mongoose.Schema({
    
    phone: {
        type: String,
        required: [true, 'Please enter a phone number'],
        unique: true,
        maxlength: 11,
        minlength: 11
    },
    firstName: {
        type: String,
        required: [true, 'Please enter your firstname']
    },
    lastName: {
        type: String,
        required: [true, 'Please add your last name']
    },
    password: {
        type: String,
        minlength:6
    },
         
    email: {type: String, unique: true, required: true},
    meta: {
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now},
    }     

   
});


    UserSchema.pre('save', function(next){
        var user = this;
        bcrypt.hash(user.password, 10, function(err, hash){
            if(err){
                return next(err);
            }
            user.password= hash;
            next()
        })
    })

    UserSchema.statics.isEmailUnique = function (email) {
        return new Promise((resolve, reject) => {
            this.findOne({$or: [
                {email: req.body.email},
                {username: req.body.email}
            ]}).exec((err, user) => {
                    if (user) reject();
                    else resolve();
                });
        });
    
    };
    
    
    // UserSchema.statics.authenticate = function (phone, password, callback){
    //     User.findOne({ phone: phone}).exec(function (err, user){
    //         if(err){
    //             return callback(err)
    //         }else if(!user){
    //             var err = new Error('User not found');
    //             err.status = 401;
    //             return callback(err);
    //         }
    //         bcrypt.compare(password, user.password, function(err, result){
    //             if (result === true){
    //                 return callback(null, user);
    //             }
    //             else{
    //                 return callback()
    //             }
                
    //         })
    //     })
    // }

    // UserSchema.statics.authenticateWithOtp = function ( otp, callback){
    //     User.findOne({resetPasswordToken: otp}).exec(function (err, user){
    //         if(err){
    //             return callback(err)
    //         }else if(!user){
    //             var err = new Error('User not found');
    //             err.status = 401;
    //             return callback(err);
    //         }
    //         if(user.resetPasswordExpires >= Date.now()){
    //             return callback(null, user);
    //         }else{
    //             var err = new Error('OTP Expired');
    //             err.status = 401;
    //             return callback(err);
    //         }
                
           
    //     })
    // }
    

module.exports = mongoose.model('User', UserSchema);
