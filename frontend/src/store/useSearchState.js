import { create } from "zustand";

export const useSearchState = create((set) => ({
    searchValue: '',
    setSearchValue: (searchValue) => set({ searchValue }),
})) 