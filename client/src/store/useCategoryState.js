import { create } from 'zustand'

export const useCategoryState = create((set) => ({
    categories: [],
    setCategories: (categories) => set((state) => {
        return {...state, categories}
    }),

    isFilterModalOpen: false,
    openFilterModal: () => set({ isFilterModalOpen: true }),
    closeFilterModal: () => set({ isFilterModalOpen: false }),
}))