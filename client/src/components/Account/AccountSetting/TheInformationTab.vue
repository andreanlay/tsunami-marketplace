<template>
<div class="d-flex flex-column align-items-start" :class="{'dark-account-tab': darkMode}">
    <h1 class="display-7 info-header" :class="{'info-header-dark': darkMode}">
        Personal Information
        <a href="#"><b-badge @click="editPersonalInfo()" variant="light">Edit</b-badge></a>
    </h1>
    <div class="data-row">
        <p class="row-label">Full Name</p>
        <input v-model="accountData.displayName" :class="{'row-input-active' : editingPersonalDetails}" type="text" class="row-input" :disabled="!editingPersonalDetails">
    </div>
    <div class="data-row">
        <p class="row-label">Phone Number</p>
        <input v-model="accountData.phone_number" :class="{'row-input-active' : editingPersonalDetails}" type="text" class="row-input" :disabled="!editingPersonalDetails">
    </div>
    <div class="data-row">
        <p class="row-label">Email Address</p>
        <input v-model="accountData.email" :class="{'row-input-active' : editingPersonalDetails}" type="text" class="row-input" :disabled="!editingPersonalDetails">
    </div>
    <div class="data-row">
        <p class="row-label">Birthday</p>
        <p class="row-data">{{accountData.birthday}}</p>
    </div>
    <div class="data-row">
        <p class="row-label">Gender</p>
        <p class="row-data">{{accountData.gender}}</p>
    </div>
    <b-button
        v-show="editingPersonalDetails" 
        :class="{'update-active' : updatingPersonalDetails}" 
        variant="primary" 
        class="align-self-end mr-4 mb-4"
        @click="savePersonalDetails"
    >
        <b-icon icon="check"></b-icon> {{updatingPersonalDetails ? "Saving..." : "Save"}}
    </b-button>

    <h1 class="display-7 info-header" :class="{'info-header-dark': darkMode}">
        Seller Information
        <a href="#"><b-badge @click="editSellerInfo()" variant="light">Edit</b-badge></a>
    </h1>
    <div class="data-row">
        <p class="row-label">Shop Name</p>
        <input v-model="accountData.seller.name" :class="{'row-input-active' : editingSellerDetails}" type="text" class="row-input" :disabled="!editingSellerDetails">
    </div>
    <div class="data-row">
        <p class="row-label">Shop Location</p>
        <input v-model="accountData.seller.location" :class="{'row-input-active' : editingSellerDetails}" type="text" class="row-input" :disabled="!editingSellerDetails">
    </div>
    <div class="data-row">
        <p class="row-label">Products Sold</p>
        <input v-model="productsSold" :class="{'row-input-active' : editingSellerDetails}" type="text" class="row-input" :disabled="!editingSellerDetails">
    </div>
    <b-button
        v-show="editingSellerDetails" 
        :class="{'update-active' : updatingSellerDetails}" 
        variant="primary" 
        class="align-self-end mr-4 mb-4"
        @click="saveSellerDetails"
    >
        <b-icon icon="check"></b-icon> {{updatingSellerDetails ? "Saving..." : "Save"}}
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
            productsSold: 312,
            editingPersonalDetails: false,
            editingSellerDetails: false,
            updatingPersonalDetails: false,
            updatingSellerDetails: false,
        }
    },
    computed: {
        ...mapGetters(['accountData', 'darkMode'])
    },
    methods: {
        updateStore() {
            const user = firebase.auth().currentUser
            this.$store.commit('accountData', {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                phone_number: this.accountData.phone_number,
                birthday: this.accountData.birthday,
                gender: this.accountData.gender,
                seller: {
                    name: this.accountData.seller.name,
                    location: this.accountData.seller.location,
                }
            })
        },
        editPersonalInfo() {
            this.editingPersonalDetails = !this.editingPersonalDetails
        },
        editSellerInfo() {
            this.editingSellerDetails = !this.editingSellerDetails
        },
        async savePersonalDetails() {
            this.updatingPersonalDetails = true

            const user = firebase.auth().currentUser
            if(user.email != this.accountData.email) {
                user.updateEmail(this.accountData.email)
                user.sendEmailVerification()
            }
            if(user.displayName != this.accountData.displayName) {
                user.updateProfile({
                    displayName: this.accountData.displayName
                })
            }
            await axios.put(`/api/auth/${this.accountData.uid}`, {
                phone_number: this.accountData.phone_number
            })
            this.updateStore()
            this.editingPersonalDetails = !this.editingPersonalDetails
            this.updatingPersonalDetails = false
        },
        async saveSellerDetails() {
            this.updatingSellerDetails = true

            await axios.put(`/api/auth/${this.accountData.uid}`, {
                seller: {
                    name: this.accountData.seller.name,
                    location: this.accountData.seller.location
                }
            })
            this.updateStore()
            this.editingSellerDetails = !this.editingSellerDetails
            this.updatingSellerDetails = false
        }
    }
}
</script>

<style>
.info-header {
    border-bottom: 1px solid black;
    padding-bottom: 5px;
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

.row-input {
    /* width: 40%; */
    height: 20px;
    border: none;
    background: none;
    padding-bottom: 5px;
}

.row-input-active {
    border-bottom: 1px solid lightslategray;
}

.row-input:focus {
    outline: none;
}

.update-active {
    opacity: 0.6;
}

.info-header-dark {
    border-bottom: 1px solid white;
}

.dark-account-tab * {
    color: white;
}
</style>