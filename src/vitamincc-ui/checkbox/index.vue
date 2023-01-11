<template>
  <div
    :class="['vc-checkbox', block ? 'is-block' : null, `is-${direction}`, multiple ? 'is-multi-text' : null, customClass]"
    :style="customStyle">
    <view :class="['vc-checkbox__icon', checked ? 'is-active' : null, disabled ? 'is-disabled' : null]"
      :style="iconStyled">
      <vc-icon :name="checked ? activeIcon : inactiveIcon" :size="size" @click="onClickIcon" />
    </view>
    <view :class="['vc-checkbox__text', disabled ? 'is-disabled' : null]" @click="onClickText">
      <!-- slot default -->
      <slot></slot>
    </view>
  </div>
</template>

<script>
export default {
  name: 'vc-checkbox',
  inject: {
    parent: {
      from: 'checkboxGroup',
      default: null
    }
  },
  props: {
    // 绑定的属性名
    name: null,
    // 是否选中
    value: {
      type: Boolean,
      default: false,
    },
    // 组件尺寸
    size: {
      type: Number,
      default: 22,
    },
    // 是否块级元素
    block: {
      type: Boolean,
      default: false
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
    // 组件激活的颜色
    activeColor: {
      type: String,
    },
    // 组件未激活的颜色
    inactiveColor: {
      type: String,
    },
    // 组件激活的图标样式
    activeIcon: {
      type: String,
      default: 'checkbox-on'
    },
    // 组件未激活的图标样式
    inactiveIcon: {
      type: String,
      default: 'checkbox-off'
    },
    // 自定义类
    customClass: null,
    // 自定义样式覆盖
    customStyle: String,
  },
  computed: {
    checked: {
      get() {
        return this.parent ? this.parent.value.includes(this.name) : this.value
      },
      set(val) {
        if (this.parent) {
          this.parent.change({ name: this.name, checked: val })
        } else {
          this.$emit('input', val)
          this.$emit('change', val)
        }
      },
    },
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
      if (this.disabled) return
      this.checked = !this.checked
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/checkbox.scss';
</style>
