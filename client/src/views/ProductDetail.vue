<template>
<div>
    <b-container fluid :class="{'details-dark': darkMode}">
        <ProductNavBar/>
        <ProductDescription/>
    </b-container>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex' 

import ProductNavBar from '@/components/ProductDetail/TheNavBar'
import ProductDescription from '@/components/ProductDetail/Description'

export default {
    title: 'Product Detail – Tsunami',
    components: {
        ProductNavBar,
        ProductDescription
    },
    computed: {
        ...mapGetters(['darkMode'])
    },
    async mounted() {
        const id = this.$route.params.id
        await axios.get(`/api/product/details/${id}`)
        .then(res => {
            this.$store.commit('setProduct', res.data)
        })
    }
}
</script>

<style scoped>
.details-dark {
    color: white;
}
</style>