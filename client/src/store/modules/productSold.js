const state = {
    sales: [
        {
            invoice_id: 'TSU-0006',
            shop_id: 1,
            date: '1 Oct 2020',
            item: 'Gigabyte RTX 3080',
            price: 'Rp56.000.000',
            status: 'Done',
            _cellVariants: {status: 'success'}
        },
        {
            invoice_id: 'TSU-0007',
            shop_id: 1,
            date: '2 Oct 2020',
            item: 'UGreen HDD Case',
            price: 'Rp156.000',
            status: 'Shipping',
            _cellVariants: {status: 'warning'}
        },
        {
            invoice_id: 'TSU-0008',
            shop_id: 1,
            date: '2 Oct 2020',
            item: 'Apple TV 4 Remote',
            price: 'Rp352.200',
            status: 'Processing',
            _cellVariants: {status: 'primary'}
        }
    ]
}

const getters = {
    salesReport: (state) => {
        let sales = state.sales

        sales.forEach(function(el, idx) {
            delete el['shop_id']
            this[idx] = el
        }, sales)

        return sales
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