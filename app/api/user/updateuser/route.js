import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import connectDB from "@/utils/db";

export const POST = async (req) => {
    const { name, email, phone, city, state, zip, country } = await req.json();
    const tokenCookie = req.cookies.get("token");
    const token = tokenCookie.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.city = city;
    user.state = state;
    user.zip = zip;
    user.country = country;
    user.photo_url = photo_url;
    
    await user.save();
    return NextResponse.json({ message: "User updated successfully" });
}