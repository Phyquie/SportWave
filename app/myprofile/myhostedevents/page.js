'use client'
import React from 'react'
import { useCustomQuery } from '@/custom_hooks/customQuery'
import { useRouter } from 'next/navigation'






const page = () => {

    const router = useRouter();

    const { data: hostedEvents, isLoading, isError, error } = useCustomQuery('/api/user/myhostedevents')

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error: {error.message}</div>
    }
    // console.log('Hosted Events:', hostedEvents?.events_hosted);
    return (
        <div>

            {hostedEvents && hostedEvents.length > 0 ? (
                <div className='h-full bg-gray-100 py-8'>
                    <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8'>
                        <h1 className='text-2xl font-bold mb-6'>My Hosted Events</h1>
                        <div className='space-y-4'>
                            {hostedEvents.map((event) => (
                                <div key={event._id} className='flex border rounded-md' onClick={() => {
                                    router.push("/myprofile/myhostedevents/" + event._id)
                                }}>
                                    <div className='p-4'>
                                        <h2 className='text-xl font-semibold'>{event?.name}</h2>
                                        <p className='text-gray-600'>Date: {new Date(event?.date).toLocaleDateString()}</p>
                                        <p className='text-gray-600'>Location: {event?.location}</p>
                                        <p className='text-gray-600'>Sport: {event?.sport}</p>
                                        <p className='text-gray-600'>Seats: {event?.NoOfSeats}</p>
                                    </div>
                                    <div className='ml-auto flex items-center px-4'>
                                        <img src={event.image_urls[0]} alt={event.name} className='w-36 h-20 rounded-md object-cover ml-4' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            ) : (
                <div className='h-full bg-gray-100 py-8'>
                    <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8'>
                        <h1 className='text-2xl font-bold'>No Hosted Events Found</h1>
                        <p className='text-gray-600'>You have not hosted any events yet.</p>
                    </div>
                </div>
            )

            }

        </div>)
}

export default page