
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Vue.use(VueRouter);
window.Vue.use(BootstrapVue)

import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'
import RouterConfig from './router/index.js'

const router = new VueRouter(RouterConfig);

const app = new Vue({ router }).$mount('#app')

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
