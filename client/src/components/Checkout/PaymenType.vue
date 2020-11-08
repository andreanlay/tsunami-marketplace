<template>
<div>
    <h1 class="lead">2. Payment Info</h1>
    <hr>
    <b-form-group
        label="Voucher Code"
        label-align="left"
    >   
        <b-input-group>
            <b-form-input type="text" placeholder="Enter your code"></b-form-input>
            <b-input-group-append>
                <b-button variant="outline-primary">Check</b-button>
            </b-input-group-append>
        </b-input-group>
    </b-form-group>

    <b-form-group
        label="Payment Method"
        label-align="left"
    >   
        <b-form-select v-model="selected" :options="paymentMethods"></b-form-select>
    </b-form-group>

    <div v-if="selected == 'creditcard'">
        <b-form-group
            label="Name on Card"
            label-align="left"
        >   
            <b-form-input type="text" placeholder="Enter your name"></b-form-input>
        </b-form-group>
        <b-form-group
            label="Card Number"
            label-align="left"
        >   
            <b-form-input type="number" placeholder="xxxx - xxxx - xxxx - xxxx"></b-form-input>
        </b-form-group>
        <b-row>
            <b-col>
                <b-form-group
                    label="CVV Number"
                    label-align="left"
                >   
                    <b-form-input type="number" placeholder="CVV"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group
                    label="Exp. Month"
                    label-align="left"
                >   
                    <b-form-select>
                        <option v-for="i in 12" :key="i"> {{i}}</option>
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group
                    label="Exp. Year"
                    label-align="left"
                >   
                    <b-form-select>
                        <option v-for="i in 5" :key="i"> {{i + 2019}}</option>
                    </b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
    </div>
    <div v-else-if="selected == 'banktransfer'">
        <b-form-group
            label="Type"
            label-align="left"
        >   
            <b-form-select>
                <option value="automatic">Automatic / Virtual Account</option>
                <option value="manual">Manual</option>
            </b-form-select>
        </b-form-group>
        <b-form-group
            label="Bank Name"
            label-align="left"
        >   
            <b-form-select :options="bankNames"></b-form-select>
        </b-form-group>
    </div>
    <div v-else-if="selected == 'cod'">
        <small class="float-right">Billing address will be the same as your shipping address.</small>
        <small class="float-right">Please prepare the money beforehand</small>
    </div>
    <div v-else-if="selected == 'ovo'">
        <b-form-group
            label="OVO Account ID"
            label-align="left"
        >
            <b-input-group prepend="+62">
                <b-form-input type="number" placeholder="856 2815 6912" required></b-form-input>
            </b-input-group>
        </b-form-group>

        <b-form-checkbox
            v-model="use_phonenumber"
            name="checkbox-1"
            value="true"
            unchecked-value="false"
        >
            Use this account phone number
        </b-form-checkbox>
    </div>
    <div v-else-if="selected == 'gopay'">
        <b-form-group
            label="GoPay Account ID"
            label-align="left"
        >
            <b-input-group prepend="+62">
                <b-form-input type="number" placeholder="856 2815 6912" required></b-form-input>
            </b-input-group>
        </b-form-group>

        <b-form-checkbox
            v-model="use_phonenumber"
            name="checkbox-1"
            value="true"
            unchecked-value="false"
            class="float-right"
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
        }
    },
    computed: {
        ...mapGetters(['paymentMethods', 'bankNames'])
    }
}
</script>

<style scoped>

</style>