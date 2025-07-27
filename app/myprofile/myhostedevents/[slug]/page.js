'use client'
import React, { useState, useEffect } from 'react'
import { useCustomMutation } from '@/custom_hooks/customMutation'
import { Montserrat } from 'next/font/google'
import { useStore } from '@/zustand/store'
import dynamic from 'next/dynamic'
import { useCustomQuery } from '@/custom_hooks/customQuery';
import { use } from 'react'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400'] })

// Dynamically import LocationPicker to avoid SSR issues
const LocationPicker = dynamic(() => import('@/app/components/LocationPicker'), {
    ssr: false,
    loading: () => <div className="w-full h-[500px] mt-5 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>
})




const EditEventPage = ({ params }) => {
    const { user, location, pinCode, lat, lng } = useStore();
    const slug = use(params).slug; // Assuming slug is passed as a prop or from the URL
    const { data: eventData } = useCustomQuery(`/api/utils/geteventbyeventid?eventId=${slug}`)
    console.log('Event Data:', eventData);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sport: '',
        location: '',
        date: '',
        time: '',
        price: '',
        NoOfSeats: '',
        images: [],
        pin: '',
        detailedLocation: '',
        lat: '',
        lng: ''

    })

    // Update form data when store values change
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            location: location || '',
            pin: pinCode || '',
            lat: lat || '',
            lng: lng || ''
        }))
    }, [location, pinCode])
    useEffect(() => {
        if (eventData?.event) {
            const event = eventData.event
            setFormData(prev => ({
                ...prev,
                name: event.name || '',
                description: event.description || '',
                sport: event.sport || '',
                location: event.location || '',
                date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
                time: event.date ? new Date(event.date).toISOString().split('T')[1]?.slice(0, 5) : '',
                price: event.price?.toString() || '',
                NoOfSeats: event.NoOfSeats?.toString() || '',
                images: event.image_urls || [],
                pin: event.pin || '',
                detailedLocation: event.detailedLocation || '',
                lat: event.lat || '',
                lng: event.lng || ''
            }))
        }
    }, [eventData])


    const { mutate: createEvent, isPending } = useCustomMutation('/api/event/createevent', {
        onSuccess: (data) => {
            // Optionally, reset form or redirect
        },
        onError: (error) => {
            console.error('Error creating event:', error);
        },
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)

        files.forEach(file => {
            if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, reader.result]
                    }))
                }
                reader.readAsDataURL(file)
            }
        })
    }

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Prepare the data for the API
        const eventData = {
            name: formData.name,
            description: formData.description,
            sport: formData.sport,
            location: formData.location,
            date: formData.date,
            time: formData.time,
            price: parseFloat(formData.price) || 0,
            NoOfSeats: parseInt(formData.NoOfSeats),
            images: formData.images,
            players: [],
            host: user._id,
            isActive: true,
            pin: formData.pin,
            detailedLocation: formData.detailedLocation,
            lat: lat,
            lng: lng
        }

        createEvent(eventData)

        // Reset form on success
        setFormData({
            name: '',
            description: '',
            sport: '',
            location: location || '',
            date: '',
            time: '',
            price: '',
            NoOfSeats: '',
            images: [],
            pin: pinCode || '',
            detailedLocation: ''
        })
    }

    return (
        <div className={`min-h-screen bg-gray-200 py-8 ${montserrat.className}`}>
            <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8'>
                <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>Edit Event</h1>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* Event Images */}
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Event Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className='w-full border-2 border-gray-300 p-3 rounded-md cursor-pointer hover:border-blue-500 transition-colors'
                        />
                        <p className='text-sm text-gray-500'>You can select multiple images</p>

                        {/* Display selected images */}
                        {formData.images.length > 0 && (
                            <div className='mt-4'>
                                <h3 className='text-sm font-medium text-gray-700 mb-2'>Selected Images ({formData.images.length})</h3>
                                <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                                    {formData.images.map((image, index) => (
                                        <div key={index} className='relative group'>
                                            <img
                                                src={image}
                                                alt={`Event image ${index + 1}`}
                                                className='w-full h-24 object-cover rounded-md border-2 border-gray-200'
                                            />
                                            <button
                                                type='button'
                                                onClick={() => removeImage(index)}
                                                className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100'
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Event Name */}
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Event Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder='Enter event name'
                            required
                            className='w-full border-2 border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer" name='isActive' onChange={handleInputChange} />
                            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Is Active</span>
                        </label>
                    </div>

                    {/* Description */}
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder='Describe your event'
                            required
                            rows={4}
                            className='w-full border-2 border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none resize-none'
                        />
                    </div>

                    {/* Sport */}
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Sport *</label>
                        <select
                            name="sport"
                            value={formData.sport}
                            onChange={handleInputChange}
                            className={`border-2 ${montserrat.className} w-full border-gray-300 p-2 rounded-md`}
                        >
                            <option value="">Select a sport</option>
                            <option value="cricket">Cricket</option>
                            <option value="football">Football</option>
                            <option value="basketball">Basketball</option>
                            <option value="tennis">Tennis</option>
                            <option value="badminton">Badminton</option>
                            <option value="baseball">Baseball</option>
                            <option value="hockey">Hockey</option>
                            <option value="golf">Golf</option>
                            <option value="rugby">Rugby</option>
                            <option value="swimming">Swimming</option>
                            <option value="volleyball">Volleyball</option>
                            <option value="table-tennis">Table Tennis</option>
                            <option value="boxing">Boxing</option>
                            <option value="wrestling">Wrestling</option>
                            <option value="cycling">Cycling</option>
                            <option value="skiing">Skiing</option>
                            <option value="snowboarding">Snowboarding</option>
                            <option value="surfing">Surfing</option>
                            <option value="karate">Karate</option>
                            <option value="judo">Judo</option>
                            <option value="fencing">Fencing</option>
                            <option value="archery">Archery</option>
                            <option value="gymnastics">Gymnastics</option>
                            <option value="equestrian">Equestrian</option>
                            <option value="rowing">Rowing</option>
                            <option value="sailing">Sailing</option>
                            <option value="triathlon">Triathlon</option>
                            <option value="weightlifting">Weightlifting</option>
                            <option value="handball">Handball</option>
                            <option value="softball">Softball</option>
                            <option value="cricket">Cricket</option>
                            <option value="field-hockey">Field Hockey</option>
                            <option value="polo">Polo</option>
                            <option value="darts">Darts</option>
                            <option value="snooker">Snooker</option>
                            <option value="billiards">Billiards</option>
                            <option value="bowling">Bowling</option>
                            <option value="skateboarding">Skateboarding</option>
                            <option value="bmx">BMX</option>
                            <option value="motorsport">Motorsport</option>
                            <option value="hiking">Hiking</option>
                            <option value="climbing">Climbing</option>
                            <option value="paragliding">Paragliding</option>
                            <option value="diving">Diving</option>


                        </select>
                    </div>

                    {/* Location */}
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Location *</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder='Event venue or location'
                            required
                            className='w-full border-2 border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none'
                        />
                        <LocationPicker />

                    </div>

                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Detailed Location(i.e Nearby landmark)</label>
                        <input
                            type="text"
                            name="detailedLocation"
                            value={formData.detailedLocation}
                            onChange={handleInputChange}
                            placeholder='Enter detailed location'
                            required
                            className='w-full border-2 border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Pin Code *</label>
                        <input
                            type="text"
                            name="pin"
                            value={formData.pin}
                            onChange={handleInputChange}
                            placeholder='Enter Pin Code'
                            required
                            className='w-full border-2 border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none'
                        />
                    </div>


                    {/* Date     and Time */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-700'>Date *</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                className='w-full border-2 border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none'
                            />
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-700'>Time *</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                                className='w-full border-2 border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none'
                            />
                        </div>
                    </div>

                    {/* Price and Number of Seats */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-700'>Price (Optional)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder='0.00'
                                min="0"
                                step="0.01"
                                className='w-full border-2 border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none'
                            />
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-700'>Number of Seats *</label>
                            <input
                                type="number"
                                name="NoOfSeats"
                                value={formData.NoOfSeats}
                                onChange={handleInputChange}
                                placeholder='Maximum participants'
                                required
                                min="1"
                                className='w-full border-2 border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none'
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={isPending}
                        className='w-full bg-blue-500 text-white p-3 rounded-md cursor-pointer hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-lg'
                    >
                        {isPending ? 'Editing Event...' : 'Edit Event'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditEventPage