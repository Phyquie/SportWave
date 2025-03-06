'use client'
import { useState } from 'react'
import { Sigmar } from 'next/font/google'
import basketball from '../../public/photos/pexels-king-siberia-1123639-2277981.jpg'
import tennis from '../../public/photos/pexels-cottonbro-5741289.jpg'
import football from '../../public/photos/pexels-pixabay-264384.jpg'
import services1 from '../../public/photos/pexels-shutter-click-1079538113-27741143.jpg'
import services2 from '../../public/photos/pexels-aleksandar069-3684122.jpg'
import services3 from '../../public/photos/pexels-punlob-173477-564096.jpg'
import jersey from '../../public/photos/pexels-axp-photography-500641970-30417185.jpg'
import gears from '../../public/photos/pexels-rodrigo-ortega-2044210904-30864601.jpg'
import Image from 'next/image'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { TfiMenuAlt } from "react-icons/tfi";
import Login from '../components/Login';
import { useStore } from '@/zustand/store';
import Link from 'next/link';



const navigation = [
  { name: 'Services', href: '#services' },
  { name: 'Merch', href: '#merch' },
  { name: 'About', href: '#about' },
  
]
const sigmar = Sigmar({ subsets: ['latin'], weight: ['400'] })

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { ShowLogin, setShowLogin } = useStore();
  const { ShowSignup, setShowSignup } = useStore();
  const { ShowOtp, setShowOtp } = useStore();
  const LoginClick = () => {
    setShowSignup(false);
    setShowOtp(false);
    setShowLogin(true);
  }
  return (
    <div className="bg-white max-w-screen flex flex-col items-center pt-24">
      <header className="top-0 left-0 w-full bg-white shadow-md z-50 fixed">
        <nav className="flex items-center justify-between p-5">
          <div className="flex items-center">
            <a href="#" className={`text-3xl font-bold text-indigo-600 ${sigmar.className} transition-all duration-300 scale-100 hover:scale-110`}>Sportwave</a>
          </div>
          <div className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className={`text-gray-900 font-medium hover:text-indigo-600 ${sigmar.className} transition-all duration-300 scale-100 hover:scale-110`}>
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden md:flex">
            <a href="#" className={`text-gray-900 font-bold text-2xl hover:text-indigo-600 ${sigmar.className } hover:bg-slate-200 transition-all duration-300 scale-100 hover:scale-110 hover:rounded-lg p-2` } onClick={LoginClick}>Log in</a>
          </div>
          <button className="md:hidden p-2 text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <TfiMenuAlt className="text-2xl text-indigo-600" /> : <TfiMenuAlt className="text-2xl" />}
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg p-4 space-y-4 text-center">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className={`block text-gray-900 font-medium hover:text-indigo-600 ${sigmar.className} transition-all duration-300 scale-100 hover:scale-105`}>
                {item.name}
              </a>
            ))}
            <a href="#" className={`block text-gray-900 font-medium hover:text-indigo-600 ${sigmar.className} transition-all duration-300 scale-100 hover:scale-105` }>Log in</a>
          </div>
        )}
      </header>
      {ShowLogin && (
  <div
    className="w-full h-full top-0 left-0 fixed flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm shadow-2xl"
    onClick={() => setShowLogin(false)} // Close modal when clicking outside
  >
    <div onClick={(e) => e.stopPropagation()}> 
      <Login showLogin={ShowLogin} setShowLogin={setShowLogin} />
    </div>
  </div>
)}


      <div className="px-10 pt-24 flex flex-col items-center" id="home">
         <h1 className={`text-5xl font-semibold text-gray-900 ${sigmar.className} text-center`}>Find Players, Teams, and Events<br/> At Sportwave</h1>
         <p className={`mt-6 text-lg text-gray-500 ${sigmar.className}`}>Sportwave is a platform that allows you to find players, teams, and events at your fingertips.</p>
         <div className="mt-6 flex justify-center space-x-4">
            <a href="#" className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 ${sigmar.className}`}>Get started</a>
          
         </div>
         <div className="mt-6 flex justify-center space-x-4">
         <Image src={basketball} alt="Basketball" className="w-[40vh] h-[60vh] rounded-3xl border-2 border-gray-500 hover:border-indigo-600 transition-all duration-300 scale-100 hover:scale-105 p-2" />
         <Image src={tennis} alt="Tennis" className="w-[40vh] h-[60vh] rounded-3xl border-2 border-gray-500 hover:border-indigo-600 transition-all duration-300 scale-100 hover:scale-105 p-2" />
         <Image src={football} alt="Football" className="w-[40vh] h-[60vh] rounded-3xl border-2 border-gray-500 hover:border-indigo-600 transition-all duration-300 scale-100 hover:scale-105 p-2" />
         </div>
        </div>
        {/* Line */}
        <div className="w-3/4 h-1 bg-gray-400 mt-10 "></div>


        <div className="px-10 pt-20 flex flex-col" id="services">
          <h1 className={`text-5xl font-semibold text-gray-900 ${sigmar.className} text-center mb-10 `}>Services</h1>
          <div className="mt-6 flex flex-col items-center space-y-6">
  {[
    { src: services1, alt: "Services 1", text: "Host an Event", href: "/service/hostvenue" },
    { src: services2, alt: "Services 2", text: "Find a Event", href: "/service/findevent" },
    { src: services3, alt: "Services 3", text: "Find a Player", href: "/service/findplayer" },
  ].map((service, index) => (
    <Link href={service.href} key={index} className="relative group rounded-3xl">
      {/* Image */}
      <Image src={service.src} alt={service.alt} 
        className="max-w-full h-72 object-cover p-1 rounded-3xl border-2 border-gray-500 mb-10 transition-all duration-500 group-hover:border-indigo-600 group-hover:blur-sm"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl">
        <span className={`text-white text-7xl font-semibold ${sigmar.className} bg-opacity-50 px-4 py-2 rounded-3xl`}>
          {service.text}
        </span>
      </div>
    </Link>
  ))}
</div>

        </div>

     {/* Line */}
     <div className="w-3/4 h-1 bg-gray-400 mt-10 "></div>


     <div className="px-10 pt-20 flex flex-col" id="merch">
      <h1 className={`text-5xl font-semibold text-gray-900 ${sigmar.className} text-center mb-10 `}>Merch</h1>
      <div className="flex flex-row items-center justify-center space-x-6">
     <div className="relative w-4/5 h-[35rem] group">
    <Image
      src={jersey}
      alt="Jersey"
      className="w-full h-full rounded-3xl border-2 object-cover border-gray-500  transition-all duration-300 scale-100 hover:scale-105 p-2"
    />
    <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-5xl font-semibold ${sigmar.className} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}>
      Jersey
    </div>
  </div>

   <div className="relative w-4/5 h-[35rem] group">
    <Image
      src={gears}
      alt="Gears"
      className="w-full h-full rounded-3xl border-2 object-cover border-gray-500  transition-all duration-300 scale-100 hover:scale-105 p-2"
    />
    <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-5xl font-semibold ${sigmar.className} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}>
      Gears
    </div>
   </div>
   </div>
  
     </div>

     

     {/* Line */}
     <div className="w-3/4 h-1 bg-gray-400 mt-10 "></div>
     <div className="px-10 pt-20 flex flex-col" id="about">
      <h1 className={`text-5xl font-semibold text-gray-900 ${sigmar.className} text-center mb-10 `}>About</h1>
      <p className={`text-lg text-gray-500 text-center mb-10 ${sigmar.className}`}>Sportwave is your ultimate platform for connecting with players, teams, and sporting events effortlessly. <br/>Whether you're an amateur looking for a local match,<br/> a professional seeking competitive games, or an organizer managing tournaments,<br/> Sportwave brings the sports community together in one place. <br/>Sportwave is a platform that allows you to find players, teams, and events at your fingertips.</p>
    
     </div>
     <footer className="w-full h-30 bg-gray-900 text-white text-center flex-col items-center justify-center">
        <p className={`text-lg font-semibold ${sigmar.className}`}>© 2025 Sportwave. All rights reserved.</p>
        <div className="flex items-center justify-center space-x-4 mt-2 mb-6"> 
            <FaFacebook className="text-2xl hover:text-indigo-600 transition-all duration-300 scale-100 hover:scale-105" />
            <FaInstagram className="text-2xl hover:text-indigo-600 transition-all duration-300 scale-100 hover:scale-105" />
            <FaTwitter className="text-2xl hover:text-indigo-600 transition-all duration-300 scale-100 hover:scale-105" />
            <FaLinkedin className="text-2xl hover:text-indigo-600 transition-all duration-300 scale-100 hover:scale-105" />
        </div>
     </footer>
     
    



       
        
</div>
  )
}