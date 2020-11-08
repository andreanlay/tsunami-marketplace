<template>
<div class="item-card">
    <img :src="product.image" class="item-image">
    <h5 class="item-title"> {{product.name}} </h5>
    <h6 class="item-caption text-muted"> {{product.caption}} </h6>
    <h6 class="item-seller"><b-icon icon="shop"></b-icon> Jantono Shop</h6>
    <div class="item-rating-price">
        <div>
            <b-icon icon="star-fill" variant="warning"></b-icon>
            <b>4.5</b>
        </div>
        <div>
            <b>{{product.price}}</b>
        </div>
    </div>
    
    <div class="item-btn">
        <b-button variant="primary" class="mt-3"><b-icon icon="cart"></b-icon>Add to Cart</b-button>
    </div>
</div>
</template>

<script>
export default {
    props: {
        product: Object,
    },
}
</script>

<style scoped>
.item-card {
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 15px;
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
    height: 150px;
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

</style>