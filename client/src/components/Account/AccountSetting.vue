<template>
<b-row id="account-card" no-gutters :class="{'account-card-dark': darkMode}">
    <b-col xl="4" sm="12">
        <div class="d-flex flex-column align-items-center">
            <b-icon class="profile-picture" icon="person-square" font-scale="15"></b-icon>

        </div>
    </b-col>
    <b-col xl="8" sm="12">
        <div id="data-section" class="d-flex flex-column align-items-start"> 
            <h1 class="display-5">{{accountData.display_name}}</h1>
            <p class="text-muted">{{`📍 ${accountData.seller.location}`}}</p>
            <p><b>🥈Silver Member</b></p>
            <div class="ratings">
                <p class="text-muted float-left">Ratings:</p>
                <p>⭐⭐⭐⭐⭐ <b>5.0</b></p>
            </div>
            <b-tabs
                v-if="darkMode"
                content-class="mt-3"
                active-nav-item-class="font-weight-bold tab-active-dark"
                nav-class="normal-nav"
                style="width: 100%"
            >
                <b-tab title="📒 Account" active :title-link-class="`tab-inactive-dark`">
                    <InformationTab/>
                </b-tab>
                <b-tab title="🔑 Security" :title-link-class="'tab-inactive-dark'" lazy>
                    <SecurityTab/>
                </b-tab>
                <b-tab title="🏠 Address" :title-link-class="'tab-inactive-dark'" lazy>
                    <AddressTab/>
                </b-tab>
                <b-tab title="⚙️ Advance" :title-link-class="'tab-inactive-dark'" lazy>
                    <AdvanceTab/>
                </b-tab>
            </b-tabs>
            <b-tabs
                v-else
                content-class="mt-3"
                active-nav-item-class="font-weight-bold tab-active"
                nav-class="normal-nav"
                style="width: 100%"
            >
                <b-tab title="📒 Account" active :title-link-class="`tab-inactive`">
                    <InformationTab/>
                </b-tab>
                <b-tab title="🔑 Security" :title-link-class="'tab-inactive'" lazy>
                    <SecurityTab/>
                </b-tab>
                <b-tab title="🏠 Address" :title-link-class="'tab-inactive'" lazy>
                    <AddressTab/>
                </b-tab>
                <b-tab title="⚙️ Advance" :title-link-class="'tab-inactive'" lazy>
                    <AdvanceTab/>
                </b-tab>
            </b-tabs>
        </div>
    </b-col>
</b-row>
</template>

<script>
import { mapGetters } from 'vuex' 

import InformationTab from '@/components/Account/AccountSetting/TheInformationTab'
import SecurityTab from '@/components/Account/AccountSetting/TheSecurityTab'
import AddressTab from '@/components/Account/AccountSetting/TheAddressTab'
import AdvanceTab from '@/components/Account/AccountSetting/TheAdvanceSetting'

export default {
    title: 'Account Setting – Tsunami',
    components: {
        InformationTab,
        SecurityTab,
        AddressTab,
        AdvanceTab
    },
    computed: {
        ...mapGetters(['accountData', 'darkMode'])
    },
}
</script>

<style>
.tab-inactive-dark {
    border: none !important;
    opacity: 0.7 !important;
    color: white !important;
}

.tab-inactive-dark:hover {
    margin-top: -2px;
}

.tab-active-dark {
    border: none !important;
    background: none !important;
    border-bottom: 3px solid rgb(2, 80, 150) !important;
}

.tab-inactive {
    opacity: 0.7 !important;
    color: black !important;
    transition: all 0.5 ease-in-out;
}

.tab-inactive:hover {
    margin-top: -2px;
}

.tab-active {
    background: none !important;
    border-bottom: 2px solid black !important;
}

.profile-picture {
    margin-left: 45px;
}

#account-card {
    padding-top: 25px;
    background-color: rgba(230, 230, 230, 0.6);
}

.display-5 {
    font-size: 2.5rem;
    font-weight: 300;
}

.display-6 {
    font-size: 1.5rem;
    font-weight: 300;
}

.display-7 {
    font-size: 1.25rem;
    font-weight: 300;
}

.tab-inactive-dark {
    color: white;
}

.account-card-dark {
    background-color: rgba(45, 45, 45, 0.3) !important;
}

.account-card-dark p {
    color: white;
}
</style>