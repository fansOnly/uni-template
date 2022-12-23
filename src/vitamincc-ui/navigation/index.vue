<template>
  <view class="vc-navigation-wrapper" :style="{ 'height': navHeight + 'px' }">
    <view v-if="usePlaceholder" class="navigation-block"></view>
    <view v-show="navHeight" class="vc-navigation" :style="{ 'height': navHeight + 'px', 'z-index': zIndex }">
      <view :class="['et-navigation__head', isGray ? 'is-gray' : null]" :style="headStyled">
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
          <view v-if="navTitle" class="vc-ellipsis" :style="titleStyled">{{ navTitle }}</view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
import cssVariables from '@/common/theme'
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
      platform: ''
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
    headStyled({ navHeight, navOffsetTop, backgroundColor }) {
      let style = ''
      style += `height: ${navHeight - navOffsetTop - 7}px;`
      style += `padding-top: ${navOffsetTop}px;`
      style += `background: ${backgroundColor};`
      return style
    },
    titleStyled({ frontColor, titleHeight, platform }) {
      let style = ''
      style += `color: ${frontColor};`
      style += `line-height: ${titleHeight}px;`
      if (platform === 'android') {
        // 居左显示
        style += 'font-size:17px;'
      } else {
        // 居中显示 [ios, devtools]
        style += 'width: 50%; text-align: center; margin: 0 auto;font-size:17px;font-weight:500;'
      }
      return style
    },
    buttonStyled() {
      let style = ''
      if (this.platform !== 'android') {
        style += 'position: absolute; left: 32rpx;'
      }
      return style
    },
    showBack() {
      const pages = getCurrentPages()
      if (!pages.length) return
      return this.showBackButton && pages.length > 1
    },
    isHomePage() {
      const pages = getCurrentPages()
      if (!pages.length) return
      const current = pages[pages.length - 1]?.route
      return pages.length === 1 && !tabBarPages.includes(current)
    },
    showHome() {
      return this.showHomeButton && this.isHomePage
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
    const systemInfo = wx.getSystemInfoSync()
    this.platform = systemInfo.platform

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

.et-navigation__head {
  display: flex;
  align-items: center;
  padding: 0 32rpx 7px;
}

.vc-navigation-buttons {
  display: flex;
  align-items: center;
}

.vc-navigation__button--back {
  margin-right: 10px;
}

.navigation-block {
  background: $uni-bg-page;
}
</style>
