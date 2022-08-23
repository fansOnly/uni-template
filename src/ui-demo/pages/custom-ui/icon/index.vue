<template>
  <view class="page-wrapper">

    <demo-block title="基础用法">
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <et-icon name="arrow-right" size="20"></et-icon>
        </view>
        <view class="demo-item-space">
          <et-icon name="nav-home" size="20"></et-icon>
        </view>
        <view class="demo-item-space">
          <et-icon name="search" size="20"></et-icon>
        </view>
      </view>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block'
export default {
  components: {
    DemoBlock
  }
}
</script>

<style lang="scss" scoped>
</style>
