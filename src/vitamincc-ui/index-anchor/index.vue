<template>
  <div class="vc-index-bar__anchor">
    <view :style="{ 'height': isSticky ? height + 'px' : 0 }"></view>
    <view
      :class="['vc-index-bar__anchor-content', 'anchor-' + (index === '#' ? 'special' : index), isSticky ? 'is-sticky' : null, customClass]"
      :style="anchorStyled">
      <!-- slot default anchor -->
      <slot>
        <view class="vc-index-bar__anchor-text">{{ index }}</view>
      </slot>
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
    customStyle: String
  },
  data() {
    return {
      height: 0,
      isSticky: false,
      offsetTop: 0,
      isCustomNavigation: false,
      navHeight: 0
    }
  },
  computed: {
    anchorStyled({ offsetTop, navHeight, isCustomNavigation, isSticky, customStyle }) {
      if (!isSticky) return customStyle
      let top = offsetTop
      /* #ifdef H5 */
      top += 44
      /* #endif */
      // #ifdef MP-WEIXIN
      top += isCustomNavigation ? navHeight : 0
      // #endif
      return `top: ${top}px;${customStyle ? customStyle : ''}`
    }
  },
  async mounted() {
    this.parent.children.push(this)
    this.parent.len++
    const [isCustomNavigation, navHeight] = getAppData(['isCustomNavigation', 'navHeight'])
    this.isCustomNavigation = isCustomNavigation
    this.navHeight = navHeight
    const rect = await getRect(this, '.vc-index-bar__anchor')
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
@import '../theme-chalk/components/index-bar.scss';
</style>
