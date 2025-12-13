
import { create } from 'zustand';
import { useToastState } from './useToastState';
import { addBasketProduct, removeBasketProduct, updateQuantity, toggleSelected, toggleSelectAll } from '../http/basketApi';

export const useBasketState = create((set) => ({
    basketProducts: [],
    // isAllSelected: ,
    setBasketProducts: (products) => set({ basketProducts: products }),

    addToBasket: (product) => set((state) => {
        addBasketProduct(product.id);

        return {
            basketProducts: [...state.basketProducts, { ...product, quantity: 1, selected: true }],
            toast: useToastState.getState().toast('Product added to basket', false)
        };
    }),
 
    increaseQuantity: (productId) => set((state) => {
        const newBasketProducts = state.basketProducts.map((product) => product.id === productId ? { ...product, quantity: product.quantity += 1 } : product);
        updateQuantity(productId, '+');
        return {
            basketProducts: newBasketProducts
        };
    }),
    decreaseQuantity: (productId) => set((state) => {
        const newBasketProducts = state.basketProducts.map((product) => product.id === productId ? { ...product, quantity: product.quantity -= 1 } : product);
        updateQuantity(productId, '-');
        return {
            basketProducts: newBasketProducts
        };
    }),

    removeFromBasket: (product) => set((state) => {
        const newBasketProducts = state.basketProducts.filter((basketProduct) => basketProduct.id !== product.id);
        removeBasketProduct(product.id);
        return {
            basketProducts: newBasketProducts,
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
    
    toggleSelected: (productId) => set((state) => {
        toggleSelected(productId);
        return {
            basketProducts: state.basketProducts.map((product) => 
                product.id === productId ? { ...product, selected: !product.selected } : product
            )
        };
    }),
    toggleSelectAll: () => set((state) => {
        const isAllSelected = state.basketProducts.every(product => product.selected)
        toggleSelectAll()
        return {
            basketProducts: state.basketProducts.map((product) => ({
                ...product,
                selected: !isAllSelected
            }))
        };
    }),
    // clearSelected: () => set({ selectedIds: [] }),
    // deleteSelected: () => set((state) => {
    //     const newBasketProducts = state.basketProducts.filter((product) => !state.selectedIds.includes(product.id));
    //     return {
    //         basketProducts: newBasketProducts,
    //         selectedIds: []
    //     };
    // }),
}));