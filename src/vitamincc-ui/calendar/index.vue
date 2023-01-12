<template>
  <view>
    <vc-popup v-if="usePopup" :visible="visible" :title="title" max-height="auto" position="bottom" :round="round"
      border closeable :close-on-click-overlay="closeOnClickOverlay" @click-overlay="clickOverlay" @close="onClose">
      <vc-calendar :value="selectedDate" :type="type" :title="title" :max-date="maxDate" :min-date="minDate"
        :max-range="maxRange" :formatter="formatter" :allow-same-day="allowSameDay" @change="onChange"
        @over-range="onOverRange"></vc-calendar>
      <slot v-if="withButton" name="button">
        <vc-button type="primary" size="mini" block round :disabled="disabled" custom-style="margin: 32rpx 32rpx 0;"
          @click="onConfirm">{{
            buttonText
          }}</vc-button>
      </slot>
    </vc-popup>

    <vc-calendar v-else :value="value" :type="type" :title="title" :max-date="maxDate" :min-date="minDate"
      :max-range="maxRange" :allow-same-day="allowSameDay" :formatter="formatter" @change="onChange"
      @over-range="onOverRange">
    </vc-calendar>
  </view>
</template>

<script>
import VcCalendar from './calendar.vue'
import props from './props'

export default {
  name: 'vc-calendar',
  components: {
    VcCalendar
  },
  props: {
    // 显示开关 - 透传 popup 组件
    visible: {
      type: Boolean,
      default: false
    },
    // 显示弹窗
    usePopup: {
      type: Boolean,
      default: true
    },
    // 弹窗标题 - 透传 popup 组件
    title: {
      type: String,
      default: '日期选择'
    },
    // 是否显示圆角 - 透传 popup 组件
    round: {
      type: Boolean,
      default: true,
    },
    // 是否显示关闭图标 - 透传 popup 组件
    closeable: {
      type: Boolean,
      default: true
    },
    // 点击遮罩是否关闭菜单 - 透传 popup 组件
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    // 显示确认按钮
    withButton: {
      type: Boolean,
      default: true
    },
    // 按钮文案
    buttonText: {
      type: String,
      default: '确定'
    },
    ...props
  },
  data() {
    return {
      selectedDate: '',
      disabled: false
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.selectedDate = val ? this.value : ''
        this.disabled = !this.value.length
      },
      immediate: true,
    }
  },
  methods: {
    onChange(value, disabled) {
      if (!this.usePopup) {
        this.$emit('change', value)
        this.$emit('input', value)
      } else {
        this.selectedDate = value
        this.disabled = disabled
      }
    },
    onConfirm() {
      if (!this.selectedDate?.length) {
        return uni.showToast({
          title: '日期不能为空',
          icon: 'none',
        })
      }
      if (this.type === 'range' && this.selectedDate.length !== 2) {
        return uni.showToast({
          title: '请选择结束日期',
          icon: 'none',
        })
      }
      this.$emit('confirm', this.selectedDate)
      this.$emit('update:visible', false)
    },
    onOverRange() {
      this.$emit('over-range')
    },
    clickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.onClose()
    },
    onClose() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
  },
}
</script>
