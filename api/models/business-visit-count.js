var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

BusinessVisitCountSchema = mongoose.Schema({
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
    },
});

BusinessVisitCountSchema = module.exports = mongoose.model('BusinessVisitCount', BusinessVisitCountSchema);