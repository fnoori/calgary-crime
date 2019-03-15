import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as d3 from 'd3'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(d3)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
