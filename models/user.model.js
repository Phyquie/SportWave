import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    google_id: { type: String, required: false, unique: true , sparse:true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: function() { return !this.google_id; } },
    name: { type: String, required: true },
    phone: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip: { type: String, required: false },
    country: { type: String, required: false },
    photo_url: { type: String, required: false },
    rating:{type:mongoose.Schema.Types.ObjectId, ref: 'Rating', required: false},
    events_hosted:{type:mongoose.Schema.Types.ObjectId, ref: 'Event', required: false},
    total_events_hosted:{type:Number, required: false},
    total_rating:{type:Number, required: false},
    Avg_rating:{type:Number, required: false},
    
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
