var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    VendorSchema = mongoose.Schema({
        name: {
            type: String,
            required: !0
        },
        email: {
            type: String,
            required: !0
        },
        mobile: {
            type: Number,
            required: !0
        },
        password: {
            type: String,
            required: !0
        },
        registered_time: {
            type: String,
            required: !0
        },
        last_login_time: {
            type: String,
            required: false
        },
        otp:{
            type: Number,
            required: false
        },
        address:{
            type: String,
            required: false
        }
    }),
Vendor = module.exports = mongoose.model('Vendor', VendorSchema);
module.exports.getUserById = function(a, b) {
    Vendor.findById(a, b)
}, module.exports.getVendorByEmail = function(a, b) {
    Vendor.findOne({
        email: a
    }, b)
}, module.exports.getVendorByMobile = function(a, b) {
    Vendor.findOne({
        mobile: a
    }, b)
}, module.exports.addVendor = function(a, b) {
    bcrypt.genSalt(10, function(c, d) {
        bcrypt.hash(a.password, d, function(e, f) {
            if (e) throw e;
            a.password = f, a.save(b)
        })
    })
}, module.exports.comparePassword = function(a, b, c) {
    bcrypt.compare(a, b, function(d, e) {
        c(null, e)
    })
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