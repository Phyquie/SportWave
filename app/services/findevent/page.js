'use client'
import React from 'react'
import FilterSearchPage from '@/app/components/FilterSearchPage'
import AutoLocationButton from '@/app/components/Geolocation';
import { useStore } from '@/zustand/store';
import { useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';





const page = () => {

  const { lat, lng } = useStore()
  const router = useRouter();

  const [searchResults1, setSearchResults] = React.useState('');
  const [sport, setSport] = React.useState('');
  const [radius, setRadius] = React.useState(50); // Default radius is 50 km
  const [sortType, setSortType] = React.useState('date'); // Default sort type is date

  const { data: searchResults, isError, error } = useQuery({
    queryKey: ['searchEvents', lat, lng, searchResults1, sport, radius],
    queryFn: async () => {
      const response = await fetch(`/api/utils/getevents?lat=${lat}&lng=${lng}&search=${searchResults1}&sport=${sport}&radius=${radius}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!lat && !!lng, // Only run the query if lat and lng are available
  });

  const handleSearch = (searchValue) => {
    setSearchResults(searchValue);
  }

  const handleFilterSearch = (sportValue, radiusValue) => {
    setSport(sportValue);
    setRadius(radiusValue);
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <div>
        <FilterSearchPage onSearch={handleSearch} onFilter={handleFilterSearch} />
      </div>

      {/* Event Results Section */}
      <div className="pt-32 px-4">
        {searchResults?.events && searchResults.events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.events
              .filter(event => event._id)
              .map((event) => (
                <div
                  key={event._id}
                  className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                  onClick={() => {
                    if (event?._id) {
                      router.push(`/services/findevent/${event._id}`);
                    }
                  }}
                >
                  {/* Event Image */}
                  <img
                    src={event.image_urls[0]}
                    alt={event.name}
                    className="w-full h-52 object-cover rounded-xl mb-4 group-hover:scale-[1.02] transition-transform duration-300"
                  />

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-1 truncate">{event.name}</h2>

                  {/* Location */}
                  <p className="text-sm text-gray-600 mb-1">
                    📍 <span className="font-medium">{event.detailedLocation || event.location}</span>
                  </p>

                  {/* Sport */}
                  <p className="text-sm text-gray-600 mb-1">
                    🏅 <span className="font-medium">Sport:</span> {event.sport}
                  </p>

                  {/* Seats */}
                  {event?.NoOfSeats && (
                    <p className="text-sm text-gray-600">
                      🎟️ <span className="font-medium">Seats:</span> {event.NoOfSeats}
                    </p>
                  )}
                </div>

              ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <p className="text-gray-500 text-lg">No events found</p>
          </div>
        )}
      </div>
    </div>

  )
}

export default page