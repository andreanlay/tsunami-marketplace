<template>
<div class="d-flex flex-column align-items-start m-3">
    <h1 class="display-7 info-header">Password</h1>
    <div class="data-row">
        <p class="row-label">Current Password</p>
        <input v-model="password" type="password" class="row-input">
    </div>
    <div class="data-row">
        <p class="row-label">New Password</p>
        <input v-model="newPassword" type="password" class="row-input">
    </div>
    <div class="data-row">
        <p class="row-label">Confirm New Password</p>
        <input v-model="confirmPassword" type="password" class="row-input">
    </div>
    <p style="color: red" class="align-self-end" v-show="passwordInfo">{{passwordInfo}}</p>
    <p style="color: green" class="align-self-end" v-show="passwordChanged">Password changed successfuly!</p>
    <b-button 
        variant="primary" 
        class="align-self-end" 
        :class="{'update-loading': changePasswordLoading}"
        @click="updatePassword"
    >
        {{changePasswordLoading ? 'Updating...' : 'Update'}}
    </b-button>

    <h1 class="display-7 info-header">Tsunami PIN</h1>
    <div class="data-row">
        <p class="row-label">Current PIN</p>
        <input v-model="pin" type="password" class="row-input">
    </div>
    <div class="data-row">
        <p class="row-label">New PIN</p>
        <input v-model="newPIN" type="password" class="row-input">
    </div>
    <div class="data-row">
        <p class="row-label">Confirm New PIN</p>
        <input v-model="confirmPIN" type="password" class="row-input">
    </div>
    <p style="color: red" class="align-self-end" v-show="pinInfo">{{pinInfo}}</p>
    <p style="color: green" class="align-self-end" v-show="pinChanged">PIN changed successfuly!</p>
    <b-button 
        variant="primary" 
        class="align-self-end" 
        :class="{'update-loading': changePINLoading}"
        @click="updatePIN"
    >
        {{changePINLoading ? 'Updating...' : 'Update'}}
    </b-button>
</div>
</template>

<script>
import firebase from 'firebase/app'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            password: '',
            newPassword: '',
            confirmPassword: '',
            passwordInfo: '',
            passwordChanged: false,
            changePasswordLoading: false,
            pin: '',
            newPIN: '',
            confirmPIN: '',
            pinInfo: '',
            pinChanged: false,
            changePINLoading: false,
        }
    },
    computed: {
        ...mapGetters(['accountData'])
    },
    methods: {
        checkPassword() {
            return this.newPassword == this.confirmPassword
        },
        checkPIN() {
            return this.newPIN == this.confirmPIN
        },
        async updatePassword() {
            this.changePasswordLoading = true
            this.passwordChanged = false

            if(this.checkPassword()) {
                const user = firebase.auth().currentUser
                const credential = firebase.auth.EmailAuthProvider.credential(this.accountData.email, this.password)

                const self = this
                await user.reauthenticateWithCredential(credential)
                .then(function() {
                    user.updatePassword(self.newPassword).then(function() {
                        self.passwordInfo = ''
                        self.passwordChanged = true
                    })
                    .catch(err => {
                        self.passwordInfo = err.message
                    })
                })
                .catch(err => {
                    this.passwordInfo = err.message
                })
            } else {
                this.passwordInfo = 'New password & Confirm password is not the same'
            }
            this.changePasswordLoading = false
        },
        async updatePIN() {
            this.changePINLoading = true
            this.pinChanged = false

            if(this.checkPIN()) {
                console.log(this.accountData.PIN)
                if(this.accountData.PIN == null || this.accountData.PIN == this.pin) {
                    await axios.put(`/api/auth/${this.accountData.uid}`, {
                        PIN: this.newPIN
                    })
                    this.$store.commit('changePIN', {
                        PIN: this.newPIN
                    })
                    this.pinChanged = true
                    this.pinInfo = ''
                } else {
                    this.pinInfo = 'Wrong PIN, please check and try again'
                }
            } else {
                this.pinInfo = 'New PIN & Confirm PIN is not the same'
            }
            this.changePINLoading = false
        }
    }
}
</script>

<style scoped>
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

.update-loading {
    opacity: 0.6
}
</style>