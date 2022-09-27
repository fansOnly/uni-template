<template>
  <div :class="['et-checkbox', block ? 'et-checkbox--block' : null ,multiple ? 'et-checkbox--multiple' : null, customClass]" :style="customStyle">
    <et-icon class="et-checkbox__icon" :style="iconStyle" :name="checked ? activeIcon : inactiveIcon" :size="size" :color="color" @click="onClickIcon" />
    <view class="et-checkbox__label" :style="{ flex: block ? 1 :'auto' }" @click="onClickText">
      <slot></slot>
    </view>
  </div>
</template>

<script>
import cssVariables from '@/common/lib/theme';
export default {
  name: 'et-checkbox',
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
      default: cssVariables.iconSize,
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
    customStyle: null,
    // 自定义类
    customClass: null,
    // 自定义图标样式覆盖
    iconStyle: null,
  },
  computed: {
    checked: {
      get() {
        return this.parent ? this.parent.value.includes(this.name) : this.value;
      },
      set(val) {
        if (this.parent) {
          this.parent.change({ name: this.name, checked: val });
        } else {
          this.$emit('input', val);
          this.$emit('change', val);
        }
      },
    },
    color() {
      return this.checked ? cssVariables.primaryColor : cssVariables.iconColor;
    }
  },
  methods: {
    onClickIcon() {
      this.$emit('click-icon');
      if (this.iconDisabled) return;
      this.checked = !this.checked;
    },
    onClickText() {
      this.$emit('click-label');
      if (this.labelDisabled) return;
      this.checked = !this.checked;
    },
  },
};
</script>

<style lang="scss" scoped>
  .et-checkbox {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  .et-checkbox--block {
    display: flex;
  }
  .et-checkbox__label:not(:empty) {
    margin-left: 8px;
  }
  .et-checkbox--multiple {
    align-items: flex-start;
    & .et-checkbox__label:not(:empty) {
      transform: translateY(-2rpx);
    }
  }
</style>
