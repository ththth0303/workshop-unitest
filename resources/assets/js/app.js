
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Vue.use(VueRouter);
window.Vue.use(BootstrapVue)
window.Vue.use(VeeValidate, {
    class: false, classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'valid', // model is valid
        invalid: 'invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty' // control has been interacted with 
    }});

import VeeValidate from 'vee-validate';
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
