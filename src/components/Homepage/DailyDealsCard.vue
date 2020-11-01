<template>
<b-card
    class="m-2"
    :title="product.name"
    :img-src="product.image"
    img-width="250px"
    img-height="180px"
    img top
    style="width: 18rem;"
    >
    <b-card-text>
        {{product.caption}}
    </b-card-text>
    <br>
    <p><b>IDR <strike>{{product.from / 1000}} K</strike> -> {{product.to / 1000}} K</b></p>
    
    <b-button href="#" variant="primary">
        <b-icon icon="cart"></b-icon>
        Add to Cart
    </b-button>
</b-card>
</template>

<script>
export default {
    props: {
        product: Object
    },
}
</script>

<style>

</style>
