<template>
  <view :class="['vc-tab-bar', 'vc-hairline--top', isGray ? 'is-gray' : null]" :style="styled">
    <view v-for="(item, index) in tabBarList" :key="index" class="vc-tab-bar__item" @click="onSwitchTab(item)">
      <vc-image :src="`/${current === item.pagePath ? item.selectedIconPath : item.iconPath}`" width="24" height="24"
        full-path />
      <view class="vc-tab-bar__text"
        :style="{ 'color': current === item.pagePath ? tabBarStyle.selectedColor : tabBarStyle.color }">{{ item.text }}
      </view>
    </view>
  </view>
</template>

<script>
import { useTabBar } from '../common/hooks/use-tab-bar'

export default {
  name: 'vc-tab-bar',
  props: {
    isGray: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabBarList: [],
      tabBarStyle: {},
    }
  },
  computed: {
    current() {
      const pages = getCurrentPages()
      if (!pages.length) return
      const { route } = pages[pages.length - 1]
      return route
    },
    styled() {
      let style = ''
      style += `background-color: ${this.tabBarStyle.backgroundColor};`
      style += `border-color: ${this.tabBarStyle.borderStyle};`
      return style
    },
  },
  created() {
    const { tabBarList, tabBarStyle } = useTabBar()
    this.tabBarList = Object.freeze(tabBarList)
    this.tabBarStyle = Object.freeze(tabBarStyle)
  },
  methods: {
    onSwitchTab({ pagePath }) {
      uni.switchTab({ url: `/${pagePath}` })
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/tab-bar.scss';
</style>
