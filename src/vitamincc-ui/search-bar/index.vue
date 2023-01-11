<template>
  <view class="vc-search-bar">
    <view v-if="!isInput" :class="['vc-search-bar__mask', round ? 'is-round' : null]" :style="maskStyle"
      @click="showInput = inputFocus = true">
      <vc-icon class="vc-search-bar__icon" name="search" size="20" />{{ placeholder }}
    </view>
    <view v-else class="vc-search-bar__content">
      <view v-if="label" class="vc-search-bar__label" :style="labelStyle">{{ label }}</view>
      <view class="vc-search-bar__input">
        <vc-input name="search" type="text" :value="value" :placeholder="placeholder" :maxlength="maxlength"
          :focus="isFocus" :clearable="clearable" :clear-trigger="clearTrigger" :disabled="disabled"
          :confirm-type="confirmType" :round="round" @focus="onFocus" @blur="onBlur" @input="onInput"
          @confirm="onConfirm" @clear="onClear">
          <template v-if="leftIcon" #prefix>
            <vc-icon name="search" size="20" />
          </template>
        </vc-input>
      </view>
      <view v-if="showAction" class="vc-search-bar__action" @click="onCancel">{{ actionText }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'vc-search-bar',
  props: {
    value: null,
    // 左侧文本
    label: null,
    labelStyle: String,
    // 输入框值 - 透传 input 组件
    // 搜索框背景 - 圆角
    round: {
      type: Boolean,
      default: false
    },
    // 输入框为空时占位符 - 透传 input 组件
    placeholder: {
      type: String,
      default: '请输入搜索关键字',
    },
    // 最大输入长度，设置为 -1 的时候不限制最大长度 - 透传 input 组件
    maxlength: {
      type: Number,
      default: 40,
    },
    // 是否聚焦 - 透传 input 组件
    focus: {
      type: Boolean,
      default: false
    },
    // 将 input 切换为 view 标签，显示为 disabled 样式
    disabled: {
      type: Boolean,
      default: false,
    },
    // 设置键盘右下角按钮的文字，仅在type='text'时生效
    confirmType: {
      type: String,
      default: 'search'
    },
    // 是否显示清除图标 - 透传 input 组件
    clearable: {
      type: Boolean,
      default: true,
    },
    // 触发清楚图标的时机 focus / always - 透传 input 组件
    clearTrigger: {
      type: String,
      default: 'focus',
    },
    // 输入框左侧图标
    leftIcon: {
      type: Boolean,
      default: true,
    },
    // 是否在搜索框右侧显示取消按钮
    showAction: {
      type: Boolean,
      default: true,
    },
    // 取消按钮文字
    actionText: {
      type: String,
      default: '取消',
    },
    maskStyle: {
      type: String,
    },
  },
  data() {
    return {
      inputFocus: false,
      showInput: this.value
    }
  },
  computed: {
    isInput() {
      return this.showInput || this.value
    },
    isFocus() {
      return this.focus || this.inputFocus
    },
  },
  methods: {
    onCancel() {
      this.$emit('input', '')
      this.inputFocus = this.showInput = false
    },
    onInput(value) {
      this.$emit('input', value)
    },
    onFocus() {
      this.inputFocus = true
      this.$emit('focus')
    },
    onBlur(value) {
      this.$emit('input', value)
      setTimeout(() => {
        this.inputFocus = false
      }, 0)
    },
    onConfirm(value) {
      this.$emit('search', value)
    },
    onClear() {
      this.$emit('input', '')
      this.$emit('clear')
      this.inputFocus = true
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/search-bar.scss';
</style>
