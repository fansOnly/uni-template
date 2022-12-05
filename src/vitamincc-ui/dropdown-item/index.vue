<template>
  <div v-show="showWrapper" class="vc-dropdown-item-wrapper" :style="wrapperStyled">
    <vc-popup :visible.sync="visible" custom-style="position: absolute;" :duration="duration"
      :overlay-style="overlayStyled" max-height="40vh" :position="direction === 'down' ? 'top' : 'bottom'"
      :overlay="overlay" @click-overlay="onClickOverlay" @after-leave="onClosed">
      <vc-cell v-for="(item, index) in options" :key="index" :title="item.text" is-link :disabled="item.disabled"
        :border="index < options.length - 1" @click="onClickItem(item, index)">
        <vc-icon v-show="item.value === value" slot="icon" name="selected" :color="activeColor" />
      </vc-cell>
    </vc-popup>
  </div>
</template>

<script>
import { requestAnimationFrame } from '../common/util'
import cssVariables from '@/common/lib/theme'

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
      activeColor: cssVariables.primaryColor,
      overlay: true,
      closeOnClickOverlay: true,
      showWrapper: false,
      direction: 'down',
      visible: false,
      top: 0,
      bottom: 0,
      zIndex: 0,
      duration: 300,
    }
  },
  computed: {
    wrapperStyled({ zIndex, top, bottom, direction }) {
      let style = `z-index: ${zIndex + 1};`
      if (direction === 'down') {
        style += `top: ${top}px;`
      } else {
        style += `bottom: calc(100% - ${bottom}px);`
      }
      return style
    },
    overlayStyled({ top, bottom, direction }) {
      let style = ''
      if (direction === 'down') {
        // style += `top: ${top}px;`;
        style += `background: linear-gradient(to bottom, transparent, ${top}px, rgba(0, 0, 0, 0.6) ${top}px);`
      } else {
        // style += `bottom: calc(100% - ${bottom}px);`;
        style += `background: linear-gradient(to top, transparent, ${bottom}px, rgba(0, 0, 0, 0.6) ${bottom}px);`
      }
      return style
    },
    activeIndex({ value, options }) {
      return value ? options.findIndex((v) => v.value === value) : 0
    },
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
    const { overlay, zIndex, duration, direction, closeOnClickOverlay } = this.dropdown
    this.overlay = overlay
    this.zIndex = zIndex
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
        await requestAnimationFrame()
        this.showWrapper = true
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
      }
    },
    onClickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.$emit('close')
      this.toggle()
    },
    onClosed() {
      this.showWrapper = false
    },
  }
}
</script>

<style lang="scss" scoped>
.vc-dropdown-item-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
</style>
