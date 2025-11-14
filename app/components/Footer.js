import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400'] })
export const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-12 relative bottom-0">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="md:flex md:justify-between md:items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className={`text-2xl font-bold ${montserrat.className}`}>Join our newsletter</h2>
              <p className="text-gray-300 mt-2">We'll send you updates on latest sports events and news once per week. No spam.</p>
            </div>
            <div className=" ml-4 md:w-1/2">
              <div className="flex">
                <input 
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-l-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-r-md transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">SportWave</h2>
            <p className="text-gray-300">
              Connecting sports enthusiasts and players for the ultimate sporting experience. Find events, players, and venues all in one place.
            </p>
          </div>
          
          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="/services/findevent" className="text-gray-300 hover:text-indigo-400">Find Events</a></li>
              <li><a href="/services/findplayer" className="text-gray-300 hover:text-indigo-400">Find Players</a></li>
              <li><a href="/services/hostvenue" className="text-gray-300 hover:text-indigo-400">Host Venue</a></li>
              <li><a href="/services/myprofile" className="text-gray-300 hover:text-indigo-400">My Profile</a></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-indigo-400">About us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-indigo-400">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-indigo-400">News</a></li>
              <li><a href="#" className="text-gray-300 hover:text-indigo-400">Contact</a></li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-indigo-400">Terms</a></li>
              <li><a href="#" className="text-gray-300 hover:text-indigo-400">Privacy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-indigo-400">Cookies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-indigo-400">Licenses</a></li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-gray-300 ${montserrat.className}`}>© 2025 SportWave. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0"> 
              <a href="#" aria-label="Facebook"><FaFacebook className="text-xl hover:text-indigo-600 transition-all duration-300" /></a>
              <a href="#" aria-label="Instagram"><FaInstagram className="text-xl hover:text-indigo-600 transition-all duration-300" /></a>
              <a href="#" aria-label="Twitter"><FaTwitter className="text-xl hover:text-indigo-600 transition-all duration-300" /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin className="text-xl hover:text-indigo-600 transition-all duration-300" /></a>
              <a href="#" aria-label="GitHub"><FaGithub className="text-xl hover:text-indigo-600 transition-all duration-300" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
