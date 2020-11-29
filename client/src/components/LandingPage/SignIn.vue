<template>
<div class="m-4 mt-n5">
    <b-row>
        <b-col sm="12" md="6" xl="2" offset-md="3" offset-xl="5">
            <p><b>Login via social media</b></p>
            <b-button variant="light" class="w-100 mb-3">
                <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                Sign In with Google
            </b-button>
            <b-button variant="light" class="w-100">
                <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Akash_rajoriya_Facebook_.png"/>
                Sign In with Facebook
            </b-button>
        </b-col>
        <b-col sm="12" md="6" xl="4" offset-md="3" offset-xl="4" class="mt-3">
            <p><b>or login via Tsunami Account</b></p>
            <b-form @submit.prevent="onSubmit">
                <b-form-group
                    id="email-group"
                >
                    <b-form-input
                        id="email-input"
                        type="email"
                        v-model="email"
                        placeholder="Enter email"
                        required
                    ></b-form-input>    
                </b-form-group>
                <b-form-group
                    id="password-group"
                >
                    <b-form-input
                        id="password-input"
                        type="password"
                        v-model="password"
                        placeholder="Enter password"
                        required
                    ></b-form-input>    
                </b-form-group>
                <p class="bold" style="color: red" v-show="errorMsg">{{errorMsg}}</p>
                <p>
                    <a href="" class="float-right" style="color: white;">Forgot password?</a>
                </p>
                <br>
                <b-button :class="{'btn-loading': loading}" type="submit" variant="primary">{{loading ? "Signing in...": "Login"}}</b-button>
            </b-form>
        </b-col>
    </b-row>
</div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

export default {
    title: 'Sign In – Tsunami',
    data() {
        return {
            email: null,
            password: null,
            errorMsg: null,
            loading: false,
        }
    },
    methods: {
        async onSubmit() {
            this.loading = true
            await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                const uid = user.uid
                axios.get(`/api/account/${uid}/cart`)
                .then(res => {
                    this.$store.commit('setCart', res.data[0].cart)
                })
                axios.get(`/api/account/${uid}`)
                .then(res => {
                    this.$store.commit('accountData', res.data)
                })
                this.$router.push({name: 'homepage'})
            })
            .catch(err => {
                this.errorMsg = err.message
            })
            this.loading = false
        }
    }
}
</script>

<style scoped>
.btn-loading {
    opacity: 0.6;
}
</style>