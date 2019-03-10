<template>
  <view>
    <!-- 1.0 没有数据时候的提示  有条件渲染-->
    <view class="empty-car" v-if="isEmpty">
      <image src="/static/img/kong.png" />
      <text class="empty-car-tips">购物车还是空的</text>
      <text class="empty-car-tips extra">快去逛逛吧~</text>
    </view>
    <view v-else>
      <!-- 头部 -->
      <view class="shop-head">
        <view class="shop-head-info">
          <view class="iconfont icon-shop flex-center icon-dianpu"></view>
          <text class="shop-name">品优购生活馆</text>
        </view>
      </view>
      <!-- 商品列表 -->
      <block v-for="item in goodsList" :key="item.goods_id">
        <view class="goods-item">
          <!-- 左边的选中的图标 -->
          <view @click="selIcon(item)" :class="['pubIcon',item.isSel?'trueIcon':'falseIcon']"></view>
          <view class="goods-item-pic">
            <image :src="item.goods_small_logo" />
          </view>
          <view class="goods-item-info">
            <text class="goods-item-info-title">{{item.goods_name}}</text>
            <text class="goods-item-info-price">￥{{item.goods_price}}</text>
            <view class="goods-item-info-edit">
              <view class="outer">
                <view :style="{color:item.goods_number <=1 ? '#999':'black'}" @click="substrict(item)">-</view>
                <view class="value">
                  <input v-model="item.goods_number" type="number" /></view>
                <view @click="add(item)" class="add">+</view>
              </view>
              <text @click="deleteGoods(item.goods_id)">| 删除</text>
            </view>
          </view>
        </view>
      </block>
    </view>
    <!-- 底部菜单栏 -->
    <view v-if="!isEmpty" class="fixed-bar">
      <view @tap="toggleAllSelect" class="allselect">
        <view :class="['pubIcon',isAllSel? 'trueIcon':'falseIcon']">
        </view>
        <text style="margin-left:10rpx;">全选</text>
      </view>
      <view class="statistics">
        <view>
          <text>合计：</text>
          <text style="color:#ff2d4a;font-size:30rpx;">￥{{getTotalPrice}}</text>
        </view>
        <text>包含运费</text>
      </view>
      <view @click="goToDeal" :class="['jiesuan',getTotalCount>0 ? '':'disabled']">
        <text>去结算 ({{getTotalCount}})</text>
      </view>
    </view>
  </view>

</template>


<script>
import { getLocalGoods, updateData, delData } from '../../utils/carts.js'
export default {
  data () {
    return {
      goodsList: [],
      isEmpty: true, // 有条件的显示
      isAllSel: true // 全选
    }
  },
  // 来回切换的时候数据不会显示 所以要用show()
  onShow () {
    this.getCarList()
  },
  // onload只执行一次
  onLoad () {},
  computed: {
    //   总额
    getTotalPrice () {
      let totalPrice = 0
      this.goodsList.forEach(ele => {
        if (ele.isSel) {
          totalPrice += ele.goods_number * ele.goods_price
        }
      })
      return totalPrice
    },
    // 总数量
    getTotalCount () {
      let totalCount = 0
      this.goodsList.forEach(ele => {
        if (ele.isSel) {
          totalCount += ele.goods_number
        }
      })
      return totalCount
    }
  },
  methods: {
    async getCarList () {
      const localGoodsData = getLocalGoods()
      const goods_ids = []
      // console.log(localGoodsData);
      //   遍历对象
      for (const key in localGoodsData) {
        goods_ids.push(key)
      }
      // 如果数组没元素 就没必要发请求了
      if (goods_ids.length == 0) {
        return
      } else {
        this.isEmpty = false
      }

      const res = await this.$axios.get(
        `api/public/v1/goods/goodslist?goods_ids=${goods_ids.join(',')}`
      )

      //   遍历数组 把数量存储到每个元素中
      res.data.message.forEach(ele => {
        ele.goods_number = localGoodsData[ele.goods_id]
        // 选择开关
        ele.isSel = true
      })
      this.goodsList = res.data.message
    },
    // 单选
    selIcon (item) {
      item.isSel = !item.isSel
      //   默认为全选中
      let flag = true
      // some 可以结束循环
      this.goodsList.some(ele => {
        if (!ele.isSel) {
          flag = false
          return true
        }
      })
      this.isAllSel = flag
    },
    // 全选/反选
    toggleAllSelect () {
      this.isAllSel = !this.isAllSel
      // 取反把取反的数据赋值给每一项
      this.goodsList.forEach(ele => (ele.isSel = this.isAllSel))
    },
    // 新增
    add (item) {
      item.goods_number++
      updateData(item)
    },
    // 减
    substrict (item) {
      if (item.goods_number == 1) return
      item.goods_number--
      updateData(item)
    },
    deleteGoods (id) {
      wx.showModal({
        title: '提示',
        content: '是否删除该商品?',
        success: res => {
          if (res.confirm) {
            // 删除的方法
            delData(id)

            // 2、根据id查找索引
            var index = this.goodsList.findIndex(ele => {
              return ele.goods_id == id
            })
            this.goodsList.splice(index, 1)

            // 3、判断是否为空
            this.isEmpty = this.goodsList.length == 0
          } else if (res.cancel) {
          }
        }
      })
    },
    // 去结算
    goToDeal () {
      var ids = []
      console.log(this.goodsList)
      this.goodsList.forEach(ele => {
        if (ele.isSel) {
          ids.push(ele.goods_id)
        }
      })
      console.log(ids)

      // 判断id是否为空,提示用户选择
      if (ids.length == 0) {
        wx.showToast({
          title: '请选择商品结算',
          icon: 'none',
          duration: 2000
        })
        return
      }
      // 跳转到下单页面
      wx.navigateTo({
        // 传参
        url: `/pages/pay/main?ids=${ids.join(',')}`
      })
    }
  }
}
</script>


<style lang="less" scoped>
// 自定义属性
@PADDING-LEFT: 20rpx;
.empty-car {
  display: flex;
  flex-direction: column;
  height: 500rpx;
  justify-content: center;
  align-items: center;
  image {
    width: 125rpx;
    height: 124rpx;
  }
  &-tips {
    margin-top: 30rpx;
    font-size: 28rpx;
    color: #666;
  }
}
.extra {
  font-size: 24rpx;
  color: #999;
}
.shop-head {
  background-color: #fff;
  height: 88rpx;
  display: flex;
  align-items: center;
  padding: 0 @PADDING-LEFT;
  border-bottom: 1px solid #ddd;
  &-info {
    display: flex;
    align-items: center;
    .shop-name {
      margin-left: 10rpx;
    }
  }
}
.goods-item {
  height: 220rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-left: @PADDING-LEFT;
  border-bottom: 1px solid #eee;
  &-pic {
    width: 160rpx;
    height: 160rpx;
    margin-left: 10rpx;
    border: 1px solid #ddd;
    padding: 10rpx;
    border-radius: 5rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  &-info {
    flex: 1;
    height: 180rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0rpx @PADDING-LEFT;
    &-title {
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    &-price {
      color: #ff2d4a;
      font-size: 30rpx;
    }
    &-edit {
      display: flex;
      justify-content: space-between;
      .outer {
        border: 1px solid #ddd;
        display: flex;
        align-items: center;
        border-radius: 5rpx;
        view {
          height: 50rpx;
          width: 50rpx;
          line-height: 50rpx;
          text-align: center;
        }
        .value {
          width: 65rpx;
          border-left: 1px solid #ddd;
        }
        .add {
          border-left: 1px solid #ddd;
        }
      }
    }
  }
}
.pubIcon {
  background: url(https://mcart.jiuxian.com/statics/images/cart/catIcon.png)
    no-repeat 0 0;
  background-size: 300rpx 300rpx;
  width: 55rpx;
  height: 55rpx;
}
.trueIcon {
  background-position: 0 -225rpx;
}
.falseIcon {
  background-position: -50rpx -225rpx;
}
.fixed-bar {
  display: flex;
  height: 98rpx;
  width: 750rpx;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  .allselect {
    padding-left: @PADDING-LEFT;
    width: 200rpx;
    height: 98rpx;
    display: flex;
    align-items: center;
  }
  .statistics {
    flex: 1;
    display: flex;
    // align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .jiesuan {
    width: 200rpx;
    height: 98rpx;
    background-color: #ff2d4a;
    text-align: center;
    line-height: 98rpx;
    text {
      color: #fff;
    }
  }

  .disabled {
    background-color: #ddd;
  }
}
</style>