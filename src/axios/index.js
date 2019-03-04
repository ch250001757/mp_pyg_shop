import Vue from 'vue'


import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'https://www.zhengzhicheng.cn/';
// 因为小程序没有dom bom 概念所以要设置适配器
axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
    })

    // console.log(config)
    wx.request({
      url: config.url, //开发者服务器接口地址",
      data: config.data, //请求的参数",
      method: config.method,
      success: res => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        wx.hideLoading()
      }
    });
  })
}

// 原型上挂载
Vue.prototype.$axios = axios
