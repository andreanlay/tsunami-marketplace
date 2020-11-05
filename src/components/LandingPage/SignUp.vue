<template>
<div class="m-4 mt-n5">
    <b-row>
        <b-col sm="12" md="6" xl="2" offset-md="3" offset-xl="5">
            <p><b>Sign up via social media</b></p>
            <b-button variant="light" class="w-100 mb-3">
                <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                Sign Up with Google
            </b-button>
            <b-button variant="light" class="w-100">
                <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Akash_rajoriya_Facebook_.png"/>
                Sign Up with Facebook
            </b-button>
        </b-col>
        <b-col sm="12" md="6" xl="4" offset-md="3" offset-xl="4" class="mt-3">
            <p><b>or create a new Tsunami Account</b></p>
            <b-form @submit="onSubmit">
                <b-form-group>
                    <b-input-group>
                        <b-form-input type="text" placeholder="First name" required></b-form-input>
                        <b-form-input type="text" placeholder="Last name" required></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <b-input-group>
                        <b-form-input type="email" placeholder="Email address" required></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <b-input-group prepend="+62">
                        <b-form-input type="number" placeholder="856 2815 6912" required></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <b-input-group>
                        <b-form-input type="password" placeholder="Password" required></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <b-input-group>
                        <b-form-input type="password" placeholder="Confirm password" required></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group>
                    <b-form-checkbox class="float-right"><span style="color: white;">I accept the terms and conditions</span></b-form-checkbox>
                </b-form-group>
                <b-button type="submit" variant="primary">Create account</b-button>
            </b-form>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    title: 'Sign Up – Tsunami',
}
</script>

<style>

</style>