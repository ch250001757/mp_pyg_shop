import Vue from 'vue'
import App from './App'

// 导入axios
import './axios/index'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
