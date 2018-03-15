var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

BusinessVisitSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    user_ip: {
        type: String,
        required: true
    },
    business_id: {
      type: String,
      required: true
    },
    number_of_visits: {
      type: Number,
      required: true
    },
    last_visited_time: {
      type: String,
      required: false
    }
});

BusinessVisitSchema = module.exports = mongoose.model('BusinessVisit', BusinessVisitSchema);