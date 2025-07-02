import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    comment: { type: String, required: false },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;