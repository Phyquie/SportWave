import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import connectDB from "@/utils/db";

export const GET = async (req) => {
    try {
        await connectDB();
        const tokenCookie = req.cookies.get("token");
        
        if (!tokenCookie || !tokenCookie.value) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        
        const token = tokenCookie.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password -google_id");
        
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        
        return NextResponse.json(user);
    } catch (error) {
        console.error("JWT verification error:", error);
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
}