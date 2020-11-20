<template>
<b-card
    class="m-2"
    :title="product.name"
    :img-src="product.image"
    img-width="250px"
    img-height="180px"
    img top
    style="width: 18rem;"
    :class="{'card-dark' : darkMode}"
    >
    <b-card-text>
        {{product.caption}}
    </b-card-text>
    <b-progress 
        v-if="2 * product.sold <= product.stock" 
        :value="product.sold / product.stock * 100" 
        variant="success" 
        :animated="animate"
    ></b-progress>
    <b-progress 
        v-else-if="1.5 * product.sold <= product.stock" 
        :value="product.sold / product.stock * 100" 
        variant="warning" 
        :animated="animate"
    ></b-progress>
    <b-progress 
        v-else
        :value="product.sold / product.stock * 100" 
        variant="danger" 
        :animated="animate"
    ></b-progress>
    <br>
    <p><b> {{product.price}} </b></p>
    
    <b-button v-if="product.sold == product.stock" href="#" variant="primary" disabled>
        <b-icon icon="cart"></b-icon>
        Add to Cart
    </b-button>
    <b-button v-else href="#" variant="primary">
        <b-icon icon="cart"></b-icon>
        Add to Cart
    </b-button>
</b-card>
</template>

<script>
import { mapGetters } from 'vuex' 

export default {
    computed: {
        ...mapGetters(['darkMode'])
    },
    props: {
        product: Object
    },
    data() {
        return {
            animate: true
        }
    }
}
</script>

<style>

</style>
