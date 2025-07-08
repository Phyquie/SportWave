"use client"
import { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { useEffect } from 'react';


export default function AutoLocationButton() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

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
    <div className="mt-5">
      <button
        onClick={findLocation}
        className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition flex items-center gap-2"
      >
        {loading ? 'Finding...' : <FaLocationDot />}
      </button>

      {location && (
        <div className="mt-2 text-sm text-gray-700">
          Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
}
