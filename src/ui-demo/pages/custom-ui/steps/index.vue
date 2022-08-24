<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <et-steps :active="-1" :options="options" />
    </demo-block>

    <demo-block title="垂直布局" padding>
      <et-steps :active="0" direction="vertical" :options="options2" />
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
</style>
