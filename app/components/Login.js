
import { Sigmar } from 'next/font/google'
import Google from '../../public/photos/google.png'
import Image from 'next/image'
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";
import { IoMdLock } from "react-icons/io";
import { useState } from 'react';
import { useStore } from '@/zustand/store';
import Signup from './Signup';
import { IoMdMail } from "react-icons/io";
import { signInWithPopup , GoogleAuthProvider } from "firebase/auth";
import { auth ,googleProvider } from "@/firebase/firebase";
import { useMutation } from '@tanstack/react-query';




const sigmar = Sigmar({ subsets: ['latin'], weight: ['400'] })
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const { setShowLogin } = useStore();
    const { ShowSignup , setShowSignup } = useStore();
    
    //const googleProvider = new GoogleAuthProvider();

    const {mutate : login , isError ,isLoading} = useMutation({
        mutationFn: (data) => {
            return fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(data),
            });
        },
        onSuccess: () => {
            console.log("Login successful");
            setShowLogin(false);
            setShowSignup(false);
            
        },
        onError: (error) => {
            console.log("Login failed", error);
        }
    });
     const handleLogin = (e) => {
        e.preventDefault();
        login({email , password});
     }
     const handleChange = (e) => {
        const {name , value} = e.target;
        switch(name){
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
     }

    
    const signInWithGoogle = async () => {
        try {
            console.log("Signing in with Google");
            setError(null);
           
            const result = await signInWithPopup(auth, googleProvider);
            const user =  await result.user;
            console.log("User signed in:", user);
            const token = user.uid;
            console.log( "Token is" ,token);
           

            const response = await fetch("http://localhost:3000/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token_google: token ,name: user.displayName ,email: user.email ,photo_url: user.photoURL }),
            });
           if(!response.ok) {
            throw new Error("Failed to sign in with Google through the server");
           }

            console.log("Google login successful");
         // Here you might want to redirect or update your app state
        } catch (error) {
            setError(error.message);
            console.error("Error signing in with Google:", error);
        } 
    };
  return (
    ShowSignup ? <Signup /> : 
    <div className='flex flex-col items-center  h-[70vh] w-96 rounded-3xl bg-gradient-to-b from-indigo-500 via-indigo-100 to-white'>
        <h1 className={`text-4xl font-bold text-white ${sigmar.className} mt-7   rounded-xl`}>Sign In</h1>
        <div className='flex flex-col p-2 mt-6 items-center justify-center w-[80%]'>
        <div className="flex items-center w-full bg-white rounded-xl p-2 mt-4 shadow-xl">
        <IoMdMail className="text-5xl text-gray-700 bg-white rounded-xl p-2" />
        <input type="text" placeholder="Email" className={`p-2 rounded-xl w-full text-black focus:outline-none ${sigmar.className}`} onChange={handleChange} name="email" />
        </div>

        <div className='flex  items-center justify-center w-full bg-white rounded-xl p-2 mt-4 shadow-xl'>
        <IoMdLock className="text-5xl text-gray-700 bg-white rounded-xl p-2" />
        <input type={showPassword ? "text" : "password"} placeholder='Password' className={`p-2 rounded-xl w-full text-black ${sigmar.className}`} onChange={handleChange} name="password" />
        {showPassword ? <BsFillEyeFill className='text-5xl text-gray-700 bg-white rounded-xl p-2' onClick={() => setShowPassword(!showPassword)} /> : <RiEyeCloseFill className='text-5xl text-gray-700 bg-white rounded-xl p-2' onClick={() => setShowPassword(!showPassword)} />}
        </div>
        </div>
        <div>
        </div>
        <div className='flex items-center justify-center w-full mt-4'>
        <button className={`w-1/2 p-2  bg-blue-500 text-white rounded-xl shadow-xl hover:bg-blue-600 ${sigmar.className} hover:scale-105 transition-all duration-300`} onClick={handleLogin}>Get Started</button>
        </div>



        <div className="flex items-center my-4">
       <hr className="flex-grow border-gray-300"></hr>
       <span className="px-3 text-gray-500 text-sm">Or sign in with</span>
       <hr className="flex-grow border-gray-300"></hr>
       </div>
       <div className='flex items-center justify-center w-2/5'>
       <Image 
            src={Google} 
            alt='Google' 
            className={`w-1/2 p-2 rounded-xl shadow-xl hover:cursor-pointer opacity-95 
                ${isLoading ? 'opacity-50' : 'hover:opacity-100 hover:scale-105'} 
                transition-all duration-300`}
            onClick={!isLoading ? signInWithGoogle : undefined} 
        />
       </div>
       {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
    )}
       <div className = "h-1 bg-gray-400 mt-4 w-3/4"></div>

       <div className='flex  items-center justify-center w-2/5 mt-3 text-center'>
       <p className='text-gray-500 text-md'>Don't have an account? <button onClick={() => setShowSignup(true)} className={`text-blue-500 hover:text-blue-600 ${sigmar.className} transition-all duration-300 `}>Sign up</button></p>
       </div>
    </div>
    )
}

export default Login
