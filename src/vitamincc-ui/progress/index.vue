<template>
  <view class="vc-progress">
    <view :class="['vc-progress__bar', round ? 'is-round' : null]" :style="strokeStyled">
      <view class="vc-progress__portion" :style="portionStyled">
        <text v-if="showText && textInside && percentage" class="vc-progress__text--inner">
          <!-- slot default -->
          <slot :percentage="percentage">
            {{ percentageText }}
          </slot>
        </text>
      </view>
    </view>
    <view v-if="showText && !textInside" class="vc-progress__text">
      <!-- slot default -->
      <slot :percentage="percentage">
        {{ percentageText }}
      </slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'vc-progress',
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    // 进度条宽度
    strokeWidth: Number,
    showText: {
      type: Boolean,
      default: true
    },
    // type = line
    textInside: {
      type: Boolean,
      default: false
    },
    // 动画时长 s
    duration: {
      type: Number,
      default: 0.3
    },
    // 进度条背景色
    color: String,
    // 进度条颜色
    trackColor: String,
    // 是否圆角
    round: {
      type: Boolean,
      default: true
    },
    format: null
  },
  computed: {
    percentageText() {
      return (this.format && typeof this.format === 'function') ? this.format(this.percentage) : `${this.percentage}%`
    },
    strokeStyled() {
      let style = ''
      if (this.strokeWidth) {
        style += `height: ${this.strokeWidth}px;`
      }
      if (this.trackColor) {
        style += `background-color: ${this.trackColor}px;`
      }
      return style
    },
    portionStyled() {
      let style = ''
      style += `width: ${this.percentage}%;`
      if (this.color) {
        style += `background-color: ${this.color};`
      }
      if (this.duration) {
        style += `animation-duration: ${this.duration}s;`
      }
      return style
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/progress.scss';
</style>
