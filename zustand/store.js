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
      isLogIn: false,
      setIsLogIn: (value) => set({ isLogIn: value }),
      user: null,
      setUser: (value) => set({ user: value }),
      setLocation: (value) => set({ location: value }),
      location:'',
      setPinCode: (value) => set({ pinCode: value }),
      pinCode: '',
      setLat : (value) => set({ lat: value }),
      lat:'',
      setLng:(value)=> set({lng:value}),
      lng:'',
    }),
    {
      name: 'sportwave-store',
      partialize: (state) => ({
        isLogIn: state.isLogIn,
        user: state.user,
      }),
    }
  )
);
