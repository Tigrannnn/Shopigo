import { create } from 'zustand';

/**
 * Global state for select dropdowns/modals.
 * Use activeSelect to control which select is currently open.
 */
export const useSelectState = create((set) => ({
  activeSelect: null, // e.g. 'category' | 'seller' | null

  openSelectModal: (key) => set({ activeSelect: key }),
  closeSelectModal: () => set({ activeSelect: null }),
  toggleSelectModal: (key) =>
    set((state) => ({ activeSelect: state.activeSelect === key ? null : key })),
})); 