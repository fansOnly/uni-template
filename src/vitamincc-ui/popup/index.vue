<template>
  <view @touchmove.stop="noop">
    <view v-if="display"
      :class="['vc-popup', `is-${position}`, round ? 'is-round' : null, safeAreaInsetTop ? 'is-top-safe' : null, safeAreaInsetBottom ? 'is-bottom-safe' : null, classes]"
      :style="popupStyle" @transitionend="onTransitionEnd">
      <!-- slot header -->
      <slot name="header">
        <view v-if="title && title.length" :class="['vc-popup__header', border ? 'vc-hairline--bottom' : null]">
          <view class="vc-popup__title">{{ title }}</view>
        </view>
      </slot>
      <view v-if="closeable" :class="['vc-popup__close', 'is-' + closeIconPosition]" @click="onClose">
        <!-- slot close -->
        <slot name="close">
          <vc-icon name="cross-blank" :size="20" />
        </slot>
      </view>
      <scroll-view scroll-y class="vc-popup__body" :style="bodyStyle">
        <!-- slot default -->
        <slot />
      </scroll-view>
    </view>
    <vc-overlay v-if="overlay" :visible="visible" name="fade" :z-index="zIndex ? zIndex - 1 : -1"
      :custom-style="overlayStyle" @click="onClickOverlay"></vc-overlay>
  </view>
</template>

<script>
import transition from '../mixins/transition'
import { useUnit } from '../common/hooks/use-unit'
import { useCustomNav } from '../common/hooks/use-custom-nav'

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
    // height 默认自适应，如果内容过多，需要设置高度防止内容过溢出屏幕
    height: {
      type: [Number, String],
      default: 'auto'
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    // 弹窗Y轴位移
    offset: String,
    // 是否显示标题下边框线
    border: {
      type: Boolean,
      default: true
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
    zIndex: Number,
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
    customStyle: String,
    // 自定义内容样式
    bodyStyle: String,
    // 自定义遮罩层样式
    overlayStyle: String
  },
  computed: {
    animationName() {
      switch (this.position) {
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
    popupStyle() {
      const { isCustomNav, navHeight } = useCustomNav()
      let style = ''
      style += `margin-top: calc(${(this.offset || 0) + (isCustomNav ? navHeight : 0)}px);`
      style += `transition-duration: ${this.currentDuration}ms;`
      if (this.zIndex) {
        style += `z-index: ${this.zIndex};`
      }
      if (!this.display) {
        style += 'display: none;'
      }
      return style + (this.customStyle ?? '')
    },
    unitedHeight({ height }) {
      return height === 'auto' ? height : useUnit(height, 'vh')
    },
    unitedWidth({ width }) {
      return width === 'auto' ? width : useUnit(width, 'vh')
    },
  },
  methods: {
    onClickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.$emit('click-overlay')
      this.$emit('update:visible', false)
    },
    onClose() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    noop() { }
  }
}
</script>

<style lang="scss" scoped>
@import "../theme-chalk/common/transition.scss";
@import '../theme-chalk/components/popup.scss';
</style>
