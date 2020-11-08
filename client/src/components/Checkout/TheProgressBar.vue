<template>
<div class="d-flex flex-row flex-wrap justify-content-center bg-light pt-3 pb-3" id="checkout">
    <div class="header">
        <div class="numberCircle text-center active">
            <span class="lead">1</span>
        </div>
        <span class="lead ml-2"><b>Shipping & Payment</b></span>
    </div>
    <div class="header ml-0 ml-md-5">
        <div class="numberCircle text-center">
            <span class="lead">2</span>
        </div>
        <span class="lead ml-2"><b>Review & Confirmation</b></span>
    </div>
</div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.numberCircle {
  display: inline-block;
  background: white;
  border: solid 2px lightskyblue;
  text-align: center;
  line-height: 0px;
  border-radius: 50%;
  font-size: 20px;
  min-width: 38px;
  min-height: 38px;
}

.numberCircle span {
  display: inline-block;
  padding-top: 50%;
  padding-bottom: 50%;
  margin-left: 1px;
  margin-right: 1px;
}

.active {
  background-color: lightskyblue;
}

</style>