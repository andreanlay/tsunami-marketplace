<template>
<div>
<b-row no-gutters>
    <b-col sm="12" xl="3">
        <b-card
            title="Follower"
            text-variant="white"
            bg-variant="primary"
            style="max-width: 24rem;"
            class="m-3"
        >
            <b-card-text>You just got <b>{{new_follower}}</b> new followers today. Keep up the good work</b-card-text>
        </b-card>
    </b-col>
    <b-col sm="12" xl="3">
        <b-card
            title="Profit"
            text-variant="white"
            bg-variant="warning"
            style="max-width: 24rem;"
            class="m-3"
        >
            <b-card-text>You just got <b>Rp{{today_profit}} </b> profit today</b-card-text>
        </b-card>
    </b-col>
    <b-col sm="12" xl="3">
        <b-card
            title="Product Views"
            text-variant="white"
            bg-variant="danger"
            style="max-width: 24rem;"
            class="m-3"
        >
            <b-card-text><b>{{today_views}} new views from your products today</b></b-card-text>
        </b-card>
    </b-col>
    <b-col sm="12" xl="3">
        <b-card
            title="Items sold"
            text-variant="white"
            bg-variant="success"
            style="max-width: 24rem;"
            class="m-3"
        >
            <b-card-text>You have sold a total of <b>{{items_sold_today}}</b> items today</b-card-text>
        </b-card>
    </b-col>
</b-row>
<b-row no-gutters>
    <b-col sm="12" xl="6">
        <b-card
            header="October 2020 - Sales Report"
            header-text-variant="white"
            header-class="bold"
            header-bg-variant="primary"
            class="m-3"
            :class="{'card-dark' : darkMode}"
        >
            <b-card-text>
                <b-table v-if="darkMode" responsive striped :items="salesReport" dark></b-table>    
                <b-table v-else responsive striped :items="salesReport"></b-table>    
            </b-card-text>
        </b-card>
    </b-col>
    <b-col sm="12" xl="6">
        <b-row no-gutters>
            <b-col>
                <b-card
                    title="Transaction Status"
                    style="max-width: 24rem;"
                    class="m-3"
                    :class="{'card-dark': darkMode}"
                >
                    <b-card-text>
                        <b-progress :value="33" variant="primary"></b-progress>
                        1 out of 3 Transaction Completed
                    </b-card-text>
                </b-card> 
            </b-col>
            <b-col>
                <b-card
                    title="Rating summary"
                    style="max-width: 24rem;"
                    class="m-3"
                    :class="{'card-dark' : darkMode}"
                >
                    <b-card-text>Your rating is at 5.0. Keep up the good work!</b-card-text>
                </b-card>
            </b-col>
        </b-row>
        <b-row no-gutters>
            <b-card
            header="Latest Customer Review"
            header-text-variant="white"
            header-class="bold"
            header-bg-variant="success"
            class="m-3"
            style="width: 100%"
            :class="{'card-dark' : darkMode}"
        >
            <b-card-text>
                <b-table responsive striped :items="latestReviews" :fields="reviewFields" :dark="darkMode">
                    <template #cell(posted_date)="row">
                        {{ new Date(row.item.posted_date).toDateString() }}
                    </template>    
                    <template #cell(review)="row">
                        {{ row.item.review }}⭐
                    </template>
                </b-table>    
            </b-card-text>
        </b-card>
        </b-row>
    </b-col>
</b-row>
</div>
</template>

<script>
import axios from 'axios'

import { mapGetters } from 'vuex'

export default {
    title: 'Dashboard – Tsunami',
    computed: {
        ...mapGetters(['accountData', 'productReviews', 'darkMode'])
    },
    mounted() {
        axios.get(`/api/post/reviews/seller/${this.accountData._id}`)
        .then(res => {
            this.latestReviews = res.data
        })
    },
    data() {
        return {
            new_follower: 15,
            today_profit: '1.565.3000',
            today_views: 1612,
            items_sold_today: 4,
            latestReviews: [],
            reviewFields: [
                { 'label': 'Review Date', key: 'posted_date' },
                { 'label': 'Review', key: 'description'},
                { 'label': 'Rating', key: 'review'}
            ],
        }
    },
}
</script>

<style>
.bold {
    font-size: 18px;
    font-weight: 500;
}

b-card-text {
    color: white !important;
}

.card-dark {
    background-color: rgb(15, 15, 15) !important;
}
</style>