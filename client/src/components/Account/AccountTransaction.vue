<template>
<div>
    <b-row no-gutters>
        <b-col cols="3">
        <b-card
            title="Saving"
            text-variant="white"
            bg-variant="danger"
            style="max-width: 24rem;"
            class="m-3"
        >
            <b-card-text>You just saved <b>Rp{{saved_money}}</b> from vouchers this month</b-card-text>
        </b-card>
        </b-col>
        <b-col cols="3">
        <b-card
            title="Spending"
            text-variant="white"
            bg-variant="success"
            style="max-width: 24rem;"
            class="m-3"
        >
            <b-card-text>You just spent <b>{{spent_money}}</b> from transactions this month</b-card-text>
        </b-card>
        </b-col>
    </b-row>
    <b-row no-gutters>
        <b-col>
            <b-card
                header="Transaction History"
                header-text-variant="white"
                header-class="bold"
                header-bg-variant="primary"
                class="m-3"
            >
                <b-card-text>
                    <b-table responsive striped :items="salesReport"></b-table>    
                </b-card-text>
            </b-card>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    title: 'Transactions – Tsunami',
    data() {
        return {
            saved_money: '153.200',
            spent_money: 'Rp55.983.300'
        }
    }
}
</script>

<style>

</style>