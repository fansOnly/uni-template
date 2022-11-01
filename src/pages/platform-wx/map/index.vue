<template>
  <view class="page-wrapper">
    <map v-if="initialized" class="vc-map" :latitude="latitude" :longitude="longitude" show-location @tap="onClick"></map>
    <view class="map-search-area">
      <vc-button @click="open">打开位置</vc-button>
      <vc-button @click="choose">选择位置</vc-button>
    </view>

  </view>
</template>

<script>
import { wxGetLocation } from '@/common/lib/weixin/API'
  export default {
    data() {
      return {
        initialized: false,
        latitude: '',
        longitude: '',
      }
    },
    async onLoad(options) {
      const { latitude, longitude } = await wxGetLocation({ type: 'gcj02' })
      this.latitude = latitude
      this.longitude = longitude
      this.initialized = true
    },
    methods: {
      onClick(evt) {
        console.log('[debug] 点击地图', evt)
      },
      open() {
        wx.openLocation({
          latitude: this.latitude,
          longitude: this.longitude,
          complete: res => {
            console.log('[debug] 打开位置', res)
          }
        })
      },
      choose() {
        wx.chooseLocation({
          latitude: this.latitude,
          longitude: this.longitude,
          complete: res => {
            console.log('[debug] 选择位置', res)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .demo-title {
    display: flex;
    align-items: center;
    padding: 16px;
    background: #fff;
    &::before {
      content: '';
      width: 4px;
      height: 20px;
      background: #3264DC;
      margin-right: 12px;
    }
  }
  .vc-map {
    width: 100%;
    height: 60vh;
  }
</style>
