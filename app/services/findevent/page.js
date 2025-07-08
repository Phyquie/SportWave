'use client'
import React from 'react'
import { FaFilter } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import AutoLocationButton from '@/app/components/Geolocation';




const page = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold text-gray-900'>Find Event</h1>
            <AutoLocationButton />
        </div>
        <div className='flex  gap-2 justify-center rounded-2xl p-2 w-1/2 mx-auto mt-10'>
            <div className='flex items-center w-3/4 bg-white  gap-2 border-2 border-gray-300 rounded-2xl p-2'>
            <input type="text"className='bg-transparent outline-none w-full'  placeholder='Search for an event'/>
            <button className='rounded-2xl p-2 '><IoSearch /></button>
            </div>
            
            <button className=' border-2 flex items-center justify-center gap-2 border-gray-300 p-2 bg-white rounded-2xl'>Filter <FaFilter /></button>
        </div>

    </div>
  )
}

export default page