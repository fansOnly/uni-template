<template>
  <button :class="['et-button-wrapper', customClass, block || size === 'auto' ? 'et-button-wrapper--block' : null, disabled ? 'et-button-wrapper--disabled' : null]" :style="wrapperStyled" :disabled="disabled" :open-type="openType" :hover-class="hoverClass" @getphonenumber="onGetPhoneNumber" @getuserinfo="onGetuserinfo" @opensetting="onOpenSetting" @tap="onClick">
    <view :class="['et-button', 'et-button--'+type, plain ? 'et-button--plain' : null, border && !isLinearGradient && !disabled ? 'et-hairline--surround' : null]" :style="buttonStyled" type="default">
      <et-loading v-if="loading" type="spinner" color="#fff"></et-loading>
      <template v-else>
        <slot name="icon" v-if="icon">
          <et-icon class="et-button__icon" :name="icon" :size="iconSize" />
        </slot>
        <!-- Bug: text 标签包裹 slot 不能触发更新 -->
        <view class="et-button__text" :style="textStyled">
          <slot></slot>
        </view>
      </template>
    </view>
  </button>
</template>

<script>
import cssVariables from '@/shared/css-variables'
  export default {
    name: 'et-button',
    props: {
      // 按钮类型
      type: {
        type: String,
        default: 'default',
        validator(value) {
          return ['default', 'primary', 'info', 'success', 'error', 'text'].includes(value)
        },
      },
      // 左侧图标图片链接
      icon: null,
      // 左侧图标尺寸
      iconSize: {
        type: [Number, String],
        default: 16
      },
      // 按钮颜色，支持传入linear-gradient渐变色
      color: null,
      // 是否为朴素按钮
      plain: {
        type: Boolean,
        default: false,
      },
      // default-默认大小  mini-小尺寸 auto-自定义
      size: {
        type: String,
        default: 'default',
        validator(value) {
          return ['default', 'mini', 'large', 'auto'].includes(value)
        }
      },
      // 是否为块级元素
      block: {
        type: Boolean,
        default: false,
      },
      // 按钮圆角弧度
      radius: {
        type: Number,
        default: 0,
      },
      // 是否为圆形按钮
      round: {
        type: Boolean,
        default: false,
      },
      // 是否显示边框
      border: {
        type: Boolean,
        default: true,
      },
      // 小程序开放能力
      openType: null,
      disabled: {
        type: Boolean,
        default: false,
      },
      // 加载中状态，防重复点击
      loading: {
        type: Boolean,
        default: false
      },
      // 自定义组件 class
      customClass: null,
      // 自定义组件样式
      customStyle: null
    },
    data() {
      return {
        defaultColor: cssVariables.textColor, // 默认文字颜色
        defaultBgColor: cssVariables.bgColor, // 默认背景色
        primaryColor: cssVariables.primaryColor,
        infoColor: cssVariables.infoColor,
        successColor: cssVariables.successColor,
        errorColor: cssVariables.errorColor,
        antiRepeatClick: false
      }
    },
    computed: {
      defineColor() {
        return this[this.type + 'Color']
      },
      isLinearGradient () {
        // 是否自定义渐变色
        return this.color && /^linear.+/.test(this.color)
      },
      wrapperStyled() {
        let style = ''
        if (this.type === 'text') {
          if (this.disabled) {
            style += 'background: none;'
          }
        } else {
          // 背景色
          const bgColor = this.type === 'default' ? this.disabled ? this.defaultBgColor : '#fff' : this.defineColor
          style += `background: ${this.plain ? '#fff' : this.color || bgColor };`
          // 边框色
          const borderColor = this.type === 'default' ? (this.color || '#ebebeb') : this.defineColor
          style += `border-color: ${borderColor}; color: ${borderColor};`
          // 不可用 - 置灰
          if (this.disabled) {
            style += `background: ${this.type === 'default' ? '#d9d9d9' : '#c1d0f4'}; color: #fff;`
          }
          // 圆角
          if (this.round) {
            style += 'border-radius: 999px;'
          } else {
            style += `border-radius: ${this.addUnit(this.radius)};`
          }

          if (this.size == 'mini') {
            style += `height: 72rpx; font-size: 24rpx;`
          } else if (this.size == 'large') {
            style += `height: 104rpx; font-size: 32rpx;`
          }  else if (this.size == 'auto') {
            style += `height: 100%; font-size: inherit;`
          } else {
            style += `height: 88rpx; font-size: 32rpx;`
          }
        }
        return style + (this.customStyle ? this.customStyle : '')
      },
      buttonStyled() {
        let style = ''
        // 圆角
        if (this.round) {
          style += 'border-radius: 999px;'
        } else {
          style += `border-radius: ${this.addUnit(this.radius * 2)};`
        }
        return style
      },
      textStyled() {
        let style = ''
        let textColor = this.defaultColor
        if (this.color) {
          if (this.plain) {
            textColor = this.color
          } else {
            textColor = '#fff'
          }
        } else {
          if (this.type !== 'default') {
            if (this.type === 'text') {
              textColor = this.primaryColor
            } else if (this.plain) {
              textColor = this.defineColor
            } else {
              textColor = '#fff'
            }
          }
        }
        if (this.disabled && this.type === 'default') {
          style += ` color: #fff;`
        } else {
          style += `color: ${textColor};`
        }
        return style
      },
      hoverClass() {
        return this.type === 'default' && !this.color ? 'et-button-default--hover' : 'et-button--hover'
      },
      clickable() {
        return !this.disabled && !this.loading && !this.antiRepeatClick
      }
    },
    methods: {
      onClick(e) {
        if (!this.clickable) return
        this.antiRepeatClick = true
        this.$emit('click', e)
        setTimeout(() => {
          this.antiRepeatClick = false
        }, 1000);
      },
      onGetPhoneNumber(e) {
        this.$emit('getphonenumber', e.detail)
      },
      onOpenSetting(e) {
        this.emit('opensetting', e.detail)
      },
      onGetuserinfo(e) {
        this.$emit('getuserinfo', e.detail)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .et-button-wrapper {
    display: inline-block;
    height: 100%;
    background: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    line-height: 1;
    &::after {
      display: none;
    }
  }
  .et-button-wrapper--block {
    display: block;
  }
  .et-button-wrapper--disabled {
    cursor: not-allowed;
    opacity: .7;
  }
  .et-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: inherit;
    padding: 0 28rpx;
    border-width: 0;
    border-color: inherit;
    &::after {
      /* border-color: inherit; */
      border-radius: inherit;
    }
    &.et-button--text::after {
      display: none;
    }
  }
  /* .et-button--hover {
    opacity: 0.7;
  } */
  .et-button-default--hover {
    background: #F6F6F6!important;
    opacity: 0.7;
  }
  .et-button__icon + .et-button__text:not(:empty) {
    margin-left: 16rpx;
  }
  .et-button__text {
    width: 100%;
    line-height: inherit;
    font-weight: inherit;
    font-size: inherit;
    color: inherit;
    white-space: nowrap;
  }
</style>
