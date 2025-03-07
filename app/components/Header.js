'use client'
import { Sigmar } from 'next/font/google'
import { useStore } from '@/zustand/store'
import { useRouter } from 'next/navigation'
import {useMutation} from '@tanstack/react-query'





const sigmar = Sigmar({ subsets: ['latin'], weight: ['400'] })

const Header = () => {
    const router = useRouter();
    const { ShowFindEvent, setShowFindEvent, ShowFindPlayer, setShowFindPlayer, ShowHostEvent, setShowHostEvent , ShowMyProfile , setShowMyProfile} = useStore()

    const handleHostClick = () => {
        console.log('Host Event Clicked');
        setShowHostEvent(true);
        setShowFindEvent(false);
        setShowFindPlayer(false);
        router.push('/service/hostvenue');
    }

    const handleFindEventClick = () => {
        setShowHostEvent(false);
        setShowFindEvent(true);
        setShowFindPlayer(false);
        router.push('/service/findevent');
    }

    const handleFindPlayerClick = () => {
        setShowHostEvent(false);
        setShowFindEvent(false);
        setShowFindPlayer(true);
        router.push('/service/findplayer');
    }

    const handleMyProfileClick = () => {
        setShowHostEvent(false);
        setShowFindEvent(false);
        setShowFindPlayer(false);
        setShowMyProfile(true);
        router.push('/service/myprofile');
    }
    const {mutate: logout , isError , isLoading} = useMutation({
        mutationFn: () => {
             return fetch('/api/auth/logout',{
                method: 'POST',
                body: JSON.stringify({}),
             });
        },
        onSuccess: () => {
            console.log('Logout successful');
            router.push('/');
          },
          onError: (error) => {
            console.log('Logout failed', error);
          } 
    })
    return (
        <div >
            <header className="top-0 left-0 w-1/6 bg-white shadow-md z-50 fixed h-full flex flex-col  py-10 ">
                <a href="/" className={`text-3xl font-bold text-indigo-600 ${sigmar.className} transition-all duration-300 scale-100 hover:scale-110 text-center`}>Home</a>
                <button className={`${sigmar.className} text-3xl font-bold text-black mt-10 hover:text-blue-500 ${ShowHostEvent ? 'text-blue-500' : ''}`} 
                    onClick={() => handleHostClick()}>Host Event</button>        
                <button className={`${sigmar.className} text-3xl font-bold text-black mt-10 hover:text-blue-500 ${ShowFindEvent ? 'text-blue-500' : ''}`} 
                    onClick={() => handleFindEventClick()}>Find Event</button>
                <button className={`${sigmar.className} text-3xl font-bold text-black mt-10 hover:text-blue-500 ${ShowFindPlayer ? 'text-blue-500' : ''}`} 
                    onClick={() => handleFindPlayerClick()}>Find Player</button>
                <button className={`${sigmar.className} text-3xl font-bold text-black mt-10 hover:text-blue-500 ${ShowMyProfile ? 'text-blue-500' : ''}`} 
                    onClick={() => handleMyProfileClick()}>My Profile</button>

                 <button onClick={() => logout()} className={`${sigmar.className} text-3xl font-bold text-black mt-10 hover:text-blue-500 ${isLoading ? 'text-blue-500' : ''}`}>Log Out</button>   
            </header>

        </div>
    );
}

export default Header;