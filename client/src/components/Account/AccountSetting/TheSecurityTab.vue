<template>
<div class="d-flex flex-column align-items-start m-3">
    <h1 class="display-7 info-header">Password</h1>
    <div class="data-row">
        <p class="row-label">Current Password</p>
        <input type="password" class="row-input">
    </div>
    <div class="data-row">
        <p class="row-label">New Password</p>
        <input v-model="newPassword" @change="checkPassword" type="password" class="row-input">
    </div>
    <div class="data-row">
        <p class="row-label">Confirm New Password</p>
        <input v-model="confirmPassword" @change="checkPassword" type="password" class="row-input">
    </div>
    <p style="color: red" v-show="passwordNotSame">Password & Confirm password is not the same</p>
    <b-button variant="primary" class="align-self-end">Update</b-button>

    <h1 class="display-7 info-header">Tsunami PIN</h1>
    <div class="data-row">
        <p class="row-label">Current PIN</p>
        <input type="password" class="row-input">
    </div>
    <div class="data-row">
        <p class="row-label">New PIN</p>
        <input v-model="newPIN" @change="checkPIN" type="password" class="row-input">
    </div>
    <div class="data-row">
        <p class="row-label">Confirm New PIN</p>
        <input v-model="confirmPIN" @change="checkPIN" type="password" class="row-input">
    </div>
    <p style="color: red" v-show="pinNotSame">PIN & Confirm PIN is not the same</p>
    <b-button variant="primary" class="align-self-end">Update</b-button>
</div>
</template>

<script>
export default {
    data() {
        return {
            newPassword: '',
            confirmPassword: '',
            passwordNotSame: false,
            newPIN: '',
            confirmPIN: '',
            pinNotSame: false,
        }
    },
    methods: {
        checkPassword() {
            if(this.newPassword != this.confirmPassword) {
                this.passwordNotSame = true
            }else{
                this.passwordNotSame = false
            }
        },
        checkPIN() {
            if(this.newPIN != this.confirmPIN) {
                this.pinNotSame = true
            }else{
                this.pinNotSame = false
            }
        }
    }
}
</script>

<style>
.row-input {
    width: 40%;
    height: 20px;
    border: none;
    background: none;
    border-bottom: 1px solid lightslategray;
}

.row-input:focus {
    outline: none;
}
</style>