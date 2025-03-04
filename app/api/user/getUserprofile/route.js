import connectDB from "@/utils/db";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    await connectDB();
    const { email } = await req.json();
    const user = await User.findOne({ email });
    return NextResponse.json({ user }, { status: 200 });
}