import connectDB from "@/utils/db";
import TempUser from "@/models/temp.user.model";
import { NextResponse } from "next/server";
import User from "@/models/user.model";

export const POST = async (req) => {
    await connectDB();
    const { email, otp } = await req.json();
    const user = await TempUser.findOne({ email , otp});
    if(!user) {
        return NextResponse.json({ message: "Temporary User not found" }, { status: 400 });
    }
   if(user.otp !== otp) {
    return NextResponse.json({ message: "OTP is incorrect" }, { status: 400 });
   }
    
    const newUser = new User({ email, password: user.password, name: user.name });
    await newUser.save();
    await TempUser.deleteOne({ email, otp });
    return NextResponse.json({ message: "Permanent User created successfully" }, { status: 200 });
}