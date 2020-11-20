<template>
<footer class="footer py-4 bg-light text-center" :class="{'footer-dark' : darkMode}">
    <div class="container">
        <div class="row">
        <div class="col-sm-3">
            <h1 class="display-5">Tsunami</h1>
            <h1 class="display-6">Your experience is our priority</h1>
        </div>
        <div class="col-sm">
            <h1 class="display-6"><b>Explore</b></h1>
            <p><a href="#top">Home</a></p>
            <p><router-link :to="{name: 'account'}">Account</router-link></p>
            <p><router-link :to="{name: 'catalog'}">Catalog</router-link></p>
            <p><router-link :to="{name: 'about-us'}">About</router-link></p>
        </div>
        <div class="col-sm-3">
            <h1 class="display-6"><b>Visit us</b></h1>
            <div id="address" style="line-height: 15px;">
            <p><small>Universitas Tarumanagara</small></p>
            <p><small>Jl. Letjen S. Parman No.1, RT.6/RW.16</small></p>
            <p><small>Kec. Grogol Petamburan, Kota. Jakarta Barat</small></p>    
            <p><small>DKI Jakarta, 11440</small></p>  
            </div>
        </div>
        <div class="col-sm">
            <h1 class="display-6"><b>Follow us</b></h1>
            <p><a href="#">Facebook</a></p>
            <p><a href="#">Instagram</a></p>
            <p><a href="#">LINE Official Account</a></p>
        </div>
        <div class="col-sm">
            <h1 class="display-6"><b>Legal</b></h1>
            <p><a href="#">Terms</a></p>
            <p><a href="#">Privacy</a></p>
        </div>
        </div>
    </div>
</footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['darkMode'])
    },
}
</script>

<style scoped>
a {
    color: gray;
}

a:hover {
    color: black;
}

.display-5 {
    font-size: 2.5rem;
    font-weight: 300;
}

.display-6 {
    font-size: 1.25rem;
    font-weight: 300;
}

.footer-dark {
    color: lightgray;
    background-color: #333 !important;
}
</style>