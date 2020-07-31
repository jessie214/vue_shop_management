import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/common.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
// Configure the root path of the request
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// Ajax request interception,Ajax请求拦截器,request拦截器用use回调函数,在请求发送到服务器之前执行回调函数为config对象的headers添加一个Authorization属性为token
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
