const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    aadhaarId: {
        type: String,
        required: true,
        unique: true // Ensures one vote per Aadhaar
    },
    candidateId: {
        type: String,
        required: true
    },
    candidateName: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Index for faster lookups
voteSchema.index({ aadhaarId: 1 });

// Add a method to check if user has already voted
voteSchema.statics.hasVoted = async function(aadhaarId) {
    const vote = await this.findOne({ aadhaarId });
    return !!vote;
};

module.exports = mongoose.model('Vote', voteSchema); 