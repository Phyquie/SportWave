'use client'
import Header from "@/app/components/Header";
import { useStore } from "@/zustand/store";
import { useEffect } from "react";
import { Sigmar } from 'next/font/google'

const sigmar = Sigmar({ subsets: ['latin'], weight: ['400'] })

const MyProfile = () => {
    const { setShowMyProfile , setShowFindEvent , setShowFindPlayer , setShowHostEvent} = useStore();
    useEffect(() => {
        setShowMyProfile(true);
        setShowFindEvent(false);
        setShowFindPlayer(false);
        setShowHostEvent(false);
    }, []);
    return (
        <div className='flex items-center justify-center h-screen'>
            <Header />
            <div className='flex flex-col items-center justify-center'>
                <h1 className={`${sigmar.className} text-3xl font-bold text-white mt-10`}>My Profile</h1>
            </div>
        </div>
    );
}

export default MyProfile;