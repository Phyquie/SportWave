'use client'
import { Sigmar } from 'next/font/google'
import Header from '../../components/Header'
import { useStore } from '@/zustand/store'
import { useEffect } from 'react'

const sigmar = Sigmar({ subsets: ['latin'], weight: ['400'] })
 const FindEvent = () => {
    const { setShowFindEvent, setShowHostEvent, setShowFindPlayer } = useStore();
    useEffect(() => {
        setShowFindEvent(true);
        setShowHostEvent(false);
        setShowFindPlayer(false);
    }, []);
    return (
        <div className='flex items-center justify-center h-screen'>
            <Header />
            Find Event
        </div>
    );
}

export default FindEvent;