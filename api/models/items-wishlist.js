var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

ItemsWishlistSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    Item_id: {
        type: String,
        required: true
    },
    added_time: {
      type: String,
      required: true
    }
});

ItemsWishlist = module.exports = mongoose.model('ItemsWishlist', ItemsWishlistSchema);