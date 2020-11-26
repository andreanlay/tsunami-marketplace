<template>
<div class="item-card m-2" :class="{'card-dark': darkMode}">
    <img :src="'' + product.images[0].path" class="item-image">
    <h5 class="item-title mt-2"> {{product.name}} </h5>
    <h6 class="item-caption text-muted"> {{product.description}} </h6>
    <h6 class="item-seller"><b-icon icon="shop"></b-icon> Jantono Shop</h6>
    <div class="item-rating-price">
        <div>
            <b-icon icon="star-fill" variant="warning"></b-icon>
            <b>4.5</b>
        </div>
        <div>
            <b>IDR {{product.price / 1000}}K</b>
        </div>
    </div>
    
    <div class="item-btn">
        <b-button variant="primary" class="mt-3"><b-icon icon="cart"></b-icon>Add to Cart</b-button>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        product: Object,
    },
    computed: {
        ...mapGetters(['darkMode'])
    }
}
</script>

<style scoped>
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
    height: 75px;
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