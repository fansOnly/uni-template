<template>
  <div class="et-collapse">
    <slot></slot>
  </div>
</template>

<script>
import { getChildrenCompatibleH5 } from '@/shared'
  export default {
    name: 'et-collapse',
    props: {
      // 默认展开的值，面板的 name 属性
      value: null,
      // 手风琴模式
      accordion: {
        type: Boolean,
        default: false
      }
    },
    data () {
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
    methods: {
      change({name, expanded}) {
        let data = null
        if (this.accordion) {
          if (this.type === 'boolean') {
            data = expanded ? true : false
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
          this.getCollapseItem().map(child => {
            child.initRender(active, firstInit)
          })
        })
      },
      getCollapseItem() {
        const children = getChildrenCompatibleH5(this)
        return children.filter(child => child['useCollapseItem'])
      },
      useCollapse() {}
    }
  }
</script>
