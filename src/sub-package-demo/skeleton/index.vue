<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding background="#fff">
      <vc-skeleton :row="4" />
    </demo-block>

    <demo-block title="高级用法" padding background="#fff">
      <vc-skeleton title avatar :row="4" />
    </demo-block>

    <demo-block title="自定义宽度" padding background="#fff">
      <vc-skeleton title avatar :row="4" :row-width="['100%', '100%', '100%', '60%']" />
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block'
export default {
  components: {
    DemoBlock
  }
}
</script>

<style lang="scss" scoped>

</style>
