<template>
<div class="d-flex flex-column flex-wrap">
    <div class="d-flex flex-row flex-wrap">
        <img id="profile-photo" src="@/assets/profile_photo_default.png">
        <p class="lead ml-3"> {{post.poster.display_name}} </p>
    </div>
    <div v-if="post.type == 'review'" class="d-flex flex-row flex-wrap ml-n3">
        <b-form-rating class="rating" :class="{'dark': darkMode}" variant="warning" inline no-border :value="post.review" readonly></b-form-rating>
    </div>
    <p class="align-self-start"> {{post.description}} </p>
    <small class="ml-auto">Posted on {{new Date(post.posted_date).toDateString()}}</small>
    <b-button 
        v-if="post.type == 'discussions'" 
        class="ml-auto" 
        variant="success" 
        size="sm" 
        @click="replyModal = true"
    >
        Reply
    </b-button>

    <b-modal
        v-if="post.type == 'discussions'" 
        title="Reply discussion"
        v-model="replyModal"
        centered
        ok-title="Post"
        ok-variant="success"
        @ok="replyPost"
        cancel-title="Discard"
    >
        <b-form-textarea
            v-model="replyMessage"
            placeholder="What's in your mind ?"
        >
        </b-form-textarea>
    </b-modal>
    <hr>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    props: {
        post: Object,
        parentID: String
    },
    computed: {
        ...mapGetters(['accountData', 'darkMode'])
    },
    data() {
        return {
            replyMessage: '',
            replyModal: false
        }
    },
    methods: {
        async replyPost() {
            await axios.post('/api/post/', {
               type: 'reply',
               product: this.post.product,
               poster: this.accountData._id,
               description: this.replyMessage,
               posted_date: Date.now()
            })
            .then(async res => {
                await axios.post(`/api/post/discussions/${this.parentID}/reply`, {
                    _id: res.data._id
                }).then(res2 => {
                    this.$emit('new-reply', res.data, this.parentID)
                    return res2
                })
            })
        }
    }
}
</script>

<style scoped>
#profile-photo {
    margin-top: -10px;
    width: 50px;
    height: 50px
}

.dark {
    background-color: #1a1616;
}

.rating:focus {
    background: none;
    outline: none !important;
    box-shadow: none;
}
</style>

