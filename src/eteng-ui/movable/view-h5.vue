<template>
  <div ref="moveable" class="et-moveable-view" draggable :style="styled" @click="onClick">
  <slot/>
  </div>
</template>

<script>
import { addUnit } from '../common/util'
export default {
  name: 'moveable-view-h5',
  props: {
    // x 轴坐标
    x: {
      type: [Number, String],
      default: 0
    },
    // y 轴坐标
    y: {
      type: [Number, String],
      default: 0
    },
    direction: {
      type: String,
      default: 'all'
    },
    customStyle: null
  },
  computed: {
    styled({ x, y, customStyle }) {
      console.log('x, y: ', x, y)
      let style = ''
      style += `left: ${addUnit(x)};`
      style += `top: ${addUnit(y)};`
      return style + (customStyle ? customStyle : '')
    }
  },
  mounted() {
    this.ele = this.$refs.moveable
    this.ele.addEventListener('dragstart', this.dragHandler)
  },
  methods: {
    dragHandler(evt) {
      console.log('[debug] dragstart', evt)
    },
    onClick(evt) {
      console.log('[debug] click', evt)
    }
  },
}
</script>

<style lang="scss" scoped>
.et-moveable-view {
  position: fixed;
  transition: all ease 300ms;
  z-index: 99;
}
</style>
