import { NextResponse } from 'next/server';
import User from '@/models/user.model';
import Event from '@/models/event.model';
import connectDB from '@/utils/db';
import jwt from "jsonwebtoken";

export const runtime = 'nodejs'



export const POST = async (req) => {
    try {
        await connectDB();
        const { eventUrl } = await req.json();
        const tokenCookie = req.cookies.get("token");
        const token = tokenCookie.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        const event = await Event.findById(eventUrl);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }
        await User.findByIdAndUpdate(decoded.id, {
            $addToSet: { events_booked: eventUrl }
        })
        await Event.findOneAndUpdate(
            { _id: eventUrl },
            { $addToSet: { players: user._id } }
        );
        return NextResponse.json({ message: "Event booked successfully", user: user, event: event });
    }
    catch (error) {
        console.error("Error updating profile image:", error);
        return NextResponse.json({ message: "Error in Booking route", error: error.message }, { status: 500 });
    }
} 