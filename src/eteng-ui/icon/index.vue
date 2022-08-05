<template>
  <et-image :src="`icon/icon-${name}.png`" :width="size" :height="size" :block="block" :static="isStatic" @click="$emit('click')" :customStyle="customStyle"></et-image>
</template>

<script>
export default {
  name: 'et-icon',
  props: {
    // 图标名称
    name: null,
    // 图标尺寸
    size: {
      type: [String, Number],
      default: 16
    },
    // 是否使用本地静态资源
    static: {
      type: Boolean,
      default: false
    },
    // 是否块级元素
    block: {
      type: Boolean,
      default: true
    },
    // 自定义组件样式
    customStyle: null
  },
  computed: {
    isStatic() {
      return this.static
    }
  }
}
</script>
