import { create } from "zustand";

export const useStore = create((set) => ({
    ShowSignup: false,
    setShowSignup: (value) => set({ ShowSignup: value }),
}));