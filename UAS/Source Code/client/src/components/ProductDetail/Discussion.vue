<template>
<div>
    <b-row class="justify-content-center mt-5">
        <b-col sm="12" xl="8">
            <div class="d-flex flex-row justify-content-between">
                <p class="display-6">Product Discussion</p>
                <b-button size="md" variant="success" @click="newDiscussionModal = true">Add new discussion</b-button>
            </div>
            <b-modal
                title="New discussion"
                v-model="newDiscussionModal"
                centered
                ok-title="Post"
                ok-variant="success"
                @ok="newDiscussion"
                cancel-title="Discard"
            >
                <b-form-textarea
                    v-model="discussionText"
                    placeholder="What's in your mind ?"
                >
                </b-form-textarea>
            </b-modal>

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
            newDiscussionModal: false,
            discussionText: ''
        }
    },
    components: {
        Post
    },
    computed: {
        ...mapGetters(['product', 'accountData'])
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
        async newDiscussion() {
            const id = this.$route.params.id

            await axios.post(`/api/post/`, {
                type: 'discussion',
                product: id,
                poster: this.accountData._id,
                description: this.discussionText,
                posted_date: Date.now()
            }).then(res => {
                this.posts.unshift(res.data)
            })
        }
    }
}
</script>

<style>

</style>