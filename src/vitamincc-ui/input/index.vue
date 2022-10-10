<template>
  <view :class="['vc-input-wrapper', border ? 'vc-hairline--surround' : null, isTextarea ? 'vc-textarea-class' : null]"
    :style="wrapperStyled">
    <slot name="prefix"></slot>
    <view class="vc-input--input">
      <template v-if="type === 'textarea'">
        <view class="vc-textarea-wrap">
          <textarea class="vc-textarea" :name="name" :value="formatterValue" :disabled="disabled" :placeholder="placeholder"
            :maxlength="textAreaMaxLength" :cursor-spacing="10" :focus="isFocus" :auto-height="autoHeight"
            :style="inputStyled" :placeholder-style="placeholderStyled" @blur="onBlur" @focus="onFocus"
            @input="onTextareaChange" />
          <view v-if="showLimit" class="vc-textarea-limit">{{ inputValueCount }}/{{ textAreaMaxLength }}</view>
        </view>
      </template>
      <template v-else>
        <input class="vc-input" :name="name" :type="inputType" :value="formatterValue" :password="password"
          :maxlength="maxlength" :disabled="disabled" :cursor-spacing="10" :focus="isFocus" :style="inputStyled"
          :placeholder-style="placeholderStyled" :placeholder="placeholder" :confirm-type="confirmType" @input="onInput"
          @blur="onBlur" @focus="onFocus" @confirm="onConfirm" />
      </template>
      <view v-show="showClear" class="vc-input__close-area" :style="style" @click="onClear">
        <vc-icon class="vc-input__icon--close" name="close-fill" />
      </view>
    </view>
    <view v-if="type === 'password'" class="vc-input__eye-area" @click="togglePassType">
      <vc-icon :name="passIconName" />
    </view>
    <slot name="suffix"></slot>
  </view>
</template>

<script>
import { INPUT_HEIGHT_DEF } from '../common/constant';
import { addUnit } from '../common/util';

function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

export default {
  name: 'vc-input',
  inject: {
    form: {
      from: 'form',
      default: null
    },
    formItem: {
      from: 'formItem',
      default: null
    }
  },
  props: {
    // 输入框高度
    height: {
      type: [Number, String],
      default: INPUT_HEIGHT_DEF
    },
    // 输入最小框高度
    minHeight: {
      type: [Number, String],
      default: INPUT_HEIGHT_DEF
    },
    // 输入框的 name 属性
    name: null,
    // 输入框的值
    value: null,
    // 输入框类型
    type: {
      type: String,
      default: 'text'
    },
    // 输入框为空时占位符
    placeholder: null,
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
      type: Number,
      default: 40
    },
    // 是否显示地边框
    border: {
      type: Boolean,
      default: false
    },
    // 是否聚焦
    focus: {
      type: Boolean,
      default: false
    },
    // 圆角
    radius: {
      type: Number,
      default: 0
    },
    // 是否显示清除图标
    clearable: {
      type: Boolean,
      default: true
    },
    // 触发清楚图标的时机 focus / always
    clearTrigger: {
      type: String,
      default: 'focus'
    },
    // 将 input 切换为 view 标签，显示为 disabled 样式
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否自动增高，设置auto-height时，style.height不生效
    autoHeight: {
      type: Boolean,
      default: false
    },
    // textarea 显示输入限制
    showLimit: {
      type: Boolean,
      default: false
    },
    // 设置键盘右下角按钮的文字，仅在type='text'时生效
    // send	右下角按钮为“发送”
    // search	右下角按钮为“搜索”
    // next	右下角按钮为“下一个”
    // go	右下角按钮为“前往”
    // done	右下角按钮为“完成”
    confirmType: {
      type: String,
      default: 'done'
    },
    // 是否是密码类型，type = textarea 时无效
    password: {
      type: Boolean,
      default: false
    },
    // 输入值格式化函数
    formatter: null,
    // 输入框自定义样式
    inputStyle: null,
    // 指定 placeholder 的样式
    placeholderStyle: null,
    // 自定义组件样式
    customStyle: null
  },
  data() {
    return {
      TEXTAREA_MAX_LENGTH: 20, // 文本输入域最大限制
      inputHeight: this.height,
      initValue: '', // 原始输入值
      inputFocus: false,
      status: '', // 表单状态
      inputType: this.type,
      passIconName: 'eye-on'
    };
  },
  computed: {
    isTextarea() {
      return this.type === 'textarea';
    },
    isPassInput() {
      return this.inputType === 'password';
    },
    style() {
      let style = '';
      let height = this.inputHeight;
      let lineHeight = this.inputHeight;
      if (this.isTextarea) {
        height = Math.max(height, 80);
        lineHeight = Math.min(height, 22);
      }
      style += `height: ${this.autoHeight ? 'auto' : height + 'px'};`;
      style += `min-height: ${this.minHeight}px;`;
      style += `line-height: ${lineHeight}px;`;
      return style;
    },
    wrapperStyled({ radius, customStyle, clearable }) {
      let style = '';
      radius && (style += `border-radius: ${addUnit(radius)};`);
      if (clearable) {
        style += 'padding-right: 0;';
      }
      return this.style + style + customStyle;
    },
    inputStyled() {
      return this.style + this.inputStyle;
    },
    placeholderStyled() {
      return this.style + this.placeholderStyle;
    },
    isFocus() {
      return this.focus || this.inputFocus;
    },
    formatterValue() {
      return this.initValue && typeof this.formatter === 'function'
        ? this.formatter(this.initValue)
        : this.initValue;
    },
    inputValueCount() {
      // 计数已输入文本字符数
      return this.initValue.length;
    },
    textAreaMaxLength() {
      return Math.max(this.maxlength, this.TEXTAREA_MAX_LENGTH);
    },
    showClear() {
      if (this.isTextarea) return false;
      if (this.clearTrigger === 'focus') {
        return this.clearable && this.initValue.length && this.isFocus;
      } else if (this.clearTrigger === 'always') {
        return this.clearable && this.initValue.length;
      }
      return false;
    }
  },
  watch: {
    value: {
      handler(val) {
        if (!val) {
          return (this.initValue = '');
        }
        let initValue = val;
        if (this.type === 'textarea') {
          initValue = initValue.length > this.textAreaMaxLength ? initValue.substring(0, this.textAreaMaxLength) : initValue;
        } else {
          initValue = initValue.length > this.maxlength ? initValue.substring(0, this.maxlength) : initValue;
        }
        this.initValue = initValue;
      },
      immediate: true
    }
  },
  behaviors: ['uni://form-field'],
  created() {
    if (this.form) {
      this.inputHeight = this.form.height;
      this.$watch('form.value', (formValue) => {
        this.initValue = formValue[this.name];
      }, {
        immediate: true
      });
    }
    if (this.formItem && this.form) {
      this.formItem.name = this.name;
      // 初始化校验
      if (this.form.validateTrigger !== 'submit') {
        this.formItem.validateForm(this.form.value[this.name], this.name);
      }
    }
  },
  methods: {
    onInput(evt) {
      if (this.status === 'clear') return;
      const { value } = evt.detail;
      const output = typeof this.formatter === 'function' ? this.formatter(value) : value;
      this.initValue = output;
      this.$emit('input', output);
      this.$emit('change', output);
      if (this.form) {
        this.form.onChange({[this.name]: output});
        if (this.form.validateTrigger === 'input') {
          this.formItem.validateForm(output, this.name);
        }
      }
      if (typeof this.formatter === 'function') {
        // 强制转换输入框输出
        return output;
      }
    },
    /**
     * Bug: 安卓下文本框文字较多时，长按键盘删除按钮，会导致文本框内容抖动
     * Fix： debounce
     */
    onTextareaChange: debounce(function (evt) {
      const { value } = evt.detail;
      // fix: textarea 超过最大输入限制后依然可以输入内容
      this.initValue = value.length > this.textAreaMaxLength ? value.substring(0, this.textAreaMaxLength) : value;
      this.$emit('input', this.initValue);
      this.$emit('change', this.initValue);
    }, 60),
    async onBlur(evt) {
      // fix：H5 下清除按钮消失过快无法触发事件
      /* #ifdef H5 */
      setTimeout(() => {
        this.inputFocus = false;
      }, 0);
      /* #endif */
      /* #ifdef MP-WEIXIN */
      this.inputFocus = false;
      /* #endif */
      // 表单校验
      let { value } = evt.detail;
      if (this.form && this.form.validateTrigger !== 'input') {
        this.formItem.validateForm(value, this.name);
      }
      this.$emit('blur', value);
    },
    onFocus(evt) {
      this.inputFocus = true;
      this.$emit('focus', evt);
    },
    onConfirm(evt) {
      this.$emit('confirm', evt.detail.value);
      this.$emit('change', evt.detail.value);
    },
    onClear() {
      // Bug: 真机下，输入框聚焦状态下，点击清除按钮会触发一次 input 事件
      this.status = 'clear';
      this.initValue = '';
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
      if (this.form) {
        this.form.onChange({[this.name]: ''});
        if (this.form.validateTrigger !== 'submit') {
          this.formItem.validateForm('', this.nam);
        }
      }
      this.$nextTick(() => {
        this.status = '';
      });
    },
    togglePassType() {
      const inputType = this.inputType === 'password' ? 'text' : 'password';
      this.inputType = inputType;
      this.passIconName = inputType === 'password' ? 'eye-on' : 'eye-off';
    },
  }
};
</script>

<style lang="scss" scoped>
.vc-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 24rpx;
  border-radius: 16rpx;
  /* background: #fff; */
  color: $uni-text-color;
  text-align: left;
}

.vc-input {
  flex: 1;
  box-sizing: border-box;
  display: block;
  min-height: inherit;
  height: inherit;
  padding-right: 16rpx;
  line-height: inherit;
  font-weight: inherit;
}

.vc-input-view {
  flex: 1;
}

.vc-textarea-wrap {
  flex: 1;
  box-sizing: border-box;
  padding-right: 24rpx;
  padding-top: 12rpx;
}

.vc-textarea-limit {
  margin: 6rpx 0;
  font-size: $uni-font-size-10;
  color: $uni-text-color-label;
  text-align: right;
}

.vc-textarea {
  flex: 1;
  width: 100%;
}

.vc-input--input {
  flex: 1;
  display: flex;
  align-items: center;
  transition: width ease 300ms;
}

.vc-input__close-area {
  position: relative;
  width: 64rpx;
  height: 100%;
  transition: all ease .3s;
}
.vc-input__icon--close {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.vc-input__eye-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 100%;
}
</style>
