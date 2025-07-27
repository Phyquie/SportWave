'use client'
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCustomQuery } from '@/custom_hooks/customQuery'
import { useCustomMutation } from '@/custom_hooks/customMutation'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400'] })

const page = () => {
    const { data: user, isLoading, error } = useCustomQuery('/api/user/viewuserbytoken');
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        sports: [],
        age: '',
        gender: '',
        height: '',
        weight: '',
        bio: ''
    })

    const [selectedSport, setSelectedSport] = useState('')
    const [img, setImg] = useState(null);
    // Update form data when user data loads
    React.useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                city: user.city || '',
                state: user.state || '',
                zip: user.zip || '',
                country: user.country || '',
                photo_url: user.photo_url || '',
                sports: user.sports || [],
                age: user.age || '',
                gender: user.gender || '',
                height: user.height || '',
                weight: user.weight || '',
                bio: user.bio || ''
            })
        }
    }, [user])

    const updateUserMutation = useCustomMutation('/api/user/updateuser', {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            queryClient.invalidateQueries({ queryKey: ['userdetails'] })
        },
        onError: (error) => {
            console.error('Error updating user:', error);
        },
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const updateImageMutation = useCustomMutation('/api/user/updateprofileimage')

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
        updateImageMutation.mutate({ image: img })
        queryClient.invalidateQueries({ queryKey: ['user'] })
        queryClient.invalidateQueries({ queryKey: ['userdetails'] })
        setImg(null);
        e.target.value = null;
    }

    const handleSportSelect = (e) => {
        setSelectedSport(e.target.value)
    }

    const handleAddSport = () => {
        if (selectedSport && !formData.sports.includes(selectedSport)) {
            setFormData(prev => ({
                ...prev,
                sports: [...prev.sports, selectedSport]
            }))
            setSelectedSport('')
        }
    }

    const handleRemoveSport = (sportToRemove) => {
        setFormData(prev => ({
            ...prev,
            sports: prev.sports.filter(sport => sport !== sportToRemove)
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateUserMutation.mutate(formData)
    }



    return (
        <div className='flex justify-center bg-gray-200 items-center h-screen w-screen'>
            <div className='flex shadow-lg flex-row justify-center items-center gap-2 bg-white h-[80%] w-[80%]  rounded-xl p-4'>
                <div className='flex flex-col justify-center items-center h-full rounded-xl gap-2 w-1/2 border-2 border-gray-300'>
                    <h1 className={`text-2xl font-bold ${montserrat.className}`}>Edit Profile</h1>
                    <img src={user?.photo_url} alt="profile" className='w-64 h-64 rounded-full border-gray-500 border-8'
                        style={{
                            borderRadius: '100%',
                            border: '5px solid white'
                        }} />
                    <input type="file" accept="image/*" id="file-upload" onChange={handleImageUpload} className={`bg-blue-500 text-white p-2 rounded-md cursor-pointer ${montserrat.className} hover:bg-blue-600 hidden`} />
                    <label
                        htmlFor="file-upload"
                        className={`bg-blue-500 text-white p-2 rounded-md cursor-pointer mt-4 ${montserrat.className} hover:bg-blue-600`}
                    >
                        📷 Upload Profile Image
                    </label>
                </div>
                <form onSubmit={handleSubmit} className='w-1/2 flex flex-col justify-center items-center'>
                    <div className=' gap-2 grid grid-cols-2 w-full p-4'>
                        <input
                            type="text"
                            name="name"
                            placeholder='Name'
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder='Phone'
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder='City'
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder='State'
                            value={formData.state}
                            onChange={handleInputChange}
                            className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
                        />
                        <input
                            type="text"
                            name="zip"
                            placeholder='Zip'
                            value={formData.zip}
                            onChange={handleInputChange}
                            className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder='Country'
                            value={formData.country}
                            onChange={handleInputChange}
                            className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder='Age'
                            value={formData.age}
                            onChange={handleInputChange}
                            className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
                        />
                        <input
                            type="text"
                            name="gender"
                            placeholder='Male/Female'
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
                        />
                        <input
                            type="number"
                            name="height"
                            placeholder='Height in cm'
                            value={formData.height}
                            onChange={handleInputChange}
                            className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
                        />
                        <div className='flex flex-col justify-between'>
                            <input
                                type="number"
                                name="weight"
                                placeholder='Weight in kg'
                                value={formData.weight}
                                onChange={handleInputChange}
                                className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
                            />
                            <input
                                type="text"
                                name="bio"
                                placeholder='Bio'
                                value={formData.bio}
                                onChange={handleInputChange}
                                className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
                            />
                        </div>


                        <div className='flex flex-col gap-2 w-full'>
                            <select
                                value={selectedSport}
                                onChange={handleSportSelect}
                                className={`border-2 ${montserrat.className} border-gray-300 p-2 rounded-md`}
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
                            <button
                                type="button"
                                onClick={handleAddSport}
                                disabled={!selectedSport}
                                className={`bg-blue-500 text-white p-2 rounded-md cursor-pointer ${montserrat.className} hover:bg-blue-600 disabled:bg-gray-400`}
                            >
                                Add Sport
                            </button>
                        </div>
                    </div>
                    {/* Sports Preview */}
                    {formData.sports.length > 0 && (
                        <div className='w-full p-4'>
                            <h3 className={`text-lg font-semibold mb-2 ${montserrat.className}`}>Selected Sports:</h3>
                            <div className='flex flex-wrap gap-2'>
                                {formData.sports.map((sport, index) => (
                                    <div key={index} className='flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full'>
                                        <span className={`text-sm ${montserrat.className}`}>{sport}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSport(sport)}
                                            className='text-red-500 hover:text-red-700 text-sm font-bold'
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        type='submit'
                        disabled={updateUserMutation.isPending}
                        className={`bg-blue-500 text-white p-2 rounded-md cursor-pointer ${montserrat.className} hover:bg-blue-600 disabled:bg-gray-400`}
                    >
                        {updateUserMutation.isPending ? 'Updating...' : 'Apply Changes'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default page