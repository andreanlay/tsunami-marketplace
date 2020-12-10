import Vue from 'vue'
import App from './App.vue'
import router from './router'
import titleMixin from './mixins/titleMixins'
import store from './store/store'
import firebase from 'firebase/app'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.mixin(titleMixin)

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID
}

firebase.initializeApp(firebaseConfig)

router.beforeEach((to, from, next) => {
  const needAuth = to.matched.some(x => x.meta.requiresAuth)
  
  if(needAuth && !firebase.auth().currentUser) {
    next('/login')
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
