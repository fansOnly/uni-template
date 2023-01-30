<template>
  <!-- vc-switch 编译后会被微信内置样式影响 -->
  <view :class="['vc-switcher', checked ? 'is-active' : null, disabled ? 'is-disabled' : null, customClass]"
    :style="styled" @tap="click">
    <view :class="['vc-switcher__node', checked ? 'is-active' : null]"></view>
    <view v-if="showText" :class="['vc-switcher__value', checked ? null : 'is-inactive']">
      <view :class="['vc-switcher__text', checked ? 'is-active' : 'is-inactive']">{{
        checked? activeText: inactiveText
      }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'vc-switch',
  props: {
    // 默认值
    value: {
      type: [String, Number, Boolean],
      default: true
    },
    // 组件尺寸
    size: Number,
    // 激活的值
    activeValue: {
      type: [String, Number, Boolean],
      default: true
    },
    // 未激活的值
    inactiveValue: {
      type: [String, Number, Boolean],
      default: false
    },
    // 高亮颜色
    activeColor: {
      type: String,
    },
    // 未高亮的颜色
    inactiveColor: {
      type: String,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示提示文案
    showText: {
      type: Boolean,
      default: false
    },
    // 开启文案
    activeText: {
      type: String,
      default: 'Y'
    },
    // 关闭文案
    inactiveText: {
      type: String,
      default: 'N'
    },
    // 自定义样式
    customClass: null
  },
  computed: {
    checked: {
      get() {
        return this.value === this.activeValue
      },
      set(val) {
        const value = (val ? this.activeValue : this.inactiveValue) ?? val
        this.$emit('change', value)
        this.$emit('input', value)
      }
    },
    styled() {
      let style = ''
      if (this.size) {
        style += `font-size: ${this.size}px;`
      }
      if (this.inactiveColor && !this.checked) {
        style += `background-color: ${this.inactiveColor};`
      } else if (this.activeColor && this.checked) {
        style += `background-color: ${this.activeColor};`
      }
      return style
    }
  },
  methods: {
    click() {
      if (this.disabled) return
      this.checked = !this.checked
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/switch.scss';
</style>
