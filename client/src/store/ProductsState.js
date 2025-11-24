import { create } from 'zustand'

export const useProductsState = create((set) => ({
    products: [
        {
            id: 'p001',
            name: 'Men’s Underwear JENO',
            description: 'Comfortable cotton underwear',
            price: 990,
            article: '4839021854329',
            stock: 24,
            rating: 4.7,
            reviews: 105,
            images: ['/Product1.webp', '/Product1.webp', '/Product1.webp', '/Product1.webp'],
            deliveryDays: 5,
            variants: {
                colors: [
                    {
                        color: 'Black',
                        image: '/Product1.webp'
                    },
                    
                    {
                        color: 'Gray',
                        image: '/Product1.webp'
                    }
                ],
                sizes: ['M', 'L', 'XL']
            },
            seller: {
                id: 's001',
                name: 'JENO',
                rating: 4.9,
                logo: '/sellers/jeno.png',
                reviews: 333,
                level: 'Gold',
                productsSold: 149344,
                yearsOnShopigo: '6 years 3 months'
            },
            material: 'Cotton',
            materialComposition: '95% cotton, 5% elastane',
            style: 'Basic',
            categoryId: 2,
            subCategory: 'Underwear'
        },
        {
            id: 'p002',
            name: 'T-shirt MEN BASIC',
            description: 'Simple men’s cotton t-shirt',
            price: 790,
            article: '4821901285712',
            stock: 50,
            rating: 4.5,
            reviews: 320,
            questions: 10,
            images: ['/Product2.webp', '/Product2.webp', '/Product2.webp'],
            deliveryDays: 5,
            variants: {
                colors: [
                    {
                        color: 'White',
                        image: '/Product2.webp'
                    },
                    
                    {
                        color: 'Black',
                        image: '/Product2.webp'
                    },
                    
                    {
                        color: 'Blue',
                        image: '/Product2.webp'
                    },
                    
                    {
                        color: 'Yellow',
                        image: '/Product2.webp'
                    }
                ],
                sizes: ['S', 'M', 'L', 'XL']
            },
            seller: {
                id: 's002',
                name: 'MEN BASIC',
                rating: 4.8,
                logo: '/sellers/menbasic.png',
                reviews: 120,
                level: 'Silver',
                productsSold: 50200,
                yearsOnShopigo: '3 years 8 months'
            },
            material: 'Cotton',
            materialComposition: '100% cotton',
            style: 'Casual',
            categoryId: 2,
            subCategory: 'T-shirts'
        },
        {
            id: 'p003',
            name: 'Women’s Shirt CLASSY',
            description: 'Elegant women’s shirt for every day',
            price: 1590,
            article: '4821912847234',
            stock: 15,
            rating: 4.9,
            reviews: 270,
            questions: 10,
            images: ['/Product3.webp', '/Product3.webp', '/Product3.webp', '/Product3.webp'],
            deliveryDays: 5,
            variants: {
                colors: [
                    {
                        color: 'White',
                        image: '/Product3.webp'
                    },

                    {
                        color: 'Light Blue',
                        image: '/Product3.webp'
                    }
                ],
                sizes: ['XS', 'S', 'M']
            },
            seller: {
                id: 's003',
                name: 'CLASSY',
                rating: 4.7,
                logo: '/sellers/classy.png',
                reviews: 210,
                level: 'Gold',
                productsSold: 32000,
                yearsOnShopigo: '4 years 2 months'
            },
            material: 'Cotton',
            materialComposition: '90% cotton, 10% polyester',
            style: 'Office',
            categoryId: 2,
            subCategory: 'Shirts'
        },
        {
            id: 'p004',
            name: 'Women’s Leggings FIT&GO',
            description: 'Sport leggings for training and everyday wear',
            price: 1290,
            article: '4821984562381',
            stock: 40,
            rating: 4.6,
            reviews: 190,
            questions: 10,
            images: ['/Product4.webp', '/Product4.webp', '/Product4.webp', '/Product4.webp'],
            deliveryDays: 5,
            variants: {
                colors: [
                    {
                        color: 'Black',
                        image: '/Product4.webp'
                    },
                    
                    {
                        color: 'Purple',
                        image: '/Product4.webp'
                    }
                ],
                sizes: ['S', 'M', 'L']
            },
            seller: {
                id: 's004',
                name: 'FIT&GO',
                rating: 4.8,
                logo: '/sellers/fitgo.png',
                reviews: 180,
                level: 'Silver',
                productsSold: 21000,
                yearsOnShopigo: '2 years 11 months'
            },
            material: 'Polyester',
            materialComposition: '80% polyester, 20% elastane',
            style: 'Sport',
            categoryId: 2,
            subCategory: 'Leggings'
        },
        {
            id: 'p005',
            name: 'Men’s Shirt BOSS LOOK',
            description: 'Stylish shirt for office and meetings',
            price: 1890,
            article: '4821904872123',
            stock: 18,
            rating: 4.4,
            reviews: 87,
            questions: 10,
            images: ['/Product5.webp', '/Product5.webp', '/Product5.webp', '/Product5.webp'],
            deliveryDays: 5,
            variants: {
                colors: [
                    {
                        color: 'White',
                        image: '/Product5.webp'
                    },
                    
                    {
                        color: 'Blue',
                        image: '/Product5.webp'
                    }
                ],
                sizes: ['M', 'L', 'XL']
            },
            seller: {
                id: 's005',
                name: 'BOSS LOOK',
                rating: 4.5,
                logo: '/sellers/bosslook.png',
                reviews: 90,
                level: 'Bronze',
                productsSold: 12000,
                yearsOnShopigo: '1 year 6 months'
            },
            material: 'Cotton',
            materialComposition: '98% cotton, 2% lycra',
            style: 'Office',
            categoryId: 2,
            subCategory: 'Shirts'
        },
        {
            id: 'p006',
            name: 'Sport Hoodie RUNNER',
            description: 'Comfortable and warm hoodie for sports',
            price: 2290,
            article: '4821987891234',
            stock: 30,
            rating: 4.8,
            reviews: 220,
            questions: 10,
            images: ['/Product6.webp', '/Product6.webp', '/Product6.webp', '/Product6.webp'],
            deliveryDays: 5,
            variants: {
                colors: [
                    {
                        color: 'Gray',
                        image: '/Product6.webp'
                    },
                    
                    {
                        color: 'Navy Blue',
                        image: '/Product6.webp'
                    }
                ],
                sizes: ['M', 'L', 'XL', 'XXL']
            },
            seller: {
                id: 's006',
                name: 'RUNNER',
                rating: 4.9,
                logo: '/sellers/runner.png',
                reviews: 200,
                level: 'Gold',
                productsSold: 41000,
                yearsOnShopigo: '5 years 1 month'
            },
            material: 'Fleece',
            materialComposition: '60% cotton, 40% polyester',
            style: 'Sport',
            categoryId: 2,
            subCategory: 'Hoodies'
        },
        {
            id: 'p007',
            name: 'Women’s Dress ROMANTIC',
            description: 'Light dress for walks and dates',
            price: 2490,
            article: '4821978391827',
            stock: 10,
            rating: 4.9,
            reviews: 134,
            questions: 10,
            images: ['/Product7.webp', '/Product7.webp', '/Product7.webp', '/Product7.webp'],
            deliveryDays: 5,
            variants: {
                colors: [
                    {
                        color: 'Red',
                        image: '/Product7.webp'
                    },
                    {
                        color: 'Pink',
                        image: '/Product7.webp'
                    }
                ],
                sizes: ['XS', 'S', 'M']
            },
            seller: {
                id: 's007',
                name: 'ROMANTIC',
                rating: 4.6,
                logo: '/sellers/romantic.png',
                reviews: 110,
                level: 'Silver',
                productsSold: 9000,
                yearsOnShopigo: '2 years 2 months'
            },
            material: 'Viscose',
            materialComposition: '70% viscose, 30% polyester',
            style: 'Romantic',
            categoryId: 2,
            subCategory: 'Dresses'
        },
        {
            id: 'p008',
            name: 'Men’s Tank Top BASIC',
            description: 'Basic cotton tank top',
            price: 490,
            article: '4821983712346',
            stock: 60,
            rating: 4.3,
            reviews: 99,
            questions: 10,
            images: ['/Product8.webp', '/Product8.webp', '/Product8.webp', '/Product8.webp'],
            deliveryDays: 5,
            variants: {
                colors: [
                    {
                        color: 'White',
                        image: '/Product8.webp'
                    },
                    {
                        color: 'Black',
                        image: '/Product8.webp'
                    }
                ],
                sizes: ['S', 'M', 'L']
            },
            seller: {
                id: 's008',
                name: 'BASIC LINE',
                rating: 4.2,
                logo: '/sellers/basicline.png',
                reviews: 80,
                level: 'Bronze',
                productsSold: 7000,
                yearsOnShopigo: '1 year 1 month'
            },
            material: 'Cotton',
            materialComposition: '100% cotton',
            style: 'Basic',
            categoryId: 2,
            subCategory: 'T-shirts'
        },
        {
            id: 'p009',
            name: 'Women’s Sweater COZY KNIT',
            description: 'Soft knitted sweater for winter',
            price: 3190,
            article: '4821934912233',
            stock: 12,
            rating: 4.9,
            reviews: 175,
            questions: 10,
            images: ['/Product9.webp', '/Product9.webp', '/Product9.webp', '/Product9.webp'],
            deliveryDays: 5,
            variants: {
                colors: [
                    {
                        color: 'Beige',
                        image: '/Product9.webp'
                    },
                    {
                        color: 'Gray',
                        image: '/Product9.webp'
                    }
                ],
                sizes: ['S', 'M', 'L']
            },
            seller: {
                id: 's009',
                name: 'COZY KNIT',
                rating: 5.0,
                logo: '/sellers/cozyknit.png',
                reviews: 150,
                level: 'Gold',
                productsSold: 12000,
                yearsOnShopigo: '3 years 4 months'
            },
            material: 'Acrylic',
            materialComposition: '80% acrylic, 20% wool',
            style: 'Cozy',
            categoryId: 2,
            subCategory: 'Sweaters'
        },
        {
            id: 'p010',
            name: 'Women’s Jacket URBAN STYLE',
            description: 'Light demi-season jacket',
            price: 3990,
            article: '4821909821391',
            stock: 20,
            rating: 4.6,
            reviews: 145,
            questions: 10,
            images: ['/Product10.webp', '/Product10.webp', '/Product10.webp', '/Product10.webp'],
            deliveryDays: 5,
            variants: {
                colors: [
                    {
                        color: 'Olive',
                        image: '/Product10.webp'
                    },
                    {
                        color: 'Black',
                        image: '/Product10.webp'
                    }
                ],
                sizes: ['S', 'M', 'L', 'XL']
            },
            seller: {
                id: 's010',
                name: 'URBAN STYLE',
                rating: 4.7,
                logo: '/sellers/urbanstyle.png',
                reviews: 130,
                level: 'Silver',
                productsSold: 15000,
                yearsOnShopigo: '2 years 7 months'
            },
            material: 'Polyester',
            materialComposition: '100% polyester',
            style: 'Urban',
            categoryId: 2,
            subCategory: 'Jackets'
        }        
    ],
}))