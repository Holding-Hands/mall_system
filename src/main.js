import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/module/plugins' // 自定义 全局变量、全局组件 统一写于此
import '@/assets/iconfont/iconfont.css' // 导入字体图标css
import '@/api/index' // 导入请求与拦截
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
