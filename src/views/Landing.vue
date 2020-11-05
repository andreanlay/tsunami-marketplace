<template>
    <div id="background">
        <LandingNavBar/>
        <b-row class="h-100">
            <b-col class="my-auto">
                <router-view/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import LandingNavBar from '../components/LandingPage/TheNavBar'

export default {
    title: 'Get Started | Tsunami',
    components: {
        LandingNavBar
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
