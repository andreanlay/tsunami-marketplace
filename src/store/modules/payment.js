const state = {
    method: [
        {
            text: 'Credit Card',
            value: 'creditcard'
        },
        {
            text: 'Bank Transfer',
            value: 'banktransfer'
        },
        {
            text: 'Cash on Delivery',
            value: 'cod'
        },
        {
            text: 'OVO',
            value: 'ovo'
        },
        {
            text: 'GoPay',
            value: 'gopay'
        }
    ],
    bank: [
        {
            text: 'BCA', value: 'BCA'
        },
        {
            text: 'BNI', value: 'BNI'
        },
        {
            text: 'BRI', value: 'BRI'
        },
        {
            text: 'DKI', value: 'DKI'
        },
        {
            text: 'Mandiri', value: 'Mandiri'
        },
        {
            text: 'Mega', value: 'Mega'
        },
    ]
}

const getters = {
    paymentMethods: (state) => state.method,
    bankNames: (state) => state.bank
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
