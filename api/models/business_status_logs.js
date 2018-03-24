var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
BusinessStatusLogsSchema = mongoose.Schema({
    business_id: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    updated_date : {
        type: String,
        required: true
    }
}),
BusniessStatusLogs = module.exports = mongoose.model('BusinessStatusLogs', BusinessStatusLogsSchema);