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
import { useRouter } from 'next/navigation';
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400'] })
const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const { setShowLogin , setIsLogIn } = useStore();
    const { ShowSignup , setShowSignup } = useStore();
    
    //const googleProvider = new GoogleAuthProvider();

    const { mutate: login, isError, isLoading } = useMutation({
        mutationFn: async (data) => {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || errorData.message || `HTTP error! status: ${res.status}`);
          }
      
          return res.json();
        },
      
        onSuccess: (data) => {
          console.log("Login successful", data);
          setIsLogIn(true);
          setShowLogin(false);
          setShowSignup(false);
        },
      
        onError: (error) => {
          console.error("Login failed:", error.message);
          setError(error.message);
        },
      });
      
     const handleLogin = (e) => {
        e.preventDefault();
        setError(null); // Clear any previous errors
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
            const user = result.user;
            const token = user.uid;
           
            const response = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    token_google: token,
                    name: user.displayName,
                    email: user.email,
                    photo_url: user.photoURL 
                }),
            });
           
            if (!response.ok) {
                throw new Error("Failed to sign in with Google through the server");
            }

            console.log("Google login successful");
            
            // Handle state updates and navigation in a separate async function
            await handleSuccessfulLogin();
            
        } catch (error) {
            setError(error.message);
            console.error("Error signing in with Google:", error);
        } 
    };

    // Add this new function right after signInWithGoogle
    const handleSuccessfulLogin = async () => {
        try {
            console.log("Starting post-login actions");
            // First update the states
            setShowLogin(false);
            setShowSignup(false);
            setIsLogIn(true);
            
        } catch (err) {
            console.error("Error in post-login handling:", err);
        }
    };

  return (
    ShowSignup ? <Signup /> : 
    <div className='flex flex-col items-center  h-[70vh] w-96 rounded-3xl bg-gradient-to-b from-indigo-500 via-indigo-100 to-white'>
        <h1 className={`text-4xl font-bold text-white ${montserrat.className} mt-7   rounded-xl`}>Sign In</h1>
        <div className='flex flex-col p-2 mt-6 items-center justify-center w-[80%]'>
        <div className="flex items-center w-full bg-white rounded-xl p-2 mt-4 shadow-xl">
        <IoMdMail className="text-5xl text-gray-700 bg-white rounded-xl p-2" />
        <input type="text" placeholder="Email" className={`p-2 rounded-xl w-full text-black focus:outline-none ${montserrat.className}`} onChange={handleChange} name="email" />
        </div>

        <div className='flex  items-center justify-center w-full bg-white rounded-xl p-2 mt-4 shadow-xl'>
        <IoMdLock className="text-5xl text-gray-700 bg-white rounded-xl p-2" />
        <input type={showPassword ? "text" : "password"} placeholder='Password' className={`p-2 rounded-xl w-full text-black ${montserrat.className}`} onChange={handleChange} name="password" />
        {showPassword ? <BsFillEyeFill className='text-5xl text-gray-700 bg-white rounded-xl p-2' onClick={() => setShowPassword(!showPassword)} /> : <RiEyeCloseFill className='text-5xl text-gray-700 bg-white rounded-xl p-2' onClick={() => setShowPassword(!showPassword)} />}
        </div>
        </div>
        <div>
        </div>
        <div className='flex items-center justify-center w-full mt-4'>
        <button className={`w-1/2 p-2  bg-blue-500 text-white rounded-xl shadow-xl hover:bg-blue-600 ${montserrat.className} hover:scale-105 transition-all duration-300`} onClick={handleLogin} disabled={isLoading}>{isLoading ? 'Signing In...' : 'Get Started'}</button>
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
        <p className={`text-red-500 text-sm mt-2 ${montserrat.className}`}>{error}</p>
    )}
       <div className = "h-1 bg-gray-400 mt-4 w-3/4"></div>

       <div className='flex  items-center justify-center w-2/5 mt-3 text-center'>
       <p className='text-gray-500 text-md'>Don't have an account? <button onClick={() => setShowSignup(true)} className={`text-blue-500 hover:text-blue-600 ${montserrat.className} transition-all duration-300 `}>Sign up</button></p>
       </div>
    </div>
    )
}

export default Login
