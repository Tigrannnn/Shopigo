import { create } from 'zustand'

export const useProductsState = create((set) => ({
    products: [],
    setProducts: (products) => set((state) => {
        return {...state, products}
    }),
}))