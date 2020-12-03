<template>
<div class="d-flex flex-row m-2 justify-content-between" id="navbar">
    <router-link :to="{name: 'homepage'}">
        <b-button variant="light" class="btn-circle" :class="{'btn-circle-dark' : darkMode}">
            <b-icon icon="chevron-compact-left" class="btn-icon"></b-icon>
        </b-button>
    </router-link>
    <div class="flex-fill ml-2">
        <h1 class="display-5">Product Detail</h1>
    </div> 
    <router-link :to="{name: 'cart'}">
        <b-button variant="light" class="btn-circle" :class="{'btn-circle-dark' : darkMode}">
            <b-icon icon="cart" class="btn-icon"></b-icon>
            <b-badge class="ml-3" variant="primary" v-show="cart.length > 0">{{cart.length}}</b-badge>
        </b-button>
    </router-link>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['cart', 'darkMode'])
    },
}
</script>

<style scoped>
.btn-circle {
    background-color: #e9e9e9;
    width: 50px;
    height: 50px;
    padding: 8px 16px;
    border-radius: 35px;
    text-align: center;
    font-size: 18px;
    line-height: 1.33;
}

.btn-icon {
    margin-left: -4px;
}

#navbar {
    opacity: 0.5;
}

.btn-circle-dark {
    color: white;
    outline: none;
    background-color: #333 !important;
}

.btn-circle-dark:hover {
    color: white;
    opacity: 0.8;
}
</style>