<template>
  <view class="page-wrapper">
    <demo-block title="文本溢出" padding background="#fff">
      <view class="row">
        <view class="et-ellipsis">
        这是一段宽度限制 250px 的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。
      </view>
      </view>

      <!-- 最多显示两行 -->
      <view class="row">
        <view class="et-multi-ellipsis--l2">
        这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。
      </view>
      </view>

      <!-- 最多显示三行 -->
      <view class="row">
        <view class="et-multi-ellipsis--l3">
        这是一段最多显示三行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。
      </view>
      </view>
    </demo-block>

    <demo-block title="边框线" padding background="#fff">
      <!-- 上边框 -->
      <view class="row">
        <view class="et-hairline--top box"></view>
      </view>

      <!-- 下边框 -->
      <view class="row">
        <view class="et-hairline--bottom box"></view>
      </view>

      <!-- 左边框 -->
      <view class="row">
        <view class="et-hairline--left box"></view>
      </view>

      <!-- 右边框 -->
      <view class="row">
        <view class="et-hairline--right box"></view>
      </view>

      <!-- 上下边框 -->
      <view class="row">
        <view class="et-hairline--top-bottom box"></view>
      </view>

      <!-- 全边框 -->
      <view class="row">
        <view class="et-hairline--surround box"></view>
      </view>
    </demo-block>
  </view>
</template>


<script>
import DemoBlock from '@p/components/demo-block'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.box {
  flex: 1;
  height: 30px;
  background: #f9f9f9;
  &:after {
    border-color: $uni-color-primary;
  }
}
</style>
