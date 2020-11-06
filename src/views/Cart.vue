<template>
    <b-container fluid class="main-container">
        <h1 class="display-5 mt-4">Shopping Cart</h1>
        <p class="lead">
            Let's complete your order, shall we?
            <router-link :to="{name: 'homepage'}">No, Go back to homepage</router-link>
        </p>
        <div class="cart-container mt-3">
            <div class="cart-card items-list">
                <p class="nocart-text display-6">Cart (1 Items)</p>
                <CartItem/>
            </div>
            
            <div class="cart-card items-amount">
                <p class="bold total-label">The total amount of your items</p>
                <p class="bold text-muted items-left-side">Subtotal</p>
                <p class="bold text-muted items-right-side">Rp56.000.000</p>

                <p class="bold text-muted items-left-side">Discount [Seller]</p>
                <p class="bold text-muted items-right-side">-Rp0</p>

                <div class="horizontal-divider"></div>
                <p class="bold text-muted items-left-side">Total</p>
                <p class="bold text-muted items-right-side">Rp56.000.000</p>

                <button class="checkout-btn" @click="$router.push('checkout/step-one')">
                    <b>Proceed To Checkout</b>
                </button>
            </div>
        </div>
    </b-container>
</template>

<script>
import CartItem from '../components/Cart/CartItem'

export default {
    components: {
        CartItem
    }
}
</script>

<style scoped>
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
    padding: 10px
}

.items-amount {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 50px;
    width: 100%;
    height: 350px;
    padding: 10px;
}

.total-label, .horizontal-divider, .checkout-btn {
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