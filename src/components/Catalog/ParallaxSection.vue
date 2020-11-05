<template>
<b-jumbotron
    class="d-flex align-items-center mb-0 parallax" 
    :style="{'background-image': 'url(' + category.image + ')'}"
    :class="category.name"
    >
    <div class="container text-center">
        <b-row>
            <b-col>
                <h1 class="display-4" style="color: #ababab;"> {{category.name}} </h1>
                <router-link :to="{name: ''}" style="color: #ababab;">
                    Explore
                    <b-icon icon="chevron-right"></b-icon>
                </router-link>
            </b-col>
        </b-row>
    </div>
</b-jumbotron>
</template>

<script>
export default {
    props: {
        category: Object
    }
}
</script>

<style scoped>
.parallax {
    min-height: 600px;
    background-attachment: fixed;
    background-size: cover;
    background-position: 50% 50%;
    height: 100vh;
}

.display-4 {
    font-size: 3.5rem;
    font-weight: 300;
}
</style>