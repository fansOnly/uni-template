<template>
  <text class="iconfont" :class="[block ? 'is-block' : null, 'icon-' + name]" :style="styled" @click="onClick"></text>
</template>

<script>
export default {
  name: 'vc-icon',
  props: {
    // 图标名称
    name: null,
    // 图标尺寸
    size: {
      type: Number,
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
    customStyle: null
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
@import "../common/iconfont/iconfont.scss";

.iconfont {
  color: inherit;
  font-size: 1em;
  line-height: 1em;
}

.is-block {
  display: block;
}
</style>
