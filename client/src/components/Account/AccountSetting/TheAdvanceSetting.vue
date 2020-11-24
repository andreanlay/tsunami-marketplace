<template>
<div class="d-flex flex-column align-items-start">
    <h1 class="display-7 info-header" :class="{'info-header-dark': darkMode}">Personalization</h1>
    <div class="data-row">
        <p class="row-label">Subscribe to newsletter</p>
        <b-form-checkbox class="row-data" switch></b-form-checkbox>
    </div>
    <div class="data-row">
        <p class="row-label">2nd Step Verification</p>
        <b-form-checkbox class="row-data" switch></b-form-checkbox>
    </div>
    <div class="data-row">
        <p class="row-label">Hide online status</p>
        <b-form-checkbox class="row-data" switch></b-form-checkbox>
    </div>

    <h1 class="display-7 info-header" :class="{'info-header-dark': darkMode}">Customization</h1>
    <div class="data-row">
        <p class="row-label">Dark Mode</p>
        <b-form-checkbox
            class="row-data" 
            v-model=darkMode
            switch
            @change="darkModeSwitch"
        ></b-form-checkbox>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            darkMode: false,
        }
    },
    methods: {
        darkModeSwitch() {
            this.darkMode = !this.darkMode
            localStorage.setItem('darkMode', JSON.stringify(this.darkMode))
            this.$store.commit('switchDarkMode', this.darkMode)
        }
    },
    created() {
        this.darkMode = JSON.parse(localStorage.getItem('darkMode'))
    }
}
</script>

<style>

</style>