'use client'
import React, { useState, useEffect } from 'react'
import { useCustomMutation } from '@/custom_hooks/customMutation'
import { Montserrat } from 'next/font/google'
import { useStore } from '@/zustand/store'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'] })

// Dynamically import LocationPicker to avoid SSR issues
const LocationPicker = dynamic(() => import('@/app/components/LocationPicker'), {
    ssr: false,
    loading: () => <div className="w-full h-[500px] mt-5 bg-gray-100 rounded-2xl flex items-center justify-center animate-pulse">Loading map...</div>
})

const CreateEventPage = () => {
    const { user, location, pinCode, lat, lng } = useStore();
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
        lng: '',
        isActive: true

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

    const { mutate: createEvent, isPending } = useCustomMutation('/api/event/createevent', {
        onSuccess: (data) => {
            // Optionally, reset form or redirect
        },
        onError: (error) => {
            console.error('Error creating event:', error);
        },
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        console.log('Form Data:', formData)
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
        <div className={`min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-10 ${montserrat.className}`}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-10 border border-gray-200"
            >
                <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    🏟️ Create New Event
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Event Images */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Event Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 p-3 rounded-xl cursor-pointer hover:border-indigo-500 transition"
                        />
                        <p className="text-sm text-gray-500 mt-1">You can select multiple images</p>

                        {/* Display selected images */}
                        {formData.images.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Selected Images ({formData.images.length})</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {formData.images.map((image, index) => (
                                        <motion.div
                                            key={index}
                                            className="relative group rounded-xl overflow-hidden shadow-md"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <img src={image} alt={`Event image ${index + 1}`} className="w-full h-28 object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Event Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Event Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter event name"
                            required
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Is Active Toggle */}
                    <div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                name="isActive" 
                                checked={formData.isActive}
                                onChange={handleInputChange}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            <span className="ms-3 text-sm font-semibold text-gray-700">Is Active</span>
                        </label>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe your event"
                            required
                            rows={4}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Sport */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Sport *</label>
                        <select
                            name="sport"
                            value={formData.sport}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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

                    {/* Location Inputs */}
                    {[
                        { name: "location", label: "Location *", placeholder: "Event venue or location" },
                        { name: "detailedLocation", label: "Detailed Location", placeholder: "Nearby landmark" },
                        { name: "pin", label: "Pin Code *", placeholder: "Enter Pin Code" }
                    ].map((field, idx) => (
                        <div key={idx}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                            <input
                                type="text"
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                required={field.name === 'location' || field.name === 'pin'}
                                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>
                    ))}

                    <LocationPicker />

                    {/* Date + Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { name: "date", label: "Date *", type: "date" },
                            { name: "time", label: "Time *", type: "time" }
                        ].map((f, i) => (
                            <div key={i}>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{f.label}</label>
                                <input
                                    type={f.type}
                                    name={f.name}
                                    value={formData[f.name]}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Price + Seats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Optional)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Seats *</label>
                            <input
                                type="number"
                                name="NoOfSeats"
                                value={formData.NoOfSeats}
                                onChange={handleInputChange}
                                placeholder="Max participants"
                                min="1"
                                required
                                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        whileTap={{ scale: 0.95 }}
                        disabled={isPending}
                        className="w-full py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:opacity-90 disabled:opacity-60 transition"
                    >
                        {isPending ? "Creating Event..." : "🏟️ Create Event"}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}

export default CreateEventPage