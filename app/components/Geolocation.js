"use client"
import { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { useEffect } from 'react';
import { useCustomQuery } from '@/custom_hooks/customQuery';
import { useStore } from '@/zustand/store';


export default function AutoLocationButton() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const {setLat, setLng} = useStore();


  const mapUrl = location
    ? `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`
    : null;
  const {data:mapData, isLoading, error} = useCustomQuery(mapUrl)
  // console.log(mapData)


  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setLat(latitude);
          setLng(longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, [location]);

  const findLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setLoading(false);
        setLat(latitude);
        setLng(longitude);
        // Optional: reverse geocode to get city/locality name
      },
      (error) => {
        alert('Unable to retrieve your location');
        setLoading(false);
        console.error(error);
      }
    );
  };

  return (
    <div className="flex items-center min-w-[166.95px] gap-2 ">
      <div>
      <button
        onClick={findLocation}
        className=" bg-blue-500 text-white px-3 py-3 rounded-full shadow hover:bg-green-600 transition flex items-center gap-2"
      >
         <FaLocationDot />
      </button>
      </div>
       <div>
        
       </div>
      {isLoading &&
        <div className="mt-2 text-sm text-gray-700">
          Loading...
        </div>
      
      }
      {
        location && !isLoading && !error && (
          <div className="mt-2 text-sm text-gray-700">
            Location: {mapData?.address?.city || mapData?.address?.town || mapData?.address?.village || mapData?.address?.state || mapData?.address?.country}
          </div>
        )
      }
      {
        error && (
          <div className="mt-2 text-sm text-red-700">
            Error: {error.message}
          </div>
        )
      }
    </div>
  );
}
