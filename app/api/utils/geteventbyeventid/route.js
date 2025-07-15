import { NextResponse } from 'next/server';
import Event from '@/models/event.model';
import connectDB from '@/utils/db';
import jwt from "jsonwebtoken";
import User from '@/models/user.model';

export const runtime = 'nodejs'


export async function GET(req, request) {

    const searchParams = new URL(req.url).searchParams;
    const eventId = searchParams.get('eventId');

    const tokenCookie = req.cookies.get("token");
    const token = tokenCookie.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    try {
        await connectDB();
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        if (!eventId) {
            return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
        }

        const event = await Event.findById(eventId)
            .populate({
                path: 'players',
                select: 'name photo_url '
            })
            .populate({
                path: 'host',
                select: 'name photo_url'

            });
        return NextResponse.json({ event: event });


    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.json({ error: 'Internal Server Error bwahah' }, { status: 409 });
    }
}