<template>
  <view :class="['vc-image', block ? 'is-block' : null, round ? 'is-round' : null, customClass]" :style="styled"
    @click="$emit('click')">
    <view v-if="loading && !loaded" class="vc-image__mask is-loading">
      <vc-loading type="spinner" />
    </view>
    <image class="vc-image__img" :src="resolvePath(src)" :mode="mode" :lazy-load="lazyLoad"
      :show-menu-by-longpress="showMenuByLongpress" @error="onImageError" @load="onImageLoad"></image>
    <view v-if="error" class="vc-image__mask is-error">
      <!-- 加载失败 -->
      <vc-icon name="image-fail" />
    </view>
  </view>
</template>

<script>
const path = require('path')
import { addUnit } from '../common/util'

export default {
  name: 'vc-image',
  props: {
    // 图片路径
    src: null,
    // 图片宽度
    width: {
      type: [Number, String],
      default: '100%'
    },
    // 图片高度
    height: {
      type: [Number, String],
      default: '100%'
    },
    /**
     * 缩放模式
     * scaleToFill - 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
     * aspectFit - 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来
     * aspectFill - 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
     * widthFix - 宽度不变，高度自动变化，保持原图宽高比不变
     * heightFix - 高度不变，宽度自动变化，保持原图宽高比不变
     * 裁剪模式 不缩放图片，只显示图片的部分区域
     * top / left / right / top / top left / top right / bottom left / bottom right
     */
    mode: {
      type: String,
      default: 'scaleToFill'
    },
    // 是否使用本地静态资源
    static: {
      type: Boolean,
      default: false
    },
    // 是否全路径
    fullPath: {
      type: Boolean,
      default: false
    },
    // 图片圆角
    radius: {
      type: Number,
      default: 0
    },
    // 圆形图片
    round: {
      type: Boolean,
      default: false
    },
    // 块级元素
    block: {
      type: Boolean,
      default: false
    },
    // 懒加载
    lazyLoad: {
      type: Boolean,
      default: true
    },
    // 加载效果
    loading: {
      type: Boolean,
      default: false
    },
    // 长按显示操作列表
    showMenuByLongpress: {
      type: Boolean,
      default: false
    },
    // 自定义组件 class
    customClass: null,
    // 自定义组件样式
    customStyle: String
  },
  data() {
    return {
      error: false,
      loaded: false
    }
  },
  computed: {
    styled({ width, height, radius, customStyle }) {
      let style = ''
      style += `width: ${addUnit(width)};`
      // fix：修复编译 H5 图片宽度被压缩
      style += `min-width: ${addUnit(width)};`
      style += `height: ${addUnit(height)};`

      if (radius) {
        style += `border-radius: ${addUnit(radius)};`
      }
      return style + customStyle
    }
  },
  watch: {
    src: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.error = false
        }
      }
    }
  },
  methods: {
    onImageError(event) {
      this.error = this.loaded = true
      this.$emit('error', event.detail)
      this.$emit('loaded')
    },
    onImageLoad(event) {
      this.loaded = true
      this.$emit('load', event.detail)
      this.$emit('loaded')
    },
    resolvePath(src) {
      // 网络路径优先展示
      if (this.fullPath || /[https?|wxfile]:\/\/.+$/g.test(src)) {
        return src
      } else if (this.static) {
        return path.join('/static/images/', src)
      } else {
        return process.env.RESOURCE_URL + src
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/image.scss';
</style>
