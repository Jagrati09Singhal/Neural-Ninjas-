const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    aadhaar: {
        type: String,
        required: [true, 'Aadhaar number is required'],
        unique: true,
        trim: true,
        minlength: [12, 'Aadhaar number must be 12 digits'],
        maxlength: [12, 'Aadhaar number must be 12 digits'],
        match: [/^[0-9]{12}$/, 'Please enter a valid 12-digit Aadhaar number']
    },
    hasVoted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Add index for faster queries
userSchema.index({ email: 1, aadhaar: 1 });

// Add method to check if user has voted
userSchema.methods.checkVoteStatus = function() {
    return this.hasVoted;
};

// Add method to mark user as voted
userSchema.methods.markAsVoted = function() {
    this.hasVoted = true;
    return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User; 