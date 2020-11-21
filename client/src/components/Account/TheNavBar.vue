<template>
<div>
    <div class="topnav rounded-right" :class="{'topnav-dark' : darkMode}">
        <router-link :to="{name: 'homepage'}">
            <span class="d-sm-inline d-none">
                <b-icon icon="chevron-compact-left"></b-icon>
                Back to Home
            </span>
        </router-link>
        <div id="right-side">
            <b-button id="notification-popover" variant="default" :class="{'btn-dark' : darkMode}">
                <b-icon icon="bell"></b-icon>
            </b-button>
            <b-button id="message-popover" variant="default" :class="{'btn-dark' : darkMode}">
                <b-icon icon="chat-text"></b-icon>
            </b-button>
            <div class="v-div"></div>
            <router-link :to="{name: 'introduction'}">
                <span @click="logout">
                    Sign Out
                    <b-icon icon="box-arrow-right"></b-icon>
                </span>
            </router-link>
        </div> 
    </div>
    <b-popover
        target="#notification-popover" 
        triggers="focus"
        placement="bottom"
        >
        <template #title>Notification</template>
        <b-row>
            <b-col>
                <ul class="timeline">
                    <li class="pl-3">
                        <p>1 October 2020</p>
                        <a href="#">People love your product!</a>
                        <p>712 people view your Gigabyte RTX3080 just in 1 day!</p>
                    </li>
                    <li class="pl-3">
                        <p>1 October 2020</p>
                        <a href="#">People love your product!</a>
                        <p>712 people view your Gigabyte RTX3080 just in 1 day!</p>
                    </li>
                    <li class="pl-3">
                        <p>1 October 2020</p>
                        <a href="#">People love your product!</a>
                        <p>712 people view your Gigabyte RTX3080 just in 1 day!</p>
                    </li>
                </ul>
            </b-col>
        </b-row>
    </b-popover>

    <b-popover
        target="#message-popover" 
        triggers="focus"
        placement="bottom"
        >
        <template #title>Message</template>
        <b-row>
            <b-col>
                <a href="#" class="chat-item">
                    <div class="row">
                        <div class="col-2">
                            <b-icon icon="person-circle" font-scale="2"></b-icon>
                        </div>
                        <div class="col-10">
                            <small class="float-right">2 October 2020 07.00 PM</small>
                            <p class="lead">Jantono</p>
                            <p>Hey, do you have any discount for those RTX 3080s ?</p>
                        </div>
                    </div>
                </a>
                <hr class="chat-divider">
                <a href="#" class="chat-item">
                    <div class="row">
                        <div class="col-2">
                            <b-icon icon="person-circle" font-scale="2"></b-icon>
                        </div>
                        <div class="col-10">
                            <small class="float-right">2 October 2020 07.00 PM</small>
                            <p class="lead">Cakey</p>
                            <p>Ok thank you!</p>
                        </div>
                    </div>
                </a>
            </b-col>
        </b-row>
    </b-popover>
</div>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['darkMode'])
    },
    methods: {
        async logout() {
            await firebase.auth().signOut()
        }
    }
}
</script>

<style scoped>
.topnav {
    overflow: hidden;
    background-color: rgba(240, 240, 240, 0.5);
}
  
.topnav a {
    float: left;
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}

.topnav a:hover {
    background-color: #ddd;
    color: black;
}

.v-div {
    width: 1px;
    background-color: gray;
    opacity: 0.3;
}

/* To indicate current active button*/
.topnav a.active {
    background-color: #2196F3;
    color: white;
}

/* Right hand side of navigation bar */
#right-side {
    display: flex;
    flex-direction: row;
    float: right;
}

#notification-modal {
    opacity: 0.2;
    margin-top: 75px;
}

.timeline {
    list-style-type: none;
}

.timeline:before {
    content: ' ';
    background: black;
    position: absolute;
    left: 29px;
    width: 2px;
    height: 100%;
}

.timeline > li:before {
    content: ' ';
    background: white;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    left: 20px;
    width: 20px;
    height: 20px;
}

.timeline > li:nth-child(1):before {
    border: 3px solid lightskyblue;
}

.timeline > li:nth-child(2):before {
    border: 3px solid lightsalmon;
}

.timeline > li:nth-child(3):before {
    border: 3px solid lightgreen;
}

.chat-item {
    color: black;
}

.chat-item:hover {
    text-decoration: none;
}

.chat-item > .row:hover {
    color: lightskyblue;
}

.topnav-dark {
    background-color: rgba(40, 40, 40, 0.2) !important;
}

.topnav-dark a:hover {
    background-color: rgb(2, 80, 150) !important;
    border-radius: 25px;
}

.btn-dark {
    background: none;
    border: none;
}

.topnav-dark span {
    color: white;
}
</style>