import { NextResponse } from 'next/server';
import Event from '@/models/event.model';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request) {
    const { name, description, location, sport, date, time, price, images, players, host, NoOfSeats, isActive,pin  } = await request.json();
    if (
        !name ||
        !description ||
        !location ||
        !sport ||
        !date ||
        !time ||
        price === undefined ||
        !Array.isArray(images) || images.length === 0 ||
        !host ||
        NoOfSeats === undefined ||
        typeof isActive !== 'boolean' ||
        !pin
    ) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const image_urls = [];
    if (images) {
        for (const image of images) {
            const result = await cloudinary.uploader.upload(image);
            image_urls.push(result.secure_url);
        }
    }
    const event = await Event.create({ name, description, location, sport, date, time, price, image_urls: image_urls, players, host, NoOfSeats, isActive,pin });
    if (!event) {
        return NextResponse.json({ error: "Failed to create event" }, { status: 404 });
    }
    return NextResponse.json({ message: "Event created successfully", event: event }, { status: 200 });
}