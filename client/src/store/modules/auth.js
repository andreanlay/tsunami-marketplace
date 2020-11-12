const state = {
    loggedIn : false,
    data: {

    }
}

const getters = {
    loginStatus: (state) => state.loggedIn,
    activeUser: (state) => state.data,
}

const actions = {

}

const mutations = {
    login: (state, account) => {
        state.loggedIn = true
        state.data = account
        console.log('Logged in!' + state.data)
    },
    logout: (state) => {
        state.loggedIn = false
        state.data = {}
        console.log('Logout!' + state.data) 
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}