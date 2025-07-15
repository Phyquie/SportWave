'use client'
import { useState } from 'react'
import Image from 'next/image'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";


export default function CustomImageSlider({ images }) {
  const [current, setCurrent] = useState(0)

  if (!images || images.length == 0)
    return <div>
      no Images to display
    </div>

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Main Image */}
      <div className='flex items-center gap-2'>
        <div onClick={() => {
          if (current > 0)
            setCurrent(current - 1)
          else
            setCurrent(images.length - 1)
        }}><FaChevronLeft className='text-5xl text-indigo-600' /></div>
        <div className="w-full aspect-video mb-4 overflow-hidden rounded-xl shadow-lg">
          <Image
            src={images[current]}
            alt={`Image ${current + 1}`}
            width={800}
            height={450}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>
        <div onClick={() => {
          if (current < images.length - 1)
            setCurrent(current + 1)
          else
            setCurrent(0)
        }}><FaChevronRight className='text-5xl text-indigo-600' /></div>
      </div>




      {/* Thumbnails */}
      <div className="flex gap-3 justify-center flex-wrap">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition 
              ${index === current ? 'border-indigo-500' : 'border-transparent'}`}
          >
            <Image
              src={img}
              alt={`Thumb ${index + 1}`}
              width={100}
              height={60}
              className="w-24 h-16 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
