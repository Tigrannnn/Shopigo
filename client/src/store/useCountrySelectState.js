import { create } from 'zustand';

export const useCountrySelectState = create((set) => ({
  isCountrySelectModalOpen: false,
  openCountrySelectModal: () => set({ isCountrySelectModalOpen: true }),
  closeCountrySelectModal: () => set({ isCountrySelectModalOpen: false }),
})); 