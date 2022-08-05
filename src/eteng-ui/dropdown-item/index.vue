<template>
  <div v-if="showWrapper" class="et-dropdown-item-wrapper" :style="wrapperStyled">
    <et-popup :visible.sync="visible" custom-style="position: absolute;" :duration="duration" overlay-style="position:absolute;" max-height="40vh" position="top" :overlay="overlay" @click-overlay="onClickOverlay" @after-leave="onClosed">
      <et-cell v-for="(item, index) in options" :key="index" :title="item.text" is-link :disabled="item.disabled" :border="index < options.length - 1" @click="onClickItem(item, index)">
        <et-icon v-show="item.value === value" slot="icon" name="selected" size="20" />
      </et-cell>
    </et-popup>
  </div>
</template>

<script>
  import { requestAnimationFrame } from '@/shared/platform'
  import { getParentInstance } from '@/shared'
  export default {
    name: 'et-dropdown-item',
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
        overlay: true,
        closeOnClickOverlay: true,
        showWrapper: false,
        visible: false,
        top: 0,
        zIndex: 0,
        duration: 300,
      }
    },
    computed: {
      wrapperStyled({ zIndex, top }) {
        let style = `z-index: ${zIndex};`
        style += `top: ${top}px;`
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
    async mounted() {
      this.parent = getParentInstance(this, 'useDropdownMenu')
      const { overlay, zIndex, duration, closeOnClickOverlay } = this.parent
      this.overlay = overlay
      this.zIndex = zIndex
      this.duration = duration
      this.closeOnClickOverlay = closeOnClickOverlay
    },
    methods: {
      async toggle(show, duration = 300) {
        if (typeof show !== 'boolean') show = !this.visible
        if (show === this.visible) return
        this.visible = show
        this.duration = duration
        if (show) {
          this.top = this.parent.top
          await requestAnimationFrame()
          this.showWrapper = true
        }
        this.rerender()
      },
      rerender() {
        this.$nextTick(() => {
          this.parent && this.parent.updateMenu()
        })
      },
      onClickItem(item, index) {
        if (item.disabled) return
        this.visible = false
        this.$emit('close')
        this.rerender()
        if (this.value !== item.value)
          this.$emit('change', item, this.parent.menuIndex)
      },
      onClickOverlay() {
        if (!this.closeOnClickOverlay) return
        this.$emit('close')
        this.toggle()
      },
      onClosed() {
        this.showWrapper = false
      },
      useDropdownItem() {}
    }
  }
</script>

<style lang="scss" scoped>
  .et-dropdown-item-wrapper {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
</style>
