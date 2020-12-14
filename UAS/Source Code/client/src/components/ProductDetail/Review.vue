<template>
<div>
    <b-row class="justify-content-center mt-5">
        <b-col sm="12" xl="8">
            <div class="d-flex flex-column align-items-start">
                <p class="display-6">Product Review</p>
            </div>
            <div v-if="posts.length == 0">
                <p class="lead">No one's reviewed this product yet.</p>
            </div>
            <div v-else>
                <div id="review-list">
                    <Post v-for="item in getCurrentPageItems()" :key="item._id" :post="item"/>
                </div>
                <b-pagination 
                    v-model="currentPage" 
                    :per-page="itemsPerPage" 
                    :total-rows="posts.length"
                    aria-controls="review-list"
                    align="center"
                    pills
                ></b-pagination>
            </div>
        </b-col>
    </b-row>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

import Post from '@/components/ProductDetail/Post'

export default {
    data() {
        return {
            posts: [],
            currentPage: 1,
            itemsPerPage: 3
        }
    },
    components: {
        Post
    },
    computed: {
        ...mapGetters(['product'])
    },
    mounted() {
        const id = this.$route.params.id

        axios.get(`/api/post/reviews/${id}`)
        .then(res => {
            this.posts = res.data
        })    
    },
    methods: {
        getCurrentPageItems() {
            const temp = this.posts.slice(
                (this.currentPage - 1) * this.itemsPerPage,
                this.currentPage * this.itemsPerPage
            )
            return temp
        }
    }
}
</script>

<style>

</style>