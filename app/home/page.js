'use client'
import { useState } from 'react'
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
import { useStore } from '@/zustand/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HeroImageSlider from '../components/HeroImageSlider';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400'] })

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { ShowLogin, setShowLogin, ShowSignup, setShowSignup, ShowOtp, setShowOtp } = useStore();
  const router = useRouter();

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="px-4 md:px-10 pt-24 flex flex-col md:flex-row md:items-start items-center max-w-7xl mx-auto" id="home">
        {/* Left side: Text content */}
        <div className="md:w-1/2 text-left md:pr-12 md:pt-16">
          <h1 className={`text-4xl md:text-6xl font-bold text-gray-900 leading-tight ${montserrat.className}`}>
            Find Players, Teams, and Events <br className="hidden md:block" /> At Sportwave
          </h1>
          <p className={`mt-6 text-base md:text-lg text-gray-600 ${montserrat.className}`}>
            Sportwave is the platform that brings the sports community together. Connect with players, build teams, and discover exciting events near you.
          </p>
          <div className="mt-8">
            <a href="#" className={`bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-indigo-500 transition ${montserrat.className}`}>
              Get Started
            </a>
          </div>
        </div>

        {/* Right side: Image slider */}
        <div className="md:w-1/2 mt-12 md:mt-0">
          {/* Mobile view */}
          <div className="md:hidden w-full h-72 overflow-hidden rounded-3xl">
            <Image
              src={basketball}
              alt="Sport"
              className="w-full h-full object-cover"
              priority
            />
          </div>
          
          {/* Desktop view with image slider */}
          <div className="hidden md:block w-full h-[70vh]">
            <HeroImageSlider images={[basketball, tennis, football]} />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-11/12 max-w-4xl h-[2px] bg-gray-200 mt-16 mx-auto"></div>

      {/* FEATURES */}
      <section className="px-4 md:px-10 pt-20" id="features">
        <h1 className={`text-3xl md:text-5xl font-bold text-gray-900 ${montserrat.className} text-center mb-12`}>
          What You Can Do
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaMagnifyingGlassLocation className="text-5xl text-indigo-600" />,
              title: "Find Players",
              points: ["Filter by sport, skill level & location", "View profiles & ratings", "Connect for your next game"],
            },
            {
              icon: <RiTeamLine className="text-5xl text-indigo-600" />,
              title: "Join or Create Teams",
              points: ["Build or join a team", "Manage tournaments & matches", "Track roster & availability"],
            },
            {
              icon: <FaBaseballBall className="text-5xl text-indigo-600" />,
              title: "Discover Events",
              points: ["Explore local events & tournaments", "Host your own leagues", "Track your performance"],
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 border rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
              {item.icon}
              <h3 className={`text-xl font-semibold mt-4 ${montserrat.className}`}>{item.title}</h3>
              <ul className={`mt-3 text-gray-600 text-sm md:text-base space-y-2 text-left ${montserrat.className}`}>
                {item.points.map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="w-11/12 max-w-4xl h-[2px] bg-gray-200 mt-16 mx-auto"></div>

      {/* SERVICES */}
      <section className="px-4 md:px-10 pt-20" id="services">
        <h1 className={`text-3xl md:text-5xl font-bold text-gray-900 ${montserrat.className} text-center mb-12`}>
          Our Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { src: services1, alt: "Host Event", text: "Host an Event", href: "/services/hostvenue" },
            { src: services2, alt: "Find Event", text: "Find an Event", href: "/services/findevent" },
            { src: services3, alt: "Find Player", text: "Find a Player", href: "/services/findplayer" },
          ].map((service, index) => (
            <Link href={service.href} key={index} className="relative group rounded-3xl overflow-hidden border shadow hover:shadow-lg transition">
              <Image src={service.src} alt={service.alt} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition">
                <span className={`text-white text-2xl md:text-3xl font-bold ${montserrat.className}`}>{service.text}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      {/* <div className="w-11/12 max-w-4xl h-[2px] bg-gray-200 mt-16 mx-auto"></div>

      {/* MERCH */}
      {/* <section className="px-4 md:px-10 pt-20" id="merch">
        <h1 className={`text-3xl md:text-5xl font-bold text-gray-900 ${montserrat.className} text-center mb-12`}>
          Merch
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[{ src: jersey, alt: "Jersey" }, { src: gears, alt: "Gears" }].map((item, idx) => (
            <div key={idx} className="relative group rounded-3xl overflow-hidden border shadow hover:shadow-lg transition">
              <Image src={item.src} alt={item.alt} className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-2xl md:text-4xl font-bold opacity-0 group-hover:opacity-100 transition">
                {item.alt}
              </div>
            </div>
          ))}
        </div>
      </section> */} 

      {/* Divider */}
      <div className="w-11/12 max-w-4xl h-[2px] bg-gray-200 mt-16 mx-auto"></div>

      {/* ABOUT */}
      <section className="px-4 md:px-10 pt-20 pb-24" id="about">
        <h1 className={`text-3xl md:text-5xl font-bold text-gray-900 ${montserrat.className} text-center mb-8`}>
          About Us
        </h1>
        <p className={`text-base md:text-lg text-gray-600 max-w-3xl mx-auto text-center leading-relaxed ${montserrat.className}`}>
          Sportwave is your ultimate platform for connecting with players, teams, and sporting events effortlessly. Whether you're an amateur looking for a local match, a professional seeking competitive games, or an organizer managing tournaments, Sportwave brings the sports community together in one place.
        </p>
      </section>
    </div>
  )
}
