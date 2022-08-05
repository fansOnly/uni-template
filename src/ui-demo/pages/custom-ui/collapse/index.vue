<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">基础用法 - 支持 v-model / value & change</view>
      <view class="gap"></view>
      <view class="demo-">
        <!-- <et-collapse :value="value" @change="onChange"> -->
          <et-collapse v-model="value">
          <et-collapse-item name="1" title="面板一">
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
          </et-collapse-item>
          <et-collapse-item name="2" title="面板2222">
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
          </et-collapse-item>
          <et-collapse-item name="3" title="面板3333">
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
          </et-collapse-item>
        </et-collapse>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">手风琴模式</view>
      <view class="gap"></view>
      <view class="demo-">
        <et-collapse :value="value2" accordion @change="onChange2">
          <et-collapse-item name="a" title="面板a">
            <view>贵州银行将本期产品募集资金主易的未到期余额不得超过组合资产净值的40%。</view>
          </et-collapse-item>
          <et-collapse-item name="b" title="面板b">
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
          </et-collapse-item>
        </et-collapse>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">不可用项</view>
      <view class="gap"></view>
      <view class="demo-">
        <et-collapse :value="value3" accordion @change="onChange3">
          <et-collapse-item name="x" title="面板x" disabled title-style="color:#f00" text="测试" text-style="color:#f60">
            <view>贵州银行将本期产品募集资金主易的未到期余额不得超过组合资产净值的40%。</view>
          </et-collapse-item>
          <et-collapse-item name="y" title="面板y">
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
          </et-collapse-item>
          <et-collapse-item name="z" title="面板z">
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
            <view>贵州银行将本期产品募集券</view>
          </et-collapse-item>
        </et-collapse>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: ['2'],
      value2: '',
      value3: '',
    }
  },
  methods: {
    onChange(active) {
      console.log('[debug] 当前打开的面板111 >>>', active)
      this.value = active
    },
    onChange2(active) {
      console.log('[debug] 当前打开的面板222 >>>', active)
      this.value2 = active
    },
    onChange3(active) {
      this.value3 = active
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
