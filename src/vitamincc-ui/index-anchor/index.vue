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
import { mapGetters } from 'vuex'
import { useRect } from '@/common/hooks/use-rect'

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
    }
  },
  computed: {
    ...mapGetters('app', ['navHeightValue']),
    anchorStyled() {
      if (!this.isSticky) return this.customStyle
      let top = this.offsetTop
      /* #ifdef H5 */
      top += 44
      /* #endif */
      // #ifdef MP-WEIXIN
      top += this.navHeightValue
      // #endif
      return `top: ${top}px;${this.customStyle ?? ''}`
    }
  },
  async mounted() {
    this.parent.children.push(this)
    this.parent.len++
    const rect = await useRect(this, '.vc-index-bar__anchor')
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
