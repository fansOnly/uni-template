<template>
  <button
    :class="['vc-button', 'is-border', 'vc-button--' + type, block ? 'is-block' : null, disabled ? 'is-disabled' : null, plain ? 'is-plain' : null, round ? 'is-round' : null, circle ? 'is-circle' : null, size ? 'vc-button--' + size : null, customClass]"
    :style="styled" :hover-class="hoverClass" :disabled="disabled" :open-type="openType"
    @getphonenumber="onGetPhoneNumber" @getuserinfo="onGetUserInfo" @opensetting="onOpenSetting"
    @chooseavatar="onChooseAvatar" @tap="onClick">
    <vc-loading v-if="loading" type="spinner" class="button-icon" :size="14" color="#fff" />
    <vc-icon v-else-if="icon" :name="icon" class="button-icon" />
    <!-- slot icon -->
    <slot name="icon"></slot>
    <view class="vc-button__text">
      <!-- slot default -->
      <slot />
    </view>
  </button>
</template>

<script>
export default {
  name: 'vc-button',
  props: {
    // 按钮类型
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'primary', 'info', 'success', 'warning', 'error',].includes(value)
      },
    },
    // 左侧图标图片链接
    icon: null,
    // 按钮颜色，支持传入linear-gradient渐变色
    color: null,
    // 是否为朴素按钮
    plain: {
      type: Boolean,
      default: false,
    },
    // small-小尺寸 large-大尺寸
    size: {
      type: String,
    },
    // 是否为块级元素
    block: {
      type: Boolean,
      default: false,
    },
    // 是否为圆形按钮
    round: {
      type: Boolean,
      default: false,
    },
    // 是否为圆形按钮
    circle: {
      type: Boolean,
      default: false,
    },
    // 小程序开放能力
    openType: null,
    // 点击间隔 ms
    clickDelay: {
      type: Number,
      default: 300
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // 加载中状态，防重复点击
    loading: {
      type: Boolean,
      default: false
    },
    // 添加埋点
    useBury: {
      type: Boolean,
      default: false
    },
    hoverClass: {
      type: String,
      default: 'none'
    },
    // 自定义组件 class
    customClass: String,
    // 自定义组件样式
    customStyle: String
  },
  data() {
    return {
      antiRepeatClick: false
    }
  },
  computed: {
    isLinearColor() {
      // 是否自定义渐变色
      return this.color && /^linear.+/.test(this.color)
    },
    styled() {
      let style = ''
      if (this.isLinearColor) {
        style += `background-image: ${this.color}; border-width: 0; color: #fff;`
      } else if (this.color) {
        style += this.plain ? `border-color: ${this.color}; color: ${this.color};` : `background-color: ${this.color}; border-color: ${this.color}; color: #fff;`
      }
      return style + this.customStyle
    },
    clickable() {
      return !this.disabled && !this.loading && !this.antiRepeatClick
    }
  },
  methods: {
    onClick(e) {
      if (!this.clickable) return
      if (!this.antiRepeatClick) {
        this.antiRepeatClick = true
        setTimeout(() => {
          this.antiRepeatClick = false
        }, this.clickDelay)
      }
      this.$emit('click', e)
      if (this.useBury) {
        console.log('🚀 ™ 按钮点击埋点', new Date())
      }
    },
    onGetPhoneNumber(e) {
      console.log('[debug]', e)
      this.$emit('getphonenumber', e.detail)
    },
    onOpenSetting(e) {
      console.log('[debug]', e)
      this.emit('opensetting', e.detail)
    },
    onGetuserinfo(e) {
      console.log('[debug]', e)
      this.$emit('getuserinfo', e.detail)
    },
    onChooseAvatar(e) {
      console.log('[debug]', e)
      this.$emit('chooseavatar', e.detail)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/button.scss';
</style>
