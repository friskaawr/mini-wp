import Vue from 'vue';
import App from './App.vue';
// import CKEditor from '@ckeditor/ckeditor5-vue';
import wysiwyg from "vue-wysiwyg";
import BootstrapVue from 'bootstrap-vue';

// import GSignInButton from 'vue-google-signin-button'
// import GoogleLogin from 'vue-google-login';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue);
Vue.use(wysiwyg);
// Vue.use(GoogleLogin);
// Vue.use(GSignInButton)

new Vue(App).$mount('#app');