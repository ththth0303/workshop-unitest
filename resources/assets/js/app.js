
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.$ = require('jquery');
window.Vue.use(VueRouter);
window.Vue.use(BootstrapVue)

import VeeValidate from 'vee-validate';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'
import RouterConfig from './router/index.js'

const router = new VueRouter(RouterConfig);



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const config = {
    strict: true,
    classes: true,
    classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'is-valid', // model is valid
        invalid: 'is-invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty' // control has been interacted with
    }
};
window.Vue.use(VeeValidate, config)
window.$.fn.filemanager = function (type, options) {
    type = type || 'file';

    this.on('click', function (e) {
        var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
        localStorage.setItem('target_input', $(this).data('input'));
        localStorage.setItem('target_preview', $(this).data('preview'));
        window.open(route_prefix + '?type=' + type, 'FileManager', 'width=900,height=600');
        window.SetUrl = function (url, file_path) {
            //set the value of the desired input to image url
            var target_input = $('#' + localStorage.getItem('target_input'));
            target_input.val(file_path).trigger('change');

            //set or change the preview image src
            var target_preview = $('#' + localStorage.getItem('target_preview'));
            target_preview.attr('src', url).trigger('change');
        };
        return false;
    });
}
const app = new Vue({ router }).$mount('#app')

