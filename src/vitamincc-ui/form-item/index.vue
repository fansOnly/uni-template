<template>
  <view class="vc-form-item" :style="customStyle">
    <!-- slot label -->
    <slot name="label">
      <view v-if="label" :class="['vc-form-item__label', `is-${labelAlign}`]" :style="labelStyle">
        <text v-if="isRequired" class="vc-form-item__required">*</text>
        <text>{{ label }}</text>
      </view>
    </slot>
    <view class="vc-form-item__content">
      <!-- slot default -->
      <slot />
      <view :class="['vc-form-item__error', errorText ? 'is-active' : null]">{{ errorText }}</view>
    </view>
  </view>
</template>

<script>
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
    },
    // 使用 form 的 validate、reset 方法时必填
    // prop: {
    //   type: String,
    // },
    // 表单的校验规则
    rules: {
      type: [Array, Object],
      default: () => { }
    },
  },
  data() {
    return {
      showRequired: false,
      prop: '',
      labelAlign: '',
      labelStyle: '',
      errorText: ''
    }
  },
  computed: {
    activeRules() {
      const rules = this.rules ?? this.form?.rules?.[this.prop] ?? []
      return Array.isArray(rules) ? rules : [rules]
    },
    isRequired() {
      if (!this.showRequired || !this.prop) return false
      let rules = this.rules ?? this.form?.rules?.[this.prop] ?? []
      if (!rules.length) return false
      let isRequired = false
      if (!Array.isArray(rules)) {
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
    if (this.form) {
      this.form.children.push(this)
      this.height = this.form.height
      this.showRequired = this.form.showRequired

      if (this.form.labelWidth) {
        this.labelStyle += `width: ${this.form.labelWidth}px;`
      }
      this.labelAlign = this.form.labelAlign
      this.labelStyle += this.form.labelStyle
    }
  },
  methods: {
    clearValidate() {
      this.errorText = ''
    },
    async _validateFormItem(val) {
      for await (const rule of this.activeRules) {
        this.errorText = await this._validateRules(val, rule)
        if (this.errorText) return
      }
    },
    async validateForm(val, prop) {
      await this._validateFormItem(val)

      this.$set(this.form.formValid, prop, !this.errorText)
      this.form._validate()
      return !this.errorText
    },
    async _validateRules(value, rule) {
      return new Promise(async resolve => {
        for (const key in rule) {
          if (key === 'required' && rule[key]) {
            // { required: true, message: '' }
            resolve(value ? '' : rule.message || '必填项')
          } else if (key === 'validator' && value) {
            // tips: 传入的自定义校验函数需要用引号处理成字符串形式
            // { validator: 'validatorFn', message: '' }
            const validatorFn = this.$root[rule[key]]
            if (typeof validatorFn === 'function') {
              // 支持传入 promise 风格的校验函数
              const isPass = await validatorFn(value)
              resolve(isPass ? '' : rule.message || '非法输入')
            }
          } else {
            resolve('')
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/form-item.scss';
</style>
