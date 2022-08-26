<template>
<view class="page-wrapper">
<demo-block title="基础用法" padding background="#fff">
  <et-count-down :time="time"></et-count-down>
</demo-block>

<demo-block title="自定义格式" padding background="#fff">
   <et-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒"></et-count-down>
</demo-block>

<demo-block title="自定义样式" padding background="#fff">
   <!-- <et-count-down :time="time"></et-count-down> -->
</demo-block>

<demo-block title="毫秒级" padding background="#fff">
   <et-count-down :time="time" millisecond></et-count-down>
</demo-block>

<demo-block title="调用方法" padding background="#fff">
  <view class="flex">
<view class="margin-right"><et-button type="primary" @click="onStart">开始</et-button></view>
<view class="margin-right"><et-button type="primary" @click="onPause">暂停</et-button></view>
  <et-button type="primary" @click="onReset">重置</et-button>
  </view>

  <view class="gap"></view>
   <et-count-down ref="countdown" :time="time2" :auto-start="false"></et-count-down>
</demo-block>
</view>
</template>

<script>
import DemoBlock from '@p/components/demo-block'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      time: 30 * 60 * 60 * 1000,
      time2: 10 * 60 * 1000
    }
  },
  computed: {},
  watch: {},
  async onLoad(options) {},
  async onShow() {},
  methods: {
    onStart() {
      this.$refs.countdown.start()
    },
    onPause() {
      this.$refs.countdown.pause()
    },
    onReset() {
      this.$refs.countdown.reset()
    }
  },
}
</script>

<style lang="scss" scoped>
.flex {
display: flex;
}
.margin-right {
  margin-right: 12px;
}
</style>
