<template>
<div>
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
                    <p class="lead" :class="{'header-dark': darkMode}">Recharge and Payment</p>
                </b-row>
                <b-row>
                    <b-col>
                        <BillsButton v-for="type in billsType" :key="type.id" :iconName="type.iconName" :buttonText="type.caption"/>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="m-3">
                <h1 :class="{'header-dark' : darkMode}">All products</h1>
                <carousel
                    class="m-3"
                    :perPage="5"
                >
                    <slide
                        v-for="product in allProducts"
                        :key="product._id"
                    >
                        <ProductCard :product="product"/>
                    </slide>
                </carousel>
            </b-col>
        </b-row>
        <hr :class="{'divider-dark': darkMode}">
        <b-row>
            <b-col class="m-3">
                <h1 :class="{'header-dark' : darkMode}">Today's Flash sale✨- {{todayDate}}</h1>
                <carousel
                    class="m-3"
                    :perPage="5"
                >
                    <slide
                        v-for="product in flashSaleProducts"
                        :key="product._id"
                    >
                        <FlashSaleCard :flashsale="product"/>
                    </slide>
                </carousel>
                <h1 class="display-6 text-white" v-if="flashSaleProducts.length == 0">No Flash Sale today! Come back tommorow</h1>
            </b-col>
        </b-row>
        <hr :class="{'divider-dark': darkMode}">
        <b-row>
            <b-col>
                <h1 :class="{'header-dark' : darkMode}">Daily deals🎁</h1>
            </b-col>
        </b-row>
        <hr>
        <b-row class="d-flex justify-content-center">
            <DailyDealsCard v-for="product in dailyDealsProducts" :key="product.id" :product="product"/>
        </b-row>
        <br>
    </b-container>
    <Footer/>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios'

import HomeNavBar from '@/components/Homepage/TheNavBar'
import BillsButton from '@/components/Homepage/BillsButton'
import FlashSaleCard from '@/components/Homepage/FlashSaleCard'
import DailyDealsCard from '@/components/Homepage/DailyDealsCard'
import Footer from '@/components/Homepage/TheFooter'
import ProductCard from '@/components/Search/ItemCard'
import { Carousel, Slide } from 'vue-carousel'

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
        Footer,
        ProductCard,
        Carousel,
        Slide
    },
    computed: {
        ...mapGetters(['dailyDealsProducts', 'darkMode'])
    },
    async mounted() {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        this.todayDate = `${day} ${months[month]} ${date.getFullYear()}`

        await axios.get('/api/product/')
        .then(res => {
            this.allProducts = res.data
        })

        await axios.get(`/api/flashsale/${Date.now()}`)
        .then(res => {
            this.flashSaleProducts = res.data
        })
    },
    data() {
        return{
            todayDate: '',
            allProducts: [],
            flashSaleProducts: [],
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

<style scoped>
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

.header-dark {
    color: white;
    filter: brightness(50%);
}

.card-dark {
    color: white;
    background-color: #312c2c !important;
}

.divider-dark {
    background-color: gray
}
</style>