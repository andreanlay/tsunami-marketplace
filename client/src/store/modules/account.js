const getdefaultDataState = () => {
    return {}
}

const getDefaultCartState = () => {
    return []
}

const state = {
    data: getdefaultDataState(),
    address: [

    ],
    cart: getDefaultCartState(),
    payment: {

    }
}

const getters = {
    accountData: (state) => state.data,
    cart: (state) => state.cart,
}

const actions = {

}

const mutations = {
    accountData: (state, data) => {
        state.data = data
    },
    resetAccountData: (state) => {
        state.data = getdefaultDataState()
        state.cart = getDefaultCartState()
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
            if(state.cart[i].product._id == id) {
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