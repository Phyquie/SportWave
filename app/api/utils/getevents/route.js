import { NextResponse } from 'next/server';
import Event from '@/models/event.model';
import connectDB from '@/utils/db';

export const runtime = 'nodejs'


export async function GET(request) {


    function getDistanceInKm(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    const searchParams = request.nextUrl.searchParams;
    const sport = searchParams.get('sport');
    const location = searchParams.get('location');
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const price = searchParams.get('price');
    const NoOfSeats = searchParams.get('NoOfSeats');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius') || 50; // Default radius is 50 km
    try {
        await connectDB();
        let events = await Event.find({

        });
        if (!lat || !lng) {
            return NextResponse.json({ error: 'Latitude and Longitude are required for location-based search' }, { status: 400 });
        }
        if (lat && lng) {
            events = events.filter(event => {
                const distance = getDistanceInKm(lat, lng, event.lat, event.lng);
                return distance <= radius // Filter events within 50 km
            });
        }
        if (search) {
            events = events.filter(event => event.name.toLowerCase().includes(search.toLowerCase()) || event.description.toLowerCase().includes(search.toLowerCase()) || event.location.toLowerCase().includes(search.toLowerCase()) || event.sport.toLowerCase().includes(search.toLowerCase()));
        }
        if (price) {
            events = events.filter(event => event.price <= price);
        }
        if (NoOfSeats) {
            events = events.filter(event => event.NoOfSeats >= NoOfSeats);
        }
        if (isActive) {
            events = events.filter(event => event.isActive === isActive);
        }
        if (sport) {
            events = events.filter(event => event.sport.toLowerCase().includes(sport.toLowerCase()));
        }
        if (location) {
            events = events.filter(event => event.location.toLowerCase().includes(location.toLowerCase()));
        }
        if (date) {
            events = events.filter(event => event.date === date);
        }
        if (time) {
            events = events.filter(event => event.time === time);
        }
        return NextResponse.json({ events });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 