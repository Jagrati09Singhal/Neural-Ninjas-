const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Vote = require('../models/Vote');

// Utility function to handle async route handlers
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * @route   POST /api/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', asyncHandler(async (req, res) => {
    const { name, email, aadhaar } = req.body;

    // Validate input
    if (!name || !email || !aadhaar) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ aadhaar });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'User already exists'
        });
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        aadhaar
    });

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            hasVoted: user.hasVoted
        }
    });
}));

/**
 * @route   POST /api/vote
 * @desc    Cast a vote
 * @access  Public
 */
router.post('/vote', asyncHandler(async (req, res) => {
    const { aadhaar, candidateId } = req.body;

    // Validate input
    if (!aadhaar || !candidateId) {
        return res.status(400).json({
            success: false,
            message: 'Please provide aadhaar and candidateId'
        });
    }

    // Find user
    const user = await User.findOne({ aadhaar });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    // Check if user has already voted
    if (user.hasVoted) {
        return res.status(400).json({
            success: false,
            message: 'User has already voted'
        });
    }

    // Create vote and update user in a transaction
    const session = await Vote.startSession();
    try {
        await session.withTransaction(async () => {
            // Create new vote
            await Vote.create([{
                voterId: user._id,
                candidateId
            }], { session });

            // Update user's vote status
            user.hasVoted = true;
            await user.save({ session });
        });

        await session.endSession();

        res.status(200).json({
            success: true,
            message: 'Vote cast successfully'
        });
    } catch (error) {
        await session.endSession();
        throw error;
    }
}));

/**
 * @route   GET /api/results
 * @desc    Get voting results
 * @access  Public
 */
router.get('/results', asyncHandler(async (req, res) => {
    // Get vote counts
    const results = await Vote.getVoteCounts();
    
    // Get total votes
    const totalVotes = await Vote.countDocuments();

    // Calculate percentages and format response
    const formattedResults = results.map(result => ({
        candidateId: result._id,
        votes: result.count,
        percentage: ((result.count / totalVotes) * 100).toFixed(2)
    }));

    res.status(200).json({
        success: true,
        data: {
            totalVotes,
            results: formattedResults
        }
    });
}));

/**
 * @route   POST /api/reset
 * @desc    Reset all votes (admin only)
 * @access  Public (for now)
 */
router.post('/reset', asyncHandler(async (req, res) => {
    const session = await Vote.startSession();
    try {
        await session.withTransaction(async () => {
            // Delete all votes
            await Vote.deleteMany({}, { session });

            // Reset all users' hasVoted status
            await User.updateMany(
                {},
                { hasVoted: false },
                { session }
            );
        });

        await session.endSession();

        res.status(200).json({
            success: true,
            message: 'All votes have been reset successfully'
        });
    } catch (error) {
        await session.endSession();
        throw error;
    }
}));

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = router; 