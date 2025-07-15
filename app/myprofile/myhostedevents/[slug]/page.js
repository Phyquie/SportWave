'use client'
import React from 'react'
import { use } from 'react'
import { useCustomQuery } from '@/custom_hooks/customQuery';
import CustomImageSlider from '@/app/components/CustomImageSlider';
import { useCustomMutation } from '@/custom_hooks/customMutation';

const EventDetails = ({ params }) => {
    const slug = use(params).slug;

    const { data: eventData, isLoading, isError, error } = useCustomQuery(`/api/utils/geteventbyeventid?eventId=${slug}`)
    console.log('Event Data:', eventData);

    const { mutate: bookEvent, isLoading: isBooking } = useCustomMutation('/api/utils/bookevents')

    const handleBooking = () => {
        bookEvent({ eventUrl: slug })
    }


    //isKo theek krna hai isko ssr page bnana hai 

    return (
        <div className={`min-h-screen bg-gray-200 py-8`}>
            <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8'>
                <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>Event Details</h1>

                {/* 
        {eventData?.image_urls && eventData.image_urls?.length > 0 && (
          <div className='space-y-2'>
            <h2 className='text-lg font-medium text-gray-700'>Event Images</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
              {eventData.image_urls.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Event image ${index + 1}`}
                  className='w-full h-24 object-cover rounded-md border-2 border-gray-200'
                />
              ))}
            </div>
          </div>
        )} */}

                <CustomImageSlider images={eventData?.event?.image_urls} />


                <div className='space-y-2 mt-4'>
                    <h2 className='text-sm font-medium text-gray-700'>Event Name</h2>
                    <p className='p-2 bg-gray-100 rounded-md'>{eventData?.event?.name}</p>
                </div>

                {/* Is Active */}
                {/* <div className='space-y-2 mt-4'>
          <h2 className='text-sm font-medium text-gray-700'>Active Status</h2>
          <p className={`inline-block px-3 py-1 rounded-full text-white ${eventData?.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
            {eventData.isActive ? 'Active' : 'Inactive'}
          </p>
        </div> */}

                {/* Description */}
                <div className='space-y-2 mt-4'>
                    <h2 className='text-sm font-medium text-gray-700'>Description</h2>
                    <p className='bg-gray-100 p-3 rounded-md whitespace-pre-line'>{eventData?.event?.description}</p>
                </div>

                {/* Sport */}
                <div className='space-y-2 mt-4'>
                    <h2 className='text-sm font-medium text-gray-700'>Sport</h2>
                    <p className='p-2 bg-gray-100 rounded-md capitalize'>{eventData?.event?.sport}</p>
                </div>

                {/* Location */}
                <div className='space-y-2 mt-4'>
                    <h2 className='text-sm font-medium text-gray-700'>Location</h2>
                    <p className='p-2 bg-gray-100 rounded-md'>{eventData?.event?.location}</p>
                </div>

                <div className='space-y-2 mt-4'>
                    <h2 className='text-sm font-medium text-gray-700'>Detailed Location</h2>
                    <p className='p-2 bg-gray-100 rounded-md'>{eventData?.event?.detailedLocation}</p>
                </div>

                <div className='space-y-2 mt-4'>
                    <h2 className='text-sm font-medium text-gray-700'>Pin Code</h2>
                    <p className='p-2 bg-gray-100 rounded-md'>{eventData?.event?.pin}</p>
                </div>

                {/* Date and Time */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                    <div className='space-y-2'>
                        <h2 className='text-sm font-medium text-gray-700'>Date</h2>
                        <p className='p-2 bg-gray-100 rounded-md'>{eventData?.event?.date}</p>
                    </div>
                    <div className='space-y-2'>
                        <h2 className='text-sm font-medium text-gray-700'>Time</h2>
                        <p className='p-2 bg-gray-100 rounded-md'>{eventData?.event?.time}</p>
                    </div>
                </div>

                {/* Price and Seats */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                    <div className='space-y-2'>
                        <h2 className='text-sm font-medium text-gray-700'>Price</h2>
                        <p className='p-2 bg-gray-100 rounded-md'>{eventData?.event?.price || 'Free'}</p>
                    </div>
                    <div className='space-y-2'>
                        <h2 className='text-sm font-medium text-gray-700'>Seats</h2>
                        <p className='p-2 bg-gray-100 rounded-md'>{eventData?.event?.NoOfSeats}</p>
                    </div>
                </div>
                <div className='mt-8 flex justify-center'>
                    <button className='bg-indigo-600 py-2 px-4 flex-grow rounded-xl text-white' onClick={handleBooking}>{isBooking ? "Booking..." : "Edit"}</button>
                </div>
            </div>
        </div>
    )
}

export default EventDetails;
