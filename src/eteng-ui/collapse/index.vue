<template>
  <div class="et-collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'et-collapse',
  provide() {
    return {
      collapse: this
    }
  },
  props: {
    // 默认展开的值，面板的 name 属性
    value: null,
    // 手风琴模式
    accordion: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      type: 'string',
      firstInit: true
    }
  },
  watch: {
    value: {
      handler(val) {
        this.type = typeof val
        this.update(val, this.firstInit)
        this.firstInit = false
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.children = []
  },
  methods: {
    change({name, expanded}) {
      let data = null
      if (this.accordion) {
        if (this.type === 'boolean') {
          data = !!expanded
        } else {
          data = expanded ? name : ''
        }
      } else {
        data = [...this.value]
        if (expanded) {
          data.push(name)
        } else {
          const index = data.indexOf(name)
          data.splice(index, 1)
        }
      }
      this.update(data)
      // v-model 绑定
      this.$emit('input', data)
      this.$emit('change', data)
    },
    update(active, firstInit = false) {
      this.$nextTick(() => {
        this.children.map(child => {
          child.initRender(active, firstInit)
        })
      })
    }
  }
}
</script>
