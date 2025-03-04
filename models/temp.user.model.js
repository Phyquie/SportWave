import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip: { type: String, required: false },
    country: { type: String, required: false },
    otp: { type: String, required: true },
    expiresAt: { type: Date, default: Date.now() , expires: 300 },
}, { timestamps: true });

const TempUser = mongoose.models.TempUser || mongoose.model("TempUser", tempUserSchema);

export default TempUser;
