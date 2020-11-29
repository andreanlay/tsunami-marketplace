<template>
<b-container class="pb-5" fluid :class="{'main-container-dark': darkMode}">
    <b-row>
        <b-col class="text-center mt-5">
            <h1 class="display-4">Checkout</h1>
            <p class="lead text-muted">Please check your items and confirm to complete your transaction</p>
        </b-col>
    </b-row>
    <b-row class="justify-content-center mt-4">
        <b-col sm="12" xl="6">
            <h1 class="lead float-left"><b>1. Your Order</b></h1>
            <div style="clear: both;"></div>
            <b-row>
                <b-col>
                    <b-table
                        :fields="orderFields"
                        :items="cart"
                        :dark="darkMode"
                    >
                        <template #cell(productname)="row">
                            <p>{{row.item.product.name}}</p>
                        </template>
                        <template #cell(totalprice)="row">
                            <b>IDR {{row.item.product.price * row.item.qty / 1000}} K</b>
                        </template>                    
                    </b-table>
                </b-col>
            </b-row>
            <h1 class="lead float-right">Subtotal: IDR {{total / 1000}} K</h1>
            <div style="clear: both;"></div>
            <h1 class="lead float-right">Discount: IDR {{discount}} K</h1>
            <div style="clear: both;"></div>
            <h1 class="lead float-right">Total: IDR {{(total - discount) / 1000}} K</h1>
            <div style="clear: both;"></div>

            <h1 class="lead float-left"><b>2. Payment Details</b></h1>
            <div style="clear: both;"></div>      
            <b-row>
                <b-col>
                    <b-table
                        :items="paymentDetails"
                        stacked
                        :dark="darkMode"
                    ></b-table>
                </b-col>
            </b-row>

            <h1 class="lead float-left"><b>3. Shipping Details</b></h1>
            <div style="clear: both;"></div>      
            <b-table 
                :items="shippingAddress" 
                :fields="[{key: 'name', sortable: true}, 'shipping_address', 'phone_number', 'actions']"
                bordered
                responsive
                :dark="darkMode"
            >
                <template #cell(actions)="row">
                    <div class="text-center">
                        <b-button size="sm" @click="row.toggleDetails" class="m-1" variant="primary">
                            <b-icon v-if="row.detailsShowing" icon="eye-slash"></b-icon>
                            <b-icon v-else icon="eye"></b-icon>
                        </b-button>
                        <a :href="`//www.google.com/maps/search/?api=1&query=${row.item.details[0].coordinates}`" target="_blank">
                            <b-button size="sm" class="m-1" variant="warning">
                                <b-icon icon="map"></b-icon>
                            </b-button>
                        </a>
                    </div>
                </template>
                <template #row-details="row">
                    <b-table 
                        :items="row.item.details"
                        :fields="['province', 'cityregency', 'district', 'subdistrict', 'coordinates']"
                        borderless
                        stacked
                        small
                        :dark="darkMode"
                    ></b-table>
                </template>
            </b-table>      
            <small class="text-muted float-right">Your must pay your order within 24 hours otherwise the order will be cancelled automatically</small>
        </b-col>
    </b-row>

    <b-row class="mt-5 justify-content-center">
        <b-col sm="12" xl="3" class="text-center m-3">
            <button 
                @click="$router.push('../checkout/step-one')" 
                class="continue-btn text-center" 
                :class="{'continue-btn-dark': darkMode}"
                id="btn-next"
            ><b-icon icon="chevron-compact-left" font-scale="1.5"></b-icon><span class="lead"><b>Previous Step</b></span></button>
        </b-col>
        <b-col sm="12" xl="3" class="text-center m-3">
            <button 
                @click="processTransaction" 
                class="continue-btn text-center"
                :class="{'continue-btn-dark': darkMode}"
                id="btn-next"
            ><span class="lead"><b>Finish</b></span><b-icon icon="check" font-scale="1.5"></b-icon></button>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['darkMode', 'payment', 'cart', 'shippingAddress'])
    },
    data() {
        return {
            orderFields: [
                { key: 'productname', label: 'Product Name'},
                { key: 'price', label: 'Price / Unit'},
                { key: 'qty', label: 'Quantity (unit)'},
                { key: 'totalprice', label: 'Total Price'}
            ],
            total: 0,
            discount: 0,
            paymentDetails: []
        }
    },
    mounted() {
        this.$emit('changeStep', 2)
        this.cart.forEach(item => {
            this.total += item.price * item.qty
        })
        this.discount = this.payment.discount ?? 0
        
        this.paymentDetails.push(this.payment.method)
    },
    methods: {
        processTransaction() {

            this.$router.push('../')
        }
    }
}
</script>

<style scoped>
.continue-btn {
  height: 50px;
  width: 200px;
  border: solid 2px lightskyblue;
  background: none;
  border-radius: 25px 25px 25px 25px;
  color: lightblue;
  transition: all 0.5s;
}

.continue-btn:hover {
  background-color: lightskyblue;
  color: white;
}

.continue-btn:focus {
  outline: none;
}

.main-container-dark * {
    color: white;
}

.continue-btn-dark {
  color: blue;
  border: solid 2px darkblue;
}

.continue-btn-dark:hover{
  color: white;
  background-color: darkblue;
}
</style>