<template>
  <view>
    <vc-popup v-if="popupable" :visible="visible" :title="title" max-height="auto" position="bottom" :round="round"
      border closeable :close-on-click-overlay="closeOnClickOverlay" @click-overlay="clickOverlay" @close="close">
      <vc-calendar :value="selectedDate" :type="type" :title="title" :max-date="maxDate" :min-date="minDate"
        :max-range="maxRange" :row-height="rowHeight" :background="background" :formatter="formatter"
        :allow-same-day="allowSameDay" @change="onChange"></vc-calendar>
      <view v-if="withButton" class="vc-button">
        <slot name="button">
          <vc-button type="primary" size="mini" block round @click="onConfirm">{{ buttonText }}</vc-button>
        </slot>
      </view>
    </vc-popup>

    <vc-calendar v-else :value="value" :type="type" :title="title" :max-date="maxDate" :min-date="minDate"
      :max-range="maxRange" :row-height="rowHeight" :background="background" :allow-same-day="allowSameDay"
      :formatter="formatter" @change="onChange">
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
    popupable: {
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
      selectedDate: ''
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.selectedDate = val ? this.value : ''
      },
      immediate: true,
    }
  },
  methods: {
    onChange(value) {
      if (!this.popupable) {
        this.$emit('change', value)
        this.$emit('input', value)
      } else {
        this.selectedDate = value
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
    clickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.close()
    },
    close() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.vc-button {
  padding: 32rpx;
}
</style>
