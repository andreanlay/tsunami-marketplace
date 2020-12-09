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
        courier: '',
        discount: 0
    }
}

const getters = {
    paymentMethods: (state) => state.method,
    bankNames: (state) => state.bank,
    payment: (state) => state.checkout.payment,
    discount: (state) => state.checkout.discount,
    shippingAddress: (state) => state.checkout.address
}

const actions = {

}

const mutations = {
    setPayment: (state, data) => {
        state.checkout.payment = data
    },
    setAddress: (state, data) => {
        let temp = []
        temp.push(data)
        state.checkout.address = temp
    },
    setCourier: (state, data) => {
        state.checkout.courier = data
    },
    setPaymentMethod: (state, data) => {
        state.checkout.payment['method'] = data
    },
    setDiscount: (state, discount) => {
        state.checkout.discount = discount
    },
    resetPayment: (state) => {
        state.checkout.payment = {}
        state.checkout.address = []
        state.courier = ''
        state.checkout.discount = 0
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
