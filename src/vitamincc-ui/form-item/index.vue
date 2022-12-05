<template>
  <view class="vc-form-item" :style="customStyle">
    <slot name="label">
      <view v-if="label" class="vc-form-item__label" :style="style">
        <text v-if="isRequired" class="is-required">*</text>
        <text>{{ label }}</text>
      </view>
    </slot>
    <view class="vc-form-item__input">
      <slot />
      <view class="vc-form-item__error" :class="{ 'is-active': errorText }">{{ errorText }}</view>
    </view>
  </view>
</template>

<script>
import { mergeStyle, addUnit } from '../common/util'
import { LABEL_WIDTH_DEF } from '../common/constant'
import { isObject } from '../common/validate'

export default {
  name: 'vc-form-item',
  provide() {
    return {
      formItem: this
    }
  },
  inject: {
    form: {
      from: 'form',
      default: null
    }
  },
  props: {
    // 标签值
    label: {
      type: String,
      default: ''
    },
    // 表单的校验规则
    rules: {
      type: [Array, Object],
      default: () => { }
    },
    // 标签对齐
    labelAlign: {
      type: String,
      default: 'left'
    },
    // 标签宽度
    labelWidth: {
      type: [Number, String],
      default: LABEL_WIDTH_DEF
    },
    // 标签样式
    labelStyle: null,
    customStyle: null
  },
  data() {
    return {
      showRequired: false,
      name: '',
      style: '',
      errorText: ''
    }
  },
  computed: {
    activeRules() {
      let rules = this.rules ?? this.form?.rules[this.name] ?? []
      return Array.isArray(rules) ? rules : [rules]
    },
    isRequired() {
      if (!this.showRequired) return false
      let rules = this.rules ?? this.form?.rules[this.name] ?? []
      let isRequired = false
      if (isObject(rules)) {
        rules = [rules]
      }
      for (let i = 0; i < this.activeRules.length; i++) {
        const rule = this.activeRules[i]
        for (const [key, val] of Object.entries(rule)) {
          if (key === 'required' && val === true) {
            isRequired = true
          }
        }
        if (isRequired) break
      }
      return isRequired
    }
  },
  created() {
    this.form.children.push(this)
    this.height = this.form.height
    this.showRequired = this.form.showRequired

    const width = (this.labelWidth !== LABEL_WIDTH_DEF ? this.labelWidth : null) ??
      (this.form.labelWidth && this.form.labelWidth !== LABEL_WIDTH_DEF ? this.form.labelWidth : null) ??
      LABEL_WIDTH_DEF
    this.style += `text-align: ${this.labelAlign};`
    this.style += `width: ${addUnit(width)};`
    this.style += mergeStyle(this.form.labelStyle, this.labelStyle)
  },
  methods: {
    clearValidate() {
      this.errorText = ''
    },
    async _validate(val) {
      for await (const rule of this.activeRules) {
        this.errorText = await this._validateRules(val, rule)
        if (this.errorText) return
      }
    },
    async validateForm(val, name) {
      await this._validate(val)

      this.form.formValid[this.name] = !this.errorText
      this.form._validate()
      return !this.errorText
    },
    async _validateRules(value, rule) {
      return new Promise(async resolve => {
        for (let key in rule) {
          if (key === 'required' && rule[key]) {
            // { required: true, message: '' }
            resolve(value ? '' : rule.message || '必填项')
          } else if (key === 'validator') {
            // tips: 传入的自定义校验函数需要用引号处理成字符串形式
            // { validator: 'validatorFn', message: '' }
            const validatorFn = this.$root[rule[key]]
            if (typeof validatorFn === 'function') {
              // 支持传入 promise 风格的校验函数
              const isPass = await validatorFn(value)
              resolve(isPass ? '' : rule.message || '非法输入')
            }
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.vc-form-item {
  display: flex;
  align-items: center;
  padding-bottom: 24rpx;
}

.vc-form-item__label {
  color: $uni-text-color-label;
}

.is-required {
  padding-right: 6rpx;
  color: $uni-color-error;
}

.vc-form-item__input {
  position: relative;
  flex: 1;
}

.vc-form-item__error {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 6px;
  color: $uni-color-error;
  font-size: $uni-font-size-12;
  line-height: 1;
  opacity: 0;
  transition: transform 300ms;
  transform: translateY(-100%);

  &.is-active {
    opacity: 1;
    transform: translateY(0%);
  }
}
</style>
