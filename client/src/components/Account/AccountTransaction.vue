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
                    <b-table responsive striped :fields="fields" :items="transactions" v-model="currentOpenTransaction" :dark="darkMode">
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
                                <b-button size="sm" @click="toggleDetails(row.item)" class="m-1" variant="primary">
                                    <b-icon v-if="row.detailsShowing" icon="eye-slash"></b-icon>
                                    <b-icon v-else icon="eye"></b-icon>
                                </b-button>
                            </div>
                        </template>
                        <template #row-details="row">
                            <b-row>
                                <b-col>
                                    <b-table 
                                        :items="row.item.cart"
                                        :fields="[{label: 'Product Name', key: 'product.name'}, {label: 'Seller', key: 'product.seller.seller.name'}, 'qty', 'price', 'actions']"
                                        :dark="darkMode"
                                    >
                                        <template #cell(actions)="row">
                                            <div class="text-center">
                                                <b-button v-if="!row.item.review" @click="openReviewModal(row.item.product._id)" variant="warning" size="sm">
                                                    <b-icon icon="pencil-square"></b-icon>
                                                    Give Review
                                                </b-button>
                                            </div>
                                        </template>
                                    </b-table>
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

                <b-modal
                    title="Write your review"
                    v-model="review.modalShow"
                    centered
                    ok-title="Submit"
                    ok-variant="success"
                    @ok="submitReview"
                    cancel-title="Discard"
                >
                    <b-form-textarea
                        v-model="review.message"
                        placeholder="What's in your mind ?"
                    >
                    </b-form-textarea>
                    <b-form-rating 
                        v-model="review.rating" 
                        variant="warning" 
                        class="mt-3"
                        no-border
                    ></b-form-rating>
                    <div class="d-flex flex-row justify-content-between">
                        <p>Not Satisfied</p>
                        <p>Very Satisfied</p>
                    </div>
                </b-modal>
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
            currentOpenTransaction: [],
            fields: ['TransactionID', 'date', 'type', 'total', 'status', 'actions'],
            review: {
                modalShow: false,
                product_id: '',
                message: '',
                rating: '',
                transaction_id: ''
            }
        }
    },
    mounted() {
        this.$emit('activated', 3)

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
        toggleDetails(row) {
            if(row._showDetails){
                this.$set(row, '_showDetails', false)
            }else{
                this.currentOpenTransaction.forEach(item => {
                    this.$set(item, '_showDetails', false)
                })
                this.$nextTick(() => {
                    this.$set(row, '_showDetails', true)
                    this.review.transaction_id = row._id
                })
            }
        },
        openReviewModal(product_id) {
            this.review.modalShow = true
            this.review.product_id = product_id
        },
        async submitReview() {
            await axios.post(`/api/post/`, {
                type: 'review',
                product: this.review.product_id,
                poster: this.accountData._id,
                description: this.review.message,
                posted_date: Date.now(),
                review: this.review.rating
            }).then(async res => {
                await axios.put(`/api/transaction/${this.review.transaction_id}/review`, {
                    product: this.review.product_id
                }).then(res2 => {
                    for(let i=0; i<this.transactions.length; i++) {
                        if(this.transactions[i]._id == this.review.transaction_id) {
                            Vue.set(this.transactions, i, res2.data)
                        }
                    }
                })
                return res
            })
        }
    }
}
</script>

<style>
</style>