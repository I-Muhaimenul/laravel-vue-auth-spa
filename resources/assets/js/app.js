
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';
import {routes} from './routes'

import StoreData from './store';
import MainApp from './components/MainApp.vue';
import Axios from 'axios';
// import Home from './components/Home.vue';
import {initialize} from './helpers/general'

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(StoreData)
const router = new VueRouter({
    mode: 'history',
    routes
});

//for auth before route
initialize(store, router);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp,
    }
});
