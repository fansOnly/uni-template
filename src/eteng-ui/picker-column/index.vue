<template>
  <view class="et-picker-column" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
    <view class="et-picker-wrapper" :style="activeStyled">
      <view v-for="(item, index) in options" :key="index" :class="['et-picker-column-item', 'et-ellipsis', position === index ? 'is-active' : null]" :style="rowStyled">{{item.text}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'et-picker-column',
  props: {
    // 渲染源数据
    // text - 显示文本
    // value - 文本对应的值
    options: {
      type: Array,
      default: () => []
    },
    // 默认 column 项的 value 属性
    optionKey: {
      type: String,
      default: 'index'
    },
    // 默认的索引项
    current: null,
    // 显示的行数
    rows: {
      type: Number,
      default: 7
    },
    // 每一项的高度
    rowHeight: {
      type: Number,
      default: 44
    }
  },
  data() {
    return {
      startOffset: 0, // 点击滑动的起始位置
      preOffset: 0, // 上一次的位置
      offset: 0, // 滚动距离
      position: 0, // 当前位置
      duration: 300, // 动画时长 ms
    }
  },
  computed: {
    scrollTop({ offset, max }) {
      // tip: 这里的单位要设为 px，rpx 在真机下转换有偏差
      return offset + max + 'px'
    },
    max({ rows, rowHeight }) {
      // note: ??
      return ((rows - 1) * rowHeight) / 2
    },
    min({ options, rowHeight }) {
      return -(options.length - 1) * rowHeight
    },
    rowStyled({ rowHeight }) {
      // tip: 这里的单位要设为 px，rpx 在真机下转换有偏差
      let style = ''
      style += `height: ${rowHeight}px;line-height: ${rowHeight}px;`
      return style
    },
    activeStyled({ scrollTop, duration }) {
      let style = `transition: transform ${duration}ms;`
      style += `transform: translate3d(0, ${scrollTop}, 0);`
      return style
    },
    activeIndex({ optionKey, current, options }) {
      if (optionKey === 'index') {
        return current
      } else {
        const index = options.findIndex(v => v[optionKey] === current)
        return Math.max(index, 0)
      }
    },
  },
  watch: {
    activeIndex: {
      handler(val) {
        this.position = val
        if (this.offset !== -val * this.rowHeight) {
          this.offset = -val * this.rowHeight
        }
      },
      immediate: true
    },
  },
  methods: {
    onTouchStart(evt) {
      this.startOffset = evt.touches[0].clientY
      this.preOffset = this.offset
      // bug: ios 下滚动会有抖动问题，在滚动时将动画清除，滚动结束后在设置
      this.duration = 0
    },
    onTouchMove(evt) {
      const move = evt.touches[0].clientY - this.startOffset
      this.offset = Math.min(Math.max(this.preOffset + move, this.min), 0)
    },
    onTouchEnd(evt) {
      // 如果发生了滚动事件
      if (this.preOffset !== this.offset) {
        this.duration = 300
        // 获取当前滚动到的位置
        const index = Math.min(
          Math.max(Math.round(-this.offset / this.rowHeight), 0),
          this.options.length - 1
        )
        this.fixOffsetWithIndex(index)
      }
    },
    fixOffsetWithIndex(index) {
      // 如果滚动的位置有错位，调整为正常的位置
      this.$nextTick(() => {
        this.position = index
        if (this.offset !== -index * this.rowHeight) {
          this.offset = -index * this.rowHeight
        }
        if (this.activeIndex !== index) {
          if (this.optionKey === 'index') {
            this.$emit('change', index)
          } else {
            this.$emit('change', this.options[index][this.optionKey])
          }
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .et-picker-column {
    height: 100%;
  }
  .et-picker-column-item {
    padding: 0 8rpx;
    color: $uni-text-color;
    font-size: $uni-font-size-14;
    text-align: center;
    transition: all ease 0.3s;
    &.is-active {
      font-size: $uni-font-size-16;
    }
  }
</style>
