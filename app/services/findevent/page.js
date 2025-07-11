import React from 'react'
import FilterSearchPage from '@/app/components/FilterSearchPage'
import AutoLocationButton from '@/app/components/Geolocation';
import React from 'react';





const page = () => {
   
   const { lat, lng } = useStore();
    // useEffect(() => {
    //     if (lat && lng) {
    //         console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    //     }
    // }, [lat, lng]);

     
    const { data: searchResults, isLoading, isError, error } = useCustomQuery('/api/utils/getevents?lat=' + lat + '&lng=' + lng)
    console.log(searchResults);

    const handleSearch = (searchTerm) => {
        // Implement search functionality here
    };

  return (
    <div className='bg-gray-100 min-h-screen'>
        <FilterSearchPage onChange={handleSearch} />

    </div>
  )
}

export default page