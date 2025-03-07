'use client'
import Header from '../../components/Header'
import { Sigmar } from 'next/font/google'
import { useStore } from '@/zustand/store'
import { useEffect } from 'react'
const sigmar = Sigmar({ subsets: ['latin'], weight: ['400'] })

const FindPlayer = () => {
    const { setShowFindEvent, setShowHostEvent, setShowFindPlayer } = useStore();
    useEffect(() => {
        setShowFindEvent(false);
        setShowHostEvent(false);
        setShowFindPlayer(true);
    }, []);
    return (
        <div className="bg-white max-w-screen flex flex-col items-center pt-24 h-screen">   
         <div className="bg-white h-24 flex flex-col items-center pt-24">
            <Header />
         </div>
         <div>
            <p className={`${sigmar.className} text-4xl font-bold text-black text-center`}>Find Player</p>
         </div>
            
        </div>
    );
}

export default FindPlayer;