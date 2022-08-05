<template>
  <view class="et-page-progress-bar" :style="{ 'top': top + 'px', 'animation-delay': duration + 'ms' }">
    <view class="et-page-progress-bar--active" :style="{ 'width': percent + '%', 'transition-duration': duration + 'ms' }"></view>
  </view>
</template>

<script>
export default {
  name: 'et-page-progress-bar',
  props: {
    // 加载进度
    percent: {
      type: Number,
      default: 0
    },
    // 动画时长
    duration: {
      type: Number,
      default: 500
    },
    // Y 轴偏移量
    top: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.et-page-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8rpx;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
  animation-name: fadeOut;
  animation-fill-mode: forwards;
  z-index: 2;
}

.et-page-progress-bar--active {
  width: 0;
  height: 100%;
  background: #09BB07;
  transition-property: width;
  transition-timing-function: cubic-bezier(.81, .13, .42, .95);
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}
</style>
