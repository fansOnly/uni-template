<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">基础用法</view>
      <view class="demo-body">
        <view class="demo-row--flex">
          <view class="demo-item-space">
            <et-loading></et-loading>
          </view>
          <view class="demo-item-space">
            <et-loading type="spinner"></et-loading>
          </view>
          <view class="demo-item-space">
            <et-loading type="shine" size="32" color="#3264DC" ></et-loading>
          </view>
        </view>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">自定义颜色</view>
      <view class="demo-body">
        <view class="demo-row--flex">
          <view class="demo-item-space">
            <et-loading color="#3264DC" ></et-loading>
          </view>
          <view class="demo-item-space">
            <et-loading type="spinner" color="#4cd964" ></et-loading>
          </view>
        </view>
      </view>
    </view>
    <view class="gap"></view>

    <view class="demo-block">
      <view class="demo-title">自定义大小</view>
      <view class="demo-body">
        <view class="demo-row--flex">
          <view class="demo-item-space">
            <et-loading size="10" ></et-loading>
          </view>
          <view class="demo-item-space">
            <et-loading type="spinner" size="30" ></et-loading>
          </view>
        </view>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">加载文案</view>
      <view class="demo-body">
        <view class="demo-row--flex">
          <view class="demo-item-space">
            <et-loading>加载中...</et-loading>
          </view>
          <view class="demo-item-space">
            <et-loading type="spinner">加载中...</et-loading>
          </view>
        </view>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">垂直排列</view>
      <view class="demo-body">
        <view class="demo-row--flex">
          <view class="demo-item-space">
            <et-loading vertical>加载中...</et-loading>
          </view>
          <view class="demo-item-space">
            <et-loading type="spinner" vertical>加载中...</et-loading>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
