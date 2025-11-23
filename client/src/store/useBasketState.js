import { create } from 'zustand';
import { useToastState } from './useToastState';

export const useBasketState = create((set) => ({
    basketProducts: [],
    selectedIds: [],
    addToBasket: (product) => set((state) => {
        const newBasketProducts = [...state.basketProducts, { ...product, quantity: 1 }];
        const newSelectedIds = newBasketProducts.map((p) => p.id);
        return {
            basketProducts: newBasketProducts,
            selectedIds: newSelectedIds,
            toast: useToastState.getState().toast('Product added to basket', false)
        };
    }),
    removeFromBasket: (product) => set((state) => {
        const newBasketProducts = state.basketProducts.filter((basketProduct) => basketProduct.id !== product.id);
        const newSelectedIds = state.selectedIds.filter((id) => id !== product.id);
        return {
            basketProducts: newBasketProducts,
            selectedIds: newSelectedIds,
            toast: useToastState.getState().toast(
                'Product removed from basket',
                true,
                product,
                () => {
                    useBasketState.getState().addToBasket(product);
                }
            )
        };
    }),
    toggleSelected: (productId) => set((state) => ({
        selectedIds: state.selectedIds.includes(productId)
            ? state.selectedIds.filter((id) => id !== productId)
            : [...state.selectedIds, productId]
    })),
    selectAll: () => set((state) => ({
        selectedIds: state.basketProducts.map((product) => product.id)
    })),
    clearSelected: () => set({ selectedIds: [] }),
    deleteSelected: () => set((state) => {
        const newBasketProducts = state.basketProducts.filter((product) => !state.selectedIds.includes(product.id));
        return {
            basketProducts: newBasketProducts,
            selectedIds: []
        };
    }),

    increaseQuantity: (productId) => set((state) => {
        const newBasketProducts = state.basketProducts.map((product) => product.id === productId ? { ...product, quantity: product.quantity + 1 } : product);
        return {
            basketProducts: newBasketProducts
        };
    }),
    decreaseQuantity: (productId) => set((state) => {
        const newBasketProducts = state.basketProducts.map((product) => product.id === productId ? { ...product, quantity: product.quantity - 1 } : product);
        return {
            basketProducts: newBasketProducts
        };
    })
}));