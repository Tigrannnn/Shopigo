import { create } from 'zustand';

export const useSellerInfoState = create((set) => ({
    isSellerInfoModalOpen: false,
    openSellerInfoModal: () => set({ isSellerInfoModalOpen: true }),
    closeSellerInfoModal: () => set({ isSellerInfoModalOpen: false }),
})); 