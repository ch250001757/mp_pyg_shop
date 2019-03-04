<template>
  <view>
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular :interval="3000">
      <block v-for="(item,index) in swiperdata" :key="index">
        <swiper-item>
          <image :src="item.image_src" class="slide-image" />
        </swiper-item>
      </block>
    </swiper>
    <!--  菜单-->
    <view class="categories">
      <view v-for="(item,index) in category" :key="index" class="category-item">
        <img :src="item.image_src">
      </view>
    </view>
    <!-- 楼层 -->
    <view v-for="(item,index) in floorData" :key="index">
      <floor :floor="item" />
    </view>
    <!-- 4.0 底部提示 -->
    <view class="end-tips">
      <view class="iconfont icon-xiao"></view>
      <text class="bottomline">我是有底线的</text>
    </view>
    <!-- 5.0 回到顶部 -->
    <!-- 频繁切换用v-show -->
    <view @click="goToTop" v-show="isShowGoToTop">
      <view class="to-top">
        <image src="/static/img/arrow_top@2x.png" />
        <text>顶部</text>
      </view>
    </view>
  </view>

</template>

<script>
import floor from "../../components/floor";
export default {
  components: {
    floor
  },
  data() {
    return {
      swiperdata: [],
      category: [],
      floorData: [],
      isShowGoToTop: false
    };
  },
  // 可以用小程序的声明周期
  onLoad() {
    this.getSwiperData();
    this.getCategory();
    this.getfloorData();
  },
  methods: {
    // 异步请求
    // getSwiperData() {
    //   this.$axios.get("/api/public/v1/home/swiperdata").then(res => {
    //     console.log(res);
    //     this.swiperdata = res.data.message;
    //   });
    // }
    // 改造async
    async getSwiperData() {
      var res = await this.$axios.get("/api/public/v1/home/swiperdata");
      this.swiperdata = res.data.message;
    },
    async getCategory() {
      var res = await this.$axios.get("api/public/v1/home/catitems");
      // console.log(res);
      this.category = res.data.message;
    },
    async getfloorData() {
      var res = await this.$axios.get("api/public/v1/home/floordata");
      console.log(res);
      this.floorData = res.data.message;
    },
    goToTop() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  },
  // wx滚动事件
  onPageScroll({ scrollTop }) {
    // 解构赋值
    console.log(scrollTop);
    if (scrollTop > 90) {
      // 要设置下节流 不然 每次大于90 就会触发下面的参数
      if (this.isShowGoToTop) return;
      console.log("111");
      this.isShowGoToTop = true;
    } else {
      if (!this.isShowGoToTop) return;
      console.log("2222");
      this.isShowGoToTop = false;
    }
  }
};
</script>

<style lang="less" scoped>
swiper {
  width: 750rpx;
  height: 400rpx;

  image {
    width: 100%;
    height: 100%;
  }
}
.categories {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 150rpx;
  background-color: #ffffff;
  .category-item {
    width: 120rpx;
    height: 120rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.end-tips {
  display: flex;
  height: 100rpx;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #888;
  .bottomline {
    margin-left: 5rpx;
  }
}
.to-top {
  width: 90rpx;
  height: 90rpx;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  position: fixed;
  right: 40rpx;
  bottom: 50rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  image {
    width: 24rpx;
    height: 14rpx;
  }
  text {
    margin-top: 20rpx;
    color: #999;
  }
}
</style>
