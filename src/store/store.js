// TODO:
// Add ORM

import Vue from 'vue'
import Vuex from 'vuex'

import FlashSale from './modules/flashSale.js'
import DailyDeals from './modules/dailyDeals.js'
import Catalog from './modules/catalog.js'
import ProductSold from './modules/productSold.js'
import ProductReview from './modules/productsReview.js'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        FlashSale,
        DailyDeals,
        Catalog,
        ProductSold,
        ProductReview
    }
})

export default store