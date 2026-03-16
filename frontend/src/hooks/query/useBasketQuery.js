import {
    addBasketProduct,
    getBasket,
    removeBasketProduct,
    toggleSelectAll,
    toggleSelected,
    updateQuantity
} from "@/http/basketApi";
import { useToastState } from "@/store/useToastState";
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthQuery } from "./useUsersQuery";
import {
    addToGuestBasket,
    decreaseQuantityInGuestBasket,
    getGuestBasket,
    increaseQuantityInGuestBasket,
    removeFromGuestBasket,
    toggleSelectAllInGuestBasket,
    toggleSelectedInGuestBasket
} from "@/utils/guestBasket";

/**
 * Hook for fetching user's basket (authenticated or guest)
 * @returns {Object} React Query object with basket data
 */
export function useGetBasketQuery() {
    const { data: user } = useAuthQuery()

    return useQuery({
        queryKey: ['basket'],
        queryFn: () => user ? getBasket() : getGuestBasket(),
        placeholderData: [],
        staleTime: 1000 * 60 * 5,
    })
}

/**
 * Hook for adding a product to basket
 * Handles optimistic updates for both authenticated and guest users
 * @returns {Object} Mutation object
 */
export function useAddToBasketQuery() {
    const { data: user } = useAuthQuery()
    const toast = useToastState(state => state.toast)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (product) => user ? addBasketProduct(product.id) : Promise.resolve(),
        
        // Optimistic update before API call
        onMutate: async (product) => {
            await queryClient.cancelQueries(['basket']);
            const previousBasket = queryClient.getQueryData(['basket']);

            // Guest user - use localStorage basket
            if (!user) {
                const newBasket = addToGuestBasket(product);
                queryClient.setQueryData(['basket'], newBasket);
                toast('Product added to basket');
                return { previousBasket };
            }

            // Authenticated user - optimistic update
            queryClient.setQueryData(['basket'], old => [{
                id: uuidv4(),
                productId: product.id,
                quantity: 1,
                selected: true,
                product: product,
            }, ...(old || [])]);

            toast('Product added to basket')
            return { previousBasket };
        },
        
        // Refetch after successful mutation
        onSuccess: (data) => {
            queryClient.invalidateQueries(['basket']);
        },
        
        // Rollback on error
        onError: (err, product, context) => {
            queryClient.setQueryData(['basket'], context.previousBasket);
            toast('Failed to add product to basket');
            console.error(err);
        }
    })
}

/**
 * Hook for removing a product from basket
 * Handles optimistic updates for both authenticated and guest users
 * @returns {Object} Mutation object
 */
export function useRemoveFromBasketQuery() {
    const toast = useToastState(state => state.toast)
    const queryClient = useQueryClient()
    const { data: user } = useAuthQuery()

    return useMutation({
        mutationFn: (item) => user ? removeBasketProduct(item.productId || item.id) : Promise.resolve(),
        
        // Optimistic update before API call
        onMutate: async (item) => {
            await queryClient.cancelQueries(['basket']);
            const previousBasket = queryClient.getQueryData(['basket']);

            // Guest user - use localStorage basket
            if (!user) {
                const productId = item.productId || item.id;
                const newBasket = removeFromGuestBasket(productId);
                queryClient.setQueryData(['basket'], newBasket);
                toast('Product removed from basket');
                return { previousBasket };
            }

            // Authenticated user - optimistic update
            queryClient.setQueryData(
                ['basket'],
                (old) => old.filter(bp =>
                    bp.id !== item.id
                )
            );
            toast('Product removed from basket')
            return { previousBasket };
        },
        
        // Refetch after successful mutation
        onSuccess: () => {
            queryClient.invalidateQueries(['basket']);
        },
        
        // Rollback on error
        onError: (err, product, context) => {
            queryClient.setQueryData(['basket'], context.previousBasket);
            toast('Failed to remove product from basket');
            console.error(err);
        }
    })
}

/**
 * Hook for toggling product selection status in basket
 * Handles optimistic updates for both authenticated and guest users
 * @returns {Object} Mutation object
 */
export function useToggleSelectedQuery() {
    const queryClient = useQueryClient()
    const { data: user } = useAuthQuery()

    return useMutation({
        mutationFn: (basketProduct) => user ? toggleSelected(basketProduct.id) : Promise.resolve(),
        
        // Optimistic update before API call
        onMutate: async (basketProduct) => {
            await queryClient.cancelQueries(['basket']);
            const previousBasket = queryClient.getQueryData(['basket']);

            // Guest user - use localStorage basket
            if (!user) {
                const newBasket = toggleSelectedInGuestBasket(basketProduct);
                queryClient.setQueryData(['basket'], newBasket);
                return { previousBasket };
            }

            // Authenticated user - optimistic update
            queryClient.setQueryData(['basket'], old =>
                (old || []).map(bp =>
                    bp.id === basketProduct.id
                        ? { ...bp, selected: !bp.selected }
                        : bp
                )
            );

            return { previousBasket };
        },
        
        // Refetch after successful mutation
        onSuccess: () => {
            queryClient.invalidateQueries(['basket']);
        },
        
        // Rollback on error
        onError: (err, product, context) => {
            queryClient.setQueryData(['basket'], context.previousBasket);
            console.error(err);
        }
    })
}

/**
 * Hook for toggling selection status for all products in basket
 * Handles optimistic updates for both authenticated and guest users
 * @returns {Object} Mutation object
 */
export function useToggleSelectAllQuery() {
    const toast = useToastState(state => state.toast)
    const queryClient = useQueryClient()
    const { data: user } = useAuthQuery()

    return useMutation({
        mutationFn: () => user ? toggleSelectAll() : Promise.resolve(getGuestBasket()),
        
        // Optimistic update before API call
        onMutate: async () => {
            await queryClient.cancelQueries(['basket']);
            const previousBasket = queryClient.getQueryData(['basket']);

            // Check if all items are currently selected
            const allSelected = (previousBasket || []).every(item =>
                item.selected
            );

            // Guest user - use localStorage basket
            if (!user) {
                const newBasket = toggleSelectAllInGuestBasket(allSelected);
                queryClient.setQueryData(['basket'], newBasket);
                return { previousBasket };
            }

            // Authenticated user - optimistic update
            queryClient.setQueryData(['basket'], old =>
                (old || []).map(item => ({ ...item, selected: !allSelected }))
            );

            return { previousBasket };
        },
        
        // Refetch after successful mutation
        onSuccess: () => {
            queryClient.invalidateQueries(['basket']);
        },
        
        // Rollback on error
        onError: (err, variables, context) => {
            queryClient.setQueryData(['basket'], context.previousBasket);
            toast('Failed to select all products');
            console.error(err);
        }
    })
}

/**
 * Hook for increasing product quantity in basket
 * Handles optimistic updates for both authenticated and guest users
 * @returns {Object} Mutation object
 */
export function useIncreaseQuantityQuery() {
    const toast = useToastState(state => state.toast)
    const queryClient = useQueryClient()
    const { data: user } = useAuthQuery()

    return useMutation({
        mutationFn: (basketProduct) => user ? updateQuantity(basketProduct.id, '+') : Promise.resolve(),
        
        // Optimistic update before API call
        onMutate: async (basketProduct) => {
            await queryClient.cancelQueries(['basket']);
            const previousBasket = queryClient.getQueryData(['basket']);

            // Guest user - use localStorage basket
            if (!user) {
                const newBasket = increaseQuantityInGuestBasket(basketProduct);
                queryClient.setQueryData(['basket'], newBasket);
                return { previousBasket };
            }

            // Authenticated user - optimistic update
            queryClient.setQueryData(['basket'], old =>
                (old || []).map(item =>
                    item.id === basketProduct.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                )
            );

            return { previousBasket };
        },
        
        // Refetch after successful mutation
        onSuccess: () => {
            queryClient.invalidateQueries(['basket']);
        },
        
        // Rollback on error
        onError: (err, basketProduct, context) => {
            queryClient.setQueryData(['basket'], context.previousBasket);
            toast('Failed to increase quantity');
            console.error(err);
        }
    })
}

/**
 * Hook for decreasing product quantity in basket
 * Handles optimistic updates for both authenticated and guest users
 * Minimum quantity is 1
 * @returns {Object} Mutation object
 */
export function useDecreaseQuantityQuery() {
    const toast = useToastState(state => state.toast)
    const queryClient = useQueryClient()
    const { data: user } = useAuthQuery()

    return useMutation({
        mutationFn: (basketProduct) => user ? updateQuantity(basketProduct.id, '-') : Promise.resolve(),
        
        // Optimistic update before API call
        onMutate: async (basketProduct) => {
            await queryClient.cancelQueries(['basket']);
            const previousBasket = queryClient.getQueryData(['basket']);

            // Guest user - use localStorage basket
            if (!user) {
                const newBasket = decreaseQuantityInGuestBasket(basketProduct);
                queryClient.setQueryData(['basket'], newBasket);
                return { previousBasket };
            }

            // Authenticated user - optimistic update (min quantity = 1)
            queryClient.setQueryData(['basket'], old =>
                (old || []).map(item =>
                    item.id === basketProduct.id
                        ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }
                        : item
                )
            );

            return { previousBasket };
        },
        
        // Refetch after successful mutation
        onSuccess: () => {
            queryClient.invalidateQueries(['basket']);
        },
        
        // Rollback on error
        onError: (err, basketProduct, context) => {
            queryClient.setQueryData(['basket'], context.previousBasket);
            toast('Failed to decrease quantity');
            console.error(err);
        }
    })
}