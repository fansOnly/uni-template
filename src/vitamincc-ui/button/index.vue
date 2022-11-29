<template>
  <button
    :class="['vc-button-wrapper', 'vc-button--' + type, customClass, block || size === 'auto' ? 'vc-button--block' : null, disabled ? 'vc-button--disabled' : null]"
    :hover-class="hoverClass || 'vc-button--hover'" :style="wrapperStyled" :disabled="disabled" :open-type="openType"
    @getphonenumber="onGetPhoneNumber" @getuserinfo="onGetUserInfo" @opensetting="onOpenSetting"
    @chooseavatar="onChooseAvatar" @tap="onClick">
    <view
      :class="['vc-button', plain ? 'vc-button--plain' : null, border && !isLinearGradient && !disabled ? 'vc-hairline--surround' : null]"
      :style="buttonStyled">
      <vc-loading v-if="loading" type="spinner" color="#fff"></vc-loading>
      <template v-else>
        <slot v-if="icon" name="icon">
          <vc-icon class="vc-button__icon" :name="icon" :size="iconSize" :color="iconColor" />
        </slot>
        <view class="vc-button__text">
          <slot></slot>
        </view>
      </template>
    </view>
  </button>
</template>

<script>
import { addUnit } from '../common/util'

export default {
  name: 'vc-button',
  props: {
    // 按钮类型
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'primary', 'info', 'success', 'error', 'text', 'custom'].includes(value)
      },
    },
    // 左侧图标图片链接
    icon: null,
    // 左侧图标尺寸
    iconSize: {
      type: [Number, String],
      default: 16
    },
    // 左侧图标颜色
    iconColor: {
      type: String,
      default: '#fff'
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
    // 放重复点击
    allowRepeatClick: {
      type: Boolean,
      default: false
    },
    // 点击间隔 ms
    clickDelay: {
      type: Number,
      default: 500
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
    hoverClass: null,
    // 自定义组件 class
    customClass: null,
    // 自定义组件样式
    customStyle: null
  },
  data() {
    return {
      antiRepeatClick: false
    }
  },
  computed: {
    isLinearGradient() {
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
        if (this.type === 'custom') {
          let colorStyle = ''
          if (this.color) {
            colorStyle += `background: ${this.color};border-color: ${this.color};color: #fff;`
          }
          if (this.plain) {
            colorStyle += `color: ${this.color};border-color: ${this.color};`
          }
          style += colorStyle
        }

        if (this.plain) {
          style += 'background: none;'
        }

        // 圆角
        if (this.round) {
          style += 'border-radius: 999px;'
        } else {
          style += `border-radius: ${addUnit(this.radius)};`
        }

        // 按钮尺寸
        if (this.size == 'mini') {
          style += 'height: 72rpx; font-size: 24rpx;'
        } else if (this.size == 'large') {
          style += 'height: 104rpx; font-size: 32rpx;'
        } else if (this.size == 'auto') {
          style += 'height: 100%; font-size: inherit;'
        } else {
          style += 'height: 88rpx; font-size: 32rpx;'
        }
      }
      return style + this.customStyle
    },
    buttonStyled() {
      let style = ''
      // 圆角
      if (this.round) {
        style += 'border-radius: 999px;'
      } else {
        style += `border-radius: ${addUnit(this.radius * (this.plain ? 1 : 2))};`
      }
      return style
    },
    clickable() {
      return !this.disabled && !this.loading && !this.antiRepeatClick
    }
  },
  methods: {
    onClick(e) {
      if (!this.clickable) return
      if (this.allowRepeatClick) {
        this.antiRepeatClick = true
        setTimeout(() => {
          this.antiRepeatClick = false
        }, this.clickDelay)
      }
      this.$emit('click', e)
      console.log('🚀 ™ 按钮点击埋点', new Date())
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
@import '../common/style/mixins/button.scss';

.vc-button-wrapper {
  display: inline-flex;
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

.vc-button--block {
  display: block;
}

.vc-button--disabled {
  /* #ifdef H5 */
  cursor: not-allowed;
  /* #endif */
  opacity: .7;
}

.vc-button {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: inherit;
  padding: 0 28rpx;
  border-width: 0;
  border-color: inherit;
  color: inherit;

  &::after {
    border-radius: inherit;
  }

  &.vc-button--text::after {
    display: none;
  }
}

.vc-button--default {
  @include button-color($uni-text-color, #fff);

  & .vc-button--plain {
    color: $uni-text-color;
    border-color: $uni-text-color;
  }
}

.vc-button--primary {
  @include button-color(#fff, $uni-color-primary);
}

.vc-button--info {
  @include button-color(#fff, $uni-color-info);
}

.vc-button--success {
  @include button-color(#fff, $uni-color-success);
}

.vc-button--warning {
  @include button-color(#fff, $uni-color-warning);
}

.vc-button--error {
  @include button-color(#fff, $uni-color-error);
}

.vc-button--hover {
  opacity: 0.6;
}

.vc-dialog__button--hover {
  background: #ececec !important;
}

.vc-button__icon+.vc-button__text:not(:empty) {
  margin-left: 16rpx;
}

.vc-button__text {
  width: 100%;
  line-height: inherit;
  font-weight: inherit;
  font-size: inherit;
  color: inherit;
  white-space: nowrap;
}
</style>
