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
            <b-card-text><b>You got {{totalViews}} views from your products since you joined</b></b-card-text>
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
            header="Latest Sales Report"
            header-text-variant="white"
            header-class="bold"
            header-bg-variant="primary"
            class="m-3"
            :class="{'card-dark' : darkMode}"
        >
            <b-card-text>
                <b-table 
                    :items="getSales" 
                    :fields="salesFields" 
                    :dark="darkMode"
                    :current-page="salesCurrentPage"
                    :per-page="salesItemsPerPage"
                    ref="salesTable"
                    responsive 
                    striped
                >
                    <template #cell(transaction_id)="row">
                        <p>TSU-{{row.item.transaction_id}} </p>
                    </template>    
                    <template #cell(transaction_date)="row">
                        <p> {{new Date(row.item.transaction_date).toDateString()}} </p>
                    </template>
                </b-table>      
                <b-pagination 
                    v-model="salesCurrentPage" 
                    :per-page="salesItemsPerPage" 
                    :total-rows="latestSales.length"
                    aria-controls="review-table"
                    align="center"
                    pills
                ></b-pagination>  
            </b-card-text>
        </b-card>
    </b-col>
    <b-col sm="12" xl="6">
        <b-row no-gutters>
            <b-col>
                <b-card
                    title="Current Weather"
                    style="max-width: 48rem; max-height: 28rem"
                    class="m-3"
                    :class="{'card-dark' : darkMode}"
                >
                    <b-card-text v-if="fetchingWeatherError">
                        <p> {{fetchingWeatherError}} </p>
                    </b-card-text>
                    <div v-else>
                        <div v-if="fetchingWeather">
                            <b-spinner small></b-spinner>
                            Fetching weather..
                        </div>
                        <div v-if="weather">
                            <b-card-text>
                                <p>You are in {{weather.name}}, {{weather.sys.country}}</p>
                            </b-card-text>
                            <b-row>
                                <b-col>
                                    <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`">
                                </b-col>
                                <b-col align="left">
                                    <p class="display-7">Temp: {{weather.main.temp}} °C</p>
                                    <p class="display-7">Feels like: {{weather.main.feels_like}} °C</p>
                                </b-col>
                                <b-col align="left">
                                    <p>↑ {{weather.main.temp_max}} °C</p>
                                    <p>↓ {{weather.main.temp_min}} °C</p>
                                    <p>💧 {{weather.main.humidity}} RH</p>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                    <template #footer>
                        <em class="float-right">Powered by OpenWeatherMap API</em>
                    </template>
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
                <b-table 
                    :items="getReviews" 
                    :fields="reviewFields" 
                    :dark="darkMode" 
                    :current-page="reviewCurrentPage"
                    :per-page="reviewItemsPerPage"
                    ref="reviewTable"
                    responsive 
                    striped
                >
                    <template #cell(posted_date)="row">
                        {{ new Date(row.item.posted_date).toDateString() }}
                    </template>    
                    <template #cell(review)="row">
                        {{ row.item.review }}⭐
                    </template>
                </b-table>  
                <b-pagination 
                    v-model="reviewCurrentPage"
                    :per-page="reviewItemsPerPage" 
                    :total-rows="latestReviews.length"
                    aria-controls="sales-table"
                    align="center"
                    pills
                ></b-pagination>  
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
    async mounted() {
        this.$emit('activated', 1)

        const account_id = this.accountData._id
        axios.get(`/api/post/reviews/seller/${this.accountData._id}`)
        .then(res => {
            this.latestReviews = res.data
        })

        axios.get(`/api/product/${account_id}/views`)
        .then(res => {  
            this.totalViews = res.data
        })
        
        axios.get(`/api/product/seller/${account_id}`)
        .then(res => {
            res.data.forEach(product => {
                this.itemsSold += product.sold
            })
        })

        axios.get(`/api/transaction/${account_id}/sales`)
        .then(res => {
            this.latestSales = res.data
            this.latestSales.forEach(sale => {
                this.totalProfit += sale.total
            })
        })

        this.fetchingWeather = true
        let ip = null
        await axios.get('https://api.ipify.org?format=json')
        .then(res => {
            ip = res.data.ip
        })
        .catch(err => {
            this.fetchingWeatherError = 'Error when getting IP'
            return err
        })

        let city = null
        await axios.get(`https://ipwhois.app/json/${ip}`)
        .then(res => {
            city = res.data.city
        })
        .catch(err => {
            this.fetchingWeatherError = 'Error when geocoding detected location'
            return err
        })

        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=235b9a12b1b9c1bed97244a67959abf3&units=metric`)
        .then(res => {
            this.weather = res.data
            this.fetchingWeather = false
        })
        .catch(err => {
            this.fetchingWeatherError = 'Error when fetching weather from the API'
            return err
        })
    },
    data() {
        return {
            salesCurrentPage: 1,
            salesItemsPerPage: 5,
            reviewCurrentPage: 1,
            reviewItemsPerPage: 5,
            fetchingWeather: false,
            fetchingWeatherError: null,
            totalProfit: 0,
            totalViews: 0,
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
    methods: {
        getReviews(ctx) {
            return this.latestReviews.slice(
                (ctx.currentPage - 1) * ctx.perPage,
                ctx.currentPage * ctx.perPage
            )
        },
        getSales(ctx) {
            return this.latestSales.slice(
                (ctx.currentPage - 1) * ctx.perPage,
                ctx.currentPage * ctx.perPage
            )
        }
    },
    watch: {
        latestSales: function() {
            this.$refs.salesTable.refresh()
        },
        latestReviews: function() {
            this.$refs.reviewTable.refresh()
        }
    }
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