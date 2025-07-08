import { NextResponse } from 'next/server';
import Event from '@/models/event.model';
import connectDB from '@/utils/db';

export async function GET(request){

    const searchParams = request.nextUrl.searchParams;
    const sport = searchParams.get('sport');
    const location = searchParams.get('location');
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const price = searchParams.get('price');
    const NoOfSeats = searchParams.get('NoOfSeats');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');
    try{
        await connectDB();
        let events = await Event.find({
            
        });
        if(search){
            events = events.filter(event => event.name.toLowerCase().includes(search.toLowerCase()) || event.description.toLowerCase().includes(search.toLowerCase()) || event.location.toLowerCase().includes(search.toLowerCase()) || event.sport.toLowerCase().includes(search.toLowerCase()));
        }   
        if(price){
            events = events.filter(event => event.price <= price);
        }
        if(NoOfSeats){
            events = events.filter(event => event.NoOfSeats >= NoOfSeats);
        }
        if(isActive){
            events = events.filter(event => event.isActive === isActive);
        }
       return NextResponse.json({events});
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }
} 