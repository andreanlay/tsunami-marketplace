const state = {
    catalog: [
        'Automotive', 'Beauty', 'Books', 'Electronic', 'Fashion', 
        'Food and Drink', 'Households', 'Kitchen', 'Health', 'Sport'
    ],
    catalogData: [
        {
            id: 1,
            name: 'Automotive',
            image: require('@/assets/category_infinity/automotive_cover.jpg'),
        },
        {
            id: 2,
            name: 'Beauty',
            image: require('@/assets/category_infinity/beauty_cover.jpg'),
        },
        {
            id: 3,
            name: 'Books',
            image: require('@/assets/category_infinity/books_cover.jpg'),
        },
        {
            id: 4,
            name: 'Electronic',
            image: require('@/assets/category_infinity/electronic_cover.jpg'),
        },
        {
            id: 5,
            name: 'Fashion',
            image: require('@/assets/category_infinity/fashion_cover.jpg'),
        },
        {
            id: 6,
            name: 'Food and Drink',
            image: require('@/assets/category_infinity/food_drink_cover.jpg'),
        },
        {
            id: 7,
            name: 'Household',
            image: require('@/assets/category_infinity/households_cover.jpg'),
        },
        {
            id: 8,
            name: 'Kitchen',
            image: require('@/assets/category_infinity/kitchen_cover.jpg'),
        },
        {
            id: 9,
            name: 'Health',
            image: require('@/assets/category_infinity/health_cover.jpg'),
        },
        {
            id: 10,
            name: 'Sport',
            image: require('@/assets/category_infinity/sport_cover.jpg'),
        }
    ], 
    subcatalog: [
        {
            id: 1,
            categories: [
                'Accessories', 'Car', 'Cleaning Kit', 'Helments', 'Repair Kit', 'Spareparts', 'Wheel'
            ]
        },
        {
            id: 2,
            categories: [
                'Hair Accessories', 'Body/face paint', 'Eye Make Up','Facial Mask', 'Hair Styling Tools','Lip Color / Nail','Nail Art'
            ]
        },
        {
            id: 3,
            categories: [
                'Action / Adventure', 'Children', 'Fantasy', 'Food','History', 'Politics', 'Self-help', 'Science-fiction'
            ]
        },
        {
            id: 4,
            categories: [
                'Air Conditioner', 'Audio', 'Household Electronic','Kitchen Electronic', 'Lights', 'Television', 'Vaporizer'
            ]
        },
        {
            id: 5,
            categories: [
                'Male', 'Female', 'Swimming', 'Unisex'
            ]
        },
        {
            id: 6,
            categories: [
                'Cooking ingredients', 'Diary', 'Indonesian Cuisine', 'Lovely Liquid', 'Meat', 'Snacks', 'Package of Snacks'
            ]
        },
        {
            id: 7,
            categories: [
                'Bedroom', 'Decoration', 'Furniture', 'Hygiene', 'Toilet', 'Other'
            ]
        },
        {
            id: 8,
            categories: [
                'Baking tools', 'Cooking tools', 'Cutlery', 'Dish washer tool', 'Kitchen Accessories', 'Food Storage'
            ]
        },
        {
            id: 9,
            categories: [
                'Supplement', 'Mask', 'Medicine', 'Medical tools', 'Vitamins'
            ]
        },
        {
            id: 10,
            categories: [
                'Badminton', 'Basketball', 'Boxing', 'Gym','Sport Accessories', 'Fishing', 'Football', 'Golf',
            ]
        }
    ]
}

const getters = {
    category_names: (state) => state.catalog,
    category_data: (state) => state.catalogData,
    subcategories: (state) => state.subcatalog,
}

const actions = {

}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}