import Vue from 'vue'
import App from './App.vue'
import 'vant/lib/index.css'
import './assets/scss/font.css'
import './assets/scss/base.scss'
import './assets/scss/common.scss'
import { Button } from 'vant'
import router from './router'

Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
