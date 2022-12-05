<template>
  <vc-popup :visible="visible" :round="round" :duration="duration" :close-on-click-overlay="closeOnClickOverlay"
    :closeable="closeable" :close-icon-position="closeIconPosition" :custom-style="style" @click-overlay="clickOverlay"
    @close="close">
    <view class="vc-dialog-wrapper">
      <view class="vc-dialog-header">
        <view v-if="title" class="vc-dialog-header__title">{{ title }}</view>
        <slot v-else name="header"></slot>
      </view>
      <view class="vc-dialog-body">
        <view v-if="content" :class="{ 'vc-dialog-content--center': center }">{{ content }}</view>
        <slot v-else></slot>
      </view>
      <slot name="footer">
        <view v-if="showCancel || showConfirm"
          :class="['vc-dialog-footer', 'vc-hairline--top', reverse ? 'vc-dialog-footer--reverse' : null]">
          <view v-if="showCancel" class="vc-button--cancel">
            <vc-button :color="cancelButtonColor" block plain :border="false" hover-class="vc-dialog__button--hover"
              custom-style="height:46px;font-weight:500;" @click="onCancel">
              <vc-loading v-if="cancelLoading" type="spinner"></vc-loading>
              <template v-else>{{ cancelButtonText }}</template>
            </vc-button>
          </view>
          <view v-if="showConfirm"
            :class="['vc-button--confirm', showCancel ? reverse ? 'vc-hairline--right' : 'vc-hairline--left' : null]">
            <vc-button type="info" :color="confirmButtonColor" block plain :border="false"
              hover-class="vc-dialog__button--hover" custom-style="height:46px;font-weight:500;" @click="onConfirm">
              <vc-loading v-if="confirmLoading" type="spinner"></vc-loading>
              <template v-else>{{ confirmButtonText }}</template>
            </vc-button>
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
    offsetTop: {
      type: [String, Number],
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
    // 是否显示关闭图标 - 透传 popup 组件
    closeable: {
      type: Boolean,
      default: false
    },
    // 关闭图标位置 - 透传 popup 组件
    closeIconPosition: {
      type: String,
      default: 'right'
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
    customStyle: null,
  },
  data() {
    return {
      cancelLoading: false,
      confirmLoading: false,
    }
  },
  computed: {
    style() {
      let style = ''
      if (this.offsetTop) style += `margin-top: ${this.offsetTop};`
      return style + this.customStyle
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
    clickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.close()
    },
    close() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
  }
}
</script>

<style lang="scss" scoped>
.vc-dialog-wrapper {
  width: 85vw;
  border-radius: $uni-border-radius-8;
  background-color: #fff;
  overflow: hidden;
}

.vc-dialog-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vc-dialog-header__title {
  padding-top: 48rpx;
  font-weight: 500;
}

.vc-dialog-body {
  box-sizing: border-box;
  /* min-height: 90px; */
  padding: 56rpx 48rpx;
}

.vc-dialog-content--center {
  text-align: center;
}

.vc-dialog-footer {
  display: flex;
  align-items: center;
}

.vc-dialog-footer--reverse {
  flex-direction: row-reverse;
}

.vc-button--confirm,
.vc-button--cancel {
  flex: 1;
}
</style>
