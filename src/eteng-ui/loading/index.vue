<template>
  <view :class="['et-loading', vertical ? 'et-loading--vertical' : null]">
    <view v-if="type === 'shine'" class="et-loading__icon--shine" :style="styled">
      <view v-for="index in array4" :key="index" class="et-loading--shine-item"></view>
    </view>
    <slot v-else-if="type === 'custom'" name="icon"></slot>
    <view v-else :class="['et-loading__icon', 'et-loading__icon--' + type]" :style="styled">
      <template v-if="type === 'spinner'">
        <view v-for="index in array12" :key="index" class="et-loading--spinner-item"></view>
      </template>
    </view>
    <view class="et-loading__text"><slot></slot></view>
  </view>
</template>

<script>
import { addUnit } from '../common/util'
export default {
  name: 'et-loading',
  props: {
    // 加载类型
    type: {
      type: String,
      default: 'circular',
      validator(value) {
        return ['circular', 'spinner', 'shine'].includes(value)
      }
    },
    // 垂直布局
    vertical: {
      type: Boolean,
      default: false
    },
    // 图标及文案颜色
    color: {
      type: String,
      default: '#969799'
    },
    // 图标大小
    size: {
      type: [String, Number],
      default: 20
    },
  },
  data() {
    return {
      array4: Array.from({ length: 4 }),
      array12: Array.from({ length: 12 }),
    }
  },
  computed: {
    styled() {
      let style = ''
      style += `width: ${addUnit(this.size)}; height: ${addUnit(this.size)};`
      style += `color: ${this.color};`
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
  .et-loading {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .et-loading--vertical {
    flex-direction: column;
  }
  .et-loading__icon {
    box-sizing:border-box;
    position:relative;
    max-height:100%;
    max-width:100%;
    animation: rotate 0.8s linear infinite;
  }
  .et-loading__icon + .et-loading__text:not(:empty) {
    margin-left: 12rpx;
  }
  .et-loading__text {
    font-size: 14px;
    color: #909090;
  }
  .et-loading--vertical .et-loading__text {
    margin: 6px 0 0;
  }
  .et-loading__icon--spinner {
    animation-duration: 1.2s;
    animation-timing-function: steps(12);
  }
  .et-loading__icon--circular {
    border: 1px solid transparent;
    border-radius: 100%;
    border-top-color: initial;
  }
  .et-loading--spinner-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .et-loading--spinner-item:before {
    background-color: currentColor;
    border-radius: 40%;
    content: ' ';
    display: block;
    height: 25%;
    margin: 0 auto;
    width: 2px;
  }
  .et-loading--spinner-item:first-of-type {
    opacity: 1;
    transform: rotate(30deg);
  }
  .et-loading--spinner-item:nth-of-type(2) {
    opacity: 0.9375;
    transform: rotate(60deg);
  }
  .et-loading--spinner-item:nth-of-type(3) {
    opacity: 0.875;
    transform: rotate(90deg);
  }
  .et-loading--spinner-item:nth-of-type(4) {
    opacity: 0.8125;
    transform: rotate(120deg);
  }
  .et-loading--spinner-item:nth-of-type(5) {
    opacity: 0.75;
    transform: rotate(150deg);
  }
  .et-loading--spinner-item:nth-of-type(6) {
    opacity: 0.6875;
    transform: rotate(180deg);
  }
  .et-loading--spinner-item:nth-of-type(7) {
    opacity: 0.625;
    transform: rotate(210deg);
  }
  .et-loading--spinner-item:nth-of-type(8) {
    opacity: 0.5625;
    transform: rotate(240deg);
  }
  .et-loading--spinner-item:nth-of-type(9) {
    opacity: 0.5;
    transform: rotate(270deg);
  }
  .et-loading--spinner-item:nth-of-type(10) {
    opacity: 0.4375;
    transform: rotate(300deg);
  }
  .et-loading--spinner-item:nth-of-type(11) {
    opacity: 0.375;
    transform: rotate(330deg);
  }
  .et-loading--spinner-item:nth-of-type(12) {
    opacity: 0.3125;
    transform: rotate(1turn);
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1turn);
    }
  }
  .et-loading__icon--shine {
    box-sizing:border-box;
    position:relative;
    max-height:100%;
    max-width:100%;
    animation: rotate 1.5s linear infinite;
  }
  .et-loading--shine-item {
    position: absolute;
    width: 25%;
    height: 25%;
    background-color: currentColor;
    border-radius: 100%;
  }
  .et-loading--shine-item:nth-of-type(1) {
    top: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    opacity: 1;
  }
  .et-loading--shine-item:nth-of-type(2) {
    top: 50%;
    right: 0;
    transform: translate3d(0, -50%, 0);
    opacity: 0.8125;
  }
  .et-loading--shine-item:nth-of-type(3) {
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    opacity: 0.5625;
  }
  .et-loading--shine-item:nth-of-type(4) {
    top: 50%;
    left: 0;
    transform: translate3d(0, -50%, 0);
    opacity: 0.3125;
  }
</style>
