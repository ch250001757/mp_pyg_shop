<template>

    <view class="floor">
        <view class="floor-head">
            <!--楼层的头部 -->
            <img :src="floor.floor_title.image_src" alt="" />
        </view>

        <view class="floor-body">
            <!-- 楼层左侧 -->
            <view class="floor-body-left">
                <img :src="floor.product_list[0].image_src">
            </view>
            <!-- 楼层右侧 -->
            <view class="floor-body-right">
                <view v-for="(item,index) in getLast4" :key="index">
                    <img :src="item.image_src" :style="{width:item.image_width+'rpx'}">
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
  props: ["floor"],
  data() {
    return {
        floordata:[],
    };
    
  },
//   过滤之后返回一个新数组
  computed: {
      getLast4(){
        return  this.floor.product_list.filter((ele,i) => i>0)
      }
  },

};
</script>

<style lang="less" scoped>
.floor {
  margin-top: 10rpx;
  background-color: white;
  &-head {
    width: 750rpx;
    height: 59rpx;
    image {
      margin: 10rpx 0rpx 0rpx 10rpx;
      width: 100%;
      height: 100%;
    }
  }
  &-body {
    display: flex;
    padding: 20rpx 16rpx 10rpx 16rpx;
    &-left {
      width: 232rpx;
      height: 386rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    &-right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      image {
        height: 188rpx;
        margin: 0 0 10rpx 10rpx;
      }
    }
  }
}
</style>
