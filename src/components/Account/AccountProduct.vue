<template>
<b-card
    header="Your products"
    header-text-variant="white"
    header-class="bold"
    header-bg-variant="primary"
    class="m-3"
>
    <b-card-text>
        <b-table responsive striped :items="products"></b-table>    
    </b-card-text>
</b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    title: 'Products – Tsunami',
    computed: {
        ...mapGetters(['products'])
    },
}
</script>

<style>

</style>