import { createOrder, createOrderDirect, getAllOrders, getOrders } from "@/http/orderApi";
import { useToastState } from "@/store/useToastState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthQuery } from "./useUsersQuery";

/**
 * Hook for fetching user's orders
 * Only enabled when user is authenticated
 * @returns {Object} React Query object with orders data
 */
export function useGetOrdersQuery() {
    const { data: user } = useAuthQuery()

    return useQuery({
        queryKey: ['orders'],
        queryFn: () => getOrders(),
        enabled: !!user,
        staleTime: 1000 * 60 * 5
    })
}

/**
 * Hook for fetching all orders (admin functionality)
 * Only enabled when user is authenticated
 * @returns {Object} React Query object with all orders data
 */
export function useGetAllOrdersQuery() {
    const { data: user } = useAuthQuery()

    return useQuery({
        queryKey: ['allOrders'],
        queryFn: () => getAllOrders(),
        enabled: !!user,
    })
}

/**
 * Hook for creating a new order from selected basket items
 * Invalidates orders and basket queries on success
 * @returns {Object} Mutation object
 */
export function useCreateOrderQuery() {
    const queryClient = useQueryClient()
    const toast = useToastState(state => state.toast)

    return useMutation({
        mutationFn: () => createOrder(),

        // Invalidate queries and show toast on success
        onSuccess: () => {
            queryClient.invalidateQueries(['orders'])
            queryClient.invalidateQueries(['basket'])
            toast('Order created successfully')
        }
    })
}

/**
 * Hook for creating a direct order (Buy Now)
 * Creates an order for a single product without adding to basket
 * @returns {Object} Mutation object
 */
export function useBuyNowQuery() {
    const queryClient = useQueryClient()
    const toast = useToastState(state => state.toast)

    return useMutation({
        mutationFn: ({ productId, quantity = 1 }) => createOrderDirect(productId, quantity),

        // Invalidate queries and show toast on success
        onSuccess: () => {
            queryClient.invalidateQueries(['orders'])
            toast('Order placed successfully')
        },

        // Show error message on failure
        onError: (error) => {
            toast(error?.response?.data?.message || 'Failed to place order')
        }
    })
}