import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400'] })
export const Footer = () => {
  return (
    <footer className="w-full h-full bg-gray-900 text-white text-center flex-row items-center justify-center relative bottom-0">
        <p className={`text-lg font-semibold ${montserrat.className}`}>© 2025 Sportwave. All rights reserved.</p>
        <div className="flex items-center justify-center space-x-4 mt-2"> 
            <FaFacebook className="text-2xl hover:text-indigo-600 transition-all duration-300 scale-100 hover:scale-105" />
            <FaInstagram className="text-2xl hover:text-indigo-600 transition-all duration-300 scale-100 hover:scale-105" />
            <FaTwitter className="text-2xl hover:text-indigo-600 transition-all duration-300 scale-100 hover:scale-105" />
            <FaLinkedin className="text-2xl hover:text-indigo-600 transition-all duration-300 scale-100 hover:scale-105" />
        </div>
     </footer>
  )
}
