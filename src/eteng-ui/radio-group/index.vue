<template>
  <div class="et-radio-group">
    <slot></slot>
  </div>
</template>

<script>
  import { getChildrenCompatibleH5, getChildInstance } from '@/shared'
  export default {
    name: 'et-radio-group',
    props: {
      // 默认选中的值，对应单选框的 name 属性
      value: null,
      // 布局方向 / 垂直布局 - vertical 水瓶布局 - horizontal
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
    methods: {
      change(value) {
        // 小程序绑定 v-model 不支持自定义 value 和 input
        this.$emit('input', value)
        this.update()
      },
      update() {
        this.$nextTick(() => {
          const children = this.getRadio()
          children.map(child => {
            child.update(this)
          })
        })
      },
      getRadio() {
        const children = getChildrenCompatibleH5(this)
        return children.map(child => {
          if (child['useRadio']) {
            return child
          } else {
            // 兼容 h5 radio 外层包裹其他标签或者自定义组件的场景
            return getChildInstance(child, 'useRadio')
          }
        })
      },
      useRadioGroup() {}
    }
  }
</script>
