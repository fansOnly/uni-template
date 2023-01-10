<template>
  <div :class="['vc-checkbox', block ? 'is-block' : null, multiple ? 'is-multi-line' : null, customClass]"
    :style="customStyle">
    <view :class="['vc-checkbox__icon', checked ? 'is-active' : null]" :style="iconStyled">
      <vc-icon :style="iconStyle" :name="checked ? activeIcon : inactiveIcon" :size="size" @click="onClickIcon" />
    </view>
    <view class="vc-checkbox__text" :style="{ flex: block ? 1 : 'auto' }" @click="onClickText">
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
      type: [String, Number],
      default: 22,
    },
    // 是否块级元素
    block: {
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
    // 组件激活的图标样式
    activeColor: {
      type: String,
    },
    // 组件未激活的图标样式
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
    // 自定义样式覆盖
    customStyle: String,
    // 自定义类
    customClass: String,
    // 自定义图标样式覆盖
    iconStyle: String,
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
  methods: {
    onClickIcon() {
      this.$emit('click-icon')
      if (this.iconDisabled) return
      this.checked = !this.checked
    },
    onClickText() {
      this.$emit('click-label')
      if (this.labelDisabled) return
      this.checked = !this.checked
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/checkbox.scss';
</style>
