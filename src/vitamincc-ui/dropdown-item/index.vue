<template>
  <div class="vc-dropdown">
    <view v-show="initialized" class="vc-dropdown__content" :style="wrapperStyle">
      <vc-popup :visible.sync="visible" custom-style="position: absolute;" :duration="duration"
        :overlay-style="overlayStyle" :direction="direction" :overlay="overlay" :safe-area-inset-bottom="false"
        :safe-area-inset-top="false" @click-overlay="onClickOverlay" @after-leave="onClosed">
        <view v-for="(item, index) in options" :key="index"
          :class="['vc-dropdown__content-item', item.value === value ? 'is-active' : null, item.disabled ? 'is-disabled' : null, index < options.length - 1 || !directionTtb ? 'vc-hairline--bottom' : null]"
          :style="item.value === value ? itemStyle : ''" @click="onClickItem(item, index)">
          <view class="vc-dropdown__content-title">{{ item.text }}</view>
          <view class="vc-dropdown__content-icon">
            <vc-icon name="selected" :size="20" />
          </view>
        </view>
      </vc-popup>
    </view>
  </div>
</template>

<script>
import { useAnimationFrame } from '@/common/hooks/use-animation-frame'

export default {
  name: 'vc-dropdown-item',
  inject: ['dropdown'],
  props: {
    // 渲染源数据
    options: {
      type: Array,
      default: () => [],
    },
    // 默认的选中值，对应下拉菜单的 value 属性
    value: null,
    // 禁用当前菜单，不可点击选中
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      initialized: false,
      color: '',
      overlay: true,
      closeOnClickOverlay: true,
      direction: 'ttb',
      visible: false,
      top: 0,
      bottom: 0,
      duration: 300,
    }
  },
  computed: {
    directionTtb() {
      return this.direction === 'ttb'
    },
    bttStyleBottom() {
      return `calc(100% - ${this.bottom}px)`
    },
    wrapperStyle({ top, direction }) {
      let style = ''
      if (direction === 'ttb') {
        style += `top: ${top}px;`
      } else {
        style += `bottom: ${this.bttStyleBottom};`
      }
      return style
    },
    overlayStyle({ top, direction, bttStyleBottom }) {
      let style = ''
      if (direction === 'ttb') {
        style += `background: linear-gradient(to bottom, transparent, ${top}px, rgba(0, 0, 0, 0.6) ${top}px);`
      } else {
        style += `background: linear-gradient(to top, transparent, ${bttStyleBottom}, rgba(0, 0, 0, 0.6) ${bttStyleBottom});`
      }
      return style
    },
    itemStyle() {
      let style = ''
      if (this.color) {
        style += `color: ${this.color};`
      }
      return style
    }
  },
  watch: {
    value: {
      handler(val) {
        this.rerender()
      },
      immediate: true,
    },
  },
  created() {
    this.dropdown.children.push(this)
  },
  async mounted() {
    const { overlay, duration, direction, closeOnClickOverlay, color } = this.dropdown
    this.color = color
    this.overlay = overlay
    this.duration = duration
    this.direction = direction
    this.closeOnClickOverlay = closeOnClickOverlay
  },
  methods: {
    async toggle(show, duration = 300) {
      if (typeof show !== 'boolean') show = !this.visible
      if (show === this.visible) return
      this.duration = duration
      this.visible = show
      if (show) {
        // TODO direction = up 时, 如果下拉菜单距顶部的距离小于下拉项的高度，页面布局会错位
        const { top, bottom } = await this.dropdown.resolveStyle()
        this.top = top
        this.bottom = bottom
        await useAnimationFrame()
        this.initialized = true
        this.dropdown.isActive = true
      }
      this.rerender()
    },
    rerender() {
      this.$nextTick(() => {
        this.dropdown && this.dropdown.updateMenu()
      })
    },
    onClickItem(item, index) {
      if (item.disabled) return
      this.visible = false
      this.$emit('close')
      this.rerender()
      if (this.value !== item.value) {
        this.$emit('change', item, this.dropdown.menuIndex)
        this.dropdown.setUnActive()
      }
    },
    onClickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.$emit('close')
      this.toggle()
      this.dropdown.setUnActive()
    },
    onClosed() {
      this.initialized = false
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/dropdown.scss';
</style>
