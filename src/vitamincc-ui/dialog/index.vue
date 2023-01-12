<template>
  <vc-popup :visible="visible" :round="round" :offset="offset" :duration="duration"
    :close-on-click-overlay="closeOnClickOverlay" :closeable="false" :custom-style="customStyle"
    @click-overlay="onClickOverlay" @close="onClose">
    <view class="vc-dialog">
      <view class="vc-dialog__header">
        <view v-if="title" class="vc-dialog__header-title">{{ title }}</view>
        <!-- slot header -->
        <slot v-else name="header"></slot>
      </view>
      <view class="vc-dialog__body">
        <view v-if="content" :class="['vc-dialog__content', center ? 'is-center' : null]">{{ content }}</view>
        <!-- slot default -->
        <slot v-else />
      </view>
      <!-- slot footer -->
      <slot name="footer">
        <view v-if="showCancel || showConfirm"
          :class="['vc-dialog__footer', 'vc-hairline--top', reverse ? 'is-reverse' : null]">
          <view v-if="showCancel" class="vc-dialog__button is-cancel" @click="onCancel">
            <vc-loading v-if="cancelLoading" type="spinner"></vc-loading>
            <template v-else>{{ cancelButtonText }}</template>
          </view>
          <view v-if="showConfirm"
            :class="['vc-dialog__button is-confirm', showCancel ? reverse ? 'vc-hairline--right' : 'vc-hairline--left' : null]"
            @click="onConfirm">
            <vc-loading v-if="confirmLoading" type="spinner"></vc-loading>
            <template v-else>{{ confirmButtonText }}</template>
          </view>
        </view>
      </slot>
    </view>
  </vc-popup>
</template>

<script>
export default {
  name: 'vc-dialog',
  props: {
    // 显示开关 - 透传 popup 组件
    visible: {
      type: Boolean,
      default: false
    },
    // 弹窗标题
    title: null,
    // 弹窗内容
    content: null,
    // 内容居中
    center: {
      type: Boolean,
      default: false
    },
    // 弹窗 Y 轴位移 - 透传 popup 组件
    offset: {
      type: String,
      default: '-10%'
    },
    // 弹窗动画时长 ms - 透传 popup 组件
    duration: {
      type: Number,
      default: 300
    },
    // 是否显示圆角 - 透传 popup 组件
    round: {
      type: Boolean,
      default: true
    },
    // 是否反转按钮顺序，默认左取消，右确认
    reverse: {
      type: Boolean,
      default: false
    },
    // 显示确认按钮
    showConfirm: {
      type: Boolean,
      default: true
    },
    // 显示取消按钮
    showCancel: {
      type: Boolean,
      default: true
    },
    // 确认按钮颜色
    confirmButtonColor: {
      type: String,
      default: '#3264DC'
    },
    // 取消按钮颜色
    cancelButtonColor: {
      type: String,
      default: '#252525'
    },
    // 确认按钮文案
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    // 取消按钮文案
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    // 点击遮罩是否关闭菜单
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    },
    // 弹窗关闭前的回调
    beforeClose: null,
    // 自定义组件样式
    customStyle: String,
  },
  data() {
    return {
      cancelLoading: false,
      confirmLoading: false,
    }
  },
  methods: {
    async onConfirm() {
      let result = true
      if (this.beforeClose && typeof this.beforeClose === 'function') {
        this.confirmLoading = true
        result = await this.beforeClose({ confirm: true })
        this.confirmLoading = false
      }
      if (!result) return
      this.$emit('update:visible', false)
      this.$emit('confirm')
    },
    async onCancel() {
      let result = true
      if (this.beforeClose && typeof this.beforeClose === 'function') {
        this.cancelLoading = true
        result = await this.beforeClose({ cancel: true })
        this.cancelLoading = false
      }
      if (!result) return
      this.$emit('update:visible', false)
      this.$emit('cancel')
    },
    onClickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.onClose()
    },
    onClose() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/dialog.scss';
</style>
