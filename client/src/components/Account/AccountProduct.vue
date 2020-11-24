<template>
<b-card
    header="Your products"
    header-text-variant="white"
    header-class="bold"
    header-bg-variant="primary"
    class="m-3"
    :class="{'card-dark': darkMode}"
>
    <b-card-text>
        <div class="product-action-menu">
            <b-button variant="success" class="mb-4">Set Flash Sale</b-button>
            <b-button variant="danger" class="ml-4 mr-auto mb-4">Set Daily Deals</b-button>
            <b-button v-b-modal.add-product-modal variant="warning" class="ml-4 mb-4 align-self-end">Add Product</b-button>
        </div>
        <b-table responsive striped :items="products" :fields="fields" :dark="darkMode">
             <template #cell(actions)="row">
                 <div class="d-flex flex-row justify-content-center">
                    <b-button size="sm" @click="row.toggleDetails" class="m-1" variant="primary">
                        <b-icon v-if="row.detailsShowing" icon="eye-slash"></b-icon>
                        <b-icon v-else icon="eye"></b-icon>
                    </b-button>
                    <b-button size="sm" @click="editProduct(row.item._id)" class="m-1" variant="primary">
                        <b-icon icon="pencil"></b-icon>
                    </b-button>
                    <b-button size="sm" @click="deleteProduct(row.item._id)" class="m-1" variant="danger">
                        <b-icon icon="trash"></b-icon>
                    </b-button>
                 </div>
            </template>
            <template #row-details="row">
                <b-row>
                    <b-col>
                        <b-carousel
                            :interval="4000"
                            controls
                            indicators
                        >
                            <b-carousel-slide
                                v-for="(item, i) in row.item.images"
                                :key="i"
                                :img-src="'' + item.path"
                            ></b-carousel-slide>
                        </b-carousel>
                    </b-col>
                    <b-col>
                        <div>
                            <b>Category</b>
                            <p>{{row.item.category}}</p>
                            <hr :class="{'divider-dark': darkMode}">
                            <b>Subcategory</b>
                            <p>{{row.item.subcategory}}</p>
                            <hr :class="{'divider-dark': darkMode}">
                            <b>Detailed Description</b>
                            <p v-html="row.item.detailed_description"></p>
                            <hr :class="{'divider-dark': darkMode}">
                        </div>
                        <b>Specifications</b>
                        <b-table
                            :items="row.item.specifications"
                            :fields="['name', 'value']"
                            :dark="darkMode"
                            bordered
                            class="mt-4"
                        ></b-table>
                    </b-col>
                </b-row>
            </template>    
        </b-table>  
    </b-card-text>

    <b-modal 
        id="add-product-modal"
        title="Add New Product"
        :header-bg-variant="theme()"
        :header-text-variant="textTheme()"
        :body-bg-variant="theme()"
        :body-text-variant="textTheme()"
        :footer-bg-variant="theme()"
        :footer-text-variant="textTheme()"
        button-size="sm"
        size="md"
        @ok="addProduct"
    >
        <form @submit.stop.prevent="handleSubmit">
            <b-form-group
                label="Product Name"
            >
                <b-form-input
                    v-model="newProduct.name"
                    placeholder="Enter product name.."
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Product Category"
            >
                <b-form-select v-model="newProduct.category" size="sm" @change="changeSubcategory" required>
                    <b-form-select-option v-for="(item, i) in category_names" :key="i" :value="item">{{item}}</b-form-select-option>
                </b-form-select>
                <b-form-select v-model="newProduct.subcategory" size="sm" class="mt-2" required>
                    <b-form-select-option v-for="(item, i) in subcategory" :key="i" :value="item">{{item}}</b-form-select-option>
                </b-form-select>
            </b-form-group>
            <b-form-group
                label="Product Image(s)"
            >
                <b-form-file
                    v-model="newProduct.images"
                    placeholder="Choose any image for your product.."
                    :file-name-formatter="formatNames"
                    accept="image/*"
                    multiple
                ></b-form-file>
            </b-form-group>
            <b-form-group
                label="Product Description"
            >
                <b-form-textarea
                    v-model="newProduct.description"
                    placeholder="Enter product description (Max. 180 chars)"
                    rows="3"
                    :state="newProduct.description.length <= 180"
                    no-resize
                ></b-form-textarea>
            </b-form-group>
            <b-form-group
                label="Product Detailed Description"
            >
                <b-card class="quill-card">
                    <quill-editor
                        v-model="newProduct.detailed_description"
                    ></quill-editor>
                </b-card>
            </b-form-group>
            <b-form-group
                label="Product Price"
            >
                <b-input-group
                    prepend="Rp"
                >
                    <b-form-input
                        type="number"
                        v-model="newProduct.price"
                        min="0"
                    ></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group
                label="Product Stock"
            >
                <b-input-group
                    append="Item(s)"
                >
                    <b-form-input
                        type="number"
                        v-model="newProduct.stock"
                        min="0"
                    ></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group
                label="Product Specification"
            >
                <b-form>
                    <b-form-input
                        type="text"
                        v-model="newSpecs.specs_name"
                        placeholder="Specification name"
                    ></b-form-input>
                    <b-form-input
                        type="text"
                        v-model="newSpecs.specs_value"
                        placeholder="Specification value"
                        class="mt-2 mb-3"
                    ></b-form-input>
                    <div class="d-flex flex-row">
                        <b-button variant="primary" class="ml-auto mb-3" @click="addSpecification">Add</b-button>
                    </div>
                </b-form>
                <b-table
                    :items="newProduct.specifications"
                    :fields="['name', 'value', 'actions']"
                    :dark="darkMode"
                >
                <template #cell(actions)="row">
                    <b-button variant=danger @click="deleteSpecs(row.item.id)" size="sm">
                        <b-icon icon="trash"></b-icon>
                    </b-button>
                </template>
                </b-table>
            </b-form-group>
        </form>
    </b-modal>

        <b-modal 
        id="edit-product-modal"
        v-model="editModal"
        title="Edit Product"
        :header-bg-variant="theme()"
        :header-text-variant="textTheme()"
        :body-bg-variant="theme()"
        :body-text-variant="textTheme()"
        :footer-bg-variant="theme()"
        :footer-text-variant="textTheme()"
        button-size="sm"
        size="md"
        @ok="saveEditedProduct"
    >
        <form @submit.stop.prevent="handleSubmit">
            <b-form-group
                label="Product Name"
            >
                <b-form-input
                    v-model="editedProduct.name"
                    placeholder="Enter product name.."
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Product Category"
            >
                <b-form-select v-model="editedProduct.category" size="sm" @change="changeSubcategory" required>
                    <b-form-select-option v-for="(item, i) in category_names" :key="i" :value="item">{{item}}</b-form-select-option>
                </b-form-select>
                <b-form-select v-model="editedProduct.subcategory" size="sm" class="mt-2" required>
                    <b-form-select-option v-for="(item, i) in subcategory" :key="i" :value="item">{{item}}</b-form-select-option>
                </b-form-select>
            </b-form-group>
            <b-form-group
                label="Add New Image(s)"
            >
                <b-form-file
                    v-model="newImages"
                    placeholder="Choose any image for your product.."
                    :file-name-formatter="formatNames"
                    accept="image/*"
                    multiple
                ></b-form-file>
            </b-form-group>
            <b-table-simple small bordered responsive :dark="darkMode">
                <b-thead>
                    <b-tr class="text-center">
                        <b-th>Image</b-th>
                        <b-th>Action</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody class="text-center">
                    <b-tr v-for="image in editedProduct.images" :key="image.name">
                        <b-td>
                            <img :src="'' + image.path">
                        </b-td>
                        <b-td style="vertical-align: middle;">
                            <b-button variant="danger" @click="deleteImage(image.name)">
                                <b-icon icon="trash"></b-icon>
                            </b-button>
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
            <b-form-group
                label="Product Description"
            >
                <b-form-textarea
                    v-model="editedProduct.description"
                    placeholder="Enter product description (Max. 180 chars)"
                    rows="3"
                    no-resize
                ></b-form-textarea>
            </b-form-group>
            <b-form-group
                label="Product Detailed Description"
            >
                <b-card class="quill-card">
                    <quill-editor
                        v-model="editedProduct.detailed_description"
                    ></quill-editor>
                </b-card>
            </b-form-group>
            <b-form-group
                label="Product Price"
            >
                <b-input-group
                    prepend="Rp"
                >
                    <b-form-input
                        type="number"
                        v-model="editedProduct.price"
                        min="0"
                    ></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group
                label="Product Stock"
            >
                <b-input-group
                    append="Item(s)"
                >
                    <b-form-input
                        type="number"
                        v-model="editedProduct.stock"
                        min="0"
                    ></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group
                label="Product Specification"
            >
                <b-form>
                    <b-form-input
                        type="text"
                        v-model="newSpecs.specs_name"
                        placeholder="Specification name"
                    ></b-form-input>
                    <b-form-input
                        type="text"
                        v-model="newSpecs.specs_value"
                        placeholder="Specification value"
                        class="mt-2 mb-3"
                    ></b-form-input>
                    <div class="d-flex flex-row">
                        <b-button variant="primary" class="ml-auto mb-3" @click="addSpecification">Add</b-button>
                    </div>
                </b-form>
                <b-table
                    :items="editedProduct.specifications"
                    :fields="['name', 'value', 'actions']"
                    :dark="darkMode"
                >
                <template #cell(actions)="row">
                    <b-button variant=danger @click="deleteEditedSpecs(row.item.id)" size="sm">
                        <b-icon icon="trash"></b-icon>
                    </b-button>
                </template>
                </b-table>
            </b-form-group>
        </form>
    </b-modal>
</b-card>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'
import axios from 'axios'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from'vue-quill-editor'

export default {
    title: 'Products – Tsunami',
    data() {
        return {
            newProduct: {
                seller_uid: '',
                name: '',
                category: '',
                subcategory: '',
                description: '',
                detailed_description: '',
                price: 0,
                stock: 0,
                sold: 0,
                specifications: [],
                images: [],
            },
            newSpecs: {
                specs_name: '',
                specs_value: ''
            },
            editModal: false,
            newImages: [],
            deletedImages: [],
            editedProduct: {

            },
            subcategory: null,
            products: null,
            fields: [
                {
                    key: 'name', 
                    sortable: true
                }, 
                {
                    key: 'stock', 
                    sortable: true
                },
                'description', 'price',
                {
                    key: 'sold', 
                    sortable: true
                },
                'actions'
            ]
        }
    },
    computed: {
        ...mapGetters(['darkMode', 'subcategories', 'category_names'])
    },
    components: {
        quillEditor
    },
    async mounted() {
        const uid = firebase.auth().currentUser.uid
        this.newProduct.seller_uid = uid

        await axios.get(`/api/product/${uid}`)
        .then(res => {
            this.products = res.data
        })
    },
    methods: {
        theme() {
            return this.darkMode ? 'dark' : 'light'
        },
        textTheme() {
            return this.darkMode ? 'light' : 'dark'
        },
        changeSubcategory() {
            if(this.editModal) {
                this.subcategories.forEach(item => {
                    if(item.name == this.editedProduct.category) {
                        this.subcategory = item.categories
                    }
                })
            } else {
                this.subcategories.forEach(item => {
                    if(item.name == this.newProduct.category) {
                        this.subcategory = item.categories
                    }
                })
            }
        },
        formatNames(files) {
            return files.length == 1 ? files[0].name : `${files.length} files selected`
        },
        addSpecification() {
            if(this.editModal) {
                this.editedProduct.specifications.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: this.newSpecs.specs_name,
                    value: this.newSpecs.specs_value
                })
            } else {
                this.newProduct.specifications.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: this.newSpecs.specs_name,
                    value: this.newSpecs.specs_value
                })   
            }
            this.newSpecs.specs_name = ''
            this.newSpecs.specs_value = ''
        },
        deleteSpecs(id) {
            this.newProduct.specifications.forEach((item, i) => {
                if(item.id == id) {
                    this.newProduct.specifications.splice(i, 1)
                }
            })
        },
        deleteEditedSpecs(id) {
            this.editedProduct.specifications.forEach((item, i) => {
                if(item.id == id) {
                    this.editedProduct.specifications.splice(i, 1)
                }
            })
        },
        resetProductData() {
            this.newProduct['name'] = ''
            this.newProduct['category'] = ''
            this.newProduct['subcategory'] = ''
            this.newProduct['images'] = []
            this.newProduct['description'] = ''
            this.newProduct['detailed_description'] = ''
            this.newProduct['price'] = 0
            this.newProduct['stock'] = 0
            this.newProduct['specifications'] = []
        },
        async addProduct() {
            // Convert string to Number
            this.newProduct['price'] = parseInt(this.newProduct['price'])
            this.newProduct['stock'] = parseInt(this.newProduct['stock'])

            let data = new FormData()
            this.newProduct['images'].forEach(item => {
                data.append('file', item)
            })
            
            // Convert to JSON string because FormData doesn't accept Object 
            data.append('specifications', JSON.stringify(this.newProduct['specifications']))

            for(let [key, val] of Object.entries(this.newProduct)) {
                if(key == 'images' || key == 'specifications')
                    continue
                data.append(key, val)
            }

            await axios.post('/api/product/add', data)
            .then(res => {
                this.resetProductData()
                this.products.push(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
        },
        async deleteProduct(id) {
            await axios.delete(`/api/product/delete/${id}`)
            .then(res => {
                for(let i=0; i<this.products.length; i++) {
                    if(this.products[i]._id == id) {
                        this.products.splice(i, 1)
                        break
                    }
                }
                return res
            })
        },
        editProduct(id) {
            // Show modal
            this.editModal = true

            // Find clicked row product data
            for(let i=0; i<this.products.length; i++) {
                if(this.products[i]._id == id) {
                    // Deep copy the dictionary
                    this.editedProduct = JSON.parse(JSON.stringify(this.products[i]))
                    break
                }
            }

            // Call subcategories check for selected category in product edit
            this.changeSubcategory()
        },
        async saveEditedProduct() {
            const id = this.editedProduct._id
            delete this.editedProduct._id

            let data = new FormData()

            this.newImages.forEach(img => {
                data.append('file', img)
            })

            data.append('specifications', JSON.stringify(this.editedProduct['specifications']))
        
            data.append('deletedImages', JSON.stringify(this.deletedImages))
            for(let [key, val] of Object.entries(this.editedProduct)) {
                if(key == 'images' || key == 'specifications') 
                    continue
                data.append(key, val)
            }

            await axios.put(`/api/product/edit/${id}`, data)
            .then(res => {
                for(let i=0; i<this.products.length; i++) {
                    if(this.products[i]._id == id) {
                        // Use Vue.set to trigger reactivity
                        Vue.set(this.products, i, res.data)
                        break
                    }
                }
            })
        },
        deleteImage(name) {
            for(let i=0; i<this.editedProduct.images.length; i++) {
                if(this.editedProduct.images[i].name == name) {
                    this.deletedImages.push(name)
                    this.editedProduct.images.splice(i, 1)
                    break
                }
            }
        }
    }
}
</script>

<style scoped>
.product-action-menu {
    display: flex;
    flex-direction: row;
}

.quill-card * {
    color: black;
}

.divider-dark {
    background-color: gray;
}
</style>