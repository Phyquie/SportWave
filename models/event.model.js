import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    sport: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: false },
    image: { type: String, required: false },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    players: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: false },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;