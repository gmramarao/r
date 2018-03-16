var mongoose = require('mongoose');
ItemSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String
    }
    
}),
module.exports = mongoose.model('rating', ItemSchema);