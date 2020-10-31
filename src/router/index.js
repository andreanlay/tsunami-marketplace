import Vue from 'vue'
import Router from 'vue-router'
import Landing from '../views/Landing.vue'
import Intro from '../components/LandingPage/Intro.vue'
import SignIn from '../components/LandingPage/SignIn.vue'
import SignUp from '../components/LandingPage/SignUp.vue'
import AboutUs from '../components/LandingPage/AboutUs.vue'
import Home from '../views/Home.vue'

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
    ]    
})