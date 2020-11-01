import Vue from 'vue'
import Router from 'vue-router'
import Landing from '../views/Landing.vue'
import Intro from '../components/LandingPage/Intro.vue'
import SignIn from '../components/LandingPage/SignIn.vue'
import SignUp from '../components/LandingPage/SignUp.vue'
import AboutUs from '../components/LandingPage/AboutUs.vue'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Account from '../views/Account.vue'
import AccountDashboard from '../components/Account/AccountDashboard.vue'
import AccountProducts from '../components/Account/AccountProduct.vue'
import AccountTransactions from '../components/Account/AccountTransaction.vue'
import AccountSetting from '../components/Account/AccountSetting.vue'
import TsunamiSetting from '../components/Account/TsunamiSetting.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/get-started',
            component: Landing,
            children: [
                {
                    path: '',
                    name: 'introduction',
                    component: Intro
                },
                {
                    path: '/login',
                    name: 'login',
                    component: SignIn
                },
                {
                    path: '/register',
                    name: 'register',
                    component: SignUp
                },
                {
                    path: '/about-us',
                    name: 'about-us',
                    component: AboutUs
                },
            ]
        },
        {
            path: '',
            name: 'homepage',
            component: Home
        },
        {
            path: '/catalog',
            name: 'catalog',
            component: Catalog
        },
        {
            path: '/account',
            component: Account,
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: AccountDashboard
                },
                {
                    path: 'products',
                    name: 'account-products',
                    component: AccountProducts
                },
                {
                    path: 'transactions',
                    name: 'transactions-history',
                    component: AccountTransactions
                },
                {
                    path: 'setting',
                    name: 'account-setting',
                    component: AccountSetting
                },
                {
                    path: 'tsunami-setting',
                    name: 'tsunami-setting',
                    component: TsunamiSetting
                }
            ]
        }
    ]    
})