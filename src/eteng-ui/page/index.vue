<template>
  <view class="et-page">
    <view :class="['et-progress-bar', show || failed ? 'fade' : null]"
      :style="{ 'top': top + 'px', 'height': height + 'px', 'animation-duration': duration + 'ms' }">
      <view :class="['et-progress-bar--before', paused ? 'animation-paused' : null, done ? 'animation-done' : null]"
        :style="{ 'background': color }"></view>
      <view v-if="done" class="et-progress-bar--after"
        :style="{ 'background': color, 'animation-duration': duration + 'ms' }"></view>
    </view>
    <slot v-if="show"></slot>
    <slot v-else name="skeleton"></slot>
    <slot v-if="failed" name="failed"></slot>
  </view>
</template>

<script>
export default {
  name: 'et-page',
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false
    },
    // 颜色
    color: {
      type: String,
      default: '#09BB07'
    },
    // 高度
    height: {
      type: Number,
      default: 4
    },
    // Y 轴偏移量
    top: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      duration: 300,
      paused: false,
      done: false,
      failed: false
    }
  },
  watch: {
    show: {
      handler(val) {
        if (val) {
          if (+new Date() - this.start < 5000) {
            // 提前加载结束
            this.done = true
            clearTimeout(this.timer)
            clearTimeout(this.timer2)
          }
          if (this.paused) {
            this.paused = false
          }
          uni.hideLoading()
        }
      },
      immediate: true
    }
  },
  created() {
    uni.showLoading({
      title: '加载中...',
      mask: true
    })
    this.start = +new Date()
    // 加载等待界限
    this.timer = setTimeout(() => {
      if (!this.show) {
        this.paused = true
      } else {
        clearTimeout(this.timer)
        clearTimeout(this.timer2)
      }
    }, 5000)

    this.timer2 = setTimeout(() => {
      if (!this.show) {
        this.failed = true
        this.done = true
        uni.showToast({
          title: '加载失败，请稍后重试',
          icon: 'none',
          mask: true
        })
        clearTimeout(this.timer2)
      }
    }, 15000)
  }
}
</script>

<style lang="scss" scoped>
.et-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;

  &.fade {
    animation-delay: 200ms;
    animation-timing-function: ease-in-out;
    animation-name: fadeOut;
    animation-fill-mode: forwards;
  }
}

.et-progress-bar--before,
.et-progress-bar--after {
  width: 0;
  height: 100%;
  animation-timing-function: cubic-bezier(.81, .13, .42, .95);
  animation-name: progress;
  animation-fill-mode: forwards;
}

.et-progress-bar--before {
  position: absolute;
  top: 0;
  left: 0;
  animation-duration: 6000ms;
}

.animation-paused {
  animation-play-state: paused;
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

@keyframes progress {
  0% {
    width: 0;
  }

  40% {
    width: 50%;
  }

  70% {
    width: 60%;
  }

  90% {
    width: 70%;
  }

  100% {
    width: 100%;
  }
}
</style>
