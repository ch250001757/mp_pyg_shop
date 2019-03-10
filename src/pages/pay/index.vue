<template>
  <view>
    <!-- 1.0 收获地址 -->
    <view @click="chooseAddress" class="address">
      <view class="address-info" v-if="addressInfo">
        <view class="address-info-name-phone">
          <view>
            <text style="font-size:12px;">收货人：{{addressInfo.userName}}</text>
          </view>
          <view style="display:flex;align-items: center;">
            <text style="margin-right:36rpx;font-size:12px;">{{addressInfo.telNumber}}</text>
            <view class="iconfont-tap icon-jiantouyou"></view>
          </view>
        </view>
        <view class="address-info-detail-info">
          <text style="font-size:12px;">收货地址：{{addressInfo.detailAddress}}</text>
        </view>
      </view>
      <view class="address-add" v-else>
        <text style="font-size:12px;">+ 新增地址</text>
      </view>
      <view class="address-pic">
        <image src="/static/img/cart_border@2x.png" />
      </view>
    </view>
    <!-- 2.0 购买的商品列表 -->
    <view class="order-list">
      <block v-for="item in orderList" :key="item.goods_id">
        <view class="product-item">
          <navigator class="product-left">
            <image :src="item.goods_small_logo" />
          </navigator>
          <view class="product-right">
            <navigator class="product-name">
              {{item.goods_name}}
            </navigator>
            <view class="product-right-price">
              <text class="product-right-price-symbol">￥</text>
              <text class="product-right-price-integer">{{item.goods_price}}</text>
              <text class="product-right-price-decimal">.00</text>
            </view>
            <view class="product-right-num">x{{item.goods_number}}</view>
          </view>
        </view>
      </block>
    </view>
    <!-- 3.0 总价格和运费 &  4.0 登录 / 下单支付 -->
    <view class="order-total">
      <view class="order-total-item">
        <view>商品金额</view>
        <view class="order-total-item-price">￥{{totalAmount}}</view>
      </view>
      <view class="order-total-item">
        <view>运 费</view>
        <view class="order-total-item-price">+￥0.00</view>
      </view>
      <block v-if="!token">
        <button open-type="getUserInfo" @getuserinfo="getuserinfo" class="wxLogin">点击登录后下单支付</button>
      </block>
      <block wx:else>
        <view @click="orderAndPay" class="wxPay">微信支付</view>
      </block>
    </view>
  </view>

</template>


<script>
import { getLocalGoods } from '../../utils/carts.js'
// 登陆之后才能下单 AppID AppSecret(登陆的身份是不是合法的)
// 下单之后拿到token
// 登陆的话拿到用户信息
// 需要code
//
export default {
  data () {
    return {
      orderList: [],
      addressInfo: null, // 收货人
      totalAmount: 0,
      token: null, // token 登陆之后服务器返回的token值
      code: null
    }
  },
  onLoad (option) {
    // 获取商品列表
    this.getOrderList(option.ids)

    // 获取本地地址
    if (wx.getStorageSync('addressInfo')) {
      this.addressInfo = wx.getStorageSync('addressInfo')
    }
    // 获取本地的地址
    if (wx.getStorageSync('token')) {
      this.token = wx.getStorageSync('token')
    }
    // 调用接口获取登录凭证（code） 随机生成的
    wx.login({
      success: res => {
        // console.log(res);
        this.code = res.code
      }
    })
    // 光有这个code不行 后台需要调用用户信息
    //  以前可以这样获取现在不行了
    // wx.getUserInfo({
    //   success(res) {
    //       console.log(res);

    //   }
    // });
  },

  methods: {
    async getOrderList (id) {
      // 获取商品
      var res = await this.$axios.get(
        `api/public/v1/goods/goodslist?goods_ids=${id}`
      )
      console.log(res)
      this.totalAmount = 0
      //   导入cart.js
      const localGoods = getLocalGoods()

      res.data.message.forEach(ele => {
        //   数量
        ele.goods_number = localGoods[ele.goods_id]
        // 总金额
        this.totalAmount += ele.goods_number * ele.goods_price
      })

      this.orderList = res.data.message
    },
    // 地址选择
    chooseAddress () {
      wx.chooseAddress({
        //   使用箭头函数指向this
        success: res => {
          //   console.log(res);
          // 给属性添加详细地址
          res.detailAddress = `${res.provinceName}${res.cityName}${
            res.countyName
          }${res.detailInfo}`
          //   存在本地
          wx.setStorageSync('addressInfo', res)
          // 给模型中的addressInfo赋值
          this.addressInfo = res
        }
      })
    },
    // 获取用户信息
    async getuserinfo (e) {
      // 拒绝的话 就不需要往下走了
      if (e.mp.detail.errMsg === 'getUserInfo:fail auth deny') return
      // 把用户信息存储在本地 方便在我的页面获取
      wx.setStorageSync('userInfo', e.mp.detail.userInfo)

      // console.log(e);
      // 自己的服务器接口
      const res = await this.$axios.post(
        'http://127.0.0.1:8899/api/public/v1/users/wxlogin',
        {
          code: this.code,
          encryptedData: e.mp.detail.encryptedData,
          iv: e.mp.detail.iv,
          rawData: e.mp.detail.rawData,
          signature: e.mp.detail.signature
        }
      )
      console.log(res)
      // 赋值给token模型
      this.token = res.data.message.token
      // 存储到本地
      wx.setStorageSync('token', res.data.message.token)
    },
    // 下单
    async orderAndPay () {
      // 判断是否登录了
      if (!this.token) {
        wx.showToast({
          title: '请先登录', // 提示的内容,
          image: '/static/img/error2.png',
          duration: 2000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透
        })
        return
      }
      // 判断是否选择了收货地址
      if (!this.addressInfo) {
        wx.showToast({
          title: '请选择收货地址', // 提示的内容,
          image: '/static/img/error.png',
          duration: 2000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透
        })
        return
      }
      // 1、准备好要下单的数据
      const order = {
        order_price: this.totalAmount,
        consignee_addr: `${this.addressInfo.detailAddress} ${
          this.addressInfo.userName
        } ${this.addressInfo.telNumber}`,
        goods: this.orderList
      }

      // 2、调用后台接口，生成订单
      const res = await this.$axios.post(
        'api/public/v1/my/orders/create',
        order
      )
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.pay(res.data.message.order_number)
      }
    },

    // 生成预支付交易单(支付需要企业的授权)
    async pay (order_number) {
      // 发送请求给后台，获取需要的五个参数
      const res = await this.$axios.post(
        'api/public/v1/my/orders/req_unifiedorder',
        {
          order_number
        }
      )
      console.log(res)

      // 调用wx.requestPayment，传递五个参数，可以支付框
      wx.requestPayment({
        timeStamp: res.data.message.pay.timeStamp,
        nonceStr: res.data.message.pay.nonceStr,
        package: res.data.message.pay.package,
        signType: res.data.message.pay.signType,
        paySign: res.data.message.pay.paySign,
        success: async result => {
          // success
          const res2 = await this.$axios.post('my/orders/chkOrder', {
            order_number
          })

          // 修改后台订单状态成功
          if (res2.data.meta.status === 200) {
            wx.navigateTo({ url: '/pages/orders/main?type=3' })
          }
        },
        fail: err => {
          // fail
          if (err.errMsg === 'requestPayment:fail cancel') {
            wx.showToast({
              title: '您取消了付款', // 提示的内容,
              image: '/static/img/error2.png',
              duration: 2000, // 延迟时间,
              mask: true, // 显示透明蒙层，防止触摸穿透,
              success: res => {
                setTimeout(() => {
                  wx.navigateTo({ url: '/pages/orders/main?type=2' })
                }, 2000)
              }
            })
          }
        }
      })
    }
  }
}
</script>


<style scoped lang="less">
.address {
  height: 222rpx;
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &-info {
    display: flex;
    height: 160rpx;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    &-name-phone {
      display: flex;
      justify-content: space-between;
      padding: 0rpx 30rpx;
    }
    &-detail-info {
      padding: 0rpx 30rpx;
    }
  }
  &-add {
    width: 360rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    margin: 100px auto;
    color: #999;
    background-color: #f4f4f4;
  }
  &-pic {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 750rpx;
    height: 15rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.iconfont-tap {
  font-family: "iconfont" !important;
  font-size: 32rpx;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  min-width: 88rpx;
  min-height: 88rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-jiantouyou {
  position: absolute;
  top: 32rpx;
  right: 0;
}
.icon-jiantouyou:before {
  font-size: 24rpx;
  color: #999;
  line-height: 1;
  width: 15rpx;
  height: 25rpx;
}
.order-list {
  background-color: #fff;
}
.product-item {
  display: flex;
  padding: 30rpx 20rpx;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 20rpx;
    right: 0;
    bottom: 0;
    border-bottom: 1rpx solid #ddd;
  }
  .product-left {
    width: 200rpx;
    height: 200rpx;
    background-color: #eee;
    margin-right: 26rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .product-right {
    width: 480rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    .product-name {
      height: 84rpx;
      font-size: 30rpx;
      line-height: 1.4;
      /* 多行文字隐藏省略号 */
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    &-price {
      text {
        color: #ff2d4a;
      }
      &-symbol,
      &-decimal {
        font-size: 28rpx;
      }
      &-integer {
        font-size: 44rpx;
      }
    }
    &-num {
      position: absolute;
      right: 0;
      bottom: 0;
      letter-spacing: 2rpx;
      color: #999;
    }
  }
}
.order-total {
  background-color: #fff;
  margin-top: 20rpx;
  height: 300rpx;
  &-item {
    height: 80rpx;
    display: flex;
    align-items: center;
    padding: 0rpx 30rpx;
    justify-content: space-between;
    &-price {
      color: #ff2d4a;
    }
  }
}
.wxLogin {
  margin-top: 10rpx;
  width: 720rpx;
}
.wxPay {
  margin-top: 10rpx;
  margin-left: 15rpx;
  width: 720rpx;
  background-color: #00c000;
  display: flex;
  height: 80rpx;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 32rpx;
  border-radius: 5rpx;
}
</style>
