<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding background="#fff">
      <vc-empty use-static />
    </demo-block>

    <demo-block title="自定义图片 / 文案" padding background="#fff">
      <vc-empty icon="icon-empty-msg.png" text="没有找到相关记录" width="220" height="164" />
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
