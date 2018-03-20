var mongoose = require('mongoose');
ItemSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    business_id: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
        required: true
    },
    confirmation: {
        type: String,
        required: true
    }
    
}),
module.exports = mongoose.model('custom_order', ItemSchema);