<template>
<div>
    <b-row no-gutters>
        <b-col cols="3">
        <b-card
            title="Saving"
            text-variant="white"
            bg-variant="danger"
            style="max-width: 24rem;"
            class="m-3"
        >
            <b-card-text>You just saved <b>Rp{{saved_money}}</b> from vouchers this month</b-card-text>
        </b-card>
        </b-col>
        <b-col cols="3">
        <b-card
            title="Spending"
            text-variant="white"
            bg-variant="success"
            style="max-width: 24rem;"
            class="m-3"
        >
            <b-card-text>You just spent <b>Rp{{spent_money}}</b> from transactions this month</b-card-text>
        </b-card>
        </b-col>
    </b-row>
    <b-row no-gutters>
        <b-col>
            <b-card
                header="Transaction History"
                header-text-variant="white"
                header-class="bold"
                header-bg-variant="primary"
                class="m-3"
                :class="{'card-dark': darkMode}"
            >
                <b-card-text>
                    <b-table responsive striped :fields="fields" :items="transactions" :dark="darkMode">
                        <template #cell(TransactionID)="row">
                            <b>TSU-{{row.item._id}}</b>
                        </template>
                        <template #cell(date)="row">
                            <p>{{new Date(row.item.date).toDateString()}}</p>
                        </template>
                        <template #cell(type)="row">
                            <p>{{row.item.buyer_id == accountData._id ? 'Outcome' : 'Income'}}</p>    
                        </template>    
                        <template #cell(total)="row">
                            <p>IDR {{row.item.total / 1000}} K</p>
                        </template>
                        <template #cell(actions)="row">
                            <div class="text-center">
                                <b-button size="sm" @click="row.toggleDetails" class="m-1" variant="primary">
                                    <b-icon v-if="row.detailsShowing" icon="eye-slash"></b-icon>
                                    <b-icon v-else icon="eye"></b-icon>
                                </b-button>
                                <b-button v-show="row.item.buyer_id == accountData._id && row.item.status != 'Done'" size="sm" @click="markAsDone(row.item._id)" class="m-1" variant="success">
                                    <b-icon icon="check"></b-icon>
                                </b-button>
                            </div>
                        </template>
                        <template #row-details="row">
                            <b-row>
                                <b-col>
                                    <b-table 
                                        :items="row.item.cart"
                                        :fields="[{label: 'Product Name', key: 'product.name'}, {label: 'Seller', key: 'product.seller.seller.name'}, 'qty', 'price']"
                                        :dark="darkMode"
                                    ></b-table>
                                </b-col>
                                <b-col>
                                    <b-table 
                                        :items="[row.item.shipping_address]"
                                        :fields="['name', 'shipping_address', 'phone_number', 'actions']"
                                        :dark="darkMode"
                                    >
                                        <template #cell(actions)="row">
                                            <div class="text-center">
                                                <b-button size="sm" @click="row.toggleDetails" class="m-1" variant="primary">
                                                    <b-icon v-if="row.detailsShowing" icon="eye-slash"></b-icon>
                                                    <b-icon v-else icon="eye"></b-icon>
                                                </b-button>
                                            </div>
                                        </template>
                                        <template #row-details="row">
                                            <b-table 
                                                :items="row.item.details"
                                                :fields="detailsField"
                                                :dark="darkMode"
                                                stacked
                                                small
                                            ></b-table>
                                        </template>
                                    </b-table>
                                </b-col>
                            </b-row>
    
                        </template>
                    </b-table>    
                </b-card-text>
            </b-card>
        </b-col>
    </b-row>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    title: 'Transactions – Tsunami',
    computed: {
        ...mapGetters(['darkMode', 'accountData'])
    },
    data() {
        return {
            saved_money: 0,
            spent_money: 0,
            transactions: [],
            fields: ['TransactionID', 'date', 'type', 'total', 'status', 'actions']
        }
    },
    mounted() {
        axios.get(`/api/transaction/${this.accountData._id}`)
        .then(res => {
            this.transactions = res.data
            this.transactions.forEach(transaction => {
                this.saved_money += transaction.discount
                this.spent_money += transaction.total - transaction.discount
            })
        })
    },
    methods: {
        async markAsDone(id) {
            await axios.put(`/api/transaction/${id}`, {
                status: 'Done'
            }).then(res => {
                for(let i=0; i<this.transactions.length; i++) {
                    if(this.transactions[i]._id == id) {
                        Vue.set(this.transactions, i, res.data)
                        break
                    }
                }
            })
        }
    }
}
</script>

<style>
</style>