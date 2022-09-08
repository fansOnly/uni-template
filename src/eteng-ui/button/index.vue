<template>
  <button
    :class="['et-button-wrapper', 'et-button--' + type, customClass, block || size === 'auto' ? 'et-button--block' : null, disabled ? 'et-button--disabled' : null]"
    :style="wrapperStyled" :disabled="disabled" :open-type="openType" :hover-class="hoverClass"
    @getphonenumber="onGetPhoneNumber" @getuserinfo="onGetUserInfo" @opensetting="onOpenSetting" @tap="onClick">
    <view
      :class="['et-button', plain ? 'et-button--plain' : null, border && !isLinearGradient && !disabled ? 'et-hairline--surround' : null]"
      :style="buttonStyled">
      <et-loading v-if="loading" type="spinner" color="#fff"></et-loading>
      <template v-else>
        <slot v-if="icon" name="icon">
          <et-icon class="et-button__icon" :name="icon" :size="iconSize" />
        </slot>
        <!-- Bug: text 标签包裹 slot 不能触发更新 -->
        <view class="et-button__text">
          <slot></slot>
        </view>
      </template>
    </view>
  </button>
</template>

<script>
import { addUnit, appendStyles } from '../common/util'
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
        let color = ''
        if (this.color) {
          color += `background: ${this.color};border-color: ${this.color};color: #fff;`
        }
        if (this.plain) {
          color += `color: ${this.color};border-color: ${this.color};background: #fff;`
        }
        style += color
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
      return appendStyles([style, this.customStyle])
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
      }, 1000)
    },
    onGetPhoneNumber(e) {
      this.$emit('getphonenumber', e.detail)
    },
    onOpenSetting(e) {
      this.emit('opensetting', e.detail)
    },
    onGetUserInfo(e) {
      this.$emit('getuserinfo', e.detail)
    }
  }
}
</script>

<style lang="scss" scoped>
.et-button-wrapper {
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

.et-button--block {
  display: block;
}

.et-button--disabled {
  cursor: not-allowed;
  opacity: .5;
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
    border-radius: inherit;
  }

  &.et-button--text::after {
    display: none;
  }
}

.et-button--default {
  background: #fff;
  color: $uni-text-color;

  &.et-button--disabled {
    background: #fff;
    color: $uni-text-color;
  }
}

.et-button--primary {
  background: $uni-color-primary;
  border-color: $uni-color-primary;
  color: #fff;

  & .et-button--plain {
    background: #fff;
    color: $uni-color-primary;
  }

  &.et-button--disabled {
    background: $uni-color-primary;
    color: #fff;
  }
}

.et-button--info {
  background: $uni-color-info;
  border-color: $uni-color-info;
  color: #fff;

  & .et-button--plain {
    background: #fff;
    color: $uni-color-info;
  }

  &.et-button--disabled {
    background: $uni-color-info;
    color: #fff;
  }
}

.et-button--success {
  background: $uni-color-success;
  border-color: $uni-color-success;
  color: #fff;

  & .et-button--plain {
    background: #fff;
    color: $uni-color-success;
  }

  &.et-button--disabled {
    background: $uni-color-success;
    color: #fff;
  }
}

.et-button--warning {
  background: $uni-color-warning;
  border-color: $uni-color-warning;
  color: #fff;

  & .et-button--plain {
    background: #fff;
    color: $uni-color-warning;
  }

  &.et-button--disabled {
    background: $uni-color-warning;
    color: #fff;
  }
}

.et-button--error {
  background: $uni-color-error;
  border-color: $uni-color-error;
  color: #fff;

  & .et-button--plain {
    background: #fff;
    color: $uni-color-error;
  }

  &.et-button--disabled {
    background: $uni-color-error;
    color: #fff;
  }
}

.et-button-default--hover {
  background: #F6F6F6 !important;
}

.et-button__icon+.et-button__text:not(:empty) {
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
