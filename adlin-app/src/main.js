import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import css from './assets/css/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  css,
  render: function (h) { return h(App) }
}).$mount('#app')
