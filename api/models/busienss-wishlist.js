var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

BusinessWishlistSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    business_id: {
        type: String,
        required: true
    },
    added_time: {
      type: String,
      required: true
    }
});

BusinessWishlist = module.exports = mongoose.model('BusinessWishlist', BusinessWishlistSchema);