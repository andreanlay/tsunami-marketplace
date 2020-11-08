<template>
<b-container fluid class="pt-3 pb-3" id="account-container">
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
import AccountNavBar from '@/components/Account/TheNavBar'
import AccountSideBar from '@/components/Account/TheSideBar'

export default {
    components: {
        AccountNavBar,
        AccountSideBar,
    }
}
</script>

<style scoped>
#account-container {
    background: linear-gradient(#fbc2eb, #a6c1ee);
    min-height: 100vh;
}
</style>