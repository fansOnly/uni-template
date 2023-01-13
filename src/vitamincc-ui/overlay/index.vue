<template>
  <!-- 需要将 class 挂载在 vc-transition 上，不然遮罩层级有bug -->
  <vc-transition :visible="visible" :animation-name="name" :duration="duration" @click="onClose">
    <view class="vc-overlay" :style="styled">
      <!-- slot default -->
      <slot />
    </view>
  </vc-transition>
</template>

<script>
import { getAppData } from '../common/global-data'
export default {
  name: 'vc-overlay',
  props: {
    // 显示开关
    visible: {
      type: Boolean,
      default: false
    },
    // 动画名称
    name: {
      type: String,
      default: 'fade'
    },
    // 动画时间 ms
    duration: {
      type: Number,
      default: 300
    },
    // 层级
    zIndex: {
      type: Number
    },
    // 锁定滚动穿透
    lockScroll: {
      type: Boolean,
      default: true
    },
    // 是否可点击
    clickable: {
      type: Boolean,
      default: true
    },
    // 自定义样式
    customStyle: String
  },
  computed: {
    styled() {
      const [isCustomNavigation, navHeight] = getAppData(['isCustomNavigation', 'navHeight'])
      let style = ''
      if (this.zIndex) {
        style += `z-index: ${this.zIndex};`
      }
      if (isCustomNavigation) style += `top: ${navHeight}px;`
      return style + this.customStyle
    }
  },
  methods: {
    onClose() {
      if (!this.clickable) return
      this.$emit('click')
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/overlay.scss';
</style>
