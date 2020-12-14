const state = {
    reviews: [
        {
            invoice_ID: 'TSU-0001',
            rating: '5⭐',
            review: 'Best seller ever'
        },
        {
            invoice_ID: 'TSU-0002',
            rating: '4⭐',
            review: 'The package is broken'
        },
        {
            invoice_ID: 'TSU-0003',
            rating: '5⭐',
            review: 'Fastest seller'
        },
    ]
}

const getters = {
    productReviews: (state) => state.reviews
}

const actions = {

}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}