import { create } from "zustand";

export const useMenuState = create((set) => ({
    isMenuModalOpen: false,
    setMenuModalToggle: () => set(state => ({ isMenuModalOpen: !state.isMenuModalOpen })),
    setMenuModalClose: () => set({ isMenuModalOpen: false }),
}))