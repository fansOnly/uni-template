<template>
  <vc-popup :visible="visible" direction="btt" :round="round" :duration="duration"
    :close-on-click-overlay="closeOnClickOverlay" @click-overlay="clickOverlay">
    <view :class="['vc-action-sheet', round ? 'is-round' : null]" :style="customStyle">
      <view v-for="(item, index) in options" :key="index"
        :class="['vc-action-sheet__item', index < options.length - 1 ? 'vc-hairline--bottom' : null, value === item[valueProp] ? 'is-active' : null, item.disabled ? 'is-disabled' : null]"
        :style="(value === item[valueProp] && color) ? `color: ${color}` : ''" @click="onClickItem(item)">
        <vc-icon v-if="item.icon" :name="item.icon" custom-style="margin-right: 6px;" />
        <text class="vc-action-sheet__text">{{ item[textProp] }}</text>
      </view>
      <template v-if="showCancel">
        <view class="vc-action-sheet__gap"></view>
        <view class="vc-action-sheet__cancel" hover-class="vc-action-sheet__cancel--hover" @click="onCancel">
          {{ cancelText }}
        </view>
      </template>
    </view>
  </vc-popup>
</template>

<script>
export default {
  name: 'vc-action-sheet',
  props: {
    // 显示开关 - 透传 popup 组件
    visible: {
      type: Boolean,
      default: false,
    },
    // 渲染源数据
    options: {
      type: Array,
      default: () => []
    },
    // 激活的值
    value: null,
    // 是否显示圆角 - 透传 popup 组件
    round: {
      type: Boolean,
      default: false,
    },
    // 激活的颜色
    color: {
      type: String,
    },
    // 文本属性映射
    textProp: {
      type: String,
      default: 'title',
    },
    // 值属性映射
    valueProp: {
      type: String,
      default: 'value',
    },
    // 值没有变化时是否触发刷新
    refresh: {
      type: Boolean,
      default: false
    },
    // 动画时长 ms - 透传 popup 组件
    duration: {
      type: Number,
      default: 300,
    },
    // 是否显示取消按钮 - 透传 popup 组件
    showCancel: {
      type: Boolean,
      default: false,
    },
    // 取消按钮文案 - 透传 popup 组件
    cancelText: {
      type: String,
      default: '取消',
    },
    // 点击遮罩是否关闭菜单 - 透传 popup 组件
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    // 是否在点击选项后关闭
    closeOnClickAction: {
      type: Boolean,
      default: true,
    },
    // 自定义组件样式
    customStyle: String
  },
  methods: {
    onClickItem(item) {
      if (item.disabled) return
      if (this.value === item[this.valueProp] && !this.refresh) return
      this.$emit('select', item)
      this.closeOnClickAction && this.close()
    },
    clickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.close()
    },
    onCancel() {
      this.$emit('cancel')
      this.$emit('update:visible', false)
    },
    close() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    noop() { }
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/action-sheet.scss';
</style>
