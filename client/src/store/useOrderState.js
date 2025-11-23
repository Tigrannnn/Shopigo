import { create } from 'zustand'

export const useOrderState = create((set, get) => ({
    orderProducts: [],
    
    addOrder: (order) => set((state) => {
        const ordersWithMetadata = order.map(item => ({
            ...item,
            orderId: Date.now() + Math.random(),
            orderDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }),
            status: 'pending'
        }))
        return { orderProducts: [...state.orderProducts, ...ordersWithMetadata] }
    }),
    
    removeOrder: (orderId) => set((state) => ({ 
        orderProducts: state.orderProducts.filter((order) => order.orderId !== orderId) 
    })),
    
    updateOrderStatus: (orderId, newStatus) => set((state) => ({
        orderProducts: state.orderProducts.map((order) => 
            order.orderId === orderId ? { ...order, status: newStatus } : order
        )
    })),
    
    clearOrders: () => set({ orderProducts: [] }),
    
    getOrdersByStatus: (status) => {
        const state = get()
        return state.orderProducts.filter(order => order.status === status)
    },
    
    getOrderById: (orderId) => {
        const state = get()
        return state.orderProducts.find(order => order.orderId === orderId)
    }
}))