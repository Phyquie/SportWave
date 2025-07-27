"use client";
import { useState, useRef, useEffect } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { useCustomQuery } from '@/custom_hooks/customQuery';
import { useStore } from '@/zustand/store';

export default function AutoLocationButton() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const lastFetchTimeRef = useRef(null); // For throttling
  const { setLat, setLng } = useStore();

  const mapUrl = location
    ? `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`
    : null;

  const { data: mapData, isLoading, error } = useCustomQuery(mapUrl);

  // 🔹 Auto-fetch on first render only
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setLat(latitude);
          setLng(longitude);
          // console.log('Auto-location fetched:', { lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Auto-location error:', error);
        }
      );
    }
  }, []); // Run once only

  // 🔹 Manual fetch with 10s throttling
  const findLocation = () => {
    const now = Date.now();
    if (lastFetchTimeRef.current && now - lastFetchTimeRef.current < 10000) {
      alert('Please wait 10 seconds before trying again.');
      return;
    }

    lastFetchTimeRef.current = now;
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setLat(latitude);
        setLng(longitude);
        setLoading(false);
      },
      (error) => {
        alert('Unable to retrieve your location');
        setLoading(false);
        console.error(error);
      }
    );
  };

  return (
    <div className="flex items-center min-w-[166.95px] gap-2">
      <div>
        <button
          onClick={findLocation}
          className="bg-blue-500 text-white px-3 py-3 rounded-full shadow hover:bg-green-600 transition flex items-center gap-2"
        >
          <FaLocationDot />
        </button>
      </div>

      {isLoading && (
        <div className="mt-2 text-sm text-gray-700">
          Loading...
        </div>
      )}

      {location && !isLoading && !error && (
        <div className="mt-2 text-sm text-gray-700">
          Location: {mapData?.address?.city || mapData?.address?.town || mapData?.address?.village || mapData?.address?.state || mapData?.address?.country}
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-700">
          Error: {error.message}
        </div>
      )}
    </div>
  );
}
