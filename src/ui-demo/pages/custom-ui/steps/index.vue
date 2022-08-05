<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">基础用法</view>
      <view class="demo-body">
        <et-steps :active="-1" :options="options">
        </et-steps>
      </view>
    </view>
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">垂直布局</view>
      <view class="demo-body">
        <et-steps :active="0" direction="vertical" :options="options2">
        </et-steps>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { desc: '开放起始日', title: '2021-01-01' },
        { desc: '开放截止日', title: '2021-01-31' },
        { desc: '起息日期', title: '2021-02-01' },
        { desc: '起息日期', title: '2021-02-01' },
      ],
      options2: [
        { title: '提交申请至银行', desc: '2019-02-10  今天' },
        { title: '产品份额确认，开始产生收益', desc: '2019-06-22  星期一' },
        { title: '产品到期', desc: '2020-07-22  星期一' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
