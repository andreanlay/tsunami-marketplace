<template>
    <b-container fluid class="main-container">
        <h1 class="display-5 mt-4" :class="{'text-dark': darkMode}">Shopping Cart</h1>
        <p class="lead" :class="{'text-dark': darkMode}">
            Let's complete your order, shall we?
            <router-link :to="{name: 'homepage'}">No, Go back to homepage</router-link>
        </p>
        <div class="cart-container mt-3">
            <div class="cart-card items-list" :class="{'cart-card-dark': darkMode}">
                <p class="nocart-text display-6" :class="{'text-dark': darkMode}">Cart ({{cart.length}} Items)</p>
                <CartItem v-for="item in cart" :key="item._id" :cart="item" @qty-changed="updateQty" @delete-item="deleteItem"/>
            </div>
            
            <div class="cart-card items-amount">
                <p class="bold total-label" :class="{'text-dark': darkMode}">The total amount of your items</p>
                <p class="bold text-muted items-left-side" :class="{'text-dark': darkMode}">Subtotal</p>
                <p class="bold text-muted items-right-side" :class="{'text-dark': darkMode}">{{total}}</p>

                <p class="bold text-muted items-left-side" :class="{'text-dark': darkMode}">Discount amount</p>
                <p class="bold text-muted items-right-side" :class="{'text-dark': darkMode}">- Rp{{saved}}</p>

                <div class="horizontal-divider"></div>
                <b-input-group class="mb-3 voucher-input">
                    <b-form-input v-model="voucher" placeholder="Voucher code"></b-form-input>
                    <b-input-group-append>
                        <b-button variant="outline-primary" @click="checkVoucher">Check</b-button>
                    </b-input-group-append>
                </b-input-group>
                <p v-if="voucherApplied == true" style="color: green" class="voucher-applied-text text-right"><b>Voucher Applied.</b></p>
                <p v-if="voucherApplied == false" style="color: red" class="voucher-applied-text text-right"><b>Please recheck your code.</b></p>
                <p class="bold text-muted items-left-side" :class="{'text-dark': darkMode}">Total</p>
                <p class="bold text-muted items-right-side" :class="{'text-dark': darkMode}">{{total - saved}}</p>

                <button class="checkout-btn" @click="checkout">
                    <b>Proceed To Checkout</b>
                </button>
            </div>
        </div>

    </b-container>
</template>

<script>
import firebase from 'firebase/app'
import axios from 'axios'
import { mapGetters } from 'vuex'

import CartItem from '../components/Cart/CartItem'

export default {
    title: "Cart – Tsunami",
    components: {
        CartItem
    },
    data() {
        return {
            total: 0,
            saved: 0,
            voucher: '',
            voucherApplied: null,
            uid: null,
        }
    },
    computed: {
        ...mapGetters(['darkMode', 'cart']),
    },
    mounted() {
        this.countTotal()
    },
    methods: {
        checkVoucher() {
            if(this.voucher == 'TsunamiMarketplace') {
                this.voucherApplied = true
                this.saved = 25000
            } else {
                this.voucherApplied = false
                this.saved = 0
            }
            this.$store.commit('setDiscount', this.saved)
        },
        countTotal() {
            this.total = 0
            for(let i=0; i<this.cart.length; i++) {
                this.total += this.cart[i].qty * this.cart[i].price
            }
        },
        updateQty(data) {
            const uid = firebase.auth().currentUser.uid

            for(let i=0; i<this.cart.length; i++) {
                if(this.cart[i].product._id == data.id) {
                    axios.post(`/api/account/${uid}/cart`, {
                        product: data.id
                    })
                    .then(res => {
                        this.cart[i].qty = data.qty
                        this.countTotal()
                        return res
                    })
                    break
                }
            }
        },
        deleteItem(id) {
            const uid = firebase.auth().currentUser.uid

            this.$bvModal.msgBoxConfirm('Are you sure to delete this item ?', {
                title: 'Delete confirmation',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'Yes',
                cancelTitle: 'No',
                hideHeaderClose: false,
                centered: true
            })
            .then(val =>  {
                if(val) {
                    axios.delete(`/api/account/${uid}/cart/${id}`)
                    .then(res => {
                        this.$store.commit('deleteCartItem', id)
                        this.countTotal()
                        return res
                    })
                }
            })
        },
        checkout() {
            this.$store.commit('setPayment', {
                total: this.total,
                voucher: this.voucher
            })
            this.$router.push('checkout/step-one')
        }
    }
}
</script>

<style scoped>
.main-container {
    height: 100%;
}

.cart-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    column-gap: 15px;
    justify-items: center;
    margin-left: 50px;
    margin-right: 50px;
}

.nocart-text {
    align-self: flex-start;
}

.cart-card {
    -webkit-box-shadow: 0 0 5px 2px #fff;
    -moz-box-shadow: 0 0 5px 2px #fff;
    box-shadow: 0 0 1px 1px lightgray;
    border-radius: 10px;
}

.items-list {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 10px;
    min-width: 100%;
}

.items-amount {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 50px;
    width: 100%;
    height: 425px;
    padding: 10px;
}

.total-label, .horizontal-divider, .checkout-btn, .voucher-input, .voucher-applied-text{
    grid-column-start: 1;
    grid-column-end: 3;
}

.total-label {
    text-align: left;
}

.items-left-side {
    text-align: left;
}

.items-right-side {
    text-align: right;
}

.horizontal-divider {
    height: 1px;
    background-color: gray;
}

.checkout-btn {
    background-color: 	#006bed;
    color: white;
    border: none;
    border-radius: 50px;
}

.checkout-btn:hover {
    background-color: lightskyblue;
}

.checkout-btn:focus {
    outline: none;
}

.text-dark {
    color: white !important;
}

.cart-card-dark {
    background-color: #312c2c !important;
    color: white;
}

@media only screen and (max-width: 768px){
    .cart-container {
        grid-template-columns: auto;
        margin-left: 5px;
        margin-right: 5px;
    }
    .items-amount {
        margin-top: 20px;
    }
}
</style>