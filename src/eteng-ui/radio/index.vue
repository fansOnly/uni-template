<template>
  <div :class="['et-radio', `et-radio--${direction}`, disabled ? 'et-radio--disabled' : null]" :style="customStyle">
    <et-icon class="et-radio__icon" :name="checked ? activeIcon : inactiveIcon" :size="size" @click="onClickIcon" />
    <view class="et-radio__txt"  @click="onClickText">
      <slot></slot>
    </view>
  </div>
</template>

<script>
import { getParentInstance } from '@/shared'
  export default {
    name: 'et-radio',
    props: {
      // 单选框的 name 属性
      name: null,
      // 单选框的尺寸
      size: {
        type: [String, Number],
        default: 20
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 选中的图标
      activeIcon: {
        type: String,
        default: 'radio-on'
      },
      // 未选中的图标
      inactiveIcon: {
        type: String,
        default: 'radio'
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
      // 自定义组件样式
      customStyle: null
    },
    data() {
      return {
        direction: '',
        checked: false,
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
        const parent = this.getRadioGroup()
        if (parent) {
          if (parent.value === this.name) return
          parent.change(this.name, this)
        }
      },
      getRadioGroup() {
        return getParentInstance(this, 'useRadioGroup')
      },
      update(parent) {
        this.direction = parent.direction
        this.checked = parent.value === this.name
      },
      useRadio() {}
    }
  }
</script>

<style lang="scss" scoped>
  .et-radio {
    display: flex;
    align-items: center;
    user-select: none;
  }
  .et-radio__txt:not(:empty) {
    margin-left: 8px;
  }
  .et-radio--disabled {
    opacity: .5;
    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */
  }
  .et-radio--horizontal {
    flex: 1;
    display: inline-flex;
  }
</style>
