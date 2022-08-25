<template>
  <div class="et-dropdown-wrapper">
    <view :class="['et-dropdown-menu', menuIndex > -1 ? 'et-hairline--bottom' : null]" :style="customStyle">
      <view v-for="(item, index) in menus" :key="index" :class="['et-dropdown-menu__title', item.active ? 'is-active' : null, item.disabled ? 'is-disabled' : null]" :style="{color: item.active ? activeColor : null, 'z-index': zIndex}" @click="onClickMenu(item, index)">
        <view>{{genMenuName(item)}}</view>
        <et-icon class="et-dropdown-menu__icon" name="triangle-down" size="12" />
      </view>
    </view>
    <slot></slot>
  </div>
</template>

<script>
import { getRect, requestAnimationFrame } from '@/shared/platform'
import cssVariables from '@/shared/css-variables'

export default {
  name: 'et-dropdown-menu',
  provide() {
    return {
      dropdown: this
    }
  },
  props: {
    // 高亮色值
    activeColor: {
      type: String,
      default: cssVariables.primaryColor
    },
    // 方向
    direction: {
      type: String,
      default: 'down'
    },
    // 弹窗动画时长 ms - 透传
    duration: {
      type: Number,
      default: 300
    },
    // 弹窗层级 - 透传
    zIndex: {
      type: Number,
      default: 100
    },
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
    customStyle: null
  },
  data() {
    return {
      menus: [], // 菜单项
      menuIndex: -1,
    }
  },
  created() {
    this.children = []
  },
  async mounted() {
    this.updateMenu()
  },
  methods: {
    updateMenu() {
      this.menus = this.children.map((child, index) => {
        return { id: index, value: child.value, active: child.visible, options: child.options, disabled: child.disabled }
      })
    },
    genMenuName({options = [], value = '', title = ''}) {
      if (title) return title
      const menu = options.find(v => v.value === value)
      return (menu && menu.text) || options[0].text
    },
    toggleItem(active = -1) {
      this.children.map((child, index) => {
        if (active === index) {
          child.toggle()
        } else if (child.visible) {
          child.toggle(false, 60 /** duration */)
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
      } else {
        this.close()
        await requestAnimationFrame()
        this.menuIndex = index
        this.toggleItem(index)
      }
    },
    async resolveStyle() {
      const rect = await getRect(this, '.et-dropdown-wrapper')
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
  .et-dropdown-menu {
    display: flex;
    background-color: $uni-bg-white;
  }
  .et-dropdown-menu__title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    color: $uni-text-color-sub;
    line-height: 48px;
    white-space: nowrap;

    &.is-active .et-dropdown-menu__icon {
      transform: rotate(180deg);
    }
    &.is-disabled {
      color: $uni-text-color-disabled;
      /* #ifdef H5 */
      cursor: pointer;
      /* #endif */
    }
    &.is-disabled .et-dropdown-menu__icon {
      opacity: .6;
    }
  }
  .et-dropdown-menu__icon {
    margin-left: $uni-spacing-4;
    transition: all ease 0.3s;
    transform-origin: 50% 50%;
  }
</style>
