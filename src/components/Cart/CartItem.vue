<template>
<div class="item">
    <img src="../../assets/dailydeals_product/newbalance_shoes.jpg">
    <div class="item-details">
        <p class="bold">New Balance Men's Classic 993 Running Shoes</p>
        <p>Color: <b>Gray</b></p>
        <p>Size: <b>41</b></p>
        <p><b-icon icon="shop"></b-icon><b> Toko Jantono</b></p>
    </div>
    <div class="item-price-details">
        <b-input-group append="pcs" class="amount-input">
            <input type="number" min="0" class="form-control">
        </b-input-group>
        <p class="total-price"><b>Rp1.200.000 x 3 = Rp4.800.000</b></p>
    </div>
    <div class="item-divider"></div>
</div>
</template>

<script>
export default {

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
    width: 30%;
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