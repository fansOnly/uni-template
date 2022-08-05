<template>
<view class="et-movable-wrapper">
  <!-- #ifdef MP-WEIXIN -->
  <movable-area class="et-movable-area" @click="onClick">
    <movable-view :x="unitedX" :y="unitedY" class="et-movable-view" :style="styled" direction="all" @change.stop="onChange">
      <slot></slot>
    </movable-view>
  </movable-area>
  <!-- #endif -->
  <!-- #ifdef H5 -->
  <moveable-view-h5 :x="unitedX" :y="unitedY" :custom-style="styled" direction="all">
    <slot>待兼容</slot>
  </moveable-view-h5>
  <!-- #endif -->
</view>
</template>

<script>
import MoveableViewH5 from './view-h5.vue'
  export default {
    name: 'et-movable',
    components: {
      MoveableViewH5
    },
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
      // 元素宽度
      width: {
        type: [Number, String],
        default: 50
      },
      // 元素高度
      height: {
        type: [Number, String],
        default: 50
      },
    },
    computed: {
      unitedX() {
        const { windowWidth } = wx.getSystemInfoSync()
        if (typeof this.x === 'number') {
          return this.x
        } else if (this.x.indexOf('%') > -1) {
          const percentage = Number(this.x.substr(0, this.x.length - 1))
          const val = (windowWidth * percentage) / 100
          const right = ((100 - percentage) * windowWidth) / 100
          if (right < this.width) {
            return windowWidth - right - this.width
          } else {
            return val
          }
        }
      },
      unitedY() {
        const { windowHeight } = wx.getSystemInfoSync()
        if (typeof this.y === 'number') {
          return this.y
        } else if (this.y.indexOf('%') > -1) {
          const percentage = Number(this.y.substr(0, this.y.length - 1))
          const val = (windowHeight * percentage) / 100
          const right = ((100 - percentage) * windowHeight) / 100
          if (right < this.height) {
            return windowHeight - right - this.height
          } else {
            return val
          }
        }
      },
      styled() {
        const { width, height, addUnit } = this
        let style = ''
        style += `width: ${this.addUnit(this.width)};`
        style += `height: ${this.addUnit(this.height)};`
        return style
      },
    },
    methods: {
      onChange(evt) {
        this.$emit('change', evt.detail)
      },
      onClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .et-movable-area {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    pointer-events: none;
  }
  .et-movable-view {
    pointer-events: auto;
  }
</style>
