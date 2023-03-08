<template>
  <div class="vc-index-bar__anchor">
    <view :class="[isSticky ? 'is-sticky' : null]"></view>
    <view
      :class="['vc-index-bar__anchor-content', 'anchor-' + (indexAnchor === '#' ? 'special' : indexAnchor), isSticky ? 'is-sticky' : null, customClass]"
      :style="anchorStyled">
      <!-- slot default anchor -->
      <slot>
        <view class="vc-index-bar__anchor-text">{{ indexAnchor }}</view>
      </slot>
    </view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    indexAnchor: {
      type: [Number, String],
      default: 0
    },
    isLast: {
      type: Boolean,
      default: false
    },
    // 自定义类
    customClass: null,
    // 自定义样式
    customStyle: String
  },
  data() {
    return {
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
    if (this.isLast) {
      console.log('全部组建渲染完毕')
      this.parent.ready = true
    }
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
