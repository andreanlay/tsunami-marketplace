<template>
<div class="d-flex flex-column side-bar rounded-left rounded-bottom text-center " :class="{'side-bar-dark' : darkMode}">
    <div id="brand">
        <img id="logo" src="@/assets/tsunami_logo.png" style="max-width: 30px; max-height: 28px;" :class="{'tsunami-logo-dark' : darkMode}">
        <span class="d-none d-sm-inline">Tsunami</span>
    </div>
    <router-link :to="{name: 'dashboard'}">
        <b-button
            variant="default"
            style="width: 100%"
            @click="setActive(1)"
            :class="{'sidebar-active' : active == 1, 
                     'sidebar-btn-dark' : darkMode,
                     'sidebar-active-dark': darkMode && active == 1}"
        >
            <b-icon icon="columns"></b-icon>
            <span class="d-none d-sm-inline"> Dashboard</span>
        </b-button>
    </router-link>
    <router-link :to="{name: 'account-products'}" >
        <b-button
            variant="default"
            style="width: 100%"
            @click="setActive(2)"
            :class="{'sidebar-active' : active == 2, 
                     'sidebar-btn-dark' : darkMode,
                     'sidebar-active-dark': darkMode && active == 2}"
        >
            <b-icon icon="box-seam"></b-icon>
            <span class="d-none d-sm-inline"> Products</span>
        </b-button>
    </router-link>
    <router-link :to="{name: 'transactions-history'}" >
        <b-button
            variant="default"
            style="width: 100%"
            @click="setActive(3)"
            :class="{'sidebar-active' : active == 3, 
                     'sidebar-btn-dark' : darkMode,
                     'sidebar-active-dark': darkMode && active == 3}"
        >
            <b-icon icon="clock-history"></b-icon>
            <span class="d-none d-sm-inline"> Transaction History</span>
        </b-button>
    </router-link>
    <router-link :to="{name: 'account-setting'}" >
        <b-button
            variant="default"
            style="width: 100%"
            @click="setActive(4)"
            :class="{'sidebar-active' : active == 4, 
                     'sidebar-btn-dark' : darkMode,
                     'sidebar-active-dark': darkMode && active == 4}"
        >
            <b-icon icon="gear"></b-icon>
            <span class="d-none d-sm-inline"> Account Setting</span>
        </b-button>
    </router-link>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        active: Number
    },
    computed: {
        ...mapGetters(['darkMode'])
    },
    methods: {
        setActive(index) {
            this.active = index
        }
    }
}
</script>

<style scoped>
#brand {
    margin: 10px;
}

.side-bar {
    background-color: rgba(235, 235, 235, 0.6);
    height: 100%;
}

.sidebar-active {
    background-color: lightskyblue;
}

.btn:hover {
    background-color: lightskyblue;
}

#delete-account-btn:hover {
    background-color: red;
    color: white;
}

.tsunami-logo-dark {
  content: url('../../assets/tsunami_logo_white.png') !important;
}

.side-bar-dark { 
    background-color: rgba(40, 40, 40, 0.2) !important;
}

.sidebar-btn-dark {
    color: white;
}

.sidebar-btn-dark:hover {
    background-color: rgb(2, 80, 150) !important;
    color: white;
}

.sidebar-active-dark {
    background-color: rgb(2, 80, 150) !important;
}
</style>