<template>
<div class="item-card m-2" :class="{'card-dark': darkMode}">
    <img :src="'' + dailydeals.product.images[0].path" class="item-image">
    <h5 class="item-title mt-2"> {{dailydeals.product.name}} </h5>
    <h6 class="item-caption text-muted"> {{dailydeals.product.description}} </h6>
    
    <h6 class="item-price mt-4 mb-4"><strike>IDR {{dailydeals.product.price / 1000 }} K </strike> --> IDR {{dailydeals.price / 1000 }} K</h6>

    <b-button v-if="dailydeals.sold == dailydeals.stock" href="#" variant="primary" disabled>
        <b-icon icon="cart"></b-icon>
        Add to Cart
    </b-button>
    <b-button v-else href="#" variant="primary">
        <b-icon icon="cart"></b-icon>
        Add to Cart
    </b-button>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['darkMode'])
    },
    props: {
        dailydeals: Object
    },
}
</script>

<style>
.item-card {
    padding: 20px;
    border: 1px solid gray;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

.item-image {
    align-self: center;
    width: 250px;
    height: 180px;
}


.item-title {
    align-self: center;
}

.item-caption {
    text-align: justify;
    height: 50px;
}

.item-seller, .item-wishlist{
    align-self: flex-end;
}

.item-btn {
    margin-top: auto;
    align-self: flex-end;
}

.item-rating-price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.card-dark {
    color: white;
}
</style>
