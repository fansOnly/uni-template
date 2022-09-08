<template>
  <div class="et-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'et-checkbox-group',
  provide() {
    return {
      checkboxGroup: this
    }
  },
  props: {
    // 默认选中的值
    value: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    change({name, checked}) {
      // 小程序绑定 v-model 不支持自定义 value 和 input
      const result = [...this.value]
      if (checked && !result.includes(name)) {
        result.splice(result.length, 0, name)
      } else if (name) {
        result.splice(result.indexOf(name), 1)
      }
      this.$emit('input', result)
      this.$emit('change', result)
    },
  }
}
</script>
