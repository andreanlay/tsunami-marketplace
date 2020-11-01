<template>
<div class="d-flex flex-column side-bar rounded-left rounded-bottom text-center ">
    <div id="brand">
        <img id="logo" src="@/assets/tsunami_logo.png" style="max-width: 30px; max-height: 28px;">
        <span class="d-none d-sm-inline">Tsunami</span>
    </div>
    <router-link :to="{name: 'dashboard'}">
        <b-button
            variant="default"
            style="width: 100%"
            @click="setActive(1)"
            :class="{'sidebar-active' : active == 1}"
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
            :class="{'sidebar-active' : active == 2}"
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
            :class="{'sidebar-active' : active == 3}"
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
            :class="{'sidebar-active' : active == 4}"
        >
            <b-icon icon="gear"></b-icon>
            <span class="d-none d-sm-inline"> Account Setting</span>
        </b-button>
    </router-link>
    <router-link :to="{name: 'tsunami-setting'}">
        <b-button
            variant="default"
            style="width: 100%"
            @click="setActive(5)"
            :class="{'sidebar-active' : active == 5}"
        >
            <b-icon icon="wrench"></b-icon>
            <span class="d-none d-sm-inline"> Tsunami Setting</span>
        </b-button>
    </router-link>

    <router-link :to="{name: 'dashboard'}">
        <b-button variant="default" style="width: 100%" id="delete-account-btn" class="mt-auto">
            <b-icon icon="trash"></b-icon>
            <span class="d-none d-sm-inline"> Delete Account</span>
        </b-button>
    </router-link>
</div>
</template>

<script>
export default {
    data() {
        return {
            active: 1
        }
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
</style>