'use client'
import React from 'react'
import { useQuery , useMutation } from '@tanstack/react-query'
import { Sigmar } from 'next/font/google'

const sigmar = Sigmar({ subsets: ['latin'], weight: ['400'] })

const page = () => {
    const { data:user, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => fetch('/api/user/viewuserbytoken').then(res => res.json())
    })
    console.log(user)
    const updateUserMutation = useMutation({
        mutationFn: (user) => fetch('/api/user/updateuser', {
            method: 'POST',
            body: JSON.stringify(user)
        }).then(res => res.json())
    })
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
    <div className='flex flex-col justify-center items-center gap-2  h-[80%] w-[80%] bg-gray-200 rounded-xl p-4'>
      <h1 className={`text-2xl font-bold ${sigmar.className}`}>Edit Profile</h1>
      <img src={user?.photo_url} alt="profile" className='w-20 h-20 rounded-full' />
      <button className={`bg-blue-500 text-white p-2 rounded-md cursor-pointer ${sigmar.className} hover:bg-blue-600`} >Change Profile Picture</button>
      <form onSubmit={updateUserMutation.mutate} className='w-full flex flex-col justify-center items-center'>
        <div className=' gap-2 grid grid-cols-2 w-full p-4'>
        <input type="text" name="name" placeholder='Name' value={user?.name} className={`border-2 ${sigmar.className} border-gray-300 p-2 rounded-md`} />
        <input type="email" name="email" placeholder='Email' value={user?.email} className={`border-2 ${sigmar.className} border-gray-300 p-2 rounded-md`} />
        <input type="text" name="phone" placeholder='Phone' value={user?.phone} className={`border-2 ${sigmar.className} border-gray-300 p-2 rounded-md`} />
        <input type="text" name="city" placeholder='City' value={user?.city} className={`border-2 ${sigmar.className} border-gray-300 p-2 rounded-md`} />
        <input type="text" name="state" placeholder='State' value={user?.state} className={`border-2 ${sigmar.className} border-gray-300 p-2 rounded-md`} />
        <input type="text" name="zip" placeholder='Zip' value={user?.zip} className={`border-2 ${sigmar.className} border-gray-300 p-2 rounded-md`} />
        <input type="text" name="country" placeholder='Country' value={user?.country} className={`border-2 ${sigmar.className} border-gray-300 p-2 rounded-md`} />
        </div>
        <button type='submit' className={`bg-blue-500 text-white p-2 rounded-md cursor-pointer ${sigmar.className}`}>Apply Changes</button>
      </form>
    </div>
    </div>
  )
}

export default page