<template>
<b-button variant="light" class="bills-btn" :class="{'dark-mode' : darkMode}">
    <b-icon :icon="iconName"></b-icon>
    <p> {{buttonText}}</p>
</b-button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['darkMode'])
    },
    props: {
        iconName: String,
        buttonText: String
    }
}
</script>

<style scoped>
.bills-btn {
    margin: 10px;
    width: 125px;
    height: 125px;
    border-radius: 25px 25px 25px 25px;
}

.bills-btn:hover {
    background-color: #B7F8DB;
}

.dark-mode {
  color: white !important;
  border: none;
  background-color: #312c2c !important;
}

.dark-mode:hover {
  background-color: #5c5454 !important;
}
</style>