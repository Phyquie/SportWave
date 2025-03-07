'use client'
import { Sigmar } from 'next/font/google'
import Header from '../../components/Header'
import { useStore } from '@/zustand/store'
import { useEffect } from 'react'

const sigmar = Sigmar({ subsets: ['latin'], weight: ['400'] })

const HostVenue = () => {
    const { setShowFindEvent, setShowHostEvent, setShowFindPlayer } = useStore();
    useEffect(() => {
        setShowFindEvent(false);
        setShowHostEvent(true);
        setShowFindPlayer(false);
    }, []);
    return (
        <div>
            <Header />
        </div>
    );
}

export default HostVenue;