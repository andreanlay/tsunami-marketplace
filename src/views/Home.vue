<template>
<b-container fluid>
    <HomeNavBar/>
    <b-button v-b-modal.search-modal variant="primary" class="floating-btn btn-circle d-sm-none">
        <b-icon icon="search" class="icon"></b-icon>
    </b-button>
    <b-modal id="search-modal" title="Search" centered>
        <b-form>
            <b-form-group
                id="search-group"
            >
                <b-form-input
                    id="search-input"
                    type="text"
                    placeholder="Enter product name"
                    required
                ></b-form-input>    
            </b-form-group>
        </b-form>
    </b-modal>

    <b-row class="m-4">
        <b-col sm="12" xl="8">
            <b-carousel
                id="deals-carousel"
                :interval="3000"
                controls
                indicators
            > 
                <b-carousel-slide
                    v-for="banner in banners"
                    :key="banner.id"
                    :name="banner.id"
                    :img-src="banner.image"
                ></b-carousel-slide>
            </b-carousel>
        </b-col>
        <b-col sm="12" xl="4">
            <b-row>
                <p class="lead">Recharge and Payment</p>
            </b-row>
            <b-row>
                <b-col>
                    <BillsButton v-for="type in billsType" :key="type.id" :iconName="type.iconName" :buttonText="type.caption"/>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <h1>Today's Flash sale✨ {{todayDate}}</h1>
        </b-col>
    </b-row>
    <hr>
    <b-row class="d-flex justify-content-center">
        <FlashSaleCard v-for="product in flashSaleProducts" :key="product.product_id" :product="product"/>
    </b-row>
    <b-row>
        <b-col>
            <h1>Daily deals🎁</h1>
        </b-col>
    </b-row>
    <hr>
    <b-row class="d-flex justify-content-center">
        <DailyDealsCard v-for="product in dailyDealsProducts" :key="product.id" :product="product"/>
    </b-row>
    <br>
    <Footer/>
</b-container>
</template>

<script>
import { mapGetters } from 'vuex';

import HomeNavBar from '@/components/Homepage/TheNavBar'
import BillsButton from '@/components/Homepage/BillsButton'
import FlashSaleCard from '@/components/Homepage/FlashSaleCard'
import DailyDealsCard from '@/components/Homepage/DailyDealsCard'
import Footer from '@/components/Homepage/TheFooter'

var months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
};

export default {
    title: 'Tsunami Marketplace',
    components: {
        HomeNavBar,
        BillsButton,
        FlashSaleCard,
        DailyDealsCard,
        Footer
    },
    computed: {
        ...mapGetters(['flashSaleProducts', 'dailyDealsProducts'])
    },
    mounted() {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        this.todayDate = `${day} ${months[month]} ${date.getFullYear()}`
    },
    data() {
        return{
            todayDate: '',
            banners: [
                {
                    id: 1,
                    image: require('@/assets/banners/intro_banner.png'),
                },
                {
                    id: 2,
                    image: require('@/assets/banners/payment_banner.png'),
                },
                {
                    id: 3,
                    image: require('@/assets/banners/bills_banner.png')
                }
            ],
            billsType: [
                {
                    id: 1,
                    iconName: 'lightning',
                    caption: 'Electricity'
                },
                {
                    id: 2,
                    iconName: 'droplet',
                    caption: 'Water'
                },
                {
                    id: 3,
                    iconName: 'wifi',
                    caption: 'Internet'
                },
                {
                    id: 4,
                    iconName: 'phone',
                    caption: 'Mobile Recharge'
                },
                {
                    id: 5,
                    iconName: 'truck',
                    caption: 'Transportation'
                },
                {
                    id: 6,
                    iconName: 'archive',
                    caption: 'Cinema'
                }
            ]
        }
    }
}
</script>

<style>
.floating-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

.btn-circle {
    width: 55px;
    height: 55px;
    padding: 8px 16px;
    border-radius: 35px;
    text-align: center;
    font-size: 18px;
    line-height: 1.9;
    z-index: 1;
}

.icon {
    margin-left: -4px;
}
</style>