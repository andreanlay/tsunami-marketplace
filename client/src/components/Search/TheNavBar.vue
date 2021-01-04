<template>
<div class="d-flex flex-row m-3">
    <router-link :to="{name: 'homepage'}">
        <b-button variant="default" class="bg-light btn-circle" :class="{'btn-circle-dark' : darkMode}"><b-icon icon="chevron-compact-left"></b-icon></b-button>
    </router-link>
    <div class="flex-fill ml-2">
        <form action="">
            <div class="p-2 bg-light rounded rounded-pill mb-4" :class="{'midbar-dark': darkMode}">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <button id="button-search" type="submit" class="btn btn-link text-primary" disabled><b-icon icon="search"></b-icon></button>
                    </div>
                    <input 
                        type="text" 
                        v-model="searchQuery"
                        placeholder="What are you searching for ? (Press ENTER to search)" 
                        class="form-control border-0 search-input"
                    >
                    <div class="input-group-append mr-2">
                        <b-button class="advance-seach" id="advance-search">Advance search</b-button>
                    </div>
                    <div class="v-div d-none d-sm-inline"></div>
                    <select name="category" id="cat-select" class="custom-select border-0 bg-light">
                        <option value="all">All</option>
                        <option 
                            v-for="subcat in subcategories"
                            :key="subcat.id"
                            :value="subcat.name"
                        >
                        {{ subcat.name }}
                        </option>
                    </select>
                </div>
            </div>
        </form>
    </div> 
    <router-link :to="{name: 'dashboard'}">
        <b-button variant="default" class="bg-light btn-circle ml-2" :class="{'btn-circle-dark' : darkMode}"><b-icon icon="person-circle"></b-icon></b-button>
    </router-link>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            searchQuery: '',
        }
    },
    computed: {
        ...mapGetters(['subcategories', 'darkMode'])
    },
    mounted() {
        this.searchQuery = this.$route.params.query
    }
}
</script>

<style scoped>
.form-control:focus {
    box-shadow: none;
}

.custom-select:focus {
    outline: none;
    box-shadow: none;
}

.form-control::placeholder {
    font-size: 0.95rem;
    color: #aaa;
    font-style: italic;
}

#cat-select {
    border-radius: 50px 50px 50px 50px;
}

.advance-seach {
    background: none;
    border: none;
    color: blue;
    transition: all 0.5s;
}

.advance-seach:hover {
    color: black;
}

.advance-seach:focus {
    outline: none;
}

.btn-circle {
    background-color: #e9e9e9;
    width: 55px;
    height: 55px;
    padding: 8px 16px;
    border-radius: 35px;
    text-align: center;
    font-size: 18px;
    line-height: 1.33;
}

.v-div {
    width: 1px;
    background-color: gray;
}

.btn-circle-dark {
    color: white;
    outline: none;
    background-color: #333 !important;
}

.btn-circle-dark:hover {
    color: white;
    opacity: 0.8;
}

.midbar-dark {
    color: white;
    background-color: #333 !important;
}

.midbar-dark * {
    color: white;
    background-color: #333 !important;
}

.search-input {
    background: none;
}
</style>