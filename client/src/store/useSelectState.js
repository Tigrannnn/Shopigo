import { create } from 'zustand';

export const useSelectState = create((set) => ({
  isSelectModalOpen: false,
  openSelectModal: () => set({ isSelectModalOpen: true }),
  closeSelectModal: () => set({ isSelectModalOpen: false }),
})); 