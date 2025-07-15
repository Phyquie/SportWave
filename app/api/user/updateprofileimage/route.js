import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import connectDB from "@/utils/db";
import { v2 as cloudinary } from 'cloudinary';

export const runtime = 'nodejs'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const POST = async (req) => {
    try {
        await connectDB();
        const { image } = await req.json();
        const photo = image;
        const tokenCookie = req.cookies.get("token");
        const token = tokenCookie.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const result = await cloudinary.uploader.upload(photo);
        user.photo_url = result.secure_url;
        await user.save();
        return NextResponse.json({ message: "Profile image updated successfully", user: user });
    } catch (error) {
        console.error("Error updating profile image:", error);
        return NextResponse.json({ message: "Error updating profile image", error: error.message }, { status: 500 });
    }
}