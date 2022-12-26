<template>
  <view class="page-wrapper">
    <demo-block title="基础用法" padding>
      <map v-if="initialized" class="vc-map" :latitude="latitude" :longitude="longitude" show-location
        @tap="onClick"></map>

      <view class="gap--top">
        <vc-button type="primary" @click="open">打开位置</vc-button>
        <vc-button type="primary" @click="choose">选择位置</vc-button>
      </view>

      <template v-if="info.latitude">
        <view class="gap"></view>
        <view>名称：{{ info.name }}</view>
        <view>地址：{{ info.address }}</view>
        <view>维度：{{ info.latitude }}</view>
        <view>经度：{{ info.longitude }}</view>
      </template>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block'
import { useLocation, wxOpenLocation, wxChooseLocation } from '@/common/hooks/use-wxapi'

export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      initialized: false,
      latitude: '',
      longitude: '',
      info: {}
    }
  },
  async onLoad() {
    const { latitude, longitude } = await useLocation({ type: 'gcj02' })
    this.latitude = latitude
    this.longitude = longitude
    this.initialized = true
  },
  methods: {
    onClick(evt) {
      console.log('[debug] 点击地图', evt)
    },
    open() {
      wxOpenLocation({
        latitude: +this.latitude,
        longitude: +this.longitude,
      })
    },
    async choose() {
      const data = await wxChooseLocation({
        latitude: +this.latitude,
        longitude: +this.longitude,
      })
      this.info = data
    }
  }
}
</script>

<style lang="scss" scoped>
.vc-map {
  width: 100%;
  height: 30vh;
}
</style>
