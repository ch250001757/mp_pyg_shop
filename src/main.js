import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// 导入axios 
import './axios/index'

const app = new Vue(App)
app.$mount()
