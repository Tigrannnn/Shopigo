import { create } from 'zustand';

export const useColorVariantState = create((set) => ({
    isColorVariantModalOpen: false,
    modalPosition: { left: 0 },
    openColorVariantModal: (position) => set({ 
        isColorVariantModalOpen: true,
        modalPosition: position 
    }),
    closeColorVariantModal: () => set({ isColorVariantModalOpen: false }),
})); 