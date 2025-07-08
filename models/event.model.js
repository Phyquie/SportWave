import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    sport: { type: String, required: true },
    pin: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: false },
    image_urls: {type:Array, required: false},
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    players: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: false },
    NoOfSeats:{type:Number , required: true },
    isActive:{type:Boolean , required: true , default: true}
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;