const state = {
    data: {

    },
    address: [

    ],
    cart: [

    ],
}

const getters = {
    accountData: (state) => state.data,
    cart: (state) => state.cart
}

const actions = {

}

const mutations = {
    accountData: (state, data) => {
        state.data = data
    },
    changePIN: (state, data) => {
        state.data.PIN = data.PIN
    },
    setCart: (state, data) => {
        state.cart = data
    },
    addToCart: (state, data) => {
        for(let i=0; i<state.cart.length; i++) {
            if(state.cart[i].product == data.product) {
                state.cart[i].qty++
                return
            }
        }
        state.cart.push(data)
    },
    deleteCartItem: (state, id) => {
        for(let i=0; i<state.cart.length; i++) {
            if(state.cart[i].product == id) {
                state.cart.splice(i, 1)
                break
            }
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}