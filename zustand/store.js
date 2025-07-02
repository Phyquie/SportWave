import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from 'js-cookie'

export const useStore = create(
  persist(
    (set) => ({
      ShowSignup: false,
      setShowSignup: (value) => set({ ShowSignup: value }),
      ShowOtp: false,
      setShowOtp: (value) => set({ ShowOtp: value }),
      ShowLogin: false,
      setShowLogin: (value) => set({ ShowLogin: value }),
      ShowFindEvent: false,
      setFindEvent: (value) => set({ ShowFindEvent: value }),
      ShowFindPlayer: false,
      setFindPlayer: (value) => set({ ShowFindPlayer: value }),
      ShowHostEvent: false,
      setHostEvent: (value) => set({ ShowHostEvent: value }),
      ShowMyProfile: false,
      setShowMyProfile: (value) => set({ ShowMyProfile: value }),
      isLogIn: typeof window !== 'undefined' ? !!Cookies.get('token') : false,
      setIsLogIn: (value) => set({ isLogIn: value }),
    })
  )
);
