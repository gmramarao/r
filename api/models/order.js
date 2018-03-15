var mongoose = require('mongoose');
ItemSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    orders: {
        type: Array,
        required: true
    },
    confirmation: {
        type: String,
        required: true
    }
    
}),
module.exports = mongoose.model('order', ItemSchema);