const state = {
    products: [
        {
            shop_id: 1,
            product_id: 1,
            name: 'Gigabyte RTX 3080',
            stock: 123,
            image: require('@/assets/flashsale_product/rtx3080.jpg'),
            caption: 'Supercharge your PC with this GPU!',
            price: 'Rp56.000.000',
        },
        {
            shop_id: 1,
            product_id: 2,
            name: 'Dell XPS 9300',
            stock: 10,
            image: require('@/assets/flashsale_product/xps13-9300.jpg'),
            caption: '13" Laptop with 10th gen Intel i7-1065G7',
            price: 'Rp21.500.000',
        },
        {
            shop_id: 1,
            product_id: 3,
            name: 'UGreen HDD Case',
            stock: 12,
            image: require('@/assets/dailydeals_product/ugreen_hdd.jpg'),
            caption: 'Protects your hard drive from scratches, a perfect way to get the most out of your unused hard drive',
            price: 'Rp149.000',
        },
        {
            shop_id: 1,
            product_id: 4,
            name: 'Apple TV Siri 4th Gen Remote Control MLLC2LL/A EMC2677 A1513',
            stock: 42,
            image: require('@/assets/dailydeals_product/appletv_remote.jpg'),
            caption: 'Built for the new Apple TV',
            price: 'Rp1.240.000',
        },
        {
            shop_id: 1,
            product_id: 5,
            name: 'FACOM Spanner 4mm x 5mm',
            stock: 51,
            image: require('@/assets/flashsale_product/facom_spanner.jpg'),
            caption: 'Made with High Quality STEEL',
            price: 'Rp136.500',
        },
        {
            shop_id: 1,
            product_id: 6,
            name: '11pcs All-in-one Kitchenware',
            stock: 161,
            image: require('@/assets/flashsale_product/kitchenware_11pcs.jpg'),
            caption: 'Silicone Heat Resistant',
            price: 'Rp150.000'
        },
        {
            shop_id: 1,
            product_id: 7,
            name: 'New Balance Men\'s Classic 993 Running Shoes',
            stock: 18,
            image: require('@/assets/dailydeals_product/newbalance_shoes.jpg'),
            caption: 'Superior comfort meets classic style with this durable high-mileage trainer.',
            price: 'Rp2.400.000'
        },
        {
            shop_id: 1,
            product_id: 8,
            name: 'Percussion Massage Gun Massager Muscle Relaxing',
            stock: 38,
            image: require('@/assets/dailydeals_product/massage_gun.jpg'),
            caption: 'The massager is used to relieve muscle stiffness, promote blood and lymph circulation.',
            price: 'Rp1.200.000'
        },
        {
            shop_id: 1,
            product_id: 9,
            name: 'HP 15 Series 15" Laptop 15-dy1039nr BNIB',
            stock: 72,
            image: require('@/assets/dailydeals_product/hp_laptop.jpg'),
            caption: 'The massager is used to relieve muscle stiffness, promote blood and lymph circulation.', 
            price: 'Rp7.500.000'
        }
    ],
    flashsaleProduct: [
        {
            id: 1,
            product_id: 1,
            stock: 15,
            sold: 7,
        },
        {
            id: 2,
            product_id: 2,
            stock: 10,
            sold: 6,
        },
        {
            id: 3,
            product_id: 5,
            stock: 30,
            sold: 30,
        },
        {
            id: 4,
            product_id: 6,
            stock: 50,
            sold: 9,
        }
    ],
    dailydealsProduct: [
        {
            id: 1,
            product_id: 7,
            from: 'Rp2.400.000',
            to: 'Rp1.800.000'
        },
        {
            id: 2,
            product_id: 3,
            from: 'Rp149.000',
            to: 'Rp99.999'
        },
        {
            id: 3,
            product_id: 4,
            from: 'Rp1.240.000',
            to: 'Rp999.999'
        },
        {
            id: 4,
            product_id: 8,
            from: 'Rp1.200.000',
            to: 'Rp899.999'
        },
        {
            id: 5,
            product_id: 9,
            from: 'Rp7.500.000',
            to: 'Rp6.800.000'
        }
    ]
}

const getters = {
    products: (state) => {
        let products = state.products

        products.forEach(function(el, idx) {
            delete el['shop_id']
            delete el['image']
            delete el['product_id']
            this[idx] = el
        }, products)

        return products
    },
    searchProduct: (state) => (keywords) => {
        return state.products.filter(e => e.name.toLowerCase().includes(keywords))
    },
    flashSaleProducts: (state) => {
        let onFlashsale = []

        state.flashsaleProduct.forEach(function(el1) {
            state.products.forEach(function(el2) {
                if(el1.product_id == el2.product_id) {
                    onFlashsale.push(el2)
                    onFlashsale[onFlashsale.length - 1]['stock'] = el1.stock
                    onFlashsale[onFlashsale.length - 1]['sold'] = el1.sold
                }
            })   
        })

        return onFlashsale
    },
    dailyDealsProducts: (state) => {
        let onDeals = []

        state.dailydealsProduct.forEach(function(el1) {
            state.products.forEach(function(el2) {
                if(el1.product_id == el2.product_id) {
                    onDeals.push(el2)
                    onDeals[onDeals.length - 1]['from'] = el1.from
                    onDeals[onDeals.length - 1]['to'] = el1.to
                }
            })
        })

        return onDeals
    }
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