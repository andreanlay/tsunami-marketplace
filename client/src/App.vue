<template>
  <div id="app" :class="{'dark-mode' : darkMode}">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['darkMode'])
  },
  mounted() {
    if(localStorage.getItem('darkMode')) {
      this.$store.commit('switchDarkMode')
    }
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
