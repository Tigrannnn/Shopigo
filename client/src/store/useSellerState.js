import { create } from 'zustand';

export const useSellerState = create((set) => ({
    isSellerInfoModalOpen: false,
    openSellerInfoModal: () => set({ isSellerInfoModalOpen: true }),
    closeSellerInfoModal: () => set({ isSellerInfoModalOpen: false }),

    sellerProducts: [],
    setSellerProducts: (products) => set((state) => {
        return {...state, sellerProducts: products}
    }),
})); 