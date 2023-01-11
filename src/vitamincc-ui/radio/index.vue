<template>
  <div :class="['vc-radio', `is-${direction}`]" :style="customStyle">
    <view
      :class="['vc-radio__icon', checked ? 'is-active' : null, disabled ? 'is-disabled' : null, multiple ? 'is-multi-text' : null, customClass]"
      :style="iconStyled">
      <vc-icon :name="checked ? activeIcon : inactiveIcon" :size="size" @click="onClickIcon" />
    </view>
    <view :class="['vc-radio__text', disabled ? 'is-disabled' : null]" @click="onClickText">
      <!-- slot default -->
      <slot />
    </view>
  </div>
</template>

<script>
export default {
  name: 'vc-radio',
  inject: {
    parent: {
      from: 'radioGroup',
      default: null
    }
  },
  props: {
    // 单选框的 name 属性
    name: null,
    // 单选框的尺寸
    size: {
      type: Number,
      default: 22
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否多行文本
    multiple: {
      type: Boolean,
      default: false
    },
    // 组件激活的颜色
    activeColor: {
      type: String,
    },
    // 组件未激活的颜色
    inactiveColor: {
      type: String,
    },
    // 选中的图标
    activeIcon: {
      type: String,
      default: 'radio-on'
    },
    // 未选中的图标
    inactiveIcon: {
      type: String,
      default: 'radio-off'
    },
    // 禁用 label 文本点击事件
    labelDisabled: {
      type: Boolean,
      default: false
    },
    // 禁用 icon 图标点击事件
    iconDisabled: {
      type: Boolean,
      default: false
    },
    customClass: null,
    // 自定义组件样式
    customStyle: String
  },
  data() {
    return {
      direction: '',
      checked: false,
    }
  },
  computed: {
    iconStyled({ inactiveColor, activeColor, checked }) {
      let style = ''
      if (inactiveColor && !checked) {
        style += `color: ${inactiveColor};`
      } else if (activeColor && checked) {
        style += `color: ${activeColor};`
      }
      return style
    }
  },
  created() {
    if (this.parent) {
      this.parent.children.push(this)
      this.direction = this.parent.direction
    }
  },
  methods: {
    onClickIcon() {
      this.$emit('click-icon')
      if (this.iconDisabled) return
      this.onClick()
    },
    onClickText() {
      this.$emit('click-label')
      if (this.labelDisabled) return
      this.onClick()
    },
    onClick() {
      if (this.disabled || this.checked) return
      if (this.parent) {
        if (this.parent.value === this.name) return
        this.parent.change(this.name, this)
      }
    },
    update(parent) {
      this.checked = parent.value === this.name
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/radio.scss';
</style>
