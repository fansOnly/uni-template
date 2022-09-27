<template>
  <view class="search-bar-wrapper" :style="wrapperStyled">
    <view v-if="!isActivated" :class="['search-bar-view', value ? 'is-active' : null]" :style="deactivatedStyled"
      @click="showInput = inputFocus = true">
      <et-icon class="search-left__icon" name="search" size="20" />{{ placeholder }}
    </view>
    <view class="search-bar-body">
      <view v-if="label" class="search-bar__label" :style="{'width': labelWidth +'px'}">{{label}}</view>
      <view class="search-bar__input">
        <et-input name="search" type="text" :value="value" :height="height" :placeholder="placeholder" :radius="radius"
          :maxlength="maxlength" support-view :focus="isFocus" :clearable="clearable" :clear-trigger="clearTrigger" :readonly="!isActivated" :disabled="disabled"
          :confirm-type="confirmType" :custom-style="inputStyled" @focus="handleFocus" @blur="handleBlur"
          @input="handleInput" @confirm="onConfirm" @clear="handleClear">
          <template #prefix>
            <view v-if="leftIcon" class="search-left__icon--focus">
            <et-icon class="search-left__icon" name="search" size="20" />
          </view>
          </template>
        </et-input>
      </view>
      <view v-if="showAction" class="search-action__text" @click="handleCancel">{{ actionText }}</view>
    </view>
  </view>
</template>

<script>
import { INPUT_HEIGHT_DEF } from '../common/constant';
import { addUnit } from '../common/util';
export default {
  name: 'et-search-bar',
  props: {
    // 输入框高度
    height: {
      type: [Number, String],
      default: INPUT_HEIGHT_DEF,
    },
    // 左侧文本
    label: null,
    // 左侧文本宽度
    labelWidth: {
      type: [String, Number],
      default: 50
    },
    // 输入框 name 属性 - 透传 input 组件
    name: {
      type: String,
      default: 'search',
    },
    // 输入框值 - 透传 input 组件
    value: null,
    // 搜索框背景
    background: {
      type: String,
      default: '#f6f6f6',
    },
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
    // 圆角 - 透传 input 组件
    radius: {
      type: Number,
      default: 4,
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
    // 只读模式 - 将 input 切换为 view 标签
    readonly: {
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
  },
  data() {
    return {
      inputFocus: false,
      showInput: false
    };
  },
  computed: {
    isActivated() {
      return this.showInput || this.value;
    },
    isFocus() {
      return this.focus || this.inputFocus;
    },
    wrapperStyled({ isActivated, height, radius, round }) {
      let style = '';
      style += `height: ${addUnit(height)};`;
      if (!isActivated) {
        style += `border-radius: ${round ? 999 : radius}px;`;
      }
      return style;
    },
    deactivatedStyled({ background }) {
      let style = '';
      style += `background: ${background};`;
      return style;
    },
    inputStyled({ isActivated, background, clearable, round, radius }) {
      let style = `padding: 0 ${clearable ? 0 : '32rpx'} 0 32rpx;`;
      style += `background: ${background};`;
      if (isActivated) {
        style += `border-radius: ${round ? 999 : radius}px;`;
      }
      return style;
    },
  },
  methods: {
    handleCancel() {
      this.$emit('input', '');
      this.inputFocus = this.showInput = false;
    },
    handleInput(value) {
      this.$emit('input', value);
    },
    handleFocus() {
      this.inputFocus = true;
      this.$emit('focus');
    },
    handleBlur(value) {
      this.$emit('input', value);
      setTimeout(() => {
        this.inputFocus = false;
      }, 0);
    },
    onConfirm(value) {
      this.$emit('on-search', value);
    },
    handleClear() {
      this.$emit('input', '');
      this.$emit('clear');
    }
  },
};
</script>

<style lang="scss" scoped>
.search-bar-wrapper {
  position: relative;
  overflow: hidden;
}

.search-bar-view {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  color: $uni-text-color-placeholder;
  z-index: 2;

  &.is-active {
    color: #383838;
  }
}

.search-bar-body {
  display: flex;
  align-items: center;
}

.search-bar__input {
  flex: 1;
}

.search-left__icon--focus {
  display: flex;
  align-items: center;
}

.search-left__icon {
  margin-right: $uni-spacing-4;
}

.search-bar__label {
  padding-right: $uni-spacing-16;
  color: #383838;
}

.search-action__text {
  padding-left: $uni-spacing-16;
  color: #383838;
}
</style>
