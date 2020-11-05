import Vue from 'vue'
import App from './App.vue'
import router from './router'
import titleMixin from './mixins/titleMixins'
import store from './store/store'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.mixin(titleMixin)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
