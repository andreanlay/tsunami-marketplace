<template>
<div>
    <b-row class="justify-content-center mt-5">
        <b-col sm="12" xl="4">
            <b-carousel
                :interval="4000"
                controls
                indicators
            >
                <b-carousel-slide
                    v-for="(item, i) in product.images"
                    :key="i"
                    :img-src="'' + item.path"
                >
                </b-carousel-slide>
            </b-carousel>
        </b-col>
        <b-col sm="12" xl="4">
            <div class="d-flex flex-column align-items-start">
                <h1 class="display-5"> {{product.name}} </h1>
                <p> {{product.description}} </p>
                <p>⭐{{ rating ? rating : 'No Rating'}}</p>
                <p class="display-6"><b> Rp{{product.price}} </b></p>
                <p><b> Stock: {{product.stock}} </b></p>
                <p><b> Sold: {{product.sold}} </b></p>
            </div>

            <b-button @click="addToCart(product._id)" variant="primary" class="float-left mt-3"><b-icon icon="cart"></b-icon>Add to Cart</b-button>
        </b-col>
    </b-row>
    <b-row class="justify-content-center mt-5">
        <b-col sm="12" xl="8">
            <div class="d-flex flex-column align-items-start">
                <p class="display-6">Detailed Description</p>
                <p v-html="product.detailed_description"></p>
            </div>
            
            <b-table
                :items="product.specifications"
                :fields="[{label: 'Specification', key: 'name'}, 'value']"
                :dark="darkMode"
                :class="{'table-dark': darkMode}"
            ></b-table>
        </b-col>
    </b-row>
</div>
</template>

<script>
import firebase from 'firebase/app'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['product', 'darkMode'])
    },
    data() {
        return {
            rating: null
        }
    },
    mounted() {
        axios.get(`/api/post/reviews/${this.product._id}`)
        .then(res => {
            let total = 0
            res.data.forEach(post => {
                total += parseInt(post.review)
            })
            total /= res.data.length
            this.rating = total
        })
    },
    methods: {
        async addToCart(id) {
            const uid = firebase.auth().currentUser.uid
            const cartItem = {
                product: id,
                price: (this.product.dailydeals ? this.product.dailydeals.price : (this.product.flashsale ? this.product.flashsale.price : this.product.price)),
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
.display-6 {
    font-weight: 300;
    font-size: 2.0rem;
}

.table-dark {
    color: white !important;
}
</style>

