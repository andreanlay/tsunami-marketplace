const state = {
    data: {

    },
    address: [

    ]
}

const getters = {
    accountData: (state) => state.data,
    accountAddress: (state) => state.address
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
    addAddress: (state, data) => {
        state.address.push(data)
    },
    accountAddress: (state, data) => {
        state.address = data
        console.log(state.address)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}