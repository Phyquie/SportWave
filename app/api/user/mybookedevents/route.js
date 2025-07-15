import { NextResponse } from 'next/server';
import Event from '@/models/event.model';
import connectDB from '@/utils/db';
import User from '@/models/user.model';
import jwt from "jsonwebtoken";


export const GET = async (req) => {
    connectDB();
    try {
        const tokenCookie = req.cookies.get("token");
        const token = tokenCookie.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const events = await User.findById(userId)
            .populate('events_booked')
            .select('events_booked')
        if (events.length === 0) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }
        return NextResponse.json(events);


    }
    catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}