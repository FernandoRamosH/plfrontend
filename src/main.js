import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue'
import swal from 'sweetalert'

const TeamsList = require('./assets/js/components/teamslist.vue');
const TeamDetail = require('./assets/js/components/teamdetails.vue');
const PlayerNew = require('./assets/js/components/playernew.vue');

const routes = [
    {
        name: 'teamslist',
        path: '/',
        component: TeamsList
    },
    {
        name: 'teamdetails',
        path: '/team/:id',
        component: TeamDetail
    },
     {
        name: 'playernew',
        path: '/player/:teamId',
        component: PlayerNew
    }
];
var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');