<template>
<div class="item-card m-2" :class="{'card-dark': darkMode}">
    <img :src="'' + product.images[0].path" class="item-image">
    <h5 class="item-title mt-2"> {{product.name}} </h5>
    <h6 class="item-caption text-muted"> {{product.description}} </h6>
    <div v-if="!product.flashsale && !product.dailydeals">
        <h6 class="item-seller text-right"><b-icon icon="shop"></b-icon> Jantono Shop</h6>
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
            <b-button @click="addToCart(product._id)" variant="primary" class="mt-3"><b-icon icon="cart"></b-icon>Add to Cart</b-button>
        </div>
    </div>
    <div v-if="product.flashsale">
        <b-progress 
            v-if="2 * product.flashsale.sold <= product.flashsale.stock" 
            :value="product.flashsale.sold / product.flashsale.stock * 100" 
            variant="success" 
            striped
        ></b-progress>
        <b-progress 
            v-else-if="1.5 * product.flashsale.sold <= product.flashsale.stock" 
            :value="product.flashsale.sold / product.flashsale.stock * 100" 
            variant="warning" 
            striped
        ></b-progress>
        <b-progress 
            v-else
            :value="product.flashsale.sold / product.flashsale.stock * 100" 
            variant="danger" 
            striped
        ></b-progress>
        
        <h6 class="item-price mt-4 mb-4">IDR {{product.flashsale.price / 1000 }} K</h6>

        <b-button @click="addToCart(product._id)" variant="primary" :disabled="product.flashsale.sold == product.flashsale.stock">
            <b-icon icon="cart"></b-icon>
            Add to Cart
        </b-button>
    </div>
    <div v-if="product.dailydeals">
        <h6 class="item-price mt-4 mb-4"><strike>IDR {{product.price / 1000 }} K </strike> --> IDR {{product.dailydeals.price / 1000 }} K</h6>
        <b-button @click="addToCart(product._id)" variant="primary">
            <b-icon icon="cart"></b-icon>
            Add to Cart
        </b-button>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'

export default {
    props: {
        product: Object,
    },
    computed: {
        ...mapGetters(['darkMode'])
    },
    methods: {
        async addToCart(id) {
            const uid = firebase.auth().currentUser.uid
            const cartItem = {
                product: id,
                price: (this.product.dailydeals ? this.product.dailydeals.price : this.product.price),
                qty: 1 
            }
            await axios.post(`/api/account/${uid}/cart`, cartItem)
            .then(res => {
                this.$store.commit('setCart', res.data)
            })
            
            this.$bvToast.toast(`${this.product.name} Successfuly added to cart`, {
                title: 'Notification',
                variant: 'success',
                solid: true
            })
        }
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
    height: 50px;
}

.item-caption {
    text-align: justify;
    word-wrap: fit;
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