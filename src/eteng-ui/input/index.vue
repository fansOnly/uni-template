<template>
  <view class="et-input-comp">
    <view :class="['et-input-wrapper', border ? 'et-hairline--surround' : null, isTextarea ? 'et-textarea-class' : null]" :style="wrapperStyled">
      <slot name="prefix"></slot>
      <view v-if="disabled || isReadonly" class="et-input-view">
        <view v-if="value" :class="['et-input', disabled ? 'is-disabled' : null]" :style="inputStyled" @click="$emit('click')">{{password ? '******' : value}}</view>
        <view v-else :class="['et-input', 'input-placeholder', disabled ? 'is-disabled' : null]" :style="placeholderStyled" @click="$emit('click')">{{placeholder}}</view>
        <view v-if="showLimit" class="et-textarea-limit">{{inputValueCount}}/{{Math.max(maxlength, TEXTAREA_MAX_LENGTH)}}</view>
      </view>
      <slot v-else>
        <view class="et-input--input">
        <template v-if="type === 'number'">
          <input class="et-input" :name="name" type="number" :value="formatterValue" :password="password" :maxlength="maxlength" :cursor-spacing="10" :focus="isFocus" :style="inputStyled" :placeholder-style="placeholderStyled" :placeholder="placeholder" @input="onInput" @blur="onBlur" @focus="onFocus" @confirm="onConfirm" />
        </template>
        <template v-else-if="type === 'idcard'">
          <input class="et-input" :name="name" type="idcard" :value="formatterValue" :password="password" :maxlength="maxlength" :cursor-spacing="10" :focus="isFocus" :style="inputStyled" :placeholder-style="placeholderStyled" :placeholder="placeholder" @input="onInput" @blur="onBlur" @focus="onFocus" @confirm="onConfirm" />
        </template>
        <template v-else-if="type === 'digit'">
          <input class="et-input" :name="name" type="digit" :value="formatterValue" :password="password" :maxlength="maxlength" :cursor-spacing="10" :focus="isFocus" :style="inputStyled" :placeholder-style="placeholderStyled" :placeholder="placeholder" @input="onInput" @blur="onBlur" @focus="onFocus" @confirm="onConfirm" />
        </template>
        <template v-else-if="type === 'nickname'">
          <input class="et-input" :name="name" type="nickname" :value="formatterValue" :password="password" :maxlength="maxlength" :cursor-spacing="10" :focus="isFocus" :style="inputStyled" :placeholder-style="placeholderStyled" :placeholder="placeholder" @input="onInput" @blur="onBlur" @focus="onFocus" @confirm="onConfirm" />
        </template>
        <template v-else-if="type === 'textarea'">
          <view class="et-textarea-wrap">
            <textarea class="et-textarea" :name="name" :value="formatterValue" :placeholder="placeholder" :maxlength="textAreaMaxLength" :cursor-spacing="10" :focus="isFocus" :auto-height="autoHeight" :style="inputStyled" :placeholder-style="placeholderStyled" @blur="onBlur" @focus="onFocus" @input="onTextareaInput" />
            <view v-if="showLimit" class="et-textarea-limit">{{inputValueCount}}/{{textAreaMaxLength}}</view>
          </view>
        </template>
        <template v-else>
          <input class="et-input" :name="name" :type="type" :value="formatterValue" :password="password" :maxlength="maxlength" :disabled="disabled" :cursor-spacing="10" :focus="isFocus" :style="inputStyled" :placeholder-style="placeholderStyled" :placeholder="placeholder" :confirm-type="confirmType" @input="onInput" @blur="onBlur" @focus="onFocus" @confirm="onConfirm" />
        </template>
        <view v-show="showClearIcon && !isTextarea" class="et-input-close" :style="style" @click="onClear">
          <et-icon class="et-input__icon--close" name="clear" size="16" />
        </view>
        </view>
      </slot>
      <slot name="suffix"></slot>
    </view>
    <view v-show="showError && validateDone" class="et-input-error-wrapper">
      <view class="et-input-error">
        <view class="et-input-error__icon" style="left: 16px"></view>
        <view class="et-input-error__text">{{errorText}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  const { mapState, mapActions } = createNamespacedHelpers('state')
  import { getRect, getParentInstance } from '@/shared'
  import { isObject } from '@/shared'
  export default {
    name: 'et-input',
    props: {
      // 输入框高度
      height: {
        type: [Number, String],
        default: 40
      },
      // 输入最小框高度
      minHeight: {
        type: [Number, String],
        default: 40
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
      // 校验规则 - 支持 array / object
      rules: null,
      showError: {
        type: Boolean,
        default: true
      },
      // 输入框为空时占位符
      placeholder: null,
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      maxlength: {
        type: Number,
        default: 40
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
      // 是否开启标签转换
      supportView: {
        type: Boolean,
        default: false
      },
      // 将 input 切换为 view 标签，显示为 disabled 样式
      disabled: {
        type: Boolean,
        default: false
      },
      // 只读模式 - 将 input 切换为 view 标签
      readonly: {
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
        initValue: '', // 原始输入值
        inputFocus: false,
        status: '', // 表单状态
        errorText: '', // 错误文本
        validateDone: false
      }
    },
    computed: {
      ...mapState(['activeInputName']),
      isTextarea() {
        return this.type === 'textarea'
      },
      wrapperStyled({ radius, customStyle, clearable, addUnit }) {
        let style = ''
        radius && (style += `border-radius: ${addUnit(radius)};`)
        if (clearable) {
          style += 'padding-right: 0;'
        }
        return this.mergeStyles([style, customStyle])
      },
      style() {
        let style = ''
        let height = this.height
        let lineHeight = this.height
        if (this.isTextarea) {
          height = Math.max(height, 80)
          lineHeight = Math.min(height, 22)
        }
        style += `height: ${this.addUnit(height)};`
        style += `min-height: ${this.addUnit(this.minHeight)};`
        style += `line-height: ${this.addUnit(lineHeight)};`
        return style
      },
      inputStyled() {
        return this.mergeStyles([this.style, this.inputStyle])
      },
      placeholderStyled() {
        return this.mergeStyles([this.style, this.placeholderStyle])
      },
      isReadonly() {
        return this.readonly || (this.supportView && ((this.activeInputName && this.activeInputName !== 'transition-magic') ? this.activeInputName !== this.name : false))
      },
      isFocus() {
        return this.focus || this.inputFocus
      },
      formatterValue() {
        return this.value && typeof this.formatter === 'function'
          ? this.formatter(this.value)
          : this.value
      },
      inputValueCount () {
        // 计数已输入文本字符数
        return this.initValue.length
      },
      textAreaMaxLength() {
        return Math.max(this.maxlength, this.TEXTAREA_MAX_LENGTH)
      },
      showClearIcon() {
        if (this.clearTrigger === 'focus') {
          return this.clearable && this.initValue.length && this.isFocus
        } else if (this.clearTrigger === 'always') {
          return this.clearable && this.initValue.length
        }
      }
    },
    watch: {
      value: {
        handler(val) {
          this.initValue = val || ''
        },
        immediate: true
      }
    },
    // behaviors: ['uni://form-field'],
    methods: {
      ...mapActions(['setActiveInput', 'setInputValid', 'clearActiveInput']),
      onInput(evt) {
        if (this.status === 'clear') return
        const { value } = evt.detail
        const output = typeof this.formatter === 'function' ? this.formatter(value) : value
        this.initValue = output
        this.$emit('input', output)
        this.$emit('change', output)
        if (typeof this.formatter === 'function') {
          // 强制转换输入框输出
          return output
        }
      },
      onTextareaInput(evt) {
        const { value } = evt.detail
        // fix: textarea 超过最大输入限制后依然可以输入内容
        this.initValue = value.length > this.textAreaMaxLength ? value.substring(0, this.textAreaMaxLength) : value
        this.$emit('input', this.initValue)
        this.$emit('change', this.initValue)
      },
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
        this.clearActiveInput()
        let { value } = evt.detail
        if (this.rules) {
          // Bug: 手机号输入格式化在 ios 15.1下有bug，先特殊处理
          if (this.name === 'mobile') {
            value = value && value.replace(/\s+/g, '')
          }
          this.validateInput(value)
        }
        this.$emit('blur', value)
      },
      onFocus(evt) {
        this.inputFocus = true
        this.setActiveInput(this.name)
        this.$emit('focus', evt)
      },
      onConfirm(evt) {
        this.$emit('confirm', evt.detail.value)
      },
      onClear() {
        // Bug: 真机下，输入框聚焦状态下，点击清除按钮会触发一次 input 事件
        this.status = 'clear'
        this.setInputValid({ [this.name]: false })
        this.$emit('input', this.initValue = '')
        this.$emit('change', '')
        this.$emit('clear')
        this.$nextTick(() => {
          // 触发校验
          this.validateInput()
          this.status = ''
        })
      },
      clearValidate() {
        this.errorText = ''
        this.$emit('validate', '')
      },
      async validateInput(value = '') {
        let validPromises = []
        if (Array.isArray(this.rules)) {
          for (let i = 0; i < this.rules.length; i++) {
            validPromises.push(this.validateRules(value, this.rules[i]))

          }
        } else if (isObject(this.rules)) {
          validPromises.push(this.validateRules(value, this.rules))
        }
        const validList = await Promise.all(validPromises)
        this.setInputValid({ [this.name]: !validList.some(Boolean) })
        this.errorText = validList.filter(Boolean)[0]
        this.$emit('validate', this.errorText)
        if (this.errorText) {
          this.validateDone = true
        } else {
          setTimeout(() => {
            this.validateDone = false
          }, 300);
        }
      },
      async validateRules(value, rule) {
        return new Promise(async resolve => {
          for (let key in rule) {
            if (key === 'required' && rule[key]) {
              // { required: true, message: '' }
              resolve(value ? '' : rule.message || '必填项')
            } else if (key === 'validator') {
              // tips: 传入的自定义校验函数需要用引号处理成字符串形式
              // { validator: 'validatorFn', message: '' }
              const parent = getParentInstance(this, rule[key])
              const validatorFn = parent[rule[key]]
              if (typeof validatorFn === 'function') {
                // 支持传入 promise 风格的校验函数
                const pass = await validatorFn(value)
                resolve(pass ? '' : rule.message || '非法输入')
              }
            }
          }
        })
      },
      async getErrorRect() {
        this.$nextTick(async () => {
          const rect = await getRect(this, '.et-input-error')
          this.errorHeight = rect.height
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .et-input-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0 24rpx;
    background: #fff;
    color: $uni-text-color;
    text-align: left;
  }
  .et-input {
    flex: 1;
    box-sizing: border-box;
    display: block;
    min-height: inherit;
    height: inherit;
    line-height: inherit;
    font-weight: inherit;
  }
  .et-input-view {
    flex: 1;
  }
  .et-textarea-wrap {
    flex: 1;
  }
  .et-textarea-limit {
    margin-top: 6rpx;
    font-size: $uni-font-size-12;
    color: $uni-text-color-sub;
    text-align: right;
  }
  .et-textarea {
    flex: 1;
    width: 100%;
  }
  .is-disabled {
    color: $uni-text-color-disabled!important;
  }
  .et-input-error-wrapper {
    margin-top: -14px;
    transition-property: height;
    transition-timing-function: ease;
    overflow: hidden;
  }
  .et-input-error {
    background: #fff;
  }
  .et-input-error__text {
    padding: 18rpx 32rpx;
    background: #FBEAE1;
    color: #ED3C2F;
    font-size: $uni-font-size-14;
  }
  .et-input-error__icon {
    position: relative;
    width: 1rpx;
    height: 14px;
  }
  .et-input-error__icon:after {
    content: '';
    position: absolute;
    top: -14px;
    top: 0;
    width: 0;
    height: 0;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent #FBEAE1 transparent;
  }
  .et-input--input {
    flex: 1;
    display: flex;
    align-items: center;
    transition: width ease 300ms;
  }
  .et-input-close {
    position: relative;
    width: 96rpx;
    transition: all ease .3s;
  }
  .et-input__icon--close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
