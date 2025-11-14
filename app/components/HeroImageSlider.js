'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function HeroImageSlider({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setFadeState(false);
      
      // Wait for fade out animation to complete
      setTimeout(() => {
        // Change image
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        // Start fade in
        setFadeState(true);
      }, 750); // Half the transition duration
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) {
    return <div>No images to display</div>;
  }

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
      <div className={`transition-opacity duration-1500 ${fadeState ? 'opacity-100' : 'opacity-0'}`}>
        <Image
          src={images[currentImageIndex]}
          alt="Sport showcase"
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
