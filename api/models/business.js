var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
BusinessSchema = mongoose.Schema({
    business: {
        type: Object,
        required: true
    },
    vendor_id: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    coords:{
        type: Object,
        required: false,
    },
    created_date : {
        type: String,
        required: true
    },
    last_updated: {
        type: String,
        required: false
    },
    paused: {
        type: Boolean,
        required: false
    }
}),
Busniess = module.exports = mongoose.model('Business', BusinessSchema);