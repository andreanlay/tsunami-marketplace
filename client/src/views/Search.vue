<template>
<div>
    <TheNavBar :query="query"/>
    <b-container fluid>
        <div class="items-container">
            <itemCard v-for="(item, i) in results" :key="i" :product="item"/>
        </div>
    </b-container>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

import TheNavBar from '@/components/Search/TheNavBar'
import ItemCard from '@/components/ProductCard'

export default {
    title: "Search Result – Tsunami",
    components: {
        TheNavBar,
        ItemCard
    },
    computed: {
        ...mapGetters(['darkMode'])
    },
    data() {
        return {
            query: '',
            results: [],
        }
    },
    async mounted() {
        this.query = this.$route.params.query
        await axios.get(`/api/product/search/${this.query}`)
        .then(res => {
            this.results = res.data
        })
    }
}
</script>

<style>
.items-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 0.2fr));
    grid-template-rows: minmax(450px, 450px);
    grid-auto-flow: row;
    gap: 15px;
}
</style>