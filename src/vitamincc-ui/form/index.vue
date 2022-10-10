<template>
  <view class="vc-form">
    <form>
      <slot />
    </form>
  </view>
</template>

<script>
import { LABEL_WIDTH_DEF } from '../common/constant'

export default {
  name: 'vc-form',
  provide() {
    return {
      form: this
    }
  },
  props: {
    // 表单的初始值
    value: {
      type: Object,
      default: () => {}
    },
    // 高度
    height: {
      type: [Number, String],
      default: 40
    },
    // 表单的校验规则
    rules: {
      type: Object,
      default: () => {}
    },
    // 显示必填
    showRequired: {
      type: Boolean,
      default: true
    },
    /**
     * 表单验证时机
     * @property {String}
     *  @value blur as default 离开输入框
     *  @value input 输入时时 - TODO
     *  @value submit 提交按钮
     */
    validateTrigger: {
      type: String,
      default: 'blur'
    },
    // 标签宽度
    labelWidth: {
      type: [Number, String],
      default: LABEL_WIDTH_DEF
    },
    // 标签样式
    labelStyle: null
  },
  created() {
    this.children = []
    this.formValid = {}
  },
  methods: {
    // 提交触发校验
    async validate(cb) {
      if (typeof cb === 'function') {
        const valid = await this.checkValid()
        cb(valid)
      }
    },
    async checkValid() {
      let valid = true
      for await (const item of this.children) {
        const pass = await item.validateForm(this.value[item.name], item.name)
        if (!pass) valid = false
      }
      return valid
    },
    _validate() {
      let valid = true
      for (let key in this.formValid) {
        if (!this.formValid[key]) valid = false
      }
      this.$emit('validate', valid)
    },
    onChange(val = {}) {
      this.$emit('input', {...this.value, ...val})
      this.$emit('change', {...this.value, ...val})
    },
    reset() {
      let res = {}
      for (let key in this.value) {
        const value = this.value[key]
        res[key] = typeof value === 'boolean' ? false : typeof value === 'number' ? 0 : Array.isArray(value) ? [] : typeof value === 'object' ? {} : ''
      }
      this.onChange(res)
      this.children.forEach(item => {
        item.validateForm(item.name, '')
      })
    }
  },
}
</script>
