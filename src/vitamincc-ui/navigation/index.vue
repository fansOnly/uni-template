<template>
  <view class="vc-navigation-wrapper" :style="{ 'height': navHeight + 'px' }">
    <view v-if="usePlaceholder" class="navigation-block"></view>
    <view v-show="navHeight" class="vc-navigation" :style="{ 'height': navHeight + 'px', 'z-index': zIndex }">
      <view :class="[isGray ? 'is-gray' : null]" :style="headStyled">
        <view v-if="backgroundImage" class="page-bg-image"><vc-image :src="backgroundImage" mode="widthFix" /></view>
        <view class="vc-navigation-buttons" :style="buttonStyled">
          <slot name="icon">
            <vc-icon v-if="showBack" class="vc-navigation__button--back" name="back" :color="iconColor" size="22"
              @click="navigateBack" />
            <vc-icon v-if="showHome" class="vc-navigation__button--home" name="home" :color="iconColor" size="22"
              @click="reLaunchHome" />
          </slot>
        </view>
        <slot>
          <view v-if="navTitle" class="vc-navigation__title vc-ellipsis" :style="titleStyled">{{ navTitle }}</view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
import cssVariables from '@/common/lib/theme'
import { tabBarPages, homePage } from '../common/tab-bar'
import { getAppData, setAppData } from '../common/global-data'

export default {
  name: 'vc-navigation',
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
      default: 'light',
      validator: (val) => {
        return ['light', 'dark', 'transparent'].includes(val)
      }
    },
    isGray: {
      type: Boolean,
      default: false
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
      navTitle: '',
      navHeight: 0,
      titleHeight: 0,
      navOffsetTop: 0,
    }
  },
  computed: {
    iconColor({ mode }) {
      return mode === 'light' ? '#252525' : '#fff'
    },
    frontColor({ mode }) {
      return mode === 'light' ? '#000000' : '#ffffff'
    },
    backgroundColor({ background, mode }) {
      return mode === 'transparent' ? 'transparent' : mode === 'light' ? '#ffffff' : background
    },
    headStyled({ navHeight, backgroundColor }) {
      let style = ''
      style += `height: ${navHeight}px;`
      style += `background: ${backgroundColor};`
      return style
    },
    titleStyled({ frontColor, titleHeight, navOffsetTop }) {
      let style = ''
      style += `padding-top: ${navOffsetTop}px;`
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
      const pages = getCurrentPages()
      if (!pages.length) return
      return this.showBackButton && pages.length > 1
    },
    showHome() {
      const pages = getCurrentPages()
      if (!pages.length) return
      const current = pages[pages.length - 1]?.route
      return this.showHomeButton && (pages.length === 1 && !tabBarPages.includes(current))
    }
  },
  async mounted() {
    // #ifdef MP-WEIXIN
    const rect = wx.getMenuButtonBoundingClientRect()
    let navHeight = rect.bottom + 7 /** 胶囊距离内容区域底部临界值 */
    this.titleHeight = rect.height
    this.navOffsetTop = rect.top
    this.navHeight = navHeight
    // #endif
    // #ifdef H5
    this.navHeight = 44
    this.titleHeight = 44
    // #endif

    if (!getAppData('navHeight')) {
      setAppData('navHeight', this.navHeight)
    }

    uni.setNavigationBarColor({
      frontColor: this.frontColor,
      backgroundColor: this.backgroundColor
    })
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
.page-bg-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  z-index: -1;
}

.vc-navigation {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  overflow: hidden;
}

.vc-navigation__title {
  width: 50%;
  margin: 0 auto;
  font-size: $uni-font-size-18;
  text-align: center;
}

.vc-navigation-buttons {
  display: flex;
  align-items: center;
  position: absolute;
  left: 8px;
}

.vc-navigation__button--back {
  margin-right: 10px;
}

.navigation-block {
  background: $uni-bg-page;
}
</style>
