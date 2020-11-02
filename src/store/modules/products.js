const state = {
    products: [
        {
            shop_id: 1,
            item: 'Gigabyte RTX 3080',
            stock: 123,
            price: 'Rp56.000.000',
        },
        {
            shop_id: 1,
            item: 'UGreen HDD Case',
            stock: 12,
            price: 'Rp156.000',
        },
        {
            shop_id: 1,
            item: 'Apple TV 4 Remote',
            stock: 42,
            price: 'Rp352.200',
        }
    ]
}

const getters = {
    products: (state) => {
        let products = state.products

        products.forEach(function(el, idx) {
            delete el['shop_id']
            this[idx] = el
        }, products)

        return products
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