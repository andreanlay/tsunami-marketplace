<template>
<div>
    <h1 class="lead">1. Shipping</h1>
    <hr>
    <b-form-group
        label="Courier Service"
        label-align="left"
    >
    <b-form-select :options="options" @change="selectCourier" v-model="courier"></b-form-select>
    </b-form-group>
    <div id="table-container">
        <b-table :fields="fields" :items="items" hover responsive :dark="darkMode">
            <template #cell(actions)="row">
                <b-button v-if="row.item.is_default" size="sm" variant="success" @click="selectAddress(row.item._id)">
                    Selected
                </b-button>
                <b-button v-else size="sm" @click="selectAddress(row.item._id)">
                    Select
                </b-button>
            </template>
        </b-table>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            fields: [{key: 'name', sortable: true}, 'shipping_address', 'actions'],
            items: [],
            options: [
                { value: 'JNE', text: 'JNE'},
                { value: 'J&T', text: 'J&T'},
                { value: 'Ninja', text: 'Ninja Express'},
                { value: 'Tiki', text: 'Tiki'},
                { value: 'Grab Same Day', text: 'Grab Same Day'},
                { value: 'Grab Instant', text: 'Grab Instant'},
                { value: 'Go Send Same Day', text: 'Go Send Same day'},
                { value: 'Go Send Instant', text: 'Go Send Instant'},
            ],
            courier: ''
        }
    },
    computed: {
        ...mapGetters(['darkMode', 'accountData'])
    },
    mounted() {
        axios.get(`/api/address/${this.accountData.uid}`)
        .then(res => {
            this.items = res.data
            for(let i=0; i<this.items.length; i++) {
                if(this.items[i].is_default) {
                    this.$store.commit('setAddress', this.items[i])
                }
            }
        })
    },
    methods: {
        selectAddress(id) {
            this.items.forEach(item => {
                if(item.is_default) {
                    item.is_default = false
                }
                if(item._id == id) {
                    item.is_default = true
                    this.$store.commit('setAddress', item)
                }
            })
        },
        selectCourier() {
            this.$store.commit('setCourier', this.courier)
        }
    }
}
</script>

<style scoped>

</style>