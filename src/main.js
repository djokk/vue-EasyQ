import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {i18n} from './plugins/i18n'
// import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies';
import 'leaflet/dist/leaflet.css';

Vue.use(VueCookies);

Vue.config.productionTip = false

new Vue({
  // vuetify,
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
