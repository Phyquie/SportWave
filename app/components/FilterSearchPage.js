'use client'
import React, { use, useEffect, useState } from 'react'
import { useStore } from '@/zustand/store';
import { useCustomQuery } from '@/custom_hooks/customQuery';
import AutoLocationButton from '@/app/components/Geolocation';
import { IoSearch } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { IoClose } from 'react-icons/io5';
import { RiResetLeftFill } from "react-icons/ri";


const FilterSearchPage = ({ onSearch, onFilter }) => {

    const [searchValue, setSearchValue] = useState('');
    const [showFilter, setShowFilter] = useState(false)
    const [sportValue, setSportValue] = useState('')
    const [radiusValue, setRadiusValue] = useState(50) // Default radius is 50 km

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchValue);
        setSearchValue('');
    };


    return (
        <div className="pt-6 pb-4 fixed w-full top-20 z-10">
            <div className="flex flex-col items-center justify-center">
                <div className="flex gap-3 justify-center rounded-2xl p-3 w-full max-w-4xl mx-auto bg-[#f8f9fb]">

                    {/* Location Button */}
                    <AutoLocationButton />

                    {/* Search Input */}
                    <div className="flex items-center w-3/4 bg-white gap-2 border border-gray-300 rounded-2xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                        <input
                            type="text"
                            className="bg-transparent outline-none w-full text-sm placeholder-gray-500"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search for an event"
                        />
                        <button
                            className="text-white bg-indigo-600 hover:bg-indigo-700 p-2 rounded-xl transition"
                            onClick={handleSearch}
                        >
                            <IoSearch />
                        </button>
                    </div>

                    {/* Filter Button */}
                    <button className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-2xl shadow-sm hover:bg-gray-50 transition" onClick={() => {
                        setShowFilter(true)
                    }}>
                        Filter <FaFilter />
                    </button>

                    <div className="flex items-center">
                        <button
                            className=" text-black text-2xl"
                            onClick={() => {
                                setSearchValue('');
                                setSportValue('');
                                setRadiusValue(50);
                                onSearch('');
                                onFilter('', 50);
                            }}
                        >
                            <RiResetLeftFill />
                        </button>
                    </div>

                    <select
                        name="Sortby"
                        className="border-2 w-1/4  border-gray-300 p-2 rounded-xl"
                    > <option>Sort by: Popularity</option>
                        <option>Sort by: Latest</option>
                        <option>Price: Low to High</option>
                        <option>Price: Hogh to Low</option>
                    </select>
                </div>



                {showFilter && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="bg-white rounded-2xl shadow-lg p-6 min-w-[300px] relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowFilter(false)}
                            >
                                <IoClose size={24} />
                            </button>
                            <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
                            {/* Add your filter form or options here */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>Sport *</label>
                                <select
                                    name="sport"
                                    value={sportValue}
                                    onChange={(e) => {
                                        setSportValue(e.target.value);
                                    }

                                    }
                                    className={`border-2 w-full border-gray-300 p-2 rounded-md`}
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
                            </div>
                            <div className='space-y-2 mt-4'>
                                <label className='block text-sm font-medium text-gray-700'>Covering Radius</label>
                                <select name='radius' value={radiusValue} onChange={(e) => {
                                    setRadiusValue(e.target.value);
                                }}

                                    className='border-2 w-full border-gray-300 p-2 rounded-md'>

                                    <option value="5">5 km</option>
                                    <option value="10">10 km</option>
                                    <option value="20">20 km</option>
                                    <option value="50">50 km</option>
                                    <option value="100">100 km</option>

                                </select>


                            </div>
                            <div>
                            </div>
                            <button
                                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowFilter(false);
                                    // Call the onFilter function with selected values
                                    onFilter(sportValue, radiusValue);
                                }}
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default FilterSearchPage