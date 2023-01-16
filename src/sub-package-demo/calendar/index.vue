<template>
  <view class="page-wrapper">
    <demo-block title="基础用法" padding>
      <vc-button type="primary" block @click="visible1 = true">选择日期</vc-button>
      <view class="gap"></view>
      <view>选中的日期: {{ date1 }}</view>
    </demo-block>

    <demo-block title="选择多个日期" padding>
      <vc-button type="primary" block @click="visible2 = true">选择日期</vc-button>
      <view class="gap"></view>
      <view>选中的多个日期</view>
      <view v-for="(item, index) in date2" :key="index">{{ item }}</view>
    </demo-block>

    <demo-block title="选择日期区间" padding>
      <vc-button type="primary" block @click="visible3 = true">选择日期</vc-button>
      <view class="gap"></view>
      <view>选中的日期区间</view>
      <view v-for="(item, index) in date3" :key="index">{{ item }}</view>
    </demo-block>

    <demo-block title="页面显示" padding>
      <view>选中的日期: {{ date4 }}</view>
      <vc-calendar v-model="date4" :use-popup="false"></vc-calendar>
      <view class="gap"></view>
    </demo-block>

    <vc-calendar :visible.sync="visible1" :value="date1" @confirm="handleConfirm1"></vc-calendar>

    <vc-calendar :visible.sync="visible2" :value="date2" type="multiple" :max-range="5"
      @confirm="handleConfirm2"></vc-calendar>

    <vc-calendar :visible.sync="visible3" :value="date3" type="range" allow-same-day :max-range="5"
      @confirm="handleConfirm3"></vc-calendar>
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
      date1: '',
      visible1: false,
      date2: ['2022-08-20', '2022-08-24', '2022-08-25', '2022-08-26'],
      // date2: [],
      visible2: false,
      date3: [],
      visible3: false,
      date4: ''
    }
  },
  methods: {
    handleConfirm1(val) {
      console.log('[debug] 选中的单个日期 >>>', val)
      this.date1 = val
    },
    handleConfirm2(val) {
      console.log('[debug] 选中的多个日期 >>>', val)
      this.date2 = val
    },
    handleConfirm3(val) {
      console.log('[debug] 选中的日期区间 >>>', val)
      this.date3 = val
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
