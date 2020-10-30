<template>
<div>
    <vue-typer
        :text=this.words
        :repeat="0"
        erase-style="clear"
        :erase-on-complete="true"
        @completed="destroySelf"
    ></vue-typer>
    <router-link to="/register">
        <div id="circle-button">
            Get Started
            <div class="pulse"></div>
        </div>
    </router-link>
</div>
</template>

<script>
import { VueTyper } from 'vue-typer'

export default {
    title: 'Introduction – Tsunami',
    components: {
        VueTyper
    },
    methods: {
        brandTitleChange(title) {
            this.brandTitle = title
        },
        destroySelf() {
            // const element = document.getElementsByTagName('vue-typer')[0]
            const circleButton = document.getElementById('circle-button')
            circleButton.style.display = 'block'
        }
    },
    data() {
        return {
            brandTitle: 'Tsunami',
            words: [
                "Hi👋",
                "We are Tsunami🌊",
                "We provide you with unique Marketplace concept🔥",
                "Make sure you are ready for a really damp experience💦",
            ]
        }
    },
    mounted() {
        const circleButton = document.getElementById('circle-button')
        circleButton.style.display = 'none'
    }
}
</script>

<style>
#test {
    height: 100vh;
}
.vue-typer {
    font-size: 36px;
}

.vue-typer .custom.char {
  color: white;
}
</style>

<style scoped>
a {
    text-decoration: none;
    color: white;
    font-size: medium;
}

a:hover {
    text-decoration: none;
    color: white;
}

/*
    Pulsing Button CSS
*/

#circle-button{
    margin: auto;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid white;
    text-align: center;
    line-height: 150px;
    font-size: 24px;
}

#circle-button:hover {
    background-color: rgba(128, 128, 128, 0.3);
}

.pulse {
    margin-left: -2.5px;
    margin-top: -150px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid white;
    animation: scaleButton 1.5s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
}

@keyframes scaleButton {
    0% {
        transform: scale(1, 1);
        opacity: 0.5;
    }
    100% {
        transform: scale(1.5, 1.5);
        opacity: 0;
    }
}
</style>
