import connectDB from "@/utils/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { generateToken } from "@/utils/generatetoken";

export const POST = async (req) => {
    await connectDB();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if(!user) {
        return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
        return NextResponse.json({ message: "Invalid password" }, { status: 400 });
    }
    generateToken(user);
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
}   