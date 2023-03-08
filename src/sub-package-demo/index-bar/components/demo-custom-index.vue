<template>
  <vc-index-bar class="custom-index-bar" :scroll-top="scrollTop" :index-list="indexList" sticky>

    <view class="demo-content">
      <vc-index-anchor :index-anchor="1">
        <view class="custom-anchor-item">一</view>
      </vc-index-anchor>
      <view v-for="(_, index) in '1'.repeat(15)" :key="index" class="demo-title2">1111111-{{ index }}</view>
    </view>

    <view class="demo-content">
      <vc-index-anchor :index-anchor="2">
        <view class="custom-anchor-item">二</view>
      </vc-index-anchor>
      <view v-for="(_, index) in '2'.repeat(30)" :key="index" class="demo-title2">2222222</view>
    </view>

    <view class="demo-content">
      <vc-index-anchor :index-anchor="3">
        <view class="custom-anchor-item">三</view>
      </vc-index-anchor>
      <view v-for="(_, index) in '3'.repeat(20)" :key="index" class="demo-title2">3333333</view>
    </view>

    <view class="demo-content">
      <vc-index-anchor :index-anchor="4" is-last>
        <view class="custom-anchor-item">四</view>
      </vc-index-anchor>
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
  padding: 0 16px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
  background: #ccc;
}

.custom-index-bar ::v-deep .is-sticky .custom-anchor-item {
  color: var(--vc-color-primary);
  background: #e5e5e5;
}
</style>
