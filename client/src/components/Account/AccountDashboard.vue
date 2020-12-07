<template>
<div>
<b-row no-gutters>
    <b-col sm="12" xl="3">
        <b-card
            title="Coming soon.."
            text-variant="white"
            bg-variant="primary"
            style="max-width: 24rem;"
            class="m-3"
        >
            <b-card-text>More information card coming soon. Have an idea ? Contact us!</b-card-text>
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
            <b-card-text>You just got <b>Rp{{totalProfit}} </b> from sales since you joined.</b-card-text>
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
            <b-card-text>You have sold a total of <b>{{itemsSold}}</b> items since you joined.</b-card-text>
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
                <b-table v-if="darkMode" responsive striped :items="latestSales" :fields="salesFields" :dark="darkMode">
                    <template #cell(transaction_id)="row">
                        <p>TSU-{{row.item.transaction_id}} </p>
                    </template>    
                    <template #cell(transaction_date)="row">
                        <p> {{new Date(row.item.transaction_date).toDateString()}} </p>
                    </template>
                </b-table>      
            </b-card-text>
        </b-card>
    </b-col>
    <b-col sm="12" xl="6">
        <b-row no-gutters>
            <b-col>
                <b-card
                    title="Current Weather"
                    style="max-width: 48rem; max-height: 24rem"
                    class="m-3"
                    :class="{'card-dark' : darkMode}"
                >
                    <b-card-text>
                        <p>You are in {{weather.name}}, {{weather.sys.country}}</p>
                    </b-card-text>
                    <b-row>
                        <b-col>
                            <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`">
                        </b-col>
                        <b-col align="left">
                            <p class="display-6">Temp: {{weather.main.temp}} °C</p>
                            <p class="display-6">Feels like: {{weather.main.feels_like}} °C</p>
                        </b-col>
                    </b-row>
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

        axios.get(`/api/transaction/${this.accountData._id}/sales`)
        .then(res => {
            this.latestSales = res.data
            this.latestSales.forEach(sale => {
                this.totalProfit += sale.total
                this.itemsSold += sale.qty
            })
        })

        axios.get('http://ip-api.com/json')
        .then(res => {
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${res.data.regionName}&appid=235b9a12b1b9c1bed97244a67959abf3&units=metric`)
            .then(res2 => {
                this.weather = res2.data
            })
            return res
        })
    },
    data() {
        return {
            new_follower: 15,
            totalProfit: 0,
            today_views: 1612,
            itemsSold: 0,
            latestSales: [],
            salesFields: [
                { 'label': 'ID', key: 'transaction_id' },
                { 'label': 'Date', key: 'transaction_date' },
                { 'label': 'Name', key: 'product_name' },
                { 'label': 'Quantity', key: 'qty'},
                'total'
            ],
            latestReviews: [],
            reviewFields: [
                { 'label': 'Review Date', key: 'posted_date' },
                { 'label': 'Review', key: 'description'},
                { 'label': 'Rating', key: 'review'}
            ],
            weather: null
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