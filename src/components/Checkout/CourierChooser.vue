<template>
<div>
    <h1 class="lead">1. Shipping</h1>
    <hr>
    <b-form-group
        label="Courier Service"
        label-align="left"
    >
    <b-form-select></b-form-select>
    </b-form-group>
    <div id="table-container">
        <b-table :fields="fields" :items="items" hover responsive>
            <template #cell(action)>
                <b-button size="sm" variant="success">
                    Select
                </b-button>
            </template>
        </b-table>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            fields: ['Name', 'Shipping Address', 'action'],
            items: [
                {
                    'Name': 'John' ,
                    'Shipping Address': 'UNTAR Kampus 4'
                },
                {
                    'Name': 'Lisa',
                    'Shipping Address': 'UNTAR Kampus 2'
                },

            ]
        }
    }
}
</script>

<style scoped>

</style>