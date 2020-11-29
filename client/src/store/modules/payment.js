const state = {
    method: [
        { text: 'Credit Card', value: 'Credit Card' },
        { text: 'Bank Transfer', value: 'Bank Transfer' },
        { text: 'Cash on Delivery', value: 'Cash on Delivery (COD)' },
        { text: 'OVO', value: 'OVO' },
        { text: 'GoPay', value: 'GoPay' }
    ],
    bank: [
        { text: 'BCA', value: 'BCA' },
        { text: 'BNI', value: 'BNI' },
        { text: 'BRI', value: 'BRI' },
        { text: 'DKI', value: 'DKI' },
        { text: 'Mandiri', value: 'Mandiri' },
        { text: 'Mega', value: 'Mega' },
    ],
    checkout: {
        payment: {},
        address: [],
        courier: ''
    }
}

const getters = {
    paymentMethods: (state) => state.method,
    bankNames: (state) => state.bank,
    payment: (state) => state.checkout.payment,
    shippingAddress: (state) => state.checkout.address
}

const actions = {

}

const mutations = {
    setPayment: (state, data) => {
        state.checkout.payment = data
    },
    setAddress: (state, data) => {
        state.checkout.address.push(data)
    },
    setCourier: (state, data) => {
        state.checkout.courier = data
    },
    setPaymentMethod: (state, data) => {
        state.checkout.payment['method'] = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
