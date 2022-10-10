<template>
  <view class="vc-swiper-wrapper">
    <swiper class="vc-swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" :previous-margin="previousMarginVal" :next-margin="nextMarginVal" snap-to-edge :current="current" :style="{height: unitedHeight}" @change="onChange">
      <swiper-item v-for="(item, index) in options" :key="index" class="vc-swiper__item" @tap="onClickItem(item, index)">
        <slot :item="item" :index="index">
          <view :class="['vc-swiper__image', current === index ? 'is-active' : null]" :style="style">
            <vc-image :src="item.src" :radius="radius"></vc-image>
          </view>
        </slot>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { addUnit } from '../common/util'
export default {
  name: 'vc-swiper',
  props: {
    // 渲染源数据
    options: {
      type: Array,
      default: () => []
    },
    // 激活的索引
    value: {
      type: Number,
      default: 0
    },
    // 切换效果
    effect: {
      type: String,
      default: 'slide',
      validator(value) {
        return ['slide', 'scale'].includes(value)
      }
    },
    // 组件高度
    height: {
      type: [String, Number],
      default: 150
    },
    // 圆角
    radius: {
      type: [String, Number],
      default: 0
    },
    // 自动播放
    autoplay: {
      type: Boolean,
      default: false
    },
    // 是否采用衔接滑动
    circular: {
      type: Boolean,
      default: false
    },
    // 自动切换时间间隔
    interval: {
      type: Number,
      default: 1000
    },
    // 滑动动画时长
    duration: {
      type: Number,
      default: 1000
    },
    // 是否显示面板指示点
    indicatorDots: {
      type: Boolean,
      default: false
    },
    // 图片地址属性映射
    srcProp: {
      type: String,
      default: 'src'
    },
    // 缩放比例，仅在 type = scale 时有效
    scale: {
      type: String,
      default: '0.8'
    },
    // 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    previousMargin: {
      type: Number,
      default: 20
    },
    // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    nextMargin: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      current: this.value,
      style: '',
      previousMarginVal: '0px',
      nextMarginVal: '0px',
    }
  },
  computed: {
    unitedHeight() {
      return addUnit(this.height)
    },
  },
  watch: {
    effect: {
      handler(newVal) {
        if (newVal === 'scale') {
          this.previousMarginVal = addUnit(this.previousMargin)
          this.nextMarginVal = addUnit(this.nextMargin)
          this.style = `transform: scale(${this.scale})`
        } else {
          this.previousMarginVal = '0px'
          this.nextMarginVal = '0px'
          this.style = ''
        }
      },
      immediate: true,
    },
  },
  methods: {
    onChange(e) {
      this.current = e.detail.current
    },
    onClickItem(item, index) {
      this.$emit('click', item, index)
    },
  }
}
</script>

<style lang="scss" scoped>
  .vc-swiper {
    overflow: hidden;
  }
  .vc-swiper__image {
    width: 100%;
    height: 100%;
    transition: all ease 0.3s;
    // transform: scale(.9);
    &.is-active {
      transform: scale(1) !important;
    }
  }
</style>
