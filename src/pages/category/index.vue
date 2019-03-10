<template>
  <view class="categories">
    <!-- 左侧滚动条 -->
    <scroll-view scroll-y class="categories-left" :style="{height:(windowHeight-10) + 'px'}">
      <!-- 一级菜单 -->
      <view v-for="(item,index) in FirstCategory" :key="item.cat_id" @click="changeIndex(index)">
        <!-- vue中绑定class -->
        <text :class="['categories-left-item',selectIndex == index ?'categories-left-active':'' ]">{{item.cat_name}}</text>
      </view>
    </scroll-view>
    <!-- 左侧和右侧滚动条同时滚动 给他设置高度值就可以解决 但高度值不能写死通过wx api获取-->
    <!-- 右侧滚动条 -->
    <scroll-view scroll-y class="categories-right" :style="{height:(windowHeight-10) + 'px'}">
      <!-- 二级 -->
      <view class="categories-right-item" v-for="item in getSecondCategorty" :key="item.cat_id">
        <view class="categories-right-item-title">
          <text>{{item.cat_name}}</text>
        </view>
        <!-- 三级 -->
        <view class="categories-right-item-body">
          <view class="right-body-item" v-for="(subitem,subindex) in item.children" :key="subindex">
            <img :src="subitem.cat_icon" alt="" />
            <text class="right-body-item-title">{{subitem.cat_name}}</text>
          </view>
        </view>
      </view>

    </scroll-view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      FirstCategory: [],
      selectIndex: 0,
      windowHeight: 0
    }
  },
  onLoad () {
    this.getFirstCategory()
    // 获取可使用窗口高度
    // wx.getSystemInfo({
    //   success(res) {
    //       console.log(res.windowHeight);
    //     // this.windowHeight = windowHeight
    //   }

    // });
    this.windowHeight = wx.getSystemInfoSync().windowHeight
  },
  methods: {
    //   获取列表数据
    async getFirstCategory () {
      var res = await this.$axios.get('api/public/v1/categories')
      console.log(res)
      this.FirstCategory = res.data.message
    },
    // 一级菜单点击事件
    changeIndex (index) {
      // 调用这个方法 模型中selectindex发生变化 计算属性就会重新赋值
      this.selectIndex = index
    }
  },
  computed: {
    getSecondCategorty () {
      // 计算属性只要依赖的模型值变化,就能触发,初次渲染用到的模型值变化是空(一次),网络请求回来之后赋值后又一次
      //  数据一加载用到了这个属性,一开始是空数组然后.children会报错 所以一开始要做判断
      return (
        this.FirstCategory.length > 0 &&
        this.FirstCategory[this.selectIndex].children
      )
    }
  }
}
</script>
<style lang="less" scoped>
.categories {
  display: flex;
  margin-top: 10px;
  &-left {
    width: 200rpx;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200rpx;
      height: 100rpx;
      position: relative;
    }
    &-active {
      background: #fff;
      text {
        color: black;
      }
      &::before {
        position: absolute;
        content: "";
        background-color: #ff2d4a;
        left: 0;
        top: 10rpx;
        width: 5px;
        height: 80rpx;
      }
    }
  }
  &-right {
    flex: 1;
    background-color: white;
    &-item {
      &-title {
        margin-top: 5rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before {
          content: "/";
          color: #eeeeee;
          margin-right: 20rpx;
        }

        &::after {
          content: "/";
          color: #eeeeee;
          margin-left: 20rpx;
        }
      }
      &-body {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
image {
  width: 100rpx;
  height: 80rpx;
}
.right-body-item {
  height: 200rpx;
  width: 33.33333%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-title {
    color: black;
    margin-top: 5rpx;
  }
}
</style>

