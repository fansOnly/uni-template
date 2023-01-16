<template>
  <div class="vc-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vc-radio-group',
  provide() {
    return {
      radioGroup: this
    }
  },
  props: {
    // 默认选中的值，对应单选框的 name 属性
    value: null,
    // 布局方向 / 垂直布局 - vertical 水平布局 - horizontal
    direction: {
      type: String,
      default: 'vertical'
    }
  },
  watch: {
    value: {
      handler(val) {
        this.update()
      },
      immediate: true
    }
  },
  created() {
    this.children = []
  },
  methods: {
    change(value) {
      // 小程序绑定 v-model 不支持自定义 value 和 input
      this.$emit('input', value)
      this.$emit('change', value)
      this.update()
    },
    update() {
      this.$nextTick(() => {
        this.children.map(child => {
          child.update(this)
        })
      })
    }
  }
}
</script>
