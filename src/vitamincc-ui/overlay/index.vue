<template>
  <!-- 需要将 class 挂载在 vc-transition 上，不然遮罩层级有bug -->
  <vc-transition :visible="visible" :animation-name="name" :duration="duration" @click="onClose">
    <view class="vc-overlay" :style="styled" @mousewheel.prevent @touchmove.stop.prevent="noop">
      <!-- slot default -->
      <slot />
    </view>
  </vc-transition>
</template>

<script>
import { mapGetters } from 'vuex'

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
    zIndex: Number,
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
    ...mapGetters('app', ['navHeightValue']),
    styled() {
      let style = ''
      if (this?.zIndex > 0) {
        style += `z-index: ${this.zIndex};`
      }
      if (this.navHeightValue) {
        style += `top: ${this.navHeightValue}px;`
      }
      return style + this.customStyle
    }
  },
  methods: {
    onClose() {
      if (!this.clickable) return
      this.$emit('click')
      this.$emit('update:visible', false)
    },
    noop() { }
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/overlay.scss';
</style>
