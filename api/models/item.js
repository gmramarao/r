var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
ItemSchema = mongoose.Schema({
    item_name: {
      type: String,
      required: true
    },
    item_data: {
        type: Object,
        required: false
    },
    item_price: {
        type: Number,
        required: true
    },
    item_quality: {
        type: String,
        required: true
    },
    item_img: {
        type: String,
        required: true
    },
    business_id: {
        type: String,
        required: true
    },
    vendor_id: {
        type: String,
        required: true
    },
    list_id: {
        type: String,
        required: false
    },
    created_date : {
        type: String,
        required: true
    },
    last_updated: {
        type: String,
        required: true
    },
    cart_status: {
        type: Boolean
    }
}),
Item = module.exports = mongoose.model('Item', ItemSchema);