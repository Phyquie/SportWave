import { create } from "zustand";

export const useStore = create((set) => ({
    ShowSignup: false,
    setShowSignup: (value) => set({ ShowSignup: value }),
    ShowOtp: false,
    setShowOtp: (value) => set({ ShowOtp: value }),
    ShowLogin: false,
    setShowLogin: (value) => set({ ShowLogin: value }),
    ShowFindEvent: false,
    setShowFindEvent: (value) => set({ ShowFindEvent: value }),
    ShowFindPlayer: false,
    setShowFindPlayer: (value) => set({ ShowFindPlayer: value }),
    ShowHostEvent: false,
    setShowHostEvent: (value) => set({ ShowHostEvent: value }),
    ShowMyProfile: false,
    setShowMyProfile: (value) => set({ ShowMyProfile: value }),
}));
