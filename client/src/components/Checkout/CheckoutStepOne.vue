<template>
<div>
    <b-container class="pb-5" fluid>
        <b-row>
            <b-col class="text-center mt-5">
                <h1 class="display-4">Billing Info</h1>
                <p class="lead text-muted">Choose a payment option and select an address or create a new one</p>
            </b-col>
        </b-row>
        <b-row class="justify-content-center mt-4">
            <b-col sm="12" xl="3">
                <CourierChooser/>
            </b-col>
            <b-col sm="12" xl="3">
                <PaymentType/>
            </b-col>
        </b-row>
        <b-row class="mt-5 justify-content-center">
            <b-col sm="12" xl="3" class="text-center m-3">
                <button @click="$router.push('../cart')" class="continue-btn text-center" id="btn-next"><b-icon icon="chevron-compact-left" font-scale="1.5"></b-icon><span class="lead"><b>Back to Cart</b></span></button>
            </b-col>
            <b-col sm="12" xl="3" class="text-center m-3">
                <button @click="$router.push('step-two')" class="continue-btn text-center" id="btn-next"><span class="lead"><b>Next Step</b></span><b-icon icon="chevron-compact-right" font-scale="1.5"></b-icon></button>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import CourierChooser from '../Checkout/CourierChooser'
import PaymentType from '../Checkout/PaymenType'

export default {
    components: {
        CourierChooser,
        PaymentType
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
</style>