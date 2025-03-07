import { NextResponse } from 'next/server';
import Event from '@/models/event.model';

export async function POST(request) {
    const { name, description, location, sport, date, time ,price ,image,players} = await request.json();
    const event = await Event.create({ name, description, location, sport, date, time ,price ,image,players});
    return NextResponse.json(event, { status: 200 });
}