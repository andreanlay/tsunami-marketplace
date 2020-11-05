<template>
<b-form>
    <div class="p-2 bg-light rounded rounded-pill shadow-sm mb-4">
        <div class="input-group">
            <div class="input-group-prepend">
                <button id="button-search" type="submit" class="btn btn-link text-primary" disabled><b-icon icon="search"></b-icon></button>
            </div>
            <input 
                type="text" 
                v-model="search"
                @input="onChange"
                @keydown.up="onArrowUp"
                @keydown.down="onArrowDown"
                @keydown.enter="onEnter"
                placeholder="What are you searching for ? (Press ENTER to search)" 
                class="form-control border-0 bg-light"
                >
        </div>
    </div>
    <ul v-show="searching" class="autocomplete-results">
        <li 
            v-for="(key, i) in result"
            :key="i"
            @click="setResult(key)"
            :class="{'active' : i == currentSelected}"
            class="autocomplete-result"
        >
            {{ key }}    
        </li>
    </ul>
</b-form>
</template>

<script>
export default {
    props: {
        categories: Array
    },
    data() {
        return {
            search: '',
            result: [],
            searching: false,
            currentSelected: -1,
        }
    },
    methods: {
        onChange() {
            if(this.search == ""){
                this.searching  = false
                return
            }
            this.searching = true
            this.filterSearch()
        },
        filterSearch() {
            this.result = this.categories.filter(category => category.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
        },
        setResult(result) {
            this.search = result
            this.searching = false
            this.currentSelected = -1
        },

        onArrowUp() {
            if(this.currentSelected > 0)
                this.currentSelected--
        },
        onArrowDown() {
            if(this.currentSelected < this.result.length)
                this.currentSelected++
        },
        onEnter() {
            if(this.currentSelected == -1 && this.search != null) {
                let selectedCategory = document.getElementsByClassName(this.search)[0]
                selectedCategory.scrollIntoView()
                return
            }
            this.search = this.result[this.currentSelected]
            this.searching = false
            this.currentSelected = -1
        }
    },
}
</script>

<style scoped>
.form-control:focus {
    box-shadow: none !important;
}

.form-control::placeholder {
    font-size: 0.95rem;
    color: #aaa;
    font-style: italic;
}

.autocomplete-results {
    position: absolute;
    padding: 0;
    margin-top: -20px;
    margin-left: 55px;
    max-width: 150px;
    border: 1px solid #eeeeee;
    background-color: white;
    opacity: 0.8;
    border-radius: 10px;
    overflow: auto;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 5px;
    cursor: pointer;
}

.autocomplete-result:hover {
    background-color: #1d8bd4;
    color: white;
}

.active {
    background-color: #1d8bd4;
    color: white;
}
</style>