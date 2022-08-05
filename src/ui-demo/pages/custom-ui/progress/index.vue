<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">基础用法</view>
        <view class="demo-row--flex" style="background:#fff;">
          <view class="demo-item-space"><et-button type="primary" size="mini" @click="increment">递增 +10</et-button></view>
          <view class="demo-item-space"><et-button type="primary" size="mini" @click="decrement">递减 -10</et-button></view>
        </view>
      <view style="padding:16px;background:#fff;">
        <et-progress :value="value" />
      </view>
    </view>
    <view class="gap"></view>

    <view class="demo-block">
      <view class="demo-title">自定义颜色</view>
      <view class="demo-body" style="background:#a8abb3">
        <view class="demo-row">
          <et-progress :value="value2" :stroke-width="4" track-color="#0c328e" background="linear-gradient(270deg, #FFFFFF 0%, #3264DC 100%)" :dot="false" >
            <view style="color: #fff;font-size: 10px;">已完成 {{value2}}%</view>
        </et-progress>
        </view>
      </view>
    </view>
    <view class="gap"></view>

    <view class="demo-block">
      <view class="demo-title">文字排列</view>
      <view class="demo-body" style="background:#a8abb3">
        <view class="demo-row">
          <et-progress position="bottom" :value="81" :stroke-width="4" track-color="#0c328e" background="linear-gradient(270deg, #FFFFFF 0%, #3264DC 100%)" :dot="false" >
              <view style="color: #fff;font-size: 12px;">已完成 {{value3}}%</view>
          </et-progress>
        </view>
        <view class="demo-row">
          <et-progress position="top" :value="37" :stroke-width="4" track-color="#0c328e" background="linear-gradient(270deg, #FFFFFF 0%, #3264DC 100%)" :dot="false" >
              <view style="color: #fff;font-size: 12px;">已完成 {{value3}}%</view>
          </et-progress>
        </view>
        <view class="demo-row">
          <et-progress position="left" :value="65" :stroke-width="4" track-color="#0c328e" background="linear-gradient(270deg, #FFFFFF 0%, #3264DC 100%)" :dot="false" >
              <view style="color: #fff;font-size: 12px;">已完成 {{value3}}%</view>
          </et-progress>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: 10,
      value2: 57,
      value3: 97,
    }
  },
  methods: {
    increment() {
      if (this.value + 10 >= 100) {
        this.value = 100
      } else {
        this.value += 10
      }
    },
    decrement() {
      if (this.value - 10 <= 0) {
        this.value = 0
      } else {
        this.value -= 10
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
