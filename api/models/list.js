var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
ListSchema = mongoose.Schema({
    list_name: {
      type: String,
      required: true
    },
    list: {
        type: Object,
        required: false
    },
    business_id: {
        type: String,
        required: true
    },
    vendor_id: {
        type: String,
        required: true
    },
    created_date : {
        type: String,
        required: true
      },
    last_updated: {
        type: String,
        required: true
    }
}),
List = module.exports = mongoose.model('List', ListSchema);