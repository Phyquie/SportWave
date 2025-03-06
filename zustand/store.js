import { create } from "zustand";

export const useStore = create((set) => ({
    ShowSignup: false,
    setShowSignup: (value) => set({ ShowSignup: value }),
    ShowOtp: false,
    setShowOtp: (value) => set({ ShowOtp: value }),
    ShowLogin: false,
    setShowLogin: (value) => set({ ShowLogin: value }),
}));
