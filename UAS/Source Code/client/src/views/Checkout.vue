<template>
<div>
    <ProgressBar :step="current_step"/>
    <router-view @changeStep="changeStep"/>
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
    },
    methods: {
        changeStep(val) {
            this.current_step = val
        }
    }
}
</script>

<style scoped>

</style>