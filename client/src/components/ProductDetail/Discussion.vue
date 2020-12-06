<template>
<div>
    <b-row class="justify-content-center mt-5">
        <b-col sm="12" xl="8">
            <div class="d-flex flex-column align-items-start">
                <p class="display-6">Product Discussion</p>
            </div>
            <div v-if="posts.length == 0">
                <p class="lead">Discussion is empty.</p>
            </div>
            <div v-else>
                <div id="discussion-list">
                    <div v-for="item in getCurrentPageItems()" :key="item._id">
                        <Post :post="item" @new-reply="addReply" :parentID="item._id"/>
                        <div id="reply-list" class="ml-5">
                            <Post v-for="reply in item.replies" :key="reply._id" :post="reply"/>
                        </div>
                    </div>
                </div>
                <b-pagination 
                    v-model="currentPage" 
                    :per-page="itemsPerPage" 
                    :total-rows="posts.length"
                    aria-controls="discussion-list"
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
            itemsPerPage: 2,
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

        axios.get(`/api/post/discussions/${id}`)
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
        },
        async addReply(reply_data, discussion_id) {
            const post = this.posts.find(post => post._id == discussion_id)
            post.replies.push(reply_data)
        },
    }
}
</script>

<style>

</style>