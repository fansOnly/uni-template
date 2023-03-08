<template>
  <text class="iconfont" :class="[block ? 'is-block' : null, 'icon-' + name]" :style="styled" @click="onClick"></text>
</template>

<script>
export default {
  name: 'vc-icon',
  props: {
    // 图标名称
    name: {
      type: String,
      require: true
    },
    // 图标尺寸
    size: {
      type: [String, Number],
    },
    color: {
      type: String
    },
    // 是否块级元素
    block: {
      type: Boolean,
      default: false
    },
    // 自定义组件样式
    customStyle: String
  },
  computed: {
    styled({ size, color, customStyle }) {
      let style = ''
      if (size) {
        style += `font-size: ${size}px;`
      }
      if (color) {
        style += `color: ${color};`
      }
      return style + customStyle
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
      this.$emit('tap')
    }
  }
}
</script>

<style lang="scss" >
@import "../theme-chalk/components/icon.scss";
</style>
