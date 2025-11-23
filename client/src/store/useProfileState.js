import { create } from 'zustand';

export const useProfileState = create((set) => ({
    centerModal: '',
    openCenterModal: (modal) => set({ centerModal: modal }),
    closeCenterModal: () => set({ centerModal: '' }),

    // share modal state
    shareUrl: '',
    setShareUrl: (shareUrl) => set({ shareUrl }),

    user: 'guest',
    balance: 0,
    name: '',
    phoneNumber: '',
    email: '',
    cards: [],
    setUser: (user) => set({ user }),
    setName: (name) => set({ name }),
    setPhoneNumber: (phoneNumber) => set({ phoneNumber: phoneNumber }),
    setEmail: (email) => set({ email: email }),
}));