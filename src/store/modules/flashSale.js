const state = {
    products: [
        {
            id: 1,
            name: 'Gigabyte RTX3080',
            price: 28000000,
            stock: 15,
            sold: 7,
            image: require('@/assets/flashsale_product/rtx3080.jpg'),
            caption: 'Supercharge your PC with this LATEST NVIDIA GPU!',
        },
        {
            id: 2,
            name: 'Dell XPS 9300',
            price: 28000000,
            stock: 10,
            sold: 6,
            image: require('@/assets/flashsale_product/xps13-9300.jpg'),
            caption: '13" Laptop with 10th gen Intel i7-1065G7',
        },
        {
            id: 3,
            name: 'FACOM Spanner 4mm x 5mm',
            price: 136500,
            stock: 30,
            sold: 30,
            image: require('@/assets/flashsale_product/facom_spanner.jpg'),
            caption: 'Made with High Quality STEEL',
        },
        {
            id: 4,
            name: '11pcs All-in-one Kitchenware',
            price: 136500,
            stock: 50,
            sold: 9,
            image: require('@/assets/flashsale_product/kitchenware_11pcs.jpg'),
            caption: 'Silicone Heat Resistant',
        },
    ]
}

const getters = {
    flashSaleProducts: (state) => state.products
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
