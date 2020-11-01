const state = {
    sales: [
        {
            invoice_id: 'TSU-0006',
            shop_id: 1,
            date: '1 Oct 2020',
            item: 'Gigabyte RTX 3080',
            price: 'Rp56.000.000',
            status: 'Done'
        },
        {
            invoice_id: 'TSU-0007',
            shop_id: 1,
            date: '2 Oct 2020',
            item: 'UGreen HDD Case',
            price: 'Rp156.000',
            status: 'Shipping'
        },
        {
            invoice_id: 'TSU-0008',
            shop_id: 1,
            date: '2 Oct 2020',
            item: 'Apple TV 4 Remote',
            price: 'Rp352.200',
            status: 'Processing'
        }
    ]
}

const getters = {
    productsSold: (state) => state.sales
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