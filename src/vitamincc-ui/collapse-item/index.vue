<template>
  <div class="vc-collapse-item">
    <vc-cell :title="title" :text="text" :border="ifBorder" :disabled="disabled" @click="onClick">
      <template #title>
        <!-- slot title -->
        <slot name="title" />
      </template>
      <template #text>
        <!-- slot text -->
        <slot name="text" />
      </template>
      <template #extra>
        <vc-icon :class="['vc-collapse-item__icon', expanded ? 'is-expanded' : null]" :name="icon" />
      </template>
    </vc-cell>
    <view :class="['vc-collapse-item__body', animation ? 'is-animation' : null]"
      :style="{ 'height': expanded ? height + 'px' : 0 }">
      <view class="vc-collapse-item__content vc-hairline--bottom">
        <!-- slot default -->
        <slot />
      </view>
    </view>
  </div>
</template>

<script>
import { getRect } from '../common/util'

export default {
  name: 'vc-collapse-item',
  inject: ['collapse'],
  props: {
    // 面板的值属性
    name: null,
    // 左侧标题 - 透传
    title: null,
    // 右侧文本内容 - 透传
    text: null,
    // 右侧图标
    icon: {
      type: String,
      default: 'arrow-right'
    },
    // 是否显示标题下边框 - 透传
    border: {
      type: Boolean,
      default: true
    },
    // 是否禁用当前面板 - 透传
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否折叠组的末尾
    isLast: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      animation: false,
      expanded: false,
      height: 0,
    }
  },
  computed: {
    ifBorder() {
      return this.expanded ? this.border : this.border && !this.isLast
    }
  },
  watch: {
    expanded: {
      handler(val) {
        val && this.getCollapseContentHeight()
      },
      immediate: true
    }
  },
  created() {
    this.collapse.children.push(this)
  },
  mounted() {
    if (!this.collapse) return
  },
  methods: {
    initRender(val, firstInit = false) {
      this.animation = !firstInit
      if (Array.isArray(val)) {
        this.expanded = val.includes(this.name)
      } else {
        if (typeof val === 'boolean') {
          this.expanded = val
        } else {
          this.expanded = this.name === val
        }
      }
    },
    onClick() {
      if (this.disabled) return
      this.collapse.change({ name: this.name, expanded: !this.expanded })
    },
    getCollapseContentHeight() {
      this.$nextTick(async () => {
        const rect = await getRect(this, '.vc-collapse-item__content')
        this.height = rect.height
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/collapse-item.scss';
</style>
