var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

UserCartSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    last_updated: {
      type: String,
      required: false
    }
});

UserCart = module.exports = mongoose.model('UserCart', UserCartSchema);