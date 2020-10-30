<template>
    <div id="background">
        <LandingNavBar :brandTitle="brandTitle"/>
        <b-row class="h-100">
            <b-col class="my-auto">
                <router-view v-on:brandTitleChange="brandTitleChange"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import LandingNavBar from '../components/TheLandingNavBar.vue'

export default {
    title: 'Get Started | Tsunami',
    components: {
        LandingNavBar
    },
    methods: {
        brandTitleChange(title) {
            this.brandTitle = title
        },
    },
    data() {
        return {
            brandTitle: 'Tsunami'
        }
    },
}
</script>

<style scoped>
#background {
    width: 100%;
    height: 100vh;
    background: linear-gradient(to bottom right, #5078F2, #A4BFEF);
    overflow: hidden;
    background-size: 200% 200%;
    animation: change 8s ease-in-out infinite;
}

@keyframes change {
    0% {
        background-position: 0 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}
</style>
