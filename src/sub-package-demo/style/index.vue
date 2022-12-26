<template>
  <view class="page-wrapper">

    <demo-block title="1px边框线" padding background="#fff">
      <view class="space">
        <view class="box vc-hairline--surround">环绕边框线</view>
      </view>
      <view class="space">
        <view class="box vc-hairline--top">顶部边框线</view>
      </view>
      <view class="space">
        <view class="box vc-hairline--surround" style="border-color: #f00">自定义颜色</view>
      </view>
      <view class="space">
        <view class="box vc-hairline--surround style2">自定义边框圆角</view>
      </view>
    </demo-block>

    <demo-block title="文本溢出" padding>
      <view class="space">
        <view class=" vc-ellipsis">单行文本溢出单行文本溢出单行文本溢出单行文本溢出</view>
      </view>
      <view class="space">
        <view class=" vc-ellipsis--l2">两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出两行文本溢出</view>
      </view>
      <view class="space">
        <view class=" vc-ellipsis--l3">三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出三行文本溢出
        </view>
      </view>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block/index.vue'

export default {
  components: {
    DemoBlock
  }
}
</script>

<style lang="scss" scoped>
.space {
  margin-top: 16px;
}

.style2 {
  padding: 5px;
  border-radius: 15px;
  border-color: #f00;
}
</style>
