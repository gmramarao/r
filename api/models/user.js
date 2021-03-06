var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: !0
    },
    mobile: {
        type: Number,
        required: !0
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: !0
    },
    registered_time: {
        type: String,
        required: true
    },
    last_login_time: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    dob: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
});

User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(a, b) {
    User.findById(a, b);
}; 
module.exports.getUserByEmail = function(a, b) {
    User.findOne({
        email: a
    }, b);
}; 
module.exports.getUserByMobile = function(a, b) {
    User.findOne({
        mobile: a
    }, b);
}; 
module.exports.addUser = function(a, b) {
    bcrypt.genSalt(10, function(c, d) {
        bcrypt.hash(a.password, d, function(e, f) {
            if (e) throw e;
            a.password = f, a.save(b);
        });
    });
}; 
module.exports.comparePassword = function(a, b, c) {
    bcrypt.compare(a, b, function(d, e) {
        c(null, e);
    });
};

module.exports.pwd_encrypt = function(pwd, callback){
    bcrypt.genSalt(10, function(err1, salt) {
        if(!err1){
            bcrypt.hash(pwd, salt, function(err2, hash) {
                if(!err2){
                    callback(null, hash);
                } else {
                    callback(err2, null);
                }
            })
        } else {
            callback(err1, null);
        }
        
    })
}