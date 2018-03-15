var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
FeaturedBusinessesForHomeSchema = mongoose.Schema({
    business_id: {
      type: String,
      required: true
    },
    added_time: {
        type: String,
        required: true
    }
}),
FeaturedBusinessesForHome = module.exports = mongoose.model('FeaturedBusinessesForHome', FeaturedBusinessesForHomeSchema);