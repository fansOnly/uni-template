<template>
  <view v-if="ready" class="vc-page">
    <!-- slot navigation -->
    <slot name="nav">
      <vc-navigation v-if="isCustomNavPage" :title="title" :mode="mode" />
    </slot>
    <!-- progress bar -->
    <vc-progress-bar :visible="visibleProgress" :paused="paused" :done="done" />
    <!-- slot default -->
    <!-- FIX: filter: grayscale(100%) 会影响到子元素的 fixed 布局 -->
    <view v-if="showContent" :class="[isGray ? 'is-gray' : null]">
      <slot />
    </view>
    <!-- slot skeleton -->
    <slot v-else name="skeleton" />
    <!-- slot failed -->
    <slot v-if="failed" name="failed" />

    <!-- custom tab bar -->
    <vc-tab-bar v-if="showTabBar" :is-gray="isGray" />

    <!-- 弹窗实例 -->
    <vc-dialog ref="dialog" :visible.sync="dialog.visible" :title="dialog.title" :content="dialog.content"
      :show-cancel="dialog.showCancel" @confirm="onConfirm" @cancel="onCancel" />
  </view>
</template>

<script>
import { useTabBar } from '../common/hooks/use-tab-bar'
import { mapState, mapGetters } from 'vuex'

// 加载时长上限
const TIMEOUT = 5000
const MAX_TIMEOUT = 15000

export default {
  name: 'vc-page',
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    mode: {
      type: String,
      default: 'light'
    },
  },
  data() {
    return {
      ready: false,
      paused: false,
      done: false,
      failed: false,
      dialog: {
        visible: false,
        title: '',
        content: '',
        showCancel: false
      },
      showTabBar: false,
    }
  },
  computed: {
    ...mapState('app', ['isGray', 'isCustomNavMounted', 'pageNavList']),
    ...mapGetters('app', ['isCustomNavPage']),
    showContent() {
      return this.show && (this.isCustomNavPage ? this.isCustomNavMounted : true)
    },
    visibleProgress() {
      return this.showContent || this.failed
    }
  },
  watch: {
    showContent: {
      handler(val) {
        if (val) {
          if (+new Date() - this.start < 5000) {
            // 提前加载结束
            this.done = true
            clearTimeout(this.timer)
            clearTimeout(this.timer2)
          }
          if (this.paused) {
            this.paused = false
          }
          uni.hideLoading()
        }
      },
      immediate: true
    }
  },
  created() {
    // #ifdef MP-WEIXIN
    const { isCustomTabBar, tabBarPages } = useTabBar()
    if (isCustomTabBar) {
      const pages = getCurrentPages()
      const current = pages[pages.length - 1]?.route
      this.showTabBar = tabBarPages.includes(current)
    }
    // #endif

    this.ready = true
    uni.showLoading({
      title: '加载中...',
      mask: true
    })

    this.start = +new Date()
    this.timer = setTimeout(() => {
      if (!this.showContent) {
        this.paused = true
      } else {
        clearTimeout(this.timer)
        clearTimeout(this.timer2)
      }
    }, TIMEOUT)

    this.timer2 = setTimeout(() => {
      if (!this.showContent) {
        this.failed = true
        this.done = true
        uni.showToast({
          title: '加载失败，请退出重试',
          icon: 'none',
          mask: true
        })
        clearTimeout(this.timer2)
      }
    }, MAX_TIMEOUT)
  },
  methods: {
    onConfirm() { },
    onCancel() { }
  }
}
</script>

<style lang="scss" scoped>

</style>
