import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/module/plugins/element.js' // 自定义 全局变量、全局组件 统一写于此
import '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false
import axios from 'axios'

Vue.prototype.$axios = axios
// 请求配置的默认路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1'
// 请求拦截
axios.interceptors.request.use(config => {
  // 必须在请求头中使用Authorization
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后需要return
  return config
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
