import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import connectDB from "@/utils/db";

export const runtime = 'nodejs'




export const POST = async (req) => {

    try {
        await connectDB();
        const { name, email, phone, city, state, zip, country, photo_url, sports, age, gender, height, weight, bio } = await req.json();
        // console.log(name, email, phone, city, state, zip, country, photo_url, sports, age, gender, height, weight, bio);
        const tokenCookie = req.cookies.get("token");
        const token = tokenCookie.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        user.name = name;
        user.email = email;
        user.phone = phone;
        user.city = city;
        user.state = state;
        user.zip = zip;
        user.country = country;
        user.photo_url = photo_url;
        user.sports = sports;
        user.age = age;
        user.gender = gender;
        user.height = height;
        user.weight = weight;
        user.bio = bio;
        // console.log(user);
        await user.save();
        return NextResponse.json({ message: "User updated successfully", user: user });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: "Error updating user", error: error.message }, { status: 500 });
    }
}