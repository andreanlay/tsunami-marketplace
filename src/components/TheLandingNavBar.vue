<template>
    <b-navbar toggleable="lg" type="dark" fixed="top">
      <b-container>
        <b-navbar-brand href="#">
          <img id="logo" src="../assets/tsunami_logo_white.png" alt="">
          {{brandTitle}}
        </b-navbar-brand>
        
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <router-link to="/">
              <b-nav-item href="home">Home</b-nav-item>
            </router-link>
            <router-link :to="{ name: 'login' }">
              <b-nav-item href="login">Sign In</b-nav-item>
            </router-link>
            <router-link :to="{ name: 'register' }">
              <b-nav-item href="register">Sign Up</b-nav-item>
            </router-link>
            <router-link :to="{ name: 'about-us' }">
              <b-nav-item href="about">Meet the Team</b-nav-item>
            </router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
</template>

<script>
export default {
  name: 'LandingNavBar',
  props: {
    brandTitle: String
  }
}
</script>

<style scoped>
#logo {
    width: 30px;
    height: 30px;
    fill: white;
}
</style>
