<template>
  <div :class="['vc-dropdown', 'vc-dropdown-menu', isActive ? 'is-active' : null]" :style="menuStyle">
    <view :class="['vc-dropdown__menu', menuIndex > -1 ? 'vc-hairline--bottom' : null]" :style="customStyle">
      <view v-for="(item, index) in menus" :key="index"
        :class="['vc-dropdown__menu-title', item.active ? 'is-active' : null, item.disabled ? 'is-disabled' : null]"
        :style="item.active ? titleStyle : ''" @click="onClickMenu(item, index)">
        <view>{{ genMenuName(item) }}</view>
        <vc-icon class="vc-dropdown__menu-icon" name="caret-down" size="14" />
      </view>
    </view>
    <!-- slot default for content -->
    <slot />
  </div>
</template>

<script>
import { useAnimationFrame } from '@/common/hooks/use-animation-frame'
import { useRect } from '@/common/hooks/use-rect'

export default {
  name: 'vc-dropdown-menu',
  provide() {
    return {
      dropdown: this
    }
  },
  props: {
    // 高亮色值
    color: String,
    // 方向 ttb btt
    direction: {
      type: String,
      default: 'ttb'
    },
    // 弹窗动画时长 ms - 透传
    duration: {
      type: Number,
      default: 300
    },
    // 弹窗层级 - 透传
    zIndex: Number,
    // 是否显示遮罩层 - 透传
    overlay: {
      type: Boolean,
      default: true
    },
    // 点击遮罩层是否关闭 - 透传
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    // 自定义组件样式
    customStyle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      menus: [], // 菜单项
      menuIndex: -1,
      isActive: false,
    }
  },
  computed: {
    menuStyle() {
      let style = ''
      if (this.zIndex) {
        style += `z-index: ${this.zIndex};`
      }
      return style
    },
    titleStyle() {
      let style = ''
      if (this.color) {
        style += `color: ${this.color};`
      }
      return style
    }
  },
  created() {
    this.children = []
  },
  mounted() {
    this.updateMenu()
  },
  methods: {
    updateMenu() {
      this.menus = this.children.map((child, index) => {
        return { id: index, value: child.value, active: child.visible, options: child.options, disabled: child.disabled }
      })
    },
    genMenuName({ options = [], value = '', title = '' }) {
      if (title) return title
      const menu = options.find(v => v.value === value)
      return (menu && menu.text) || options[0].text
    },
    toggleItem(active = -1) {
      this.children.map((child, index) => {
        if (active === index) {
          child.toggle()
        } else if (child.visible) {
          child.toggle(false, 0 /** duration */)
        }
      })
    },
    close(duration = 60) {
      this.children.map(child => {
        child.toggle(false, duration)
      })
    },
    async onClickMenu(item, index) {
      if (item.disabled) return
      if (this.menuIndex === index && item.active) {
        this.close(300)
        this.setUnActive()
      } else {
        this.close(0)
        await useAnimationFrame()
        this.menuIndex = index
        this.toggleItem(index)
      }
    },
    setUnActive() {
      setTimeout(() => {
        this.isActive = false
      }, 400)
    },
    async resolveStyle() {
      const rect = await useRect(this, '.vc-dropdown-menu')
      let top = rect.bottom
      /* #ifdef H5 */
      // fix：H5 下，uni-app 会默认生成一个头部 uni-page-head，位置计算会有误差
      top += 44
      /* #endif */
      return { top, bottom: rect.top }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/dropdown.scss';
</style>
