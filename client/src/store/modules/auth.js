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
    changePIN: (state, data) => {
        state.data.PIN = data.PIN
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}