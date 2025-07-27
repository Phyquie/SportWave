'use client'
import React from 'react'
import { useCustomQuery } from '@/custom_hooks/customQuery'
import { MapLink } from '@/app/components/GetDirection'

const page = () => {

    const { data: bookedEvents, isLoading, isError, error } = useCustomQuery('/api/user/mybookedevents')
    // console.log('Booked Events:', bookedEvents?.events_booked);

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className='h-full  bg-gray-100 py-8'>
            {
                bookedEvents?.events_booked && bookedEvents.events_booked.length > 0 ? (
                    <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8'>
                        <h1 className='text-2xl font-bold mb-6'>My Booked Events</h1>
                        <div className='space-y-4'>
                            {bookedEvents.events_booked.map((event) => (

                                <div key={event._id} className=' flex border rounded-md'>
                                    <div className='p-4'>
                                        <h2 className='text-xl font-semibold'>{event.name}</h2>
                                        <p className='text-gray-600'>Date: {new Date(event.date).toLocaleDateString()}</p>
                                        <p className='text-gray-600'>Location: {event.location}</p>
                                        <MapLink lat={event?.lat} lng={event?.lng} />

                                    </div>
                                    <div className=' ml-auto flex items-center px-4'>
                                        <img src={event.image_urls[0]} alt={event.name} className='w-36 h-20 rounded-md object-cover ml-4' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8'>
                        <h1 className='text-2xl font-bold'>No Booked Events Found</h1>
                    </div>
                )
            }
        </div>
    )
}

export default page