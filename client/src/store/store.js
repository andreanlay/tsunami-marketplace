import Vue from 'vue'
import Vuex from 'vuex'

import Catalog from './modules/catalog.js'
import ProductSold from './modules/productSold.js'
import ProductReview from './modules/productsReview.js'
import PaymentMethods from './modules/payment.js'
import Account from './modules/account.js'
import DarkMode from './modules/darkMode.js'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        Account,
        DarkMode,
        Catalog,
        ProductSold,
        ProductReview,
        PaymentMethods,
    }
})

export default store