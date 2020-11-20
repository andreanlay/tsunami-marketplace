<template>
<b-card
    header="Your products"
    header-text-variant="white"
    header-class="bold"
    header-bg-variant="primary"
    class="m-3"
    :class="{'card-dark': darkMode}"
>
    <b-card-text>
        <b-table v-if="darkMode" responsive striped :items="products" dark></b-table>  
        <b-table v-else responsive striped :items="products"></b-table>    
    </b-card-text>
</b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    title: 'Products – Tsunami',
    computed: {
        ...mapGetters(['products', 'darkMode'])
    },
}
</script>

<style>

</style>