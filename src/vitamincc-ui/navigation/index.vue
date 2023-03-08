<template>
  <view v-show="navHeight" class="vc-navigation" :style="{ 'height': navHeight + 'px' }">
    <view :class="['vc-navigation__container', isGray ? 'is-gray' : null, `is-${mode}`]" :style="navigationStyle">
      <view v-if="bgImage" class="vc-navigation__bg-image"><vc-image :src="bgImage" mode="widthFix" />
      </view>
      <view :class="['vc-navigation__content', `is-${align}`, isIos ? 'is-ios' : null, isAndroid ? 'is-android' : null]">
        <view class="vc-navigation__left">
          <slot name="icon">
            <!-- slot icon -->
            <vc-icon v-if="showBackIcon" class="vc-navigation__icon" name="back" size="22" @click="navigateBack" />
            <vc-icon v-if="showHomeIcon" class="vc-navigation__icon" name="home" size="22" @click="reLaunchHome" />
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
import { mapState, mapActions } from 'vuex'
import { useTabBar } from '../common/hooks/use-tab-bar'

export default {
  name: 'vc-navigation',
  props: {
    // 页面标题
    title: null,
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
  },
  data() {
    return {
      navTitle: '',
      navOffsetTop: 0,
      platform: ''
    }
  },
  computed: {
    ...mapState('app', ['isGray', 'navHeight']),
    isIos() {
      return this.platform === 'ios'
    },
    isAndroid() {
      return this.platform === 'android'
    },
    navigationStyle() {
      let style = ''
      style += `height: ${this.navHeight}px;`
      style += `padding-top: ${this.navOffsetTop}px;`
      // #ifdef MP-WEIXIN
      style += 'padding-bottom:7px;'
      // #endif
      if (!this.bgImage && this.background) {
        style += `background: ${this.background};`
      }
      if (this.color) {
        style += `color: ${this.color};`
      }
      return style
    },
    showBackIcon() {
      const pages = getCurrentPages()
      if (!pages.length) return
      return this.showBack && pages.length > 1
    },
    isHomePage() {
      const pages = getCurrentPages()
      return pages?.length === 1
    },
    isTabBarPage() {
      const pages = getCurrentPages()
      const current = pages[pages.length - 1]?.route
      return this.tabBarPages?.includes(current)
    },
    showHomeIcon() {
      return this.showHome && !this.isHomePage && !this.isTabBarPage
    }
  },
  watch: {
    title: {
      handler(val) {
        this.navTitle = val
      }
    }
  },
  created() {
    this.setCustomNavMounted(false)
    const { tabBarPages, homePage } = useTabBar()
    this.tabBarPages = Object.freeze(tabBarPages)
    this.homePage = homePage
  },
  async mounted() {
    let navHeight = 0
    // #ifdef MP-WEIXIN
    const menuRect = wx.getMenuButtonBoundingClientRect()
    navHeight = menuRect.bottom + 7 /** 胶囊距离内容区域底部临界值 */
    // this.titleHeight = menuRect.height
    this.navOffsetTop = menuRect.top
    // this.menuWidth = menuRect.width
    // #endif
    // #ifdef H5
    navHeight = 44
    this.titleHeight = 44
    // #endif

    if (!this.navHeight) {
      this.setNavHeight(navHeight)
    }
    const systemInfo = wx.getSystemInfoSync()
    this.platform = systemInfo.platform

    this.navTitle = this.title || this.$Route.meta?.title
    this.$nextTick(() => {
      this.setCustomNavMounted(true)
    })
  },
  methods: {
    ...mapActions('app', ['setCustomNavMounted', 'setNavHeight']),
    reLaunchHome() {
      uni.reLaunch({ url: this.homePage || '/pages/index/index' })
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
