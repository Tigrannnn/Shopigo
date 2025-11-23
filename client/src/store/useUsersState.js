import { create } from 'zustand';

export const useUsersState = create((set) => ({
    users: [],
    addUser: (user) => set((state) => ({ users: [...state.users, ...user] }))
}));