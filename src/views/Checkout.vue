<template>
<div>
    <ProgressBar/>
    <router-view/>
</div>
</template>

<script>
import ProgressBar from '../components/Checkout/TheProgressBar'

export default {
    title: "Checkout – Tsunami",
    data() {
        return {
            current_step: 1,
        }
    },
    components: {
        ProgressBar,
    }
}
</script>

<style scoped>

</style>