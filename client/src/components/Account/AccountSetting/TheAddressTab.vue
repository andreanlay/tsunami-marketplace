<template>
<div class="d-flex flex-column align-items-start m-3" :class="{'dark-account-tab': darkMode}">
    <h1 class="display-7 info-header" :class="{'info-header-dark': darkMode}">Add New Address</h1>
    <div class="data-row">
        <p class="row-label">Receiver Name</p>
        <input v-model="receiver" type="text" class="row-input">
    </div>
    <div class="data-row">
        <p class="row-label">Phone Number</p>
        <input v-model="phone_number" type="text" class="row-input">
    </div>
    <div class="data-row">
        <p class="row-label">Province</p>
        <select class="row-select" v-model="selectedPlace.provinceID" @change="onSelect(1)">
            <option 
                v-for="item in placesData.provinces" 
                :key="item.id" 
                :value="item.id"
            >
                {{item.nama}}
            </option>
        </select>
    </div>  
    <div class="data-row" v-show="placesData.citiesRegencies">
        <p class="row-label">City / Regency</p>
        <select class="row-select" v-model="selectedPlace.cityRegencyID" @change="onSelect(2)">
            <option 
                v-for="item in placesData.citiesRegencies"
                :key="item.id"
                :value="item.id"
            >
                {{item.nama}}
            </option>
        </select>
    </div>  
    <div class="data-row" v-show="placesData.districts">
        <p class="row-label">District</p>
        <select class="row-select" v-model="selectedPlace.districtID" @change="onSelect(3)">
            <option 
                v-for="item in placesData.districts"
                :key="item.id"
                :value="item.id"
            >
                {{item.nama}}
            </option>
        </select>
    </div>  
    <div class="data-row" v-show="placesData.subdistricts">
        <p class="row-label">Sub-district</p>
        <select class="row-select" v-model="selectedPlace.subdistrictID">
            <option 
                v-for="item in placesData.subdistricts"
                :key="item.id"
                :value="item.id"
            >
                {{item.nama}}
            </option>
        </select>
    </div>  
    <div class="data-row mt-2">
        <p class="row-label">Address</p>
        <input v-model="address" type="text" class="row-input">
    </div>    
    <b-form-checkbox
        v-model="useGeolocation"
        value=true
        unchecked-value=false
        class="align-self-end mb-3"
    >
        Use geolocation for more accurate location
    </b-form-checkbox>
    <GoogleMaps v-show="useGeolocation == 'true'" @mapClick="mapClick"/>
    <b-button variant="primary" @click="addAddress" class="align-self-end">
        <b-icon icon="plus"></b-icon>
        Add Address
        </b-button>
    <br>
    <h1 class="display-7 info-header">Address List</h1>
    <div id="table-container">
        <b-table 
            :items="data" 
            :fields="fields"
            bordered
            responsive
        >
            <template #cell(actions)="row">
                <div class="text-center">
                    <b-button size="sm" @click="row.toggleDetails" class="m-1" variant="primary">
                        <b-icon v-if="row.detailsShowing" icon="eye-slash"></b-icon>
                        <b-icon v-else icon="eye"></b-icon>
                    </b-button>
                    <b-button v-if="row.item.is_default" size="sm" class="m-1" variant="success">
                        <b-icon icon="check"></b-icon>
                        Default Address
                    </b-button>
                    <b-button v-else size="sm" class="m-1" variant="light" @click="setAsDefault(row.item._id)">
                        Set as Default
                    </b-button>
                    <a :href="`//www.google.com/maps/search/?api=1&query=${row.item.details.coordinates}`" target="_blank">
                        <b-button size="sm" class="m-1" variant="warning">
                            <b-icon icon="map"></b-icon>
                        </b-button>
                    </a>
                </div>
            </template>
            <template #row-details="row">
                <b-table 
                    :items="row.item.details"
                    :fields="detailsField"
                    borderless
                    stacked
                    small
                ></b-table>
            </template>
        </b-table>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

import GoogleMaps from '../../GoogleMaps.vue'

const OPTIONS = {
    province: 1,
    cityRegency: 2,
    district: 3,
    subdistrict: 4
}

export default {
    components: {
        GoogleMaps
    },
    data() {
        return {
            receiver: '',
            phone_number: '',
            selectedPlace: {
                provinceID: null,
                cityRegencyID: null,
                districtID: null,
                subdistrictID: null
            },
            placesData: {
                provinces: null,
                citiesRegencies: null,
                districts: null,
                subdistricts: null         
            },
            address: '',
            coordinates: null,
            useGeolocation: false,
            provinces: null,
            data: [],
            fields: [{key: 'name', sortable: true}, 'shipping_address', 'phone_number', 'actions'],
            detailsField: ['province', 'cityregency', 'district', 'subdistrict', 'coordinates'],
        }
    },
    computed: {
        ...mapGetters(['accountData', 'darkMode'])
    },
    methods: {
        onSelect(index) {
            if(index == OPTIONS.province) {
                axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${this.selectedPlace.provinceID}`)
                .then(res => {
                    this.placesData.citiesRegencies = res.data.kota_kabupaten
                })
                this.placesData.districts = null
                this.placesData.subdistricts = null
            } else if(index == OPTIONS.cityRegency) {
                axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${this.selectedPlace.cityRegencyID}`)
                .then(res => {
                    this.placesData.districts = res.data.kecamatan
                })
                this.placesData.subdistricts = null
            } else {
                axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${this.selectedPlace.districtID}`)
                .then(res => {
                    this.placesData.subdistricts = res.data.kelurahan
                })
            }
        },
        async setAsDefault(id) {
            for(let address of this.data) {
                if(address['is_default']) {
                    address['is_default'] = false
                }
                if(address['_id'] == id) {
                    address['is_default'] = true
                }
            }

            await axios.put(`/api/address/setdefault/${id}`)
        },
        async addAddress() {
            let provinceName = ''
            for(let obj of this.placesData.provinces) {
                if(obj['id'] == this.selectedPlace.provinceID) {
                    provinceName = obj['nama']
                    break
                }
            }
            let cityRegencyName = ''
            for(let obj of this.placesData.citiesRegencies) {
                if(obj['id'] == this.selectedPlace.cityRegencyID) {
                    cityRegencyName = obj['nama']
                    break
                }
            }
            let districtName = ''
            for(let obj of this.placesData.districts) {
                if(obj['id'] == this.selectedPlace.districtID) {
                    districtName = obj['nama']
                    break
                }
            }
            let subdistrictName = ''
            for(let obj of this.placesData.subdistricts) {
                if(obj['id'] == this.selectedPlace.subdistrictID) {
                    subdistrictName = obj['nama']
                    break
                }
            }

            const newAddress = {
                'owner_uid': this.accountData.uid,
                'is_default': false,
                'name': this.receiver,
                'phone_number': this.phone_number,
                'shipping_address': this.address,
                'details': [{
                    'province': provinceName,
                    'cityregency': cityRegencyName,
                    'district': districtName,
                    'subdistrict': subdistrictName,
                    'coordinates': `${this.coordinates.lat}, ${this.coordinates.lng}` 
                }]
            }

            this.data.push(newAddress)
            await axios.post("/api/address/add", newAddress)
        },
        mapClick(val) {
            this.coordinates = val
        }
    },
    async mounted() {
        await axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
        .then(res => {
            this.placesData.provinces = res.data.provinsi
        })
        await axios.get(`/api/address/${this.accountData.uid}`)
        .then(res => {
            this.data = res.data
        })
    },
}
</script>

<style scoped>
#table-container {
    width: 100%;
}
.row-input {
    width: 40%;
    height: 20px;
    border: none;
    background: none;
    border-bottom: 1px solid lightslategray;
}

.row-input:focus {
    outline: none;
}

.row-select {
    width: 40%;
    height: 30px;
    border: none;
    background: none;
    border: 1px solid lightslategray;
    border-radius: 7.5px;
}

.row-select:focus {
    outline: none;
}

option {
    color: black;
}
</style>