<template>
  <view>
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular>
      <block v-for="item in goods_list.pics" :key="item.pics_id">
        <swiper-item>
          <image :src="item.pics_mid_url" @click="previewImg(item.pics_mid_url)" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 2.0 商品详情 -->
    <view class="product-info">
      <view class="product-head">
        <text class="price">￥{{goods_list.goods_price}}</text>
      </view>
      <view class="product-body">
        <view class="product-name">{{goods_list.goods_name}}</view>
        <view class="product-like">
          <view class="iconfont icon-shoucang"></view>
          <view>
            <text>收藏</text>
          </view>
        </view>
      </view>
      <view class="product-foot">
        <text>快递：免运费</text>
      </view>
    </view>
    <!-- 3.0 促销信息 -->
    <view class="part">
      <view class="part-item part-line">
        <text class="note">促销
        </text>
        <text class="color-main description">满300减30元
        </text>
      </view>
      <view class="part-item">
        <text class="note">已选
        </text>
        <text class="description">黑色/S/1件
        </text>
      </view>
    </view>

    <!-- 4.0 地址选择 -->
    <view class="part" @click="selectAddress">
      <view class="part-item">
        <text class="note">送至</text>
        <view v-if="address">
          {{address.provinceName}}{{address.cityName}}{{address.countyName}}
        </view>
        <view v-else>
          <text style="font-size:32rpx">请选择收货地址</text>
        </view>
        <view style="float:right;" class="iconfont icon-jiantouyou"></view>
      </view>
    </view>

    <!-- 5.0  tabs -->
    <view class="tabs">
      <view class="tabs-head">
        <view @click="changeSelectIndex(index)" :class="['tabs-item',index==currentIndex?'active':'']" v-for="(item,index) in tabs" :key="index">
          <text>{{item}}</text>
        </view>

      </view>
      <view class="tabs-body">
        <!-- 图文介绍 -->
        <view v-show="currentIndex===0">
          <view v-html="goods_list.goods_introduce"></view>
        </view>
        <!-- 规则参数 -->
        <view v-show="currentIndex===1">
          <view v-for="(item,index) in goods_list.attrs" :key="item.attr_id" class="param-item">
            <text :class="['note',index === goods_list.attrs.length-1?'param-item-last':'']">{{item.attr_name}}</text>
            <text :class="['description',index === goods_list.attrs.length-1?'param-item-last':'']">{{item.attr_value}}</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 6.0 底部菜单条 -->
    <view class="fixed-bar">
      <view class="item">
        <button class="contact-btn" open-type="contact"></button>
        <view class="iconfont icon-kefu"></view>
        <text class="note">联系客服</text>
      </view>
      <view class="item"  @click="buy">
        <view class="iconfont icon-gouwuche"></view>
        <text class="note">购物车</text>
      </view>
      <view class="btn-group">
        <view class="btn yellow-btn" @click="addCart">加入购物车</view>
        <view class="btn red-btn">立即购买</view>
      </view>
    </view>
  </view>
</template>

<script>
import { addGoods } from '../../utils/carts.js'
export default {
  data () {
    return {
      goods_list: {},
      tabs: ['图文介绍', '规格参数'],
      currentIndex: 0,
      address: null
    }
  },
  // 结构赋值
  onLoad ({ goods_id }) {
    // 把storage中的数据取出来
    if (wx.getStorageSync('addressInfo')) {
      this.address = wx.getStorageSync('addressInfo')
    }
    this.getGoodsDetail(goods_id)
  },
  methods: {
    async getGoodsDetail (id) {
      const res = await this.$axios.get(
        `api/public/v1/goods/detail?goods_id=${id}`
      )
      // console.log(res);
      this.goods_list = res.data.message
    },
    previewImg (current) {
      var urls = this.goods_list.pics.map(ele => ele.pics_mid_url)
      // 预览功能数组 每个元素是一个字符串
      wx.previewImage({
        current, // 当前显示图片的http链接
        urls // 需要预览的图片http链接列表
      })
    },
    changeSelectIndex (index) {
      this.currentIndex = index
    },
    selectAddress () {
      // 微信选择地址api需要用户授权
      wx.chooseAddress({
        // 这里要使用箭头函数把this指向改向vue实例
        success: res => {
          res.detailAddres =
            res.provinceName + res.cityName + res.countyName + res.detailInfo

          // 把数据存储到storage中,以便下次刷新时候可以获取
          wx.setStorageSync('addressInfo', res)
          this.address = res
          console.log(res)
        },
        fail: ({ errMsg }) => {
          console.log(errMsg)
          if (errMsg == 'chooseAddress:fail auth deny') {
            // 显示模态对话框
            wx.showModal({
              title: '提示',
              content: '请到 我的>设置>打开授权',
              showCancel: false,
              success (res) {
                if (res.confirm) {
                  wx.switchTab({ url: '/pages/my/main' })
                }
              }
            })
          }
        }
      })
    },
    // 加入购物车
    addCart () {
      console.log(this.goods_list)
      // 购物车是根据id查询商品,没添加一次+1存储到本地
      const carData = {
        goods_id: this.goods_list.goods_id,
        goods_number: 1
      }
      // 把商品的增删改查 单独抽出去
      wx.showToast({
        title: '加入购物车',
        image: '/static/img/duigou.png',
        duration: 2000
      })
      addGoods(carData)
    },
    // 购物车
    buy () {
      // console.log('111');

      wx.switchTab({
        url: '/pages/shopcart/main'
      })
    }
  }
}
</script>

<style lang="less" scoped>
swiper {
  width: 750rpx;
  height: 720rpx;
}

swiper image {
  width: 100%;
  height: 100%;
}
.product-info {
  display: flex;
  flex-direction: column;
  height: 300rpx;
  background-color: #fff;
  padding: 0 16rpx;
}
.product-head {
  height: 38rpx;
  padding: 40rpx 0;
}
.product-head .price {
  color: #ff2d4a;
  font-size: 50rpx;
  // margin-left: 10rpx;
}
.product-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-body .product-name {
  font-size: 34rpx;
  width: 546rpx;
  height: 88rpx;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.product-body .product-like {
  width: 50rpx;
  height: 78rpx;
  border-left: 1rpx solid #ddd;
  padding-left: 46rpx;
  margin-right: 30rpx;
  color: #999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.product-foot {
  font-size: 30rpx;
  color: #999;
  margin-top: 34rpx;
}
.part {
  background-color: #fff;
  margin: 20rpx 0;
  font-size: 35rpx;
  color: #999;
  &-line:after {
    content: "";
    height: 1rpx;
    width: 734rpx;
    background-color: #ddd;
    display: block;
    position: absolute;
    bottom: -1rpx;
  }
  &-item {
    display: flex;
    padding: 28rpx 16rpx;
    position: relative;
    align-items: center;
    // justify-content: space-between;
  }
}
.part .note {
  color: #333;
  margin-right: 40rpx;
}

.part .description {
  width: 490rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.part .color-main {
  color: #ff2d4a;
}
.tabs {
  &-head {
    height: 100rpx;
    background-color: #fff;
    display: flex;
    .active {
      color: #ff2d4a;
      font-weight: 400;
      &:after {
        content: "";
        height: 12rpx;
        width: 100%;
        background-color: #ff2d4a;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
  &-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30rpx;
    position: relative;
  }
  &-body {
    background-color: #fff;
    padding: 16rpx;
    margin-bottom: 100rpx;
  }
}
.param-item {
  display: flex;
  height: 100rpx;
  line-height: 100rpx;
  border-top: 1px solid rgba(92, 92, 92, 0.3);
  border-right: 1px solid rgba(92, 92, 92, 0.3);
  border-left: 1px solid rgba(92, 92, 92, 0.3);
}
.param-item .note {
  padding-left: 30rpx;
  width: 300rpx;
  border-right: 1px solid rgba(92, 92, 92, 0.3);
}

.param-item-last {
  border-bottom: 1px solid rgba(92, 92, 92, 0.3);
}

.param-item .description {
  padding-left: 30rpx;
  width: 400rpx;
}
.fixed-bar {
  width: 750rpx;
  height: 98rpx;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btn-group {
    display: flex;
  }
  .btn {
    width: 213rpx;
    height: 98rpx;
    line-height: 98rpx;
    text-align: center;
    font-size: 30rpx;
    color: #fff;
  }
  .yellow-btn {
    background-color: #ffb400;
  }
  .red-btn {
    background-color: #ff2d4a;
  }
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .contact-btn {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .iconfont {
      width: 40rpx;
      height: 40rpx;
      font-size: 40rpx;
    }
    .note {
      margin-top: 10rpx;
      font-size: 22rpx;
      color: #666;
    }
  }
}
.iconfont .icon-shoucang {
  font-size: 50px;
  color: "#ff2d4a" !important;
}

.iconfont .icon-shoucang-fill {
  font-size: 50px;
  color: "#ff2d4a" !important;
}
</style>

