<template>
  <div id="app" :class="{'dark-mode' : darkMode}">
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['darkMode'])
  },
  mounted() {
    if(JSON.parse(localStorage.getItem('darkMode'))) {
      this.$store.commit('switchDarkMode', true)
    }
    firebase.auth().onAuthStateChanged(user => {
      const uid = user.uid
      axios.get(`/api/account/${uid}/cart`)
      .then(res => {
          this.$store.commit('setCart', res.data.cart)
      })
      axios.get(`/api/account/${uid}`)
      .then(res => {
        res.data['displayName'] = user.displayName
        res.data['email'] = user.email
        this.$store.commit('accountData', res.data)
      })
    })
  }
}
</script>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 1px;
}

#error-page {
  text-align: center;
  height: 100vh;
  background-color: lightskyblue;
}

.dark-mode {
  color: #eee;
  background-color: #1a1616 !important;
  min-height: 100vh;
  height: 100%;
}
</style>
