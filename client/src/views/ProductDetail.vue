<template>
<div>
    <b-container fluid :class="{'details-dark': darkMode}">
        <ProductNavBar/>
        <ProductDescription/>
        <hr :class="{'divider-dark': darkMode}">
        <ProductReview/>
        <hr :class="{'divider-dark': darkMode}">
        <ProductDiscussion/>
    </b-container>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex' 

import ProductNavBar from '@/components/ProductDetail/TheNavBar'
import ProductDescription from '@/components/ProductDetail/Description'
import ProductReview from '@/components/ProductDetail/Review'
import ProductDiscussion from '@/components/ProductDetail/Discussion'

export default {
    title: 'Product Detail – Tsunami',
    components: {
        ProductNavBar,
        ProductDescription,
        ProductReview,
        ProductDiscussion
    },
    computed: {
        ...mapGetters(['darkMode'])
    },
    mounted() {
        const id = this.$route.params.id
        axios.get(`/api/product/details/${id}`)
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
.divider-dark {
    background-color: gray
}
</style>