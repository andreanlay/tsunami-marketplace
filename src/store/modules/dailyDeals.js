const state = {
    products: [
        {
            id: 1,
            name: 'New Balance Men\'s Classic 993 Running Shoes',
            from: 2400000,
            to: 1800000,
            image: require('@/assets/dailydeals_product/newbalance_shoes.jpg'),
            caption: 'Superior comfort meets classic style with this durable high-mileage trainer.',
        },
        {
            id: 2,
            name: 'UGREEN 2.5" Inch HDD SATA USB3.0 External Case',
            from: 149000,
            to: 99999,
            image: require('@/assets/dailydeals_product/ugreen_hdd.jpg'),
            caption: 'Protects your hard drive from scratches, a perfect way to get the most out of your idle hard drive',
        },
        {
            id: 3,
            name: 'Apple TV Siri 4th Gen Remote Control MLLC2LL/A EMC2677 A1513',
            from: 1240000,
            to: 999999,
            image: require('@/assets/dailydeals_product/appletv_remote.jpg'),
            caption: 'Built for the new Apple TV',
        },
        {
            id: 4,
            name: 'Percussion Massage Gun Massager Muscle Relaxing',
            from: 1200000,
            to: 899999,
            image: require('@/assets/dailydeals_product/massage_gun.jpg'),
            caption: 'The massager is used to relieve muscle stiffness, promote blood and lymph circulation.',
        },
        {
            id: 5,
            name: 'HP 15 Series 15" Laptop 15-dy1039nr BNIB',
            from: 7500000,
            to: 6800000,
            image: require('@/assets/dailydeals_product/hp_laptop.jpg'),
            caption: 'The massager is used to relieve muscle stiffness, promote blood and lymph circulation.', 
        }
    ]
}

const getters = {
    dailyDealsProducts: (state) => state.products
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
