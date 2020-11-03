<template>
<b-button variant="light" class="bills-btn">
    <b-icon :icon="iconName"></b-icon>
    <p> {{buttonText}}</p>
</b-button>
</template>

<script>
export default {
    props: {
        iconName: String,
        buttonText: String
    }
}
</script>

<style scoped>
.bills-btn {
    margin: 10px;
    width: 125px;
    height: 125px;
    border-radius: 25px 25px 25px 25px;
}

.bills-btn:hover {
    background-color: #B7F8DB;
}
</style>