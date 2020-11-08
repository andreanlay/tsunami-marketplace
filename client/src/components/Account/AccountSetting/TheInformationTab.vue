<template>
<div class="d-flex flex-column align-items-start">
    <h1 class="display-7 info-header">Personal Information <b-icon icon="pencil" font-scale="0.75"></b-icon></h1>
    <div class="data-row">
        <p class="row-label">Full Name</p>
        <p class="row-data">{{username}}</p>
    </div>
    <div class="data-row">
        <p class="row-label">Phone Number</p>
        <p class="row-data">{{phone}}</p>
    </div>
    <div class="data-row">
        <p class="row-label">Email Address</p>
        <p class="row-data">{{email}}</p>
    </div>
    <div class="data-row">
        <p class="row-label">Birthday</p>
        <p class="row-data">{{birthday}}</p>
    </div>
    <div class="data-row">
        <p class="row-label">Gender</p>
        <p class="row-data">{{gender}}</p>
    </div>

        <h1 class="display-7 info-header">Seller Information <b-icon icon="pencil" font-scale="0.75"></b-icon></h1>
    <div class="data-row">
        <p class="row-label">Shop Name</p>
        <p class="row-data">{{shopName}}</p>
    </div>
    <div class="data-row">
        <p class="row-label">Products Sold</p>
        <p class="row-data">{{productsSold}}</p>
    </div>
    <div class="data-row">
        <p class="row-label">Shop Status</p>
        <p class="row-data" style="color: green">{{shopStatus}}</p>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            username: 'Irfan Bachdim',
            gender: 'Male',
            phone: '+62 856 5123 1237',
            email: 'irfanbch@gmail.com',
            birthday: 'October 20, 1998',
            shopName: 'Jantono Shop',
            productsSold: 312,
            shopStatus: 'Active'
        }
    }
}
</script>

<style>
.info-header {
    border-bottom: 1px solid black;
    padding-bottom: 5px;
}

.tab-inactive {
    opacity: 0.7 !important;
    color: black !important;
    transition: all 0.5 ease-in-out;
}

.tab-inactive:hover {
    margin-top: -2px;
}

.tab-active {
    background: none !important;
    border-bottom: 2px solid black !important;
}

.data-row {
    display: flex;
    width: 100%;
}

.row-label {
    width: 60%;
    text-align: left;
}

.row-data {
    width: 40%;
    text-align: left;
}
</style>