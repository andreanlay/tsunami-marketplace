<template>
<b-container class="pb-5" fluid>
    <b-row>
        <b-col class="text-center mt-5">
            <h1 class="display-4">Checkout</h1>
            <p class="lead text-muted">Please check your items and confirm to complete your transaction</p>
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
            <button @click="$router.push('../checkout/step-one')" class="continue-btn text-center" id="btn-next"><b-icon icon="chevron-compact-left" font-scale="1.5"></b-icon><span class="lead"><b>Previous Step</b></span></button>
        </b-col>
        <b-col sm="12" xl="3" class="text-center m-3">
            <button @click="$router.push('../')" class="continue-btn text-center" id="btn-next"><span class="lead"><b>Finish</b></span><b-icon icon="check" font-scale="1.5"></b-icon></button>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {

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