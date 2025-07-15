import mongoose from "mongoose";


const playerReviewSchema = new mongoose.Schema({
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    gameType: {
        type: String,
        enum: ['Football', 'Basketball', 'Cricket', 'Volleyball', 'Other'],
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true,
    },
    stats: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    reviewText: {
        type: String,
        maxlength: 1000,
    },
    playerBehavior: {
        type: String,
        enum: ['Professional', 'Friendly', 'Competitive', 'Casual'],
        required: true,
    },
});

const PlayerReview = moongoose.models.PlayerReview || moongoose.model("PlayerReview", playerReviewSchema);