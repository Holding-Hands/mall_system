import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/module/plugins/element.js' // 自定义 全局变量、全局组件 统一写于此
import '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
