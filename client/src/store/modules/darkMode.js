const state = {
    darkMode: false
}

const getters = {
    darkMode: (state) => state.darkMode
}

const actions = {

}

const mutations = {
    switchDarkMode: (state) => state.darkMode = !state.darkMode
}

export default {
    state,
    getters,
    actions,
    mutations
}