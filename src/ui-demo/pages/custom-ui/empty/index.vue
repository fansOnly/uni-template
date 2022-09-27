<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <et-empty local />
    </demo-block>

    <demo-block title="自定义图片 / 文案" padding>
      <et-empty icon="icon-empty-msg.png" tip="没有找到相关记录" width="220" height="164" local />
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block';

export default {
  components: {
    DemoBlock
  }
};
</script>

<style lang="scss" scoped>
</style>
