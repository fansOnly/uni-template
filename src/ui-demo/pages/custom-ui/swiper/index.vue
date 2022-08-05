<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">基础用法</view>
      <view class="demo-body">
        <et-swiper :options="list" :value="1" indicator-dots @click="onSwiperChange"></et-swiper>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">缩放特效</view>
      <view class="demo-body">
        <et-swiper :options="list" effect="scale" height="100"></et-swiper>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">自定义内容</view>
      <view class="demo-body">
        <et-swiper :options="list" height="80">
          <template v-slot="{item, index}">
            <view style="height: 100%;background-color: #ccc;">自定义轮播内容：{{item.title}}--{{index}}</view>
          </template>
        </et-swiper>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {
            id: '1',
            title: 'banner1',
            src: 'tip-img.png',
          },
          {
            id: '2',
            title: 'banner2',
            src: 'id-card-img.png',
          },
          {
            id: '3',
            title: 'banner3',
            src: '',
          },
        ],
        active: 0,
      }
    },
    methods: {
      onSwiperChange(item, index) {
        console.log('[debug] swiper item', item)
        uni.showToast({
          title: `点击了第${index}项`,
          icon: 'none',
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
