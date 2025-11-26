import { create } from 'zustand';

export const useProfileState = create((set) => ({
    setRole: (user) => set({ user }),
    setName: (name) => set({ name }),
    setPhoneNumber: (phoneNumber) => set({ phoneNumber: phoneNumber }),
    setEmail: (email) => set({ email: email }),
    setUser: (data) => set((state) => {
        return {...state, ...data}
    }),
    logOut: () => set(() => ({
        role: null,
        name: '',
        phoneNumber: '',
        email: ''
    }))
}));