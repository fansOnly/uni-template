<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding >
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-loading></vc-loading>
        </view>
        <view class="demo-item-space">
          <vc-loading type="spinner"></vc-loading>
        </view>
        <view class="demo-item-space">
          <vc-loading type="shine" size="32" color="#3264DC"></vc-loading>
        </view>
      </view>
    </demo-block>

    <demo-block title="自定义颜色" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-loading color="#3264DC"></vc-loading>
        </view>
        <view class="demo-item-space">
          <vc-loading type="spinner" color="#4cd964"></vc-loading>
        </view>
      </view>
    </demo-block>

    <demo-block title="自定义大小" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-loading size="10"></vc-loading>
        </view>
        <view class="demo-item-space">
          <vc-loading type="spinner" size="30"></vc-loading>
        </view>
      </view>
    </demo-block>

    <demo-block title="加载文案" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-loading>加载中...</vc-loading>
        </view>
        <view class="demo-item-space">
          <vc-loading type="spinner">加载中...</vc-loading>
        </view>
      </view>
    </demo-block>

    <demo-block title="垂直排列" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-loading vertical>加载中...</vc-loading>
        </view>
        <view class="demo-item-space">
          <vc-loading type="spinner" vertical>加载中...</vc-loading>
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
@import '@p/assets/styles/index.scss';
</style>
