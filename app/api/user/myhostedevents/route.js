import { NextResponse } from 'next/server';
import Event from '@/models/event.model';
import connectDB from '@/utils/db';
import jwt from "jsonwebtoken";


export const GET = async (req) => {
    const eventId = req.body
    connectDB();
    try {
        const tokenCookie = req.cookies.get("token");
        const token = tokenCookie.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        if (!userId) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const events = await Event.find()
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