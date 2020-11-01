<template>
<div>
    <CatalogNavBar/>
    <b-jumbotron class="d-flex align-items-center mb-0 parallax" id="main-jumbotron">
        <div class="container text-center">
            <h1 class="display-4">Welcome to our Catalog.</h1>
            <h1 class="lead">where all things are organized.</h1>
            <p>Hate scrolling ? Use our smart search bar with <b> auto suggestions and scrolling</b> below!</p>
            <SearchBox :categories="category_names"/>
        </div>
    </b-jumbotron>
    <ParallaxSection v-for="category in category_data" :key="category.id" :category="category"/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

import CatalogNavBar from '@/components/Catalog/TheNavBar'
import SearchBox from '@/components/Catalog/TheSearchBox.vue'
import ParallaxSection from '@/components/Catalog/ParallaxSection'

export default {
    title: 'Catalog – Tsunami',
    components: {
        CatalogNavBar,
        SearchBox,
        ParallaxSection,
    },
    computed: {
        ...mapGetters(['category_names', 'category_data'])
    }
}
</script>

<style>
html {
    overflow: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
}
::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #FF0000;
}

#main-jumbotron {
    background: linear-gradient(200deg, #7F7FD5, #86A8E7, #91EAE4)
}

.parallax {
    min-height: 600px;
    background-attachment: fixed;
    background-size: cover;
    background-position: 50% 50%;
    height: 100vh;
}
</style>