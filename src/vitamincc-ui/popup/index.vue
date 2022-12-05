<template>
  <view @touchmove.stop="noop">
    <view v-if="display"
      :class="['vc-popup', `vc-popup--${position}`, round ? 'vc-popup--round' : null, safeAreaInsetTop ? 'vc-popup--top--safe' : null, safeAreaInsetBottom ? 'vc-popup--bottom--safe' : null, classes]"
      :style="styled" @transitionend="onTransitionEnd">
      <slot name="header">
        <view v-if="title && title.length" :class="['vc-popup-header', border ? 'vc-hairline--bottom' : null]">
          <view class="vc-popup-header-title">{{ title }}</view>
        </view>
      </slot>
      <view v-if="closeable" :class="['vc-popup-header-close', 'vc-popup-close--' + closeIconPosition]" @click="close">
        <slot name="close">
          <vc-icon name="cross-blank" />
        </slot>
      </view>
      <scroll-view scroll-y class="vc-popup-body" :style="bodyStyled">
        <slot />
      </scroll-view>
    </view>
    <vc-overlay v-if="overlay" :visible="visible" name="fade" :z-index="zIndex - 1" :custom-style="overlayStyle"
      @click="clickOverlay"></vc-overlay>
  </view>
</template>

<script>
import transition from '../mixins/transition'
import cssVariables from '@/common/lib/theme'
import { addUnit } from '../common/util'
import { getAppData } from '../common/global-data'

export default {
  name: 'vc-popup',
  mixins: [transition],
  props: {
    // 弹窗位置
    position: {
      type: String,
      default: 'center',
      validator(value) {
        return ['center', 'top', 'bottom', 'right', 'left'].includes(value)
      }
    },
    // 弹窗标题
    title: null,
    // 弹窗Y轴位移
    offset: {
      type: [String, Number],
      default: 0
    },
    // 顶部距离
    bottom: {
      type: [String, Number],
      default: 0
    },
    // height 默认自适应，如果内容过多，需要设置高度防止内容过溢出屏幕
    height: {
      type: [Number, String],
      default: 'auto'
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    // 弹窗最大高度
    maxHeight: {
      type: [Number, String],
      default: '40vh'
    },
    // 弹窗最小高度
    minHeight: {
      type: [Number, String],
      default: 'auto'
    },
    // 是否显示标题下边框线
    border: {
      type: Boolean,
      default: false
    },
    // 是否圆角
    round: {
      type: Boolean,
      default: false
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      default: false
    },
    // 关闭图标位置
    closeIconPosition: {
      type: String,
      default: 'left'
    },
    // 是否显示遮罩层
    overlay: {
      type: Boolean,
      default: true
    },
    // 点击这招是否关闭弹窗
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    // 弹窗层级
    zIndex: {
      type: Number,
      default: +cssVariables.popupZIndex
    },
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    // 是否留出顶部安全距离（状态栏高度）
    safeAreaInsetTop: {
      type: Boolean,
      default: false
    },
    // 自定义组件样式
    customStyle: null,
    // 自定义内容样式
    bodyStyle: null,
    // 自定义遮罩层样式
    overlayStyle: null
  },
  computed: {
    animationName({ position }) {
      switch (position) {
        case 'top':
          return 'slide-down'
        case 'bottom':
          return 'slide-up'
        case 'left':
          return 'slide-left'
        case 'right':
          return 'slide-right'
        default:
          return 'fade'
      }
    },
    styled({ offset, bottom, zIndex, currentDuration, display, customStyle }) {
      const [isCustomNavigation, navHeight] = getAppData(['isCustomNavigation', 'navHeight'])
      let style = `z-index: ${zIndex};`
      style += `margin-top: calc(${offset}px + ${isCustomNavigation ? navHeight : 0}px);`
      if (bottom) style += `margin-bottom: ${bottom}px;`
      style += `transition-duration: ${currentDuration}ms;`
      if (!display) style += 'display: none;'
      return style + customStyle
    },
    bodyStyled({ position, maxHeight, minHeight, unitedHeight, unitedWidth, bodyStyle }) {
      let style = ''
      if (position === 'top' || position === 'bottom') {
        style += `height: calc(${unitedHeight} - 120rpx);`
        style += `width: calc(${unitedWidth} - 120rpx);`
        style += `max-height: ${addUnit(maxHeight)};`
        style += `min-height: ${addUnit(minHeight)};`
      }
      return style + bodyStyle
    },
    unitedHeight({ height }) {
      return height === 'auto' ? height : addUnit(height, 'vh')
    },
    unitedWidth({ width }) {
      return width === 'auto' ? width : addUnit(width, 'vh')
    },
  },
  methods: {
    clickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.$emit('click-overlay')
      this.$emit('update:visible', false)
    },
    close() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    noop() { }
  }
}
</script>

<style lang="scss" scoped>
@import "../common/style/transition.scss";

.vc-popup {
  position: fixed;
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  animation-timing-function: ease;
  animation: ease both;
  background-color: #fff;
}

.vc-popup--center {
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  &.vc-popup--round {
    border-radius: 20rpx;
  }
}

.vc-popup--top {
  top: 0;
  left: 0;
  width: 100%;

  &.vc-popup--round {
    border-radius: 0 0 20rpx 20rpx;
  }
}

.vc-popup--bottom {
  left: 0;
  bottom: 0;
  width: 100%;

  &.vc-popup--round {
    border-radius: 20rpx 20rpx 0 0;
  }
}

.vc-popup--bottom.vc-popup--bottom--safe {
  padding-bottom: env(safe-area-inset-bottom);
}

.vc-popup--top.vc-popup--top--safe {
  padding-bottom: env(safe-area-inset-top);
}

.vc-popup--left {
  top: 0;
  bottom: 0;
  left: 0;

  // transform: translate3d(0,-50%,0);
  &.vc-popup--round {
    border-radius: 0 20rpx 20rpx 0;
  }
}

.vc-popup--right {
  top: 0;
  right: 0;
  bottom: 0;

  // transform: translate3d(0,-50%,0);
  &.vc-popup--round {
    border-radius: 20rpx 0 0 20rpx;
  }
}

.vc-popup-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 112rpx;
  padding: 0 32rpx;
  /* color: $uni-text-color; */
  text-align: center;
}

.vc-popup-header-close {
  position: absolute;
  /* top: 50%; */
  top: 56rpx;
  transform: translateY(-50%);
  z-index: 2;
}

.vc-popup-close--left {
  left: $uni-spacing-12
}

.vc-popup-close--right {
  right: $uni-spacing-12
}

.vc-popup-body {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  overscroll-behavior: none;
}
</style>
