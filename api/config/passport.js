'use strict';
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('../models/user'),
    Admin = require('../models/admin'),
    Vendor = require('../models/vendor'),
    config = require('../config/database');
module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret; 
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        User.getUserById(jwt_payload.data._id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else {
                return done(null, false);
            }
        });

    }))
};