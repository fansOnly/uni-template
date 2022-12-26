<template>
  <view class="page-wrapper">
    <demo-block title="基础用法" padding background="#fff">
      <vc-count-down :time="time"></vc-count-down>
    </demo-block>

    <demo-block title="自定义格式" padding background="#fff">
      <vc-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒"></vc-count-down>
    </demo-block>

    <demo-block title="自定义样式" padding background="#fff">
      <vc-count-down :time="time" @change="onTimeChange">
        <view class="time-flex">
          <view class="time-value">{{ timeData.day }}</view>
          <view class="time-colon">:</view>
          <view class="time-value">{{ timeData.hour }}</view>
          <view class="time-colon">:</view>
          <view class="time-value">{{ timeData.minute }}</view>
          <view class="time-colon">:</view>
          <view class="time-value">{{ timeData.second }}</view>
        </view>
      </vc-count-down>
    </demo-block>

    <demo-block title="毫秒级" padding background="#fff">
      <vc-count-down :time="time" millisecond></vc-count-down>
    </demo-block>

    <demo-block title="调用方法" padding background="#fff">
      <view class="flex">
        <view class="margin-right">
          <vc-button type="primary" @click="onStart">开始</vc-button>
        </view>
        <view class="margin-right">
          <vc-button type="primary" @click="onPause">暂停</vc-button>
        </view>
        <vc-button type="primary" @click="onReset">重置</vc-button>
      </view>

      <view class="gap"></view>
      <vc-count-down ref="countdown" :time="time2" :auto-start="false" millisecond></vc-count-down>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      time: 30 * 60 * 60 * 1000,
      time2: 10 * 60 * 1000,
      timeData: {}
    }
  },
  methods: {
    onTimeChange(data) {
      // console.log('onTimeChange: ', data)
      this.timeData = data
    },
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

.time-flex {
  display: flex;
  align-items: center;
}

.time-value {
  padding: 4px;
  border-radius: 4px;
  background: #ccc;
  text-align: center;
  font-size: 12px;
}

.time-colon {
  margin: 0 4px;
}
</style>
