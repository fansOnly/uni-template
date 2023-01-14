<template>
  <div class="vc-tabs">
    <!-- Bug: scroll-view 标签在开发者工具和 iphone 11 下 底部元素定位在 y 轴上有错位 -->
    <scroll-view scroll-x scroll-with-animation :scroll-into-view="currentView" enhanced scroll-anchoring
      :show-scrollbar="false"
      :class="['vc-tabs__content', border ? 'vc-hairline--bottom' : null, shouldFix ? 'is-fixed' : null]"
      :style="tabsStyle">
      <view class="vc-tabs__items">
        <view v-for="(item, index) in options" :id="'tab-' + index" :key="index" class="vc-tabs__item"
          @click="onClick(item, index)">
          <view :class="['vc-tabs__text', item.dot ? 'vc-tabs__dot' : null, index === current ? 'is-active' : null]">{{
          item[textKey] }}</view>
        </view>
      </view>
      <view class="vc-tabs__bar" :class="[initialized ? 'is-animation' : null]" :style="barStyle"></view>
    </scroll-view>
    <view v-if="shouldFix" class="vc-tabs__placeholder"></view>
  </div>
</template>

<script>
import { getRect, requestAnimationFrame, compareVersion } from '../common/util'
import { getAppData } from '../common/global-data'

export default {
  name: 'vc-tabs',
  props: {
    // 渲染源数据
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: 0,
    },
    // 是否显示下边框
    border: {
      type: Boolean,
      default: true,
    },
    // 是否吸顶
    // 需要配合页面的滚动事件使用
    fixed: {
      type: Boolean,
      default: false,
    },
    // 页面滚动距离
    scrollTop: {
      type: Number,
      default: 0,
    },
    // 索引层级
    zIndex: Number,
    // 高亮文案颜色
    activeColor: String,
    // 线条宽度
    lineWidth: Number,
    // 线条高度
    lineHeight: Number,
    // 线条颜色
    lineBackground: String,
    // 文本属性
    textKey: {
      type: String,
      default: 'text',
    },
    // 值属性
    valueKey: {
      type: String,
      default: 'value',
    },
    // 自定义样式覆盖
    customStyle: String
  },
  data() {
    return {
      initialized: false,
      shouldFix: false, // 是否吸顶
      top: 0, // 组件到页面顶部的距离
      width: 0, // 每个 tab 项的宽度
      current: 0, // 当前激活的滑块索引
      bottom: 0, // 滑块在 y 轴的底部定位值
    }
  },
  computed: {
    tabsStyle() {
      const [isCustomNavigation, navHeight] = getAppData(['isCustomNavigation', 'navHeight'])
      let top = 0
      // #ifdef MP-WEIXIN
      if (isCustomNavigation && this.shouldFix) {
        top = navHeight
      }
      // #endif
      // #ifdef H5
      if (this.shouldFix) {
        top = 44
      }
      // #endif
      let style = `top: ${top}px;`
      if (this.zIndex) {
        style += `z-index: ${this.zIndex};`
      }
      return style + (this.customStyle ?? '')
    },
    barStyle() {
      let style = ''
      if (this.lineWidth) {
        style += `width: ${this.lineWidth}px;`
      }
      if (this.lineHeight) {
        style += `height: ${this.lineHeight}px;`
      }
      if (this.lineBackground) {
        style += `background: ${this.lineBackground};`
      }
      const left = this.width * this.current + this.width / 2
      style += `left: ${left}px;`
      style += `bottom: ${this.bottom};`
      return style
    },
    currentView({ current }) {
      return `tab-${current}`
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.current) {
          this.current = val
        }
      },
      immediate: true
    },
  },
  async mounted() {
    // Bug: A，B 页面都设置自定义导航且包含 tab 组件时， A 页面 跳转 B 页面 获取的 top 值不一致
    // 会产生 navHeight 的误差
    setTimeout(async () => {
      await this.resolveTabRect()

      // Bug: 模拟器、iOS 15.4+ 系统下，滑块位置会往下偏移 20px 左右
      const { platform, system } = wx.getSystemInfoSync()
      let shouldFixPosition = platform === 'devtools'
      if (platform === 'ios') {
        const [_, version] = system.split(' ')
        shouldFixPosition = compareVersion(version, '15.4.1') > -1
      }
      if (shouldFixPosition) {
        this.bottom = '20px'
      }

      await requestAnimationFrame()
      // 初始化时滑块不产生动画效果
      if (!this.initialized) {
        setTimeout(() => {
          this.initialized = true
        }, 300)
      }

      if (this.fixed) {
        this.$watch('scrollTop', val => {
          if (val >= this.top) {
            this.shouldFix = true
          } else {
            this.shouldFix = false
          }
        }, {
          immediate: true
        })
      }
    }, 60)
  },
  methods: {
    onClick(item, index) {
      if (this.current !== index) {
        this.current = index
        this.$emit('click-item', item, index)
      }
    },
    async resolveTabRect() {
      const [isCustomNavigation, navHeight] = getAppData(['isCustomNavigation', 'navHeight'])
      const rect = await getRect(this, '.vc-tabs__item')
      this.width = rect.width
      this.top = rect.top - (isCustomNavigation ? navHeight : 0)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/tabs.scss';
</style>
