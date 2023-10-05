import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';


import router from './router'; // or './router/index.js' if you placed it there


// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Quill WYSIWYG editor to make things spicy
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css'; // for Snow theme

import store from './store'; // Path to your store file

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App)
})