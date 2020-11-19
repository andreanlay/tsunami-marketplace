import Vue from 'vue'
import App from './App.vue'
import router from './router'
import titleMixin from './mixins/titleMixins'
import darkModeMixin from './mixins/darkModeMixin'
import store from './store/store'
import firebase from 'firebase/app'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.mixin(titleMixin)
Vue.mixin(darkModeMixin)

const firebaseConfig = {
  apiKey: "AIzaSyCux04fNQ85Stpk2MsUZXYYd92_rWZDF_o",
  authDomain: "tsunami-bcb28.firebaseapp.com",
  databaseURL: "https://tsunami-bcb28.firebaseio.com",
  projectId: "tsunami-bcb28",
  storageBucket: "tsunami-bcb28.appspot.com",
  messagingSenderId: "1088125828395",
  appId: "1:1088125828395:web:0d4396efbe5d7b9d49996e",
  measurementId: "G-Z2N33M9DMJ"
}

firebase.initializeApp(firebaseConfig)

router.beforeEach((to, from, next) => {
  const needAuth = to.matched.some(x => x.meta.requiresAuth)

  console.log(firebase.auth().currentUser)

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
