<template>
  <view
    :class="['vc-cell', size ? `vc-cell--${size}` : null, ifBorder ? 'vc-hairline--bottom' : null, disabled ? 'is-disabled' : null, customClasses]"
    :style="customStyled" :hover-class="cellHoverClass" :hover-stay-time="200" @click="onClick">
    <view :class="['vc-cell-wrap', `is-${align}`]">
      <view :class="['vc-cell__title', disabled ? 'is-disabled' : null, titleClasses]" :style="titleStyled">
        <slot name="title">{{ title }}</slot>
      </view>
      <view :class="['vc-cell__value', disabled ? 'is-disabled' : null]">
        <view :class="['vc-cell__text', titleWidth ? null : 'is-nowrap', textClasses]" :style="textStyled">
          <template v-if="text">{{ text }}</template>
          <slot v-else name="text"></slot>
        </view>
        <view v-if="isLink" class="vc-cell__icon">
          <!-- slot 命名 right-icon 不支持？？？ -->
          <slot name="icon">
            <vc-icon name="arrow-right" />
          </slot>
        </view>
        <slot name="extra"></slot>
      </view>
    </view>
    <view class="vc-cell__label">
      <slot name="label"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'vc-cell',
  inject: {
    parent: {
      from: 'cellGroup',
      default: null
    }
  },
  props: {
    // 左侧标题
    title: null,
    // 右侧文本内容
    text: null,
    // 左侧标题宽度，不设置默认为铺满
    titleWidth: {
      type: [String, Number],
      default: 80
    },
    // 是否链接样式，开启右侧图标
    isLink: {
      type: Boolean,
      default: false,
    },
    // 尺寸 'mini', 'large'
    size: {
      type: String
    },
    // 对齐方式 align / start /end
    align: {
      type: String,
      default: 'center'
    },
    // 底部边框线
    border: {
      type: Boolean,
      default: false
    },
    // 是否单元组的最后末尾
    isLast: {
      type: Boolean,
      default: false
    },
    // 禁用状态 - 样式，禁用点击交互
    disabled: {
      type: Boolean,
      default: false
    },
    // 微信 view 标签的 hover-class
    hoverClass: {
      type: String,
      default: 'vc-cell-hover-class'
    },
    // 自定义组件类 class
    customClass: null,
    // 自定义左侧标题类 class
    titleClass: null,
    // 自定义右侧文本类 class
    textClass: null,
    // 自定义组件样式
    customStyle: String,
    // 自定义左侧标题样式
    titleStyle: String,
    // 自定义右侧文本样式
    textStyle: String
  },
  computed: {
    ifBorder() {
      return !this.isLast && (this.parent?.border ? true : this.border)
    },
    customClasses() {
      return this.customClass ?? this.parent?.customClass ?? ''
    },
    titleClasses() {
      return this.titleClass ?? this.parent?.titleClass ?? ''
    },
    textClasses() {
      return this.textClass ?? this.parent?.textClass ?? ''
    },
    cellHoverClass() {
      return this.isLink ? this.hoverClass : 'none'
    },
    customStyled() {
      return this.customStyle + this.parent?.customStyle
    },
    titleStyled() {
      return this.titleStyle + this.parent?.titleStyle
    },
    textStyled() {
      return this.textStyle + this.parent?.textStyle
    }
  },
  methods: {
    onClick(evt) {
      if (this.disabled) return
      this.$emit('click', evt)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/cell.scss';
</style>
