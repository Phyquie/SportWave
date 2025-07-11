'use client'
import { useEffect, useState } from 'react'
import { Montserrat } from 'next/font/google'
import basketball from '../../public/photos/pexels-king-siberia-1123639-2277981.jpg'
import tennis from '../../public/photos/pexels-cottonbro-5741289.jpg'
import football from '../../public/photos/pexels-pixabay-264384.jpg'
import services1 from '../../public/photos/markus-spiske-J_tbkGWxCH0-unsplash (1).jpg'
import services2 from '../../public/photos/pexels-aleksandar069-3684122.jpg'
import services3 from '../../public/photos/pexels-punlob-173477-564096.jpg'
import jersey from '../../public/photos/pexels-axp-photography-500641970-30417185.jpg'
import gears from '../../public/photos/pexels-rodrigo-ortega-2044210904-30864601.jpg'
import Image from 'next/image'
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { RiTeamLine } from "react-icons/ri";
import { FaBaseballBall } from "react-icons/fa";



import Login from '../components/Login';
import { useStore } from '@/zustand/store';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400'] })

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { ShowLogin, setShowLogin } = useStore();
  const { ShowSignup, setShowSignup } = useStore();
  const { ShowOtp, setShowOtp } = useStore();
  const router = useRouter();



  
  return (
    <div className='bg-white'>
      <div className="px-10 pt-24 flex flex-col items-center" id="home">
         <h1 className={`text-5xl font-semibold text-gray-900 ${montserrat.className} text-center`}>Find Players, Teams, and Events<br/> At Sportwave</h1>
         <p className={`mt-6 text-lg text-gray-500 ${montserrat.className}`}>Sportwave is a platform that allows you to find players, teams, and events at your fingertips.</p>
         <div className="mt-6 flex justify-center space-x-4">
            <a href="#" className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 ${montserrat.className}`}>Get started</a>
          
         </div>
         <div className="mt-6 flex justify-center space-x-4">
         <Image src={basketball} alt="Basketball" className="w-[40vh] h-[60vh] rounded-3xl border-2 border-gray-500 hover:border-indigo-600 transition-all duration-300 scale-100 hover:scale-105 p-2" />
         <Image src={tennis} alt="Tennis" className="w-[40vh] h-[60vh] rounded-3xl border-2 border-gray-500 hover:border-indigo-600 transition-all duration-300 scale-100 hover:scale-105 p-2" />
         <Image src={football} alt="Football" className="w-[40vh] h-[60vh] rounded-3xl border-2 border-gray-500 hover:border-indigo-600 transition-all duration-300 scale-100 hover:scale-105 p-2" />
         </div>
        </div>
        {/* Line */}
        <div className="w-3/4 h-1 bg-gray-400 mt-10 mx-auto "></div>

        <h1 className={`text-5xl mt-10 font-semibold text-gray-900 ${montserrat.className} text-center mb-10 `}>What can you do on Sportwave</h1>
        <div className="flex flex-row items-center justify-between space-x-6 w-3/4 mx-auto">
          <div className="flex flex-col  w-80    items-center justify-center">
            <FaMagnifyingGlassLocation className="text-6xl text-indigo-600" />
            <p className={`text-2xl font-semibold text-gray-900 ${montserrat.className} text-center`}>Find Player Near You</p>
            <ul className={`text-lg text-gray-500 text-left ${montserrat.className} list-disc list-inside`}>
              <li>Filter by sport, skill level, location and more</li>
              <li>See profile ,post game ratings and more</li>
              <li>Connect with players and find your next game</li>
            </ul>
            </div>
          <div className="flex flex-col w-80  items-center justify-center">
            <RiTeamLine className="text-6xl text-indigo-600" />
            <p className={`text-2xl font-semibold text-gray-900 ${montserrat.className} text-center`}> Join or Create a Team</p>
            <ul className={`text-lg text-gray-500 text-left ${montserrat.className} list-disc list-inside`}>
              <li>Create a team or join an existing team</li>
              <li>Manage upcoming games and tournaments</li>
              <li>Manage team roster and player availability</li>
            </ul>
            </div>
          <div className="flex flex-col w-80  items-center justify-center">
            <FaBaseballBall className="text-6xl text-indigo-600" />
            <p className={`text-2xl font-semibold text-gray-900 ${montserrat.className} text-center`}>Discover or Host Events</p>
            <ul className={`text-lg text-gray-500 text-left ${montserrat.className} list-disc list-inside`}>
              <li>Find events near you or host your own</li>
              <li>Tournaments, leagues, and more</li>
              <li>Revive and track your performance</li>
            </ul>
            </div>
          
        </div>

        <div className="w-3/4 h-1 bg-gray-400 mt-10 mx-auto "></div>


        <div className="px-10 pt-20 flex flex-col" id="services">
          <h1 className={`text-5xl font-semibold text-gray-900 ${montserrat.className} text-center mb-10 `}>Our Services</h1>
          <div className="mt-6 flex flex-col items-center space-y-6">
  {[
    { src: services1, alt: "Services 1", text: "Host an Event", href: "/services/hostvenue" },
    { src: services2, alt: "Services 2", text: "Find a Event", href: "/services/findevent" },
    { src: services3, alt: "Services 3", text: "Find a Player", href: "/services/findplayer" },
  ].map((service, index) => (
    <Link href={service.href} key={index} className="relative group rounded-3xl">
      {/* Image */}
      <div className="relative w-full h-72 group ">
      <Image src={service.src} alt={service.alt} 
        className="max-w-full h-72 object-cover  p-1 rounded-3xl border-2 border-gray-500 mb-10 transition-all duration-500"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100  transition-opacity bg-black bg-opacity-50 duration-500 rounded-3xl">
          <span className={`text-white text-7xl font-semibold ${montserrat.className} bg-opacity-50 px-4 py-2 rounded-3xl`}>
          {service.text}
        </span>
      </div>
    </div>
    </Link>
  ))}
</div>

 </div>

     {/* Line */}
     <div className="w-3/4 mx-auto  h-1 bg-gray-400 mt-10"></div>


     <div className="px-10 pt-20 flex flex-col" id="merch">
      <h1 className={`text-5xl font-semibold text-gray-900 ${montserrat.className} text-center mb-10 `}>Merch</h1>
      <div className="flex flex-row items-center justify-center space-x-6">
     <div className="relative w-4/5 h-[35rem] group">
    <Image
      src={jersey}
      alt="Jersey"
      className="w-full h-full rounded-3xl border-2 object-cover border-gray-500  transition-all duration-300 scale-100 hover:scale-105 p-2"
    />
    <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-5xl font-semibold ${montserrat.className} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}>
      Jersey
    </div>
  </div>

   <div className="relative w-4/5 h-[35rem] group">
    <Image
      src={gears}
      alt="Gears"
      className="w-full h-full rounded-3xl border-2 object-cover border-gray-500  transition-all duration-300 scale-100 hover:scale-105 p-2"
    />
    <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-5xl font-semibold ${montserrat.className} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}>
      Gears
    </div>
   </div>
   </div>
  
     </div>

     

     {/* Line */}
     <div className="w-3/4 h-1 bg-gray-400 mt-10 mx-auto"></div>
     <div className="px-10 pt-20 flex flex-col" id="about">
      <h1 className={`text-5xl font-semibold text-gray-900 ${montserrat.className} text-center mb-10 `}>About</h1>
      <p className={`text-lg text-gray-500 text-center mb-10 ${montserrat.className}`}>Sportwave is your ultimate platform for connecting with players, teams, and sporting events effortlessly. <br/>Whether you're an amateur looking for a local match,<br/> a professional seeking competitive games, or an organizer managing tournaments,<br/> Sportwave brings the sports community together in one place. <br/>Sportwave is a platform that allows you to find players, teams, and events at your fingertips.</p>
    
     </div>
     
     </div>
  
  )
}