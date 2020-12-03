const state = {
    product: {}
}

const getters = {
    product: (state) => state.product
}

const actions = {

}

const mutations = {
    setProduct: (state, data) => {
        state.product = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}