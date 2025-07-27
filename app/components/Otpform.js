import { Sigmar } from 'next/font/google'
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useStore } from '@/zustand/store';

const sigmar = Sigmar({ subsets: ['latin'], weight: ['400'] })

const Otpform = ({ name, email, password }) => {

    const { setShowOtp, setShowSignup } = useStore();

    const [otp, setOtp] = useState("");


    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    }
    const handleOtpSubmit = () => {
        otpVerify({ otp, email });
        if (!isError) {
            setShowOtp(false);
            setShowSignup(false);
            setShowLogin(true);
        }

    }



    const { mutate: otpVerify, isError, isLoading } = useMutation({
        mutationFn: (data) => {
            return fetch("/api/auth/otpverified", {
                method: "POST",
                body: JSON.stringify(data),

            });
        },
        onSuccess: () => {
            // console.log("OTP verified");
            setShowOtp(false);
        },
        onError: (error) => {
            // console.log("OTP verification failed", error);
        },
    })
    return (
        <div className='flex flex-col items-center  h-[70vh] w-96 rounded-3xl bg-gradient-to-b from-indigo-500 via-indigo-100 to-white'>
            <h1 className={`text-4xl font-bold text-white ${sigmar.className} mt-7   rounded-xl`}>Otp Verification</h1>
            <p className='text-white mt-4'>Check your email for the OTP</p>
            <input type="text" placeholder='OTP' className={`p-2 rounded-xl w-3/4 text-black focus:outline-none ${sigmar.className} mt-4`} onChange={handleOtpChange} />
            <button className={`w-1/2 p-2  bg-blue-500 text-white rounded-xl shadow-xl hover:bg-blue-600 ${sigmar.className} hover:scale-105 transition-all duration-300 mt-4`} onClick={handleOtpSubmit}>Verify</button>

        </div>
    );
}

export default Otpform;