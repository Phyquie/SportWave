
import { Sigmar } from 'next/font/google'   
import { IoMdMail, IoMdPerson } from "react-icons/io";
import { IoMdLock } from "react-icons/io";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";
import { useStore } from '@/zustand/store';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from './Spinner';
import Otpform from './Otpform';
import axios from 'axios';


const sigmar = Sigmar({ subsets: ['latin'], weight: ['400'] })
const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { ShowSignup, setShowSignup } = useStore();
    const { ShowOtp, setShowOtp } = useStore();
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

    const handleChange = (e) => {
        const {name:inputName , value} = e.target;
        switch(inputName){
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    }

   

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({name , email , password});
        setShowOtp(true);
    }

    const{mutate , isError ,isLoading} = useMutation({
            mutationFn: ({name , email , password}) => {
            return fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name , email , password}),
            });
        },
        onSuccess: () => {
         console.log("Signup successful");
         setShowOtp(true);
        },
        onError: (error) => {
            console.log("Signup failed", error);
        },
    })

    return (
        ShowOtp ? <Otpform name={name} email={email} password={password} /> :
        <div className='flex flex-col items-center  h-[70vh] w-96 rounded-3xl bg-gradient-to-b from-indigo-500 via-indigo-100 to-white'>
        <h1 className={`text-4xl font-bold text-white ${sigmar.className} mt-7   rounded-xl`}>Sign Up</h1>
        <div className='flex flex-col p-2 mt-6 items-center justify-center w-[80%]'>
        <div className="flex items-center w-full bg-white rounded-xl p-2 mt-4 shadow-xl">
        <IoMdPerson className="text-5xl text-gray-700 bg-white rounded-xl p-2" />
        <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} className={`p-2 rounded-xl w-full text-black focus:outline-none ${sigmar.className}`} />
        </div>   
        <div className="flex items-center w-full bg-white rounded-xl p-2 mt-4 shadow-xl">
        <IoMdMail className="text-5xl text-gray-700 bg-white rounded-xl p-2" />
        <input type="text" placeholder="Email" name="email" value={email} onChange={handleChange} className={`p-2 rounded-xl w-full text-black focus:outline-none ${sigmar.className}`} />
        </div>
        <div className='flex  items-center justify-center w-full bg-white rounded-xl p-2 mt-4 shadow-xl'>
        <IoMdLock className="text-5xl text-gray-700 bg-white rounded-xl p-2" />
        <input type={showPassword ? "text" : "password"} placeholder='Password' name="password" value={password} onChange={handleChange} className={`p-2 rounded-xl w-full text-black ${sigmar.className}`} />
        {showPassword ? <BsFillEyeFill className='text-5xl text-gray-700 bg-white rounded-xl p-2' onClick={() => setShowPassword(!showPassword)} /> : <RiEyeCloseFill className='text-5xl text-gray-700 bg-white rounded-xl p-2' onClick={() => setShowPassword(!showPassword)} />}
        </div>
        </div>
        <div>
        </div>
        <div className='flex items-center justify-center w-full mt-4'>
        <button className={`w-1/2 p-2  bg-blue-500 text-white rounded-xl shadow-xl hover:bg-blue-600 ${sigmar.className} hover:scale-105 transition-all duration-300` } onClick={handleSubmit}>{isLoading ? <LoadingSpinner /> : "Get Started"}</button>
        </div>

       <div className = "h-1 bg-gray-400 mt-4 w-3/4"></div>

       <div className='flex  items-center justify-center w-2/5 mt-3 text-center'>
       <p className='text-gray-500 text-md'>Already have an account? <button   onClick={() => setShowSignup(false)} className={`text-blue-500 hover:text-blue-600 ${sigmar.className} transition-all duration-300 `}>Sign in</button></p>
       </div>
    </div>
      
    );
}

export default Signup;