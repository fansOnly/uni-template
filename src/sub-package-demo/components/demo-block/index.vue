<template>
  <view class="demo-block">
    <view class="demo-title vc-hairline--bottom">{{ title }}</view>
    <view :class="['demo-content', padding ? 'demo-content--padding' : null]" :style="{ 'background': background }">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'demo-block',
  props: {
    title: {
      type: String,
      default: ''
    },
    padding: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="scss" scoped>
.demo-block {
  margin-top: 12px;
}

.demo-title {
  display: flex;
  align-items: center;
  padding: 28rpx 32rpx;
  background: #fff;

  &::before {
    content: '';
    width: 4px;
    height: 20px;
    background: $uni-color-primary;
    margin-right: 12px;
  }
}

.demo-content {
  padding: 16px 0;

  /* background: #fff; */
  &--padding {
    padding: 16px;
  }
}
</style>
