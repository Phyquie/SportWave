import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    sport: { type: String, required: true },
    pin: { type: String, required: true },
    location: { type: String, required: true },
    detailedLocation: { type: String, required: false },
    price: { type: Number, required: false },
    image_urls: { type: Array, required: false },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    players: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: false, default: [] },
    NoOfSeats: { type: Number, required: true },
    isActive: { type: Boolean, required: true, default: true },
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
    time: { type: Number, required: false },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;