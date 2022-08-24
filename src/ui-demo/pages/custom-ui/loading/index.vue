<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding >
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <et-loading></et-loading>
        </view>
        <view class="demo-item-space">
          <et-loading type="spinner"></et-loading>
        </view>
        <view class="demo-item-space">
          <et-loading type="shine" size="32" color="#3264DC"></et-loading>
        </view>
      </view>
    </demo-block>

    <demo-block title="自定义颜色" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <et-loading color="#3264DC"></et-loading>
        </view>
        <view class="demo-item-space">
          <et-loading type="spinner" color="#4cd964"></et-loading>
        </view>
      </view>
    </demo-block>

    <demo-block title="自定义大小" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <et-loading size="10"></et-loading>
        </view>
        <view class="demo-item-space">
          <et-loading type="spinner" size="30"></et-loading>
        </view>
      </view>
    </demo-block>

    <demo-block title="加载文案" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <et-loading>加载中...</et-loading>
        </view>
        <view class="demo-item-space">
          <et-loading type="spinner">加载中...</et-loading>
        </view>
      </view>
    </demo-block>

    <demo-block title="垂直排列" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <et-loading vertical>加载中...</et-loading>
        </view>
        <view class="demo-item-space">
          <et-loading type="spinner" vertical>加载中...</et-loading>
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
