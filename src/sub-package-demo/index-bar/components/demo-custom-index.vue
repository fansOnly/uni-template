<template>
  <vc-index-bar class="custom-index-bar" :scroll-top="scrollTop" :index-list="indexList" sticky>

    <view class="demo-content">
      <vc-index-anchor index="1">
        <view class="custom-anchor-item">一</view>
      </vc-index-anchor>
      <view v-for="(_, index) in '1'.repeat(15)" :key="index" class="demo-title2">1111111</view>
    </view>

    <view class="demo-content">
      <vc-index-anchor index="2" />
      <view v-for="(_, index) in '2'.repeat(30)" :key="index" class="demo-title2">2222222</view>
    </view>

    <view class="demo-content">
      <vc-index-anchor index="3">三</vc-index-anchor>
      <view v-for="(_, index) in '3'.repeat(20)" :key="index" class="demo-title2">3333333</view>
    </view>

    <view class="demo-content">
      <vc-index-anchor index="4">四</vc-index-anchor>
      <view v-for="(_, index) in '4'.repeat(30)" :key="index" class="demo-title2" style="line-height:80px;">44444444
      </view>
    </view>
  </vc-index-bar>
</template>

<script>
export default {
  name: 'demo-custom-index',
  props: {
    scrollTop: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-anchor-item {
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
  background: #ccc;
}

.custom-index-bar ::v-deep .vc-index-anchor--sticky {
  background: #ccc;
}
</style>
