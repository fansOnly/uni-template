<template>
  <view class="et-progress" :style="styled">
    <view class="et-progress__bar" :style="strokeStyled">
      <view class="et-progress__portion" :style="portionStyled"></view>
      <view v-if="dot" class="et-progress__dot" :style="dotStyled"></view>
    </view>
    <view class="et-progress__pivot" :style="pivotStyled">
      <slot>{{percentage}}%</slot>
    </view>
  </view>
</template>

<script>
import { getRect, requestAnimationFrame } from '@/shared/platform'
import cssVariables from '@/shared/css-variables'
import { addUnit } from '../common/util'
export default {
  name: 'et-progress',
  props: {
    // 进度条的值
    value: {
      type: Number,
      default: 0
    },
    // 进度跳布局位置
    position: {
      type: String,
      default: 'right',
      validator(value) {
        return ['left', 'right', 'top', 'bottom'].includes(value)
      }
    },
    // 是否使用动画效果
    animation: {
      type: Boolean,
      default: true
    },
    // 动画时长 ms
    duration: {
      type: Number,
      default: 300
    },
    // 进度条宽度
    strokeWidth: {
      type: [String, Number],
      default: 8
    },
    // 进度条背景色
    background: {
      type: String,
      default: cssVariables.primaryColor
    },
    // 进度条颜色
    trackColor: {
      type: String,
      default: '#e5e5e5'
    },
    // 是否圆角
    round: {
      type: Boolean,
      default: true
    },
    // 是否显示远点标示
    dot: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      percentage: 0,
      width: 0,
    }
  },
  computed: {
    styled() {
      let style = ''
      if (this.position === 'left') {
        style += 'flex-direction:row-reverse;'
      } else if (this.position === 'top') {
        style += 'flex-direction:column-reverse;'
      } else if (this.position === 'bottom') {
        style += 'flex-direction:column;'
      }
      return style
    },
    strokeStyled() {
      let style = ''
      style += `background: ${this.trackColor};`
      style += `height: ${addUnit(this.strokeWidth)};`
      // 圆角
      if (this.round) style += 'border-radius: 2em;'
      if (['left', 'right'].includes(this.position)) {
        style += 'flex: 1;'
      } else {
        style += ''
      }
      return style
    },
    portionStyled() {
      let style = ''
      style += `width: ${this.percentage}%;`
      style += `background: ${this.background};`
      // 圆角
      if (this.round) style += 'border-radius: 2em;'
      // 动画
      if (this.animation)
        style += `transition: width ease ${this.duration}ms;`
      return style
    },
    dotStyled() {
      let style = ''
      // 原点宽度
      const dotWidth = this.strokeWidth + 2
      style += `left: ${this.percentage}%;`
      style += `width: ${addUnit(dotWidth)}; height: ${addUnit(dotWidth)};`
      // 处理边界值
      // 1、当进度小于原点宽度，原点不左移
      // 2、当进度大于满进度 - 原点宽度，原点左移100%
      // 进度条宽度
      const portionWidth = (this.percentage * this.width) / 100
      // 原点左移距离
      let translateX = '-50%'
      if (!this.percentage || portionWidth <= dotWidth) {
        translateX = '0'
      } else if (portionWidth >= this.width - dotWidth) {
        translateX = '-100%'
      }
      style += `transform: translate(${translateX}, -50%);`
      // 动画
      if (this.animation)
        style += `transition: left ease ${this.duration}ms;`
      return style
    },
    pivotStyled() {
      let style = ''
      if (this.position === 'left') {
        style += 'padding-right:4px; justify-content: flex-start;'
      } else if (this.position === 'top') {
        style += 'padding-bottom:4px;'
      } else if (this.position === 'bottom') {
        style += 'padding-top:4px;'
      } else {
        style += 'padding-left:4px; justify-content: flex-end;'
      }
      return style
    },
  },
  watch: {
    value: {
      async handler(val) {
        await requestAnimationFrame()
        if (val >= 100) {
          this.percentage = 100
        } else if (val <= 0) {
          this.percentage = 0
        } else {
          this.percentage = val
        }
        this.width = await this.getProgressWidth()
      },
      immediate: true
    }
  },
  methods: {
    getProgressWidth() {
      return getRect(this, '.et-progress').then((rect) => {
        const { width = 0 } = rect
        return width
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .et-progress {
    display: flex;
    align-items: center;
  }
  .et-progress__bar {
    position: relative;
    width: 100%;
  }
  .et-progress__portion {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0;
  }
  .et-progress__dot {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 100%;
  }
  .et-progress__pivot {
    display: flex;
    align-items: center;
    min-width: 72rpx;
    font-size: 24rpx;
    white-space: nowrap;
  }
</style>
