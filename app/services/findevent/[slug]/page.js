'use client'
import React from 'react'
import { use } from 'react'
import { useCustomQuery } from '@/custom_hooks/customQuery';
import CustomImageSlider from '@/app/components/CustomImageSlider';
import { useCustomMutation } from '@/custom_hooks/customMutation';
import toast from 'react-hot-toast';
import ReadOnlyMap from '@/app/components/ReadOnlyMap';

const EventDetails = ({ params }) => {
  const slug = use(params).slug;

  const { data: eventData } = useCustomQuery(`/api/utils/geteventbyeventid?eventId=${slug}`)
  // console.log('Event Data:', eventData);

  const { mutate: bookEvent } = useCustomMutation('/api/utils/bookevents', {
    onSuccess: () => {
      toast.success('Event booked successfully!');
    },
    onError: (error) => {
      toast.error(`Error booking event: ${error.message}`);
    },
  });

  const handleBooking = () => {
    bookEvent({ eventUrl: slug })


  }


  //isKo theek krna hai isko ssr page bnana hai 

  return (
    <div className={`min-h-screen bg-gray-200 py-8 gap-2 flex flex-col`}>
      <div className=' w-3/4 mx-auto bg-white rounded-lg shadow-md p-8'>
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

        <ReadOnlyMap lat={eventData?.event?.lat} lng={eventData?.event?.lng} />

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
          <button className='bg-indigo-600 py-2 px-4 flex-grow rounded-xl text-white' onClick={handleBooking}> Book Now</button>
        </div>
      </div>
      <div className='w-3/4 mx-auto bg-white rounded-lg shadow-md p-8'>

        <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>Players Joined</h1>
        <div className='space-y-4'>
          {eventData?.event?.players && eventData.event.players.length > 0 ? (
            eventData.event.players.map((player) => (
              <div key={player._id} className=' flex justify-between items-center border rounded-md p-4'>
                <div className='flex items-center space-x-4'>
                  <img src={player.photo_url || '/default-profile.png'} alt={player.name} className='w-16 h-16 rounded-full mr-4' />
                  <div>
                    <h2 className='text-xl font-semibold'>{player.name}</h2>
                  </div>
                </div>
                <div className=''>
                  <button className='ml-auto bg-indigo-600 text-white px-4 py-2 rounded-xl'>View Profile</button>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>No players have joined this event yet.</p>
          )}
        </div>


      </div>


    </div>

  )
}

export default EventDetails;
