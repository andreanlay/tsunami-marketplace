<template>
<b-row id="account-card" no-gutters>
    <b-col xl="4" sm="12">
        <div class="d-flex flex-column align-items-center">
            <b-icon class="profile-picture" icon="person-square" font-scale="15"></b-icon>

        </div>
    </b-col>
    <b-col xl="8" sm="12">
        <div id="data-section" class="d-flex flex-column align-items-start">
            <h1 class="display-5">{{username}}</h1>
            <p class="text-muted">📍 West Jakarta</p>
            <p><b>🥈Silver Member</b></p>
            <div class="ratings">
                <p class="text-muted float-left">Ratings:</p>
                <p>⭐⭐⭐⭐⭐ <b>5.0</b></p>
            </div>
            <b-tabs
                content-class="mt-3"
                active-nav-item-class="font-weight-bold tab-active"
                nav-class="normal-nav"
                style="width: 100%"
            >
                <b-tab title="📒 Account" active :title-link-class="'tab-inactive'">
                    <InformationTab/>
                </b-tab>
                <b-tab title="🔑 Security" :title-link-class="'tab-inactive'" lazy>
                    <SecurityTab/>
                </b-tab>
                <b-tab title="🏠 Address" :title-link-class="'tab-inactive'" lazy>
                    <AddressTab/>
                </b-tab>
            </b-tabs>
        </div>
    </b-col>
</b-row>
</template>

<script>
import InformationTab from '@/components/Account/AccountSetting/TheInformationTab'
import SecurityTab from '@/components/Account/AccountSetting/TheSecurityTab'
import AddressTab from '@/components/Account/AccountSetting/TheAddressTab'

export default {
    title: 'Account Setting – Tsunami',
    components: {
        InformationTab,
        SecurityTab,
        AddressTab
    },
    data() {
        return {
            username: 'Irfan Bachdim'
        }
    }
}
</script>

<style>
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
</style>