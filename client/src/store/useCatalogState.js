import { create } from 'zustand'

export const useCatalogState = create((set) => ({
    catalog: [
        {
            id: 1, name: 'Brands', icon: '/brands.png', subcategories: [
                
            ]
        },
        {
            id: 2, name: 'Clothes', icon: '/clothes.png', subcategories: [
                {
                    id: 1, name: 'Men', subcategories: [
                        'T-shirts', 'Shirts', 'Pants', 'Underwear', 'Hoodies', 'Jackets', 'Sweaters', 'Coats', 'Jeans', 'Trousers', 'Shorts', 'Swimwear'
                    ]
                },
                {
                    id: 2, name: 'Women', subcategories: [
                        'Dresses', 'T-shirts', 'Shirts', 'Pants', 'Underwear', 'Hoodies', 'Jackets', 'Sweaters', 'Coats', 'Jeans', 'Trousers', 'Shorts', 'Swimwear'
                    ]
                },
                {
                    id: 3, name: 'Kids', subcategories: [
                        'Dresses', 'T-shirts', 'Shirts', 'Pants', 'Underwear', 'Hoodies', 'Jackets', 'Sweaters', 'Coats', 'Jeans', 'Trousers', 'Shorts', 'Swimwear'
                    ]
                },
                {
                    id: 4, name: 'Unisex', subcategories: [
                        'T-shirts', 'Shirts', 'Pants'
                    ]
                }
            ]   
        },
        {
            id: 3, name: 'Shoes', icon: '/shoes.png', subcategories: [
                {
                    id: 1, name: 'Men', subcategories: [

                    ]
                },
                {
                    id: 2, name: 'Women', subcategories: [

                    ]
                },
                {
                    id: 3, name: 'Kids', subcategories: [

                    ]
                },
                {
                    id: 4, name: 'Unisex', subcategories: [

                    ]
                }
            ]
        },
        {
            id: 4, name: 'Home', icon: '/home.png', subcategories: [
                
            ]
        },
        {
            id: 5, name: 'Beauty', icon: '/beauty.png', subcategories: [
            
        ]},
        {
            id: 6, name: 'Sports', icon: '/sports.png', subcategories: [
                
            ]
        },
        {
            id: 7, name: 'Electronics', icon: '/electronics.png', subcategories: [
                
            ]
        },
        {
            id: 8, name: 'Furniture', icon: '/furniture.png', subcategories: [
                {
                    id: 1, name: 'Bedroom', subcategories: [
                        'Beds', 'Mattresses', 'Wardrobes', 'Dressers', 'Nightstands', 'Sofas', 'Chairs', 'Tables', 'Benches', 'Stools', 'Cabinets', 'Shelves', 'Drawers', 'Storage', 'Decor', 'Lighting'
                    ]
                },
                {
                    id: 2, name: 'Living Room', subcategories: [
                        'Sofas', 'Chairs', 'Tables', 'Benches', 'Stools', 'Cabinets', 'Shelves', 'Drawers', 'Storage', 'Decor', 'Lighting'
                    ]
                },
                {
                    id: 3, name: 'Dining Room', subcategories: [
                        'Tables', 'Chairs', 'Benches', 'Stools', 'Cabinets', 'Shelves', 'Drawers', 'Storage', 'Decor', 'Lighting'
                    ]
                },
                {
                    id: 4, name: 'Office', subcategories: [
                        'Tables', 'Chairs', 'Benches', 'Stools', 'Cabinets', 'Shelves', 'Drawers', 'Storage', 'Decor', 'Lighting'
                    ]
                }
            ]
        },
        {
            id: 9, name: 'Other', icon: '/other.png', subcategories: [
                
            ]
        }
    ],

    isFilterModalOpen: false,
    openFilterModal: () => set({ isFilterModalOpen: true }),
    closeFilterModal: () => set({ isFilterModalOpen: false }),
}))