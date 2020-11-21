<template>
<b-container fluid class="pt-3 pb-3" id="account-container" :class="{'account-container-dark' : darkMode}">
    <b-row no-gutters>
        <b-col cols="2">
            <AccountSideBar/>
        </b-col>
        <b-col cols="10">
            <AccountNavBar/>
            <router-view/>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import firebase from 'firebase/app'
import axios from 'axios'
import { mapGetters } from 'vuex'

import AccountNavBar from '@/components/Account/TheNavBar'
import AccountSideBar from '@/components/Account/TheSideBar'

export default {
    components: {
        AccountNavBar,
        AccountSideBar,
    },
    computed: {
        ...mapGetters(['darkMode'])
    },
    async beforeCreate() {
        const uid = firebase.auth().currentUser.uid
        await axios.get(`/api/auth/${uid}`).then(res => {
            res.data['displayName'] = firebase.auth().currentUser.displayName
            res.data['email'] = firebase.auth().currentUser.email
            this.$store.commit('accountData', res.data)
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>

<style scoped>
#account-container {
    background: linear-gradient(#fbc2eb, #a6c1ee);
    min-height: 100vh;
}

.account-container-dark {
  color: #eee;
  background: linear-gradient(to bottom right, #000000,#292828) !important;
}
</style>