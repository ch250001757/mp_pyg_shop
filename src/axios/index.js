import Vue from 'vue'

import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'https://www.zhengzhicheng.cn/'

// 拦截器 比适配器早
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (wx.getStorageSync('token')) {
    config.headers.Authorization = wx.getStorageSync('token')
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 因为小程序没有dom bom 概念所以要设置适配器
axios.defaults.adapter = function (config) {
  // console.log(111);

  // console.log(config);

  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中'
    })

    // console.log(config)
    wx.request({
      url: config.url, // 开发者服务器接口地址",
      data: config.data, // 请求的参数",
      method: config.method,
      // TODO 今天不配置header，后面还要设置 设置请求头
      header: config.headers,
      success: res => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}

// 原型上挂载
Vue.prototype.$axios = axios
