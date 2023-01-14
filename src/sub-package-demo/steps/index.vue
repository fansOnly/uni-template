<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <vc-button type="default" custom-style="margin-right: 10px" @click="decrement">上一步</vc-button>
    <vc-button type="primary" custom-style="margin-right: 10px" @click="increment">下一步</vc-button>
    <vc-button type="default" @click="active = 0">重置</vc-button>

    <demo-block title="基础用法" padding background="#fff">
      <vc-steps :current="active" :options="options" />
    </demo-block>

    <demo-block title="基础用法 - 自定义样式" padding background="#fff">
      <vc-steps :current="active" :options="options" active-icon="checkbox-on-circle-fill" inactive-icon="home" />
    </demo-block>

    <demo-block title="自定义颜色" padding background="#fff">
      <vc-steps :current="active" :options="options" active-color="#f60" />
    </demo-block>

    <demo-block title="垂直布局" padding background="#fff">
      <vc-steps :current="active" direction="vertical" :options="options2" />
    </demo-block>

    <demo-block title="垂直布局 - 自定义样式" padding background="#fff">
      <vc-steps :current="active" direction="vertical" :options="options2" active-icon="checkbox-on-circle-fill"
        inactive-icon="home" />
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
      active: 1,
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
        { title: '产品赎回', desc: '2020-07-22  星期一' },
      ],
    }
  },
  methods: {
    increment() {
      if (this.active === 3) return
      this.active++
    },
    decrement() {
      if (this.active === 0) return
      this.active--
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
