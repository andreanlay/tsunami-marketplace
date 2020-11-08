<template>
<div class="d-flex flex-column align-items-start m-3">
    <h1 class="display-7 info-header">Add New Address</h1>
    <div class="data-row">
        <p class="row-label">Receiver Name</p>
        <input v-model="receiver" type="text" class="row-input">
    </div>
    <div class="data-row">
        <p class="row-label">Shipping Addressd</p>
        <input v-model="address" type="text" class="row-input">
    </div>
    <b-button variant="primary" @click="addAddress" class="align-self-end">Add Address</b-button>
    
    <br>
    <h1 class="display-7 info-header">Address List</h1>
    <div id="table-container">
        <b-table :items="items" hover responsive></b-table>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            receiver: '',
            address: '',
            count: 2,
            items: [
                {
                    '#': 1,
                    'Name': 'John' ,
                    'Shipping Address': 'UNTAR Kampus 4'
                },
                {
                    '#': 2,
                    'Name': 'Lisa',
                    'Shipping Address': 'UNTAR Kampus 2'
                },

            ]
        }
    },
    methods: {
        addAddress() {
            this.count++
            this.items.push(
                {
                    '#': this.count,
                    'Name': this.receiver,
                    'Shipping Address': this.address
                }
            )
        }
    }
}
</script>

<style>
#table-container {
    width: 100%;
}
</style>