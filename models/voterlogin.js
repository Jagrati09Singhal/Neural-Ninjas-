const mongoose = require('mongoose');

const voterLoginSchema = new mongoose.Schema({
    aadhaar: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    voterId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    loginTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('VoterLogin', voterLoginSchema);
