<template>
  <view class="et-navigation-wrapper">
    <view v-if="usePlaceholder" class="navigation-block" :style="{ 'height': navHeight +'px' }"></view>
    <view v-show="navHeight" class="et-navigation" :style="headStyled">
      <view v-if="backgroundImage" class="page-bg-image"><et-image :src="backgroundImage" mode="widthFix" /></view>
      <view class="et-navigation-buttons" :style="buttonStyled">
        <slot name="icon">
          <et-icon v-if="showBack" class="et-navigation__button--back" :name="backIcon" size="24" @click="navigateBack" />
          <et-icon v-if="showHome" class="et-navigation__button--home" :name="homeIcon" size="22" @click="reLaunchHome" />
        </slot>
      </view>
      <slot>
        <view v-if="title" class="et-navigation__title et-ellipsis" :style="titleStyled">{{title}}</view>
      </slot>
    </view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('state')
import cssVariables from '@/shared/css-variables'
import { tabBarPages, homePage } from '../common/tab-bar'

export default {
  name: 'et-navigation',
  props: {
    // 页面标题
    title: null,
    // 导航栏背景色
    background: {
      type: String,
      default: cssVariables.primaryColor
    },
    // 导航颜色模式 dark - 深色 light - 浅色
    mode: {
      type: String,
      default: 'light'
    },
    // 层级
    zIndex: {
      type: Number,
      default: +cssVariables.navZIndex
    },
    // 是否启用占位符
    usePlaceholder: {
      type: Boolean,
      default: true
    },
    // 自定义背景图
    backgroundImage: {
      type: String,
      default: ''
    },
    // 是否显示首页按钮
    showHomeButton: {
      type: Boolean,
      default: true
    },
    // 是否显示返回按钮
    showBackButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      navHeight: 0,
      titleHeight: 0,
      navOffsetTop: 0,
    }
  },
  computed: {
    homeIcon({ mode }) {
      return mode === 'light' ? 'nav-home' : 'nav-home-white'
    },
    backIcon({ mode }) {
      return mode === 'light' ? 'nav-back' : 'nav-back-white'
    },
    frontColor({ mode }) {
      return mode === 'light' ? '#000000' : '#ffffff'
    },
    backgroundColor({ backgroundImage, background, mode }) {
      return backgroundImage ? 'transparent' : (mode === 'light' ? '#ffffff' : background)
    },
    headStyled({ navOffsetTop, titleHeight, zIndex, backgroundColor }) {
      let style = ''
      style += `z-index: ${zIndex};`
      style += `background: ${backgroundColor};`
      style += `padding-top: ${navOffsetTop}px;`
      style += `height: ${titleHeight}px;`
      return style
    },
    titleStyled({ frontColor, titleHeight }) {
      let style = ''
      style += `color: ${frontColor};`
      style += `line-height: ${titleHeight}px;`
      return style
    },
    buttonStyled({ navOffsetTop, titleHeight }) {
      let style = ''
      style += `top: ${navOffsetTop}px;`
      style += `height: ${titleHeight}px;`
      return style
    },
    showBack() {
      // 返回按钮
      const pages = getCurrentPages()
      return this.showBackButton && pages.length > 1
    },
    showHome() {
      // 返回首页按钮
      const pages = getCurrentPages()
      const path = pages[pages.length - 1].route
      return this.showHomeButton && !tabBarPages.includes(path)
    }
  },
  async mounted() {
    const rect = wx.getMenuButtonBoundingClientRect()
    const navHeight = rect.bottom + 7 /** 胶囊距离内容区域底部临界值 */
    this.navHeight = navHeight
    this.titleHeight = rect.height
    this.navOffsetTop = rect.top

    this.setNavHeight(navHeight)

    uni.setNavigationBarColor({
      frontColor: this.frontColor,
      backgroundColor: this.backgroundColor
    })
  },
  methods: {
    ...mapActions(['setNavHeight']),
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
  .page-bg-image {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    z-index: -1;
  }
  .et-navigation {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding-bottom: 16rpx;
    overflow: hidden;
  }
  .et-navigation__title {
    width: 50%;
    margin: 0 auto;
    font-size: $uni-font-size-18;
    text-align: center;
  }
  .et-navigation-buttons {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: $uni-spacing-16;
  }
  .et-navigation__button--back {
    margin-right: 22rpx;
  }
  .navigation-block {
    background: $uni-bg-page;
  }
</style>
