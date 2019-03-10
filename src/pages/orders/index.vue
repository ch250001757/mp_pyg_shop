<template>
    <view>
        <!-- 1.0 头部的tab -->
        <view class="tabs">
            <view v-for="(item,index) in menu" :key="index" :class="['tab-item', index==currentIndex?'active':'']" @click="totalSel(index)">
                <text>{{item}}</text>
            </view>
        </view>
        <!-- 2.0 订单列表（分状态） -->
        <view class="order">
            <block v-for="order in orderList" :key="order.order_id">
                <view class="order-item">
                    <!-- 2.1 列表项(需要循环) -->
                    <block v-for="(item,index2) in order.goods" :key="index2">
                        <view class="product-item">
                            <navigator :url="'/pages/goods_detail/main?goods_id='+item.goods_id" class="product-left">
                                <image class="product-img holder-image" :src="item.goods_small_logo" />
                            </navigator>
                            <view class="product-right">
                                <navigator :url="'/pages/goods_detail/main?goods_id='+item.goods_id" class="product-name">
                                    {{ item.goods_name }}
                                </navigator>
                                <view class="product-price">
                                    <text class="product-price-symbol">￥</text>
                                    <text class="product-price-integer">{{ item.goods_price }}</text>
                                    <text class="product-price-decimal">.00</text>
                                </view>
                                <view class="product-count">x{{ item.goods_number }}</view>
                            </view>
                        </view>
                    </block>
                    <!-- 2.2 统计信息 -->
                    <view class="order-total">
                        共{{order.total_count }}件商品 总计：¥{{order.total_price}} (含运费0.00)
                    </view>
                    <!-- 2.3 支付信息 -->
                    <view class="order-item-pay">
                        <view>订单号:{{order.order_number}}</view>
                        <view @tap="goToPay(order.order_number)" v-if="order.pay_status==='0'" class="btn-line btn-color-main">支付</view>
                    </view>
                </view>
            </block>
            <view class="no_order" v-if="orderList.length === 0">
                <view>
                    <img src="/static/img/empty_data.png" alt="">
                </view>
                <text>没有订单啦...</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
  data () {
    return {
      menu: ['全部', '代付款', '待收货', '退货/退款'],
      currentIndex: 0,
      orderList: []
    }
  },
  onLoad (option) {
    this.getOrderList(option.type)
  },
  methods: {
    totalSel (i) {
      // 1、全部 2、待付款  3、待收货  4、退货退款
      console.log(i)
      this.currentIndex = i
      this.getOrderList(i + 1)
    },
    // 获取订单功能
    async getOrderList (type) {
      var res = await this.$axios.get(
        `api/public/v1/my/orders/all?type=${type}`
      )
      console.log(res)
      this.orderList = res.data.message.orders
    },
    // 支付功能
    async goToPay (order_number) {
      // 发送请求给后台，获取需要的五个参数
      const res = await this.$axios.post('my/orders/req_unifiedorder', {
        order_number
      })

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
            this.getOrderListData(this.currentIndex + 1)
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
                  this.getOrderListData(this.currentIndex + 1)
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

<style lang="less" scoped>
.tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90rpx;
  background-color: #fff;
  .tab-item {
    line-height: 90rpx;
    text-align: center;
    flex: 1;
    text {
      font-size: 14px;
      color: black;
    }
  }
  .active {
    position: relative;
    ::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 5rpx;
      background: red;
    }
  }
}
.order {
  margin-bottom: 30rpx;
  &-item {
    background-color: #ffffff;
    margin-top: 30rpx;
    // background-color: yellow;
  }
}

.product-item {
  display: flex;
  padding: 30rpx 20rpx;
  position: relative;
}
.product-item::after {
  content: "";
  position: absolute;
  left: 20rpx;
  right: 0;
  bottom: 0;
  border-bottom: 1rpx solid #ddd;
}
// .product-item:first-child::after {
//   border-bottom: 0 none;
// }

.product-left {
  margin-right: 26rpx;
}
.product-left,
.product-left .product-img {
  width: 200rpx;
  height: 200rpx;
  background-color: #eee;
}
.product-right {
  width: 480rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}
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
.product-price {
  color: #ff2d4a;
}
.product-price-symbol,
.product-price-decimal {
  font-size: 28rpx;
}
.product-price-integer {
  font-size: 44rpx;
}

.product-count {
  position: absolute;
  right: 0;
  bottom: 0;
  letter-spacing: 2rpx;
}

.order-total {
  height: 88rpx;
  background-color: #fff;
  padding: 0 20rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  color: #999;
  &::after {
    content: "";
    position: absolute;
    left: 20rpx;
    right: 20rpx;
    right: 0;
    bottom: 0;
    border-bottom: 1rpx solid #ddd;
  }
}

.order-item-pay {
  display: flex;
  height: 88rpx;
  align-items: center;
  padding: 0rpx 20rpx;
  justify-content: space-between;
}

.btn-line {
  border: 2rpx solid #999;
  border-radius: 5rpx;
  width: 156rpx;
  height: 56rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40rpx;
}
.btn-color-main {
  color: #ff2d4a;
}

.no_order {
  width: 750rpx;
  height: 500rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 100rpx;
    height: 100rpx;
  }
  text {
    color: #999999;
    font-size: 30rpx;
    margin-top: 30rpx;
  }
}
</style>


