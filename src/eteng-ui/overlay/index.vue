<template>
<!-- 直接将 class 挂载在 et-transition上，不然遮罩层级有bug -->
  <et-transition custom-class="et-overlay" :custom-style="styled" :visible="visible" :animation-name="name" :duration="duration" @click="close">
    <slot />
  </et-transition>
</template>

<script>
import cssVariables from '@/shared/css-variables'
export default {
  name: 'et-overlay',
  props: {
    // 显示开关
    visible: {
      type: Boolean,
      default: true
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
      type: Number,
      default: +cssVariables.overlayZIndex
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
    customStyle: null
  },
  computed: {
    styled() {
      let style = `z-index: ${this.zIndex};`
      return this.mergeStyles([style, this.customStyle])
    }
  },
  methods: {
    close() {
      if (!this.clickable) return
      this.$emit('click')
      this.$emit('update:visible', false)
    }
  }
}
</script>
