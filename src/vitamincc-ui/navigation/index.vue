<template>
  <view v-show="navHeight" class="vc-navigation" :style="{ 'height': navHeight + 'px' }">
    <view :class="['vc-navigation__container', isGray ? 'is-gray' : null, `is-${mode}`]" :style="navigationStyle">
      <view v-if="bgImage" class="vc-navigation__bg-image"><vc-image :src="bgImage" mode="widthFix" />
      </view>
      <view
        :class="['vc-navigation__content', `is-${align}`, isIos ? 'is-ios' : null, isAndroid ? 'is-android' : null]">
        <view class="vc-navigation__left">
          <slot name="icon">
            <!-- slot icon -->
            <vc-icon v-if="ifBack" class="vc-navigation__icon" name="back" size="22" @click="navigateBack" />
            <vc-icon v-if="ifHome" class="vc-navigation__icon" name="home" size="22" @click="reLaunchHome" />
          </slot>
        </view>
        <slot>
          <!-- slot default - title -->
          <view v-if="navTitle" class="vc-navigation__title vc-ellipsis">{{ navTitle }}</view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
import { tabBarPages, homePage } from '../common/tab-bar'
import { getAppData, setAppData } from '../common/global-data'

export default {
  name: 'vc-navigation',
  props: {
    // 页面标题
    title: null,
    //  dark / light
    mode: {
      type: String,
      default: 'light',
      validator: (val) => {
        return ['light', 'dark', 'custom'].includes(val)
      }
    },
    color: String,
    background: String,
    // 自定义背景图
    bgImage: String,
    align: {
      type: String,
      default: 'center'
    },
    // 是否显示首页按钮
    showHome: {
      type: Boolean,
      default: true
    },
    // 是否显示返回按钮
    showBack: {
      type: Boolean,
      default: true
    },
    isGray: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      navTitle: '',
      navHeight: 0,
      titleHeight: 0,
      navOffsetTop: 0,
      platform: ''
    }
  },
  computed: {
    isIos() {
      return this.platform === 'ios'
    },
    isAndroid() {
      return this.platform === 'android'
    },
    navigationStyle() {
      let style = ''
      style += `height: ${this.navHeight}px;`
      style += `padding-top: ${this.navOffsetTop}px; padding-bottom:7px;`
      if (!this.bgImage && this.background) {
        style += `background: ${this.background};`
      }
      if (this.color) {
        style += `color: ${this.color};`
      }
      return style
    },
    ifBack() {
      const pages = getCurrentPages()
      if (!pages.length) return
      return this.showBack && pages.length > 1
    },
    isHomePage() {
      const pages = getCurrentPages()
      if (!pages.length) return
      const current = pages[pages.length - 1]?.route
      return pages.length === 1 && !tabBarPages.includes(current)
    },
    ifHome() {
      return this.showHome && this.isHomePage
    }
  },
  watch: {
    title: {
      handler(val) {
        this.navTitle = val
      }
    }
  },
  async mounted() {
    // #ifdef MP-WEIXIN
    const menuRect = wx.getMenuButtonBoundingClientRect()
    this.navHeight = menuRect.bottom + 7 /** 胶囊距离内容区域底部临界值 */
    this.titleHeight = menuRect.height
    this.navOffsetTop = menuRect.top
    // this.menuWidth = menuRect.width
    // #endif
    // #ifdef H5
    this.navHeight = 44
    this.titleHeight = 44
    // #endif

    if (!getAppData('navHeight')) {
      setAppData('navHeight', this.navHeight)
    }
    const systemInfo = wx.getSystemInfoSync()
    this.platform = systemInfo.platform

    this.navTitle = this.title || this.$Route.meta?.title
    this.$emit('after-mounted')
  },
  methods: {
    reLaunchHome() {
      uni.reLaunch({ url: homePage || '/pages/index/index' })
    },
    navigateBack() {
      uni.navigateBack({ delta: 1 })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/navigation.scss';
</style>
