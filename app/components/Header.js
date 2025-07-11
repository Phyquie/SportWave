'use client'
import { useStore } from '@/zustand/store'
import { useRouter } from 'next/navigation'
import {useMutation} from '@tanstack/react-query'
import Login from './Login'
import { useState , useEffect } from 'react'
import { TfiMenuAlt } from 'react-icons/tfi'
import Cookies from 'js-cookie'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useCustomQuery } from '@/custom_hooks/customQuery'
import { Sigmar} from 'next/font/google'
import { Montserrat } from 'next/font/google'
import logo from '@/public/logo.png'

const sigmar = Sigmar({ subsets: ['latin'], weight: ['400'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400'] })

const Header = () => {
  const { ShowLogin, setShowLogin , isLogIn , setIsLogIn  , user , setUser} = useStore()

  const { data: userdetails, isSuccess } = useCustomQuery(
    isLogIn ? '/api/user/viewuserbytoken' : '', // conditional URL
  );

  useEffect(() => {
    if (isSuccess) {
      setUser(userdetails);
    }
  }, [isSuccess, userdetails, setUser]);
    
    
   
    
    const router = useRouter();
    const LoginClick = () => {
        setShowLogin(true);
    }

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigation = [
        { name: 'Services', href: '#services' },
        { name: 'Merch', href: '#merch' },
        { name: 'About', href: '#about' },
        
      ]
     const [profilePopUp , setProfilePopUp] = useState(false)
     const [userDropdownOpen, setUserDropdownOpen] = useState(false)
    const {mutate: logout , isError , isLoading } = useMutation({
        mutationFn: () => {
             return fetch('/api/auth/logout',{
                method: 'POST',
                body: JSON.stringify({}),
             });
        },
        onSuccess: () => {
            console.log('Logout successful');
            setIsLogIn(false);
            setUser(null);
            router.refresh();
           
          },
          onError: (error) => {
            console.log('Logout failed', error);
          } 
    })
   

  
    const handleLogOut = () => {
      localStorage.clear();
      setIsLogIn(false);
      setUser(null);
        logout();
        
        setUserDropdownOpen(false);
    }
    const handleMyProfile = () => {
        setProfilePopUp(true);
        setUserDropdownOpen(false); 
    }

    const userMenuItems = [
        { name: 'Profile Settings', href: '/services/myprofile', },
        { name: 'Booked Events', href: '/services/myprofile' },
        { name: 'My Hosted Events', href : '/services/myprofile' },
        { name: 'Settings', href: '/services/myprofile' },
        { name: 'My Stats', href: '/services/myprofile' },
    ]

    const handleUserMenuClick = () => {
        setUserDropdownOpen(!userDropdownOpen);
    }

    const handleMenuItemClick = (href) => {
        setUserDropdownOpen(false);
        router.push(href);
    }

    // Check for token on client side to avoid hydration mismatch
    useEffect(() => {
        const userCookie = Cookies.get('token');
        if (userCookie && !isLogIn) {
            setIsLogIn(true);

        }
    }, [isLogIn, setIsLogIn]);
    
    

   
    // Close dropdown when clicking outside
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const handleClickOutside = (event) => {
            if (userDropdownOpen && !event.target.closest('.user-dropdown')) {
                setUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userDropdownOpen]);
  



    return (
    <div className="bg-white max-w-screen flex flex-col items-center pt-24">
      <header className="top-0 left-0 w-full bg-white shadow-md z-50 fixed">
        <nav className="flex items-center justify-between p-5">
          <div className="flex items-center">
            <span onClick={() => router.push('/')} className={`text-3xl font-bold text-indigo-600 ${montserrat.className} transition-all duration-300 scale-100 hover:scale-110`}>Sportwave</span>
            {/* <img src="/logo.png" alt="logo" width={200} height={200}  onClick={()=>router.push('/')} className='hover:cursor-pointer'/> */}
          </div>
          <div className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className={`text-gray-900 font-medium hover:text-indigo-600 ${montserrat.className} transition-all duration-300 scale-100 hover:scale-110`}>
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden md:flex">
            {isLogIn ? (
              <div className="flex items-center relative user-dropdown">
                <button className={`text-gray-900 font-bold text-2xl hover:text-indigo-600 ${montserrat.className} hover:bg-slate-200 transition-all duration-300 scale-100 hover:scale-110 hover:rounded-lg p-2`}>
                  Hi,{user?.name.split(' ')[0] || 'User'}
                </button>
                <button 
                  className="text-2xl ml-1 hover:text-indigo-600 transition-all duration-300" 
                  onClick={handleUserMenuClick}
                >
                  {userDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                
                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {userMenuItems.map((item, index) => (
                      <button
                        key={item.name}
                        onClick={() => handleMenuItemClick(item.href)}
                        className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 ${montserrat.className}`}
                      >
                        {item.name}
                      </button>
                    ))}
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleLogOut}
                      className={`w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 ${montserrat.className}`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
                <a href="#" className={`text-gray-900 font-bold text-2xl hover:text-indigo-600 ${montserrat.className} hover:bg-slate-200 transition-all duration-300 scale-100 hover:scale-110 hover:rounded-lg p-2`} onClick={LoginClick}>
                Log in
              </a>
            )}
          </div>
          <button className="md:hidden p-2 text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <TfiMenuAlt className="text-2xl text-indigo-600" /> : <TfiMenuAlt className="text-2xl" />}
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg p-4 space-y-4 text-center">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className={`block text-gray-900 font-medium hover:text-indigo-600 ${montserrat.className} transition-all duration-300 scale-100 hover:scale-105`}>
                {item.name}
              </a>
            ))}
            <a href="#" className={`block text-gray-900 font-medium hover:text-indigo-600 ${montserrat.className} transition-all duration-300 scale-100 hover:scale-105`}>Log in</a>
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

  </div>
  )
}

export default Header;