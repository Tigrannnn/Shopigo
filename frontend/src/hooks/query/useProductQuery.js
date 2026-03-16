import { useRef } from 'react'
import { 
    createProduct, 
    deleteProduct, 
    getOneProduct, 
    getProducts, 
    updateProduct 
} from "@/http/productApi";
import { useErrorState } from "@/store/useErrorState";
import { useModalState } from "@/store/useModalState";
import { useToastState } from "@/store/useToastState";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Hook for fetching products with pagination, search, and category filter.
 * API returns { products, seed }; we keep seed in a ref and send it for page 2+ so order stays stable (no duplicates).
 * @param {Object} options - Query options
 * @param {number} options.limit - Number of products per page
 * @param {string} options.search - Search query
 * @param {Object} options.category - Category object
 * @param {string} options.sellerId - Seller ID for filtering
 * @param {string} options.queryKey - Custom query key prefix (default: 'products')
 */
export function useGetProductsQuery({ limit = 12, search, category, sellerId, order, queryKey = 'products' } = {}) {
    const seedRef = useRef()

    return useInfiniteQuery({
        queryKey: [queryKey, search, category?.id, sellerId, limit],
        queryFn: async ({ pageParam }) => {
            const res = await getProducts({
                page: pageParam,
                limit,
                search,
                categoryId: category?.id,
                sellerId,
                seed: seedRef.current,
                order
            })
            if (res?.seed != null) seedRef.current = res.seed
            return res
        },
        staleTime: Infinity,
        keepPreviousData: true,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const list = lastPage?.products ?? lastPage
            const count = Array.isArray(list) ? list.length : (lastPage?.products?.length ?? 0)
            const nextPage = allPages.length + 1
            return count === limit ? nextPage : undefined
        },
        onError: (error) => {
            console.error('Products query error:', error)
        }
    })
}

/**
 * Hook for fetching a single product by ID
 * @param {string|number} id - Product ID
 * @returns {Object} React Query object with product data
 */
export function useGetProductByIdQuery(id) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getOneProduct(id),
    })
}

/**
 * Hook for creating a new product
 * Invalidates product list, shows toast, and closes modal on success
 * @returns {Object} Mutation object
 */
export function useCreateProductQuery() {
    const toast = useToastState(state => state.toast)
    const queryClient = useQueryClient()
    const closeModal = useModalState(state => state.closeModal)
    const setError = useErrorState(state => state.setError)

    return useMutation({
        mutationFn: (productData) => createProduct(productData),
        
        // Invalidate queries, show toast, and close modal on success
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['recommended'] });
            toast('Product created successfully')
            closeModal()
        },
        // Set error message on failure
        onError: (error) => {
            setError(error.response?.data?.message || 'Failed to create product')
        }
    })
}

/**
 * Hook for updating an existing product
 * Invalidates product list, shows toast, and closes modal on success
 * @returns {Object} Mutation object
 */
export function useUpdateProductQuery() {
    const toast = useToastState(state => state.toast)
    const queryClient = useQueryClient()
    const closeModal = useModalState(state => state.closeModal)
    const setError = useErrorState(state => state.setError)

    return useMutation({
        mutationFn: (product) => updateProduct(product),
        
        // Invalidate queries, show toast, and close modal on success
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['recommended'] });
            toast('Product updated successfully')
            closeModal()
        },
        onError: (error) => {
            setError(error.response?.data?.message || 'Failed to update product')
        }
    })
}

/**
 * Hook for deleting a product
 * Invalidates product list and shows toast on success
 * @returns {Object} Mutation object
 */
export function useDeleteProductQuery() {
    const queryClient = useQueryClient()
    const toast = useToastState(state => state.toast)

    return useMutation({
        mutationFn: (id) => deleteProduct(id),
        
        // Invalidate queries and show toast on success
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['recommended'] });
            toast('Product deleted successfully')
        },
        onError: (error) => {
            toast(error.response?.data?.message || 'Failed to delete product')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['recommended'] });
            toast('Product deleted successfully')
        }
    })
}