const state = {
    darkMode: false
}

const getters = {
    darkMode: (state) => state.darkMode
}

const actions = {

}

const mutations = {
    switchDarkMode: (state, flag) => state.darkMode = flag
}

export default {
    state,
    getters,
    actions,
    mutations
}