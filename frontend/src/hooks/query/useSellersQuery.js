import { 
    createSeller, 
    deleteSeller, 
    getOneSeller, 
    getSellers, 
    updateSeller 
} from "@/http/sellerApi";
import { useErrorState } from "@/store/useErrorState";
import { useModalState } from "@/store/useModalState";
import { useToastState } from "@/store/useToastState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Hook for fetching all sellers
 * @param {Object} options - Query options
 * @param {string} options.search - Search query string
 * @param {number} options.limit - Number of sellers per page (default: 12)
 * @returns {Object} React Query object with sellers data
 */
export function useGetSellers({ search, limit = 12 } = {}) {
    return useQuery({
        queryKey: ['sellers', search, limit],
        queryFn: () => getSellers()
    })
}

/**
 * Hook for fetching a single seller by ID
 * @param {string|number} id - Seller ID
 * @returns {Object} React Query object with seller data
 */
export function useGetSellerByIdQuery(id) {
    return useQuery({
        queryKey: ['seller', id],
        queryFn: () => getOneSeller(id)
    })
}

/**
 * Hook for creating a new seller
 * Invalidates sellers list and shows toast on success
 * @returns {Object} Mutation object
 */
export function useCreateSellerQuery() {
    const queryClient = useQueryClient()
    const toast = useToastState(state => state.toast)
    const closeModal = useModalState(state => state.closeModal)
    const setError = useErrorState(state => state.setError)

    return useMutation({
        mutationFn: (name) => createSeller(name),
        
        // Invalidate queries and show toast on success
        onSuccess: () => {
            queryClient.invalidateQueries(['sellers'])
            toast('Seller created successfully')
            closeModal()
        },
        onError: (error) => {
            setError(error.response?.data?.message || 'Failed to create seller')
        }
    })
}

export function useUpdateSellerQuery() {
    const queryClient = useQueryClient()
    const toast = useToastState(state => state.toast)
    const closeModal = useModalState(state => state.closeModal)
    const setError = useErrorState(state => state.setError)

    return useMutation({
        mutationFn: (seller) => updateSeller(seller),
        
        // Invalidate queries and show toast on success
        onSuccess: () => {
            queryClient.invalidateQueries(['sellers'])
            toast('Seller created successfully')
            closeModal()
        },
        onError: (error) => {
            setError(error.response?.data?.message || 'Failed to update seller')
        }
    })
}

/**
 * Hook for deleting a seller
 * Invalidates sellers list and shows toast on success
 * @returns {Object} Mutation object
 */
export function useDeleteSellerQuery() {
    const queryClient = useQueryClient()
    const toast = useToastState(state => state.toast)

    return useMutation({
        mutationFn: (id) => deleteSeller(id),
        
        // Invalidate queries and show toast on success
        onSuccess: () => {
            queryClient.invalidateQueries(['sellers'])
            toast('Seller deleted successfully')
        }
    })
}