<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">1px边框线</view>
      <view class="demo-body">
        <view class="box et-hairline--surround" >环绕边框线</view>
      </view>
      <view class="demo-body">
        <view class="box et-hairline--surround" style="border-color: #f00">自定义颜色</view>
      </view>
      <view class="demo-body">
        <view class="box et-hairline--surround style2">自定义边框圆角</view>
      </view>
      <view class="demo-body">
        <view class="box et-hairline--top">顶部边框线</view>
      </view>
      <view class="demo-body">
        <view class="box et-hairline--left">左边框线</view>
      </view>
      <view class="demo-body">
        <view class="box et-hairline--bottom">右边框线</view>
      </view>
      <view class="demo-body">
        <view class="box et-hairline--right">底部边框线</view>
      </view>
    </view>
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">文本溢出</view>
      <view class="demo-body">
        <view class=" et-ellipsis">单行文本溢出单行文本溢出单行文本溢出单行文本溢出</view>
      </view>
      <view class="demo-body">
        <view class=" et-ellipsis--l2">两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出</view>
      </view>
      <view class="demo-body">
        <view class=" et-ellipsis--l3">三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
.style2 {
  padding: 5px;
  border-radius: 15px;
  border-color: #f00;
}
</style>
