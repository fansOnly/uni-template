<template>
  <view :class="['vc-input', border ? 'vc-hairline--surround' : null]" :style="customStyle">
    <!-- prefix -->
    <slot name="prefix"></slot>
    <!-- content -->
    <view v-if="isTextarea" class="vc-input__content-textarea">
      <textarea :class="['vc-input__textarea', disabled ? 'is-disabled' : null]" :name="name" :value="formatterValue"
        :disabled="disabled" :placeholder="placeholder" :maxlength="textAreaMaxLength" :cursor-spacing="10"
        :focus="isFocus" :auto-height="autoHeight" :style="inputStyle" :placeholder-style="placeholderStyle"
        @blur="onBlur" @focus="onFocus" @input="onTextareaChange" />
      <view v-if="showLimit" class="vc-input__limit">{{ inputValueCount }}/{{ textAreaMaxLength }}</view>
    </view>
    <view v-else class="vc-input__content-input">
      <input :class="['vc-input__input', disabled ? 'is-disabled' : null]" :name="name" :type="inputType"
        :value="formatterValue" :password="password" :maxlength="maxlength" :disabled="disabled" :cursor-spacing="10"
        :focus="isFocus" :placeholder="placeholder" :confirm-type="confirmType" :style="inputStyle"
        :placeholder-style="placeholderStyle" @input="onInput" @blur="onBlur" @focus="onFocus" @confirm="onConfirm" />
      <view v-if="showClear" class="vc-input__icon" :style="style" @click="onClear">
        <vc-icon name="close-fill" :size="20" />
      </view>
    </view>
    <!-- password icon -->
    <view v-if="type === 'password'" class="vc-input__icon" @click="togglePassType">
      <vc-icon :name="passIconName" :size="20" />
    </view>
    <!-- suffix -->
    <slot name="suffix"></slot>
  </view>
</template>

<script>
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
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
    // 输入框的 name 属性
    name: null,
    // 输入框的值
    value: null,
    // 输入框类型
    type: {
      type: String,
      default: 'text'
    },
    // 是否是密码类型，type = textarea 时无效
    password: {
      type: Boolean,
      default: false
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
    disabled: {
      type: Boolean,
      default: false
    },
    // textarea 是否自动增高，设置auto-height时，style.height不生效
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
    // 输入值格式化函数
    formatter: null,
    // 输入框自定义样式
    inputStyle: String,
    // 指定 placeholder 的样式
    placeholderStyle: String,
    // 自定义组件样式
    customStyle: String
  },
  data() {
    return {
      TEXTAREA_MAX_LENGTH: 20, // 文本输入域最大限制
      initValue: '', // 原始输入值
      inputFocus: false,
      status: '', // 表单状态
      inputType: this.type,
      passIconName: 'eye-on'
    }
  },
  computed: {
    isTextarea() {
      return this.type === 'textarea'
    },
    isFocus() {
      return this.focus || this.inputFocus
    },
    formatterValue() {
      return this.initValue && typeof this.formatter === 'function'
        ? this.formatter(this.initValue)
        : this.initValue
    },
    inputValueCount() {
      // 计数已输入文本字符数
      return this.initValue.length
    },
    textAreaMaxLength() {
      return Math.max(this.maxlength, this.TEXTAREA_MAX_LENGTH)
    },
    showClear() {
      if (!this.clearable) return false
      if (this.clearTrigger === 'focus') {
        return this.clearable && this.initValue.length && this.isFocus
      } else if (this.clearTrigger === 'always') {
        return this.clearable && this.initValue.length
      }
      return false
    }
  },
  watch: {
    value: {
      handler(val) {
        if (!val) {
          return (this.initValue = '')
        }
        let initValue = val
        if (this.type === 'textarea') {
          initValue = initValue.length > this.textAreaMaxLength ? initValue.substring(0, this.textAreaMaxLength) : initValue
        } else {
          initValue = initValue.length > this.maxlength ? initValue.substring(0, this.maxlength) : initValue
        }
        this.initValue = initValue
      },
      immediate: true
    }
  },
  behaviors: ['uni://form-field'],
  created() {
    if (this.form) {
      this.$watch('form.value', (formValue) => {
        this.initValue = formValue[this.name]
      }, {
        immediate: true
      })
    }
    if (this.formItem && this.form) {
      this.formItem.name = this.name
      // 初始化校验
      if (this.form.validateTrigger !== 'submit') {
        this.formItem.validateForm(this.form.value[this.name], this.name)
      }
    }
  },
  methods: {
    onInput(evt) {
      if (this.status === 'clear') return
      const { value } = evt.detail
      const output = typeof this.formatter === 'function' ? this.formatter(value) : value
      this.initValue = output
      this.$emit('input', output)
      this.$emit('change', output)
      if (this.form) {
        this.form.onChange({ [this.name]: output })
        if (this.form.validateTrigger === 'input') {
          this.formItem.validateForm(output, this.name)
        }
      }
      if (typeof this.formatter === 'function') {
        // 强制转换输入框输出
        return output
      }
    },
    /**
     * Bug: 安卓下文本框文字较多时，长按键盘删除按钮，会导致文本框内容抖动
     * Fix： debounce
     */
    onTextareaChange: debounce(function (evt) {
      const { value } = evt.detail
      // fix: textarea 超过最大输入限制后依然可以输入内容
      this.initValue = value.length > this.textAreaMaxLength ? value.substring(0, this.textAreaMaxLength) : value
      this.$emit('input', this.initValue)
      this.$emit('change', this.initValue)
    }, 60),
    async onBlur(evt) {
      // fix：H5 下清除按钮消失过快无法触发事件
      /* #ifdef H5 */
      setTimeout(() => {
        this.inputFocus = false
      }, 0)
      /* #endif */
      /* #ifdef MP-WEIXIN */
      this.inputFocus = false
      /* #endif */
      // 表单校验
      const { value } = evt.detail
      if (this.form && this.form.validateTrigger !== 'input') {
        this.formItem.validateForm(value, this.name)
      }
      this.$emit('blur', value)
    },
    onFocus(evt) {
      this.inputFocus = true
      this.$emit('focus', evt)
    },
    onConfirm(evt) {
      this.$emit('confirm', evt.detail.value)
      this.$emit('change', evt.detail.value)
    },
    onClear() {
      // Bug: 真机下，输入框聚焦状态下，点击清除按钮会触发一次 input 事件
      this.status = 'clear'
      this.initValue = ''
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
      if (this.form) {
        this.form.onChange({ [this.name]: '' })
        if (this.form.validateTrigger !== 'submit') {
          this.formItem.validateForm('', this.nam)
        }
      }
      this.$nextTick(() => {
        this.status = ''
        this.inputFocus = true
      })
    },
    togglePassType() {
      const inputType = this.inputType === 'password' ? 'text' : 'password'
      this.inputType = inputType
      this.passIconName = inputType === 'password' ? 'eye-on' : 'eye-off'
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/input.scss';
</style>
