import Vue from 'vue'
import Router from 'vue-router'
import Landing from '../views/Landing.vue'
import Intro from '../views/Intro.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import AboutUs from '../views/AboutUs.vue'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/get-started',
            name: 'Get Started',
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
            name: 'Home',
            component: Home
        },
    ]    
})