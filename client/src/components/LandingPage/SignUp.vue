<template>
<div class="m-4 mt-n5">
    <b-row>
        <b-col sm="12" md="6" xl="4" offset-md="3" offset-xl="4" class="mt-3">
            <p class="display-6"><b>Welcome to Tsunami👋</b></p>
            <p class="display-6"><b>Please enter your details to create an account</b></p>
            <b-form @submit.prevent="onSubmit">
                <b-form-group>
                    <b-input-group>
                        <b-form-input v-model="first_name" type="text" placeholder="First name" required></b-form-input>
                        <b-form-input v-model="last_name" type="text" placeholder="Last name" required></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <b-input-group>
                        <b-form-input v-model="email" type="email" placeholder="Email address" required></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <b-form-select
                        id="input-3"
                        v-model="gender"
                        :options="genders"
                        required
                    ></b-form-select>
                </b-form-group>
                <b-form-group>
                    <b-input-group>
                        <b-form-datepicker v-model="birthday" placeholder="Date of Birth" :max="yesterday" required show-decade-nav></b-form-datepicker>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <b-input-group>
                        <b-form-input v-model="phone" type="number" placeholder="0856 2815 6912" required></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <b-input-group>
                        <b-form-input v-model="password" type="password" placeholder="Password" required></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <b-input-group>
                        <b-form-input v-model="confirmPassword" type="password" placeholder="Confirm password" @change="checkPassword" required></b-form-input>
                    </b-input-group>
                </b-form-group>
                <div class="d-flex justify-content-end">
                    <p style="color: red; font-size:20px" v-show="errorMsg"> {{errorMsg}}</p>
                </div>
                <b-form-group>
                    <b-form-checkbox v-model="checkedTOC" class="float-right"><span style="color: white;">I accept the terms and conditions</span></b-form-checkbox>
                </b-form-group>
                <b-button :class="{'btn-loading' : loading}" type="submit" variant="primary">{{loading ? "Creating account..." : "Create account"}}</b-button>
            </b-form>
        </b-col>
    </b-row>
</div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    title: 'Sign Up – Tsunami',
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        
        const maxDate = new Date(today)
        maxDate.setDate(maxDate.getDate() - 1)

        return {
            yesterday: maxDate,
            first_name: '',
            last_name: '',
            gender: '',
            birthday: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            checkedTOC: false,
            errorMsg: null,
            loading: false,
            genders: [{ text: 'Select gender', value: '' }, 'Male', 'Female']
        }
    },
    methods: {
        async onSubmit() {
            this.loading = true
            if(!this.checkedTOC) {
                this.errorMsg = 'Please make sure you are agree with our terms and conditions.'
                this.loading = false
                return
            }
            
            await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(res => {
                firebase.auth().currentUser.updateProfile({
                    displayName: `${this.first_name} ${this.last_name}`
                })
                firebase.auth().currentUser.sendEmailVerification()
                axios.post('/api/account/register', {
                    uid: res.user.uid,
                    display_name: `${this.first_name} ${this.last_name}`,
                    email_address: this.email,
                    gender: this.gender,
                    birthday: this.birthday,
                    phone_number: this.phone
                }).then(res => {
                    this.$router.push({name: 'login'})
                    return res
                }).catch(err => {
                    this.errorMsg = "Server error.. try again later"
                    return err
                })
            })
            .catch(err => {
                this.errorMsg = err.message
            })
            this.loading = false
        },
        checkPassword() {
            if(this.password != this.confirmPassword) {
                this.errorMsg = "Password is not the same!"
            } else {
                this.errorMsg = null
            }
        }
    }
}
</script> 

<style scoped>
.btn-loading {
    opacity: 0.6;
}
</style>