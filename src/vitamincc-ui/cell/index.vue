<template>
  <view
    :class="['vc-cell', size ? `vc-cell--${size}` : null, ifBorder ? 'is-border' : null, ifInnerBorder ? 'is-inner-border' : null, disabled ? 'is-disabled' : null, customCls]"
    :style="customStyled" :hover-class="cellHoverClass" :hover-stay-time="200" @click="onClick">
    <view :class="['vc-cell__content', `is-${align}`]">
      <view :class="['vc-cell__title', disabled ? 'is-disabled' : null, titleCls]" :style="titleStyled">
        <template v-if="title">{{ title }}</template>
        <!-- slot title -->
        <slot v-else name="title" />
      </view>
      <view :class="['vc-cell__value', disabled ? 'is-disabled' : null]">
        <view :class="['vc-cell__text', textWrap ? 'is-nowrap' : null, textCls]" :style="textStyled">
          <template v-if="text">{{ text }}</template>
          <!-- slot text -->
          <slot v-else name="text" />
        </view>
        <vc-icon v-if="isLink" name="arrow-right" />
        <!-- slot extra -->
        <slot name="extra" />
      </view>
    </view>
    <view class="vc-cell__label">
      <!-- slot label -->
      <slot name="label" />
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
    // 内边框线
    innerBorder: {
      type: Boolean,
      default: false
    },
    // 右侧文本换行，默认不换行
    textWrap: {
      type: Boolean,
      default: true
    },
    // 是否链接样式，开启右侧图标
    isLink: {
      type: Boolean,
      default: false,
    },
    // 是否单元组的末尾
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
    ifInnerBorder() {
      return this.parent?.innerBorder ?? this.innerBorder
    },
    cellHoverClass() {
      return this.isLink ? this.hoverClass : 'none'
    },
    customCls() {
      return this.parent?.customClass ?? this.customClass
    },
    titleCls() {
      return this.parent?.titleClass ?? this.titleClass
    },
    textCls() {
      return this.parent?.textClass ?? this.textClass ?? ''
    },
    customStyled() {
      return this.parent?.customStyle ?? this.customStyle ?? ''
    },
    titleStyled() {
      return this.parent?.titleStyle ?? this.titleStyle ?? ''
    },
    textStyled() {
      return this.parent?.textStyle ?? this.textStyle ?? ''
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
