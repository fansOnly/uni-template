<template>
  <div :class="['vc-radio', `vc-radio--${direction}`, disabled ? 'vc-radio--disabled' : null]" :style="customStyle">
    <vc-icon class="vc-radio__icon" :name="checked ? activeIcon : inactiveIcon" :size="size" :color="color"
      @click="onClickIcon" />
    <view class="vc-radio__txt" @click="onClickText">
      <slot></slot>
    </view>
  </div>
</template>

<script>
import cssVariables from '@/common/theme'
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
      type: [String, Number],
      default: cssVariables.iconSize
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
    // 自定义组件样式
    customStyle: null
  },
  data() {
    return {
      direction: '',
      checked: false,
    }
  },
  computed: {
    color() {
      return this.checked ? cssVariables.primaryColor : cssVariables.iconColor
    }
  },
  created() {
    if (this.parent) {
      this.parent.children.push(this)
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
      this.direction = parent.direction
      this.checked = parent.value === this.name
    },
  }
}
</script>

<style lang="scss" scoped>
.vc-radio {
  display: flex;
  align-items: center;
  user-select: none;
}

.vc-radio__txt:not(:empty) {
  margin-left: 8px;
}

.vc-radio--disabled {
  opacity: .5;
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
}

.vc-radio--horizontal {
  flex: 1;
  display: inline-flex;
}
</style>
