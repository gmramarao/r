var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
BusinessOrderSchema = mongoose.Schema({
    order: {
      type: Object,
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
    user_id: {
        type: String,
        required: true
    },
    ordered_time: {
        type: String,
        required: true
    }
}),
BusinessOrder = module.exports = mongoose.model('BusinessOrder', BusinessOrderSchema);