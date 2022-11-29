<template>
  <div class="index-bar-anchor">
    <view class="anchor--placeholder" :style="{ 'height': isSticky ? height + 'px' : 0 }"></view>
    <view
      :class="['anchor-' + (index === '#' ? 'special' : index), isSticky ? 'index-bar-anchor--sticky' : null, customClass]"
      :style="anchorStyled">
      <slot>{{ index }}</slot>
    </view>
  </div>
</template>

<script>
import { getRect } from '../common/util'
import { getAppData } from '../common/global-data'

export default {
  name: 'vc-index-anchor',
  inject: {
    parent: {
      from: 'indexBar',
      default: null
    }
  },
  props: {
    // 索引值
    index: {
      type: [Number, String],
      default: 0
    },
    // 自定义类
    customClass: null,
    // 自定义样式
    customStyle: null
  },
  data() {
    return {
      height: 0,
      isSticky: false,
      offsetTop: 0,
      customNavigationStyle: false,
      navHeight: 0
    }
  },
  computed: {
    anchorStyled({ offsetTop, navHeight, customNavigationStyle, isSticky, customStyle }) {
      if (!isSticky) return customStyle
      let top = offsetTop
      /* #ifdef H5 */
      top += 44
      /* #endif */
      // #ifdef MP-WEIXIN
      top += customNavigationStyle ? navHeight : 0
      // #endif
      return `top: ${top}px;${customStyle ? customStyle : ''}`
    }
  },
  async mounted() {
    this.parent.children.push(this)
    this.parent.len++
    const [customNavigationStyle, navHeight] = getAppData(['customNavigationStyle', 'navHeight'])
    this.customNavigationStyle = customNavigationStyle
    this.navHeight = navHeight
    const rect = await getRect(this, '.index-bar-anchor')
    this.height = rect.height
  },
  methods: {
    setStickyAnchor(val = false, top = 0) {
      this.isSticky = val
      this.offsetTop = top
    },
  },
}
</script>

<style lang="scss" scoped>
.index-bar-anchor--sticky {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: #fff;
  color: $uni-color-primary;
  z-index: 88;
}
</style>
