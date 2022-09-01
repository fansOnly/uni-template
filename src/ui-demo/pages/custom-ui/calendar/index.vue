<template>
  <view class="page-wrapper">
    <demo-block title="基础用法" padding>
      <et-button type="primary" block @click="visible1 = true">选择日期</et-button>
      <et-calendar :visible.sync="visible1" :value="date1" @confirm="handleConfirm1"></et-calendar>
      <view class="gap"></view>
      <view>选中的日期: {{ date1 }}</view>
    </demo-block>

    <demo-block title="选择多个日期" padding>
      <et-button type="primary" block @click="visible2 = true">选择日期</et-button>
      <view class="gap"></view>
      <view>选中的多个日期</view>
      <view v-for="(item, index) in date2" :key="index">{{ item }}</view>

      <et-calendar :visible.sync="visible2" :value="date2" type="multiple" @confirm="handleConfirm2"></et-calendar>
    </demo-block>

    <demo-block title="选择日期区间" padding>
      <et-button type="primary" block @click="visible3 = true">选择日期</et-button>
      <view class="gap"></view>
      <view>选中的日期区间</view>
      <view v-for="(item, index) in date3" :key="index">{{ item }}</view>

      <et-calendar :visible.sync="visible3" :value="date3" type="range" :max-range="5" @confirm="handleConfirm3"></et-calendar>
    </demo-block>

    <demo-block title="页面显示" padding>
      <view>选中的日期: {{ date4 }}</view>
      <et-calendar v-model="date4" :popupable="false"></et-calendar>
      <view class="gap"></view>
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
