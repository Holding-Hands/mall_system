import axios from 'axios'
import Vue from 'vue'
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
