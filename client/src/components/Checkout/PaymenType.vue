<template>
<div>
    <h1 class="lead">2. Payment Info</h1>
    <hr>
    <b-form-group
        label="Voucher Code"
        label-align="left"
    >   
        <b-input-group>
            <b-form-input type="text" :value="payment.voucher" disabled></b-form-input>
            <b-input-group-append>
                <b-button variant="success" disabled>
                    <b-icon icon="check"></b-icon>
                    Check
                </b-button>
            </b-input-group-append>
        </b-input-group>
    </b-form-group>

    <b-form-group
        label="Payment Method"
        label-align="left"
    >   
        <b-form-select v-model="paymentMethod.method" :options="paymentMethods" @change="clearSelection"></b-form-select>
    </b-form-group>

    <div v-if="paymentMethod.method == 'Credit Card'">
        <b-form-group
            label="Name on Card"
            label-align="left"
        >   
            <b-form-input type="text" v-model="paymentMethod.card_name" @change="changeMethodDetails" placeholder="Enter your name"></b-form-input>
        </b-form-group>
        <b-form-group
            label="Card Number"
            label-align="left"
        >   
            <b-form-input type="number" v-model="paymentMethod.card_number" @change="changeMethodDetails" placeholder="xxxx - xxxx - xxxx - xxxx"></b-form-input>
        </b-form-group>
        <b-row>
            <b-col>
                <b-form-group
                    label="CVV Number"
                    label-align="left"
                >   
                    <b-form-input type="number" v-model="paymentMethod.cvv" @change="changeMethodDetails" placeholder="CVV"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group
                    label="Exp. Month"
                    label-align="left"
                >   
                    <b-form-select v-model="paymentMethod.expired_month" @change="changeMethodDetails">
                        <option v-for="i in 12" :key="i"> {{i}}</option>
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group
                    label="Exp. Year"
                    label-align="left"
                >   
                    <b-form-select v-model="paymentMethod.expired_year" @change="changeMethodDetails">
                        <option v-for="i in 5" :key="i"> {{i + 2019}}</option>
                    </b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
    </div>
    <div v-else-if="paymentMethod.method == 'Bank Transfer'">
        <b-form-group
            label="Type"
            label-align="left"
        >   
            <b-form-select v-model="paymentMethod.type" @change="changeMethodDetails">
                <option value="automatic">Automatic / Virtual Account</option>
                <option value="manual">Manual</option>
            </b-form-select>
        </b-form-group>
        <b-form-group
            label="Bank Name"
            label-align="left"
        >   
            <b-form-select v-model="paymentMethod.bank" :options="bankNames" @change="changeMethodDetails"></b-form-select>
        </b-form-group>
    </div>
    <div v-else-if="paymentMethod.method == 'Cash on Delivery (COD)'">
        <small class="float-right">Billing address will be the same as your shipping address.</small>
        <small class="float-right">Please prepare the money beforehand</small>
    </div>
    <div v-else-if="paymentMethod.method == 'OVO'">
        <b-form-group
            label="OVO Account ID"
            label-align="left"
        >
            <b-input-group prepend="+62">
                <b-form-input v-model="paymentMethod.phone_number" type="text" @change="changeMethodDetails" required></b-form-input>
            </b-input-group>
        </b-form-group>

        <b-form-checkbox
            v-model="use_phonenumber"
            name="checkbox-1"
            class="float-right"
            @change="checkUseAccountNumber"
        >
            Use this account phone number
        </b-form-checkbox>
    </div>
    <div v-else-if="paymentMethod.method == 'GoPay'">
        <b-form-group
            label="GoPay Account ID"
            label-align="left"
        >
            <b-input-group prepend="+62">
                <b-form-input v-model="paymentMethod.phone_number" type="text" @change="changeMethodDetails" required></b-form-input>
            </b-input-group>
        </b-form-group>

        <b-form-checkbox
            v-model="use_phonenumber"
            name="checkbox-1"
            class="float-right"
            @change="checkUseAccountNumber"
        >
            Use this account phone number
        </b-form-checkbox>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            selected: null,
            use_phonenumber: null,
            phonenumber: '',
            paymentMethod: {}
        }
    },
    computed: {
        ...mapGetters(['paymentMethods', 'bankNames', 'payment', 'accountData'])
    },
    methods: {
        checkUseAccountNumber() {
            if(!this.use_phonenumber) {
                this.paymentMethod.phone_number = this.accountData.phone_number
            } else {
                this.paymentMethod.phone_number = ''
            }
        },
        clearSelection() {
            if(Object.keys(this.paymentMethod).length > 1) {
                this.paymentMethod = {}
            }
        },  
        changeMethodDetails() {
            this.$store.commit('setPaymentMethod', this.paymentMethod)
        }
    }
}
</script>

<style scoped>

</style>