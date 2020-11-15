const state = {
    data: {

    }
}

const getters = {
    accountData: (state) => state.data,
}

const actions = {

}

const mutations = {
    accountData: (state, data) => {
        state.data = data
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}