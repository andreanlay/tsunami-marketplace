<template>
<div class="item mb-4">
    <img :src="'' + product.images[0].path">
    <div class="item-details">
        <p class="bold">{{product.name}}</p>
        <p>Color: <b>Gray</b></p>
        <p>Size: <b>41</b></p>
        <p><b-icon icon="shop"></b-icon><b> Toko Jantono</b></p>
    </div>
    <div class="item-price-details">
        <b-input-group append="pcs" class="amount-input">
            <input type="number" min="0" :max="product.stock" @change="onQtyChange" v-model="cart.qty" class="form-control">
        </b-input-group>
        <p class="total-price"><b>Rp{{cart.price}} x {{cart.qty}} pcs = {{cart.price * cart.qty}}</b></p>
        <b-button @click="onDelete" variant="danger" style="width: 15%" class="ml-auto">
            <b-icon icon="trash"></b-icon>
        </b-button>
    </div>
    <div class="item-divider mt-3"></div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        cart: Object
    },
    data() {
        return {
            product: null
        }
    },
    async mounted() {
        await axios.get(`/api/product/details/${this.cart.product}`)
        .then(res => {
            this.product = res.data
        })
    },
    methods: {
        onQtyChange() {
            const data = {
                id: this.cart.product,
                qty: this.cart.qty
            }
            this.$emit('qty-changed', data)
        },
        onDelete() {
            this.$emit('delete-item', this.cart.product)
        }
    }
}
</script>

<style scoped>
img {
    width: 200px;
    height: 175px;
}

.item {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
    column-gap: 20px;
}

.item-details {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.item-price-details {
    display: flex;
    flex-direction: column;
    text-align: right;
}

.amount-input {
    width: 40%;
    align-self: flex-end;
}

.total-price {
    margin-top: auto;
}

.item-divider {
    height: 1px;
    background-color: gray;
    grid-column-start: 1;
    grid-column-end: 4;
}

@media only screen and (max-width: 768px){
    .item {
        display: inline;
    }
    .total-price {
        margin-top: 15px;
    }
}
</style>