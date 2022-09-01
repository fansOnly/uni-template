<template>
  <et-popup :visible="visible" round position="bottom" :max-height="rowHeight * rows" border :close-on-click-overlay="closeOnClickOverlay" @click-overlay="clickOverlay" @close="close" @after-leave="show = false">
    <template slot="header">
      <view v-if="withHeader" class="et-picker-header et-hairline--bottom">
        <view v-if="showCancel" class="et-picker-button--cancel" @click="close">
          <template v-if="!closeable">{{cancelButtonText}}</template>
          <et-icon v-else name="cross" size="24" />
        </view>
        <view class="et-picker-header-title">{{title}}</view>
        <view v-if="showConfirm" class="et-picker-button--confirm" @click="onConfirm">{{confirmButtonText}}</view>
      </view>
    </template>
    <et-date-view ref="dateView" :visible="show" :values="values" :type="type" :fields="fields" :start="start" :end="end" :row-height="rowHeight" :rows="rows" @change="onChange"></et-date-view>
  </et-popup>
</template>

<script>
export default {
  name: 'et-picker',
  props: {
    // 显示开关
    visible: {
      type: Boolean,
      default: false
    },
    // 选择器的标题
    title: {
      type: String,
      default: ''
    },
    // 日期的值，默认当前日期
    values: {
      type: Array,
      default: () => []
    },
    /**
       * 选择器的类型
       * 1. 身份证日期 - ID-date
       * 2. 日期选择器 - date
       * 3. 时间选择器 - time
       * 4. 日期时间选择器 - datetime
       * 5. 季度选择器 - quarter
       */
    type: {
      type: String,
      default: 'date'
    },
    /**
       * 选择器的粒度
       * 为日期选择器时 有效值 year, month, day, quarter
       * 为时间选择器时 有效值 hour, minute, second
       * 为日期时间选择器时 有效值 hour, minute, second
       */
    fields: null,
    // 表示有效日期范围的开始，字符串格式为"YYYY-MM-DD hh:mm:ss"
    start: null,
    // 表示有效日期范围的结束，字符串格式为"YYYY-MM-DD hh:mm:ss"
    end: null,
    // 每一项的高度
    rowHeight: {
      type: Number,
      default: 40
    },
    // 显示的行数
    rows: {
      type: Number,
      default: 7
    },
    // 是否显示头部
    withHeader: {
      type: Boolean,
      default: true
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      default: false
    },
    // 显示确定按钮
    showConfirm: {
      type: Boolean,
      default: true
    },
    // 显示取消按钮
    showCancel: {
      type: Boolean,
      default: true
    },
    // 确认按钮文案
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    // 取消按钮文案
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    // 点击遮罩是否关闭菜单 - 透传 popup 组件
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: this.visible,
      dateValues: []
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) this.show = val
      },
      immediate: true,
    },
  },
  methods: {
    onChange(data) {
      this.dateValues = data
    },
    renRender(fields = this.fields) {
      this.$refs.dateView.setColumnData(fields)
    },
    onConfirm() {
      if (this.dateValues.length) {
        this.$emit('confirm', this.dateValues)
      }
      this.close()
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
  .et-picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 104rpx;
    padding: 0 32rpx;
  }
  .et-picker-button--cancel {
    color: #909090;
  }
  .et-picker-button--confirm {
    color: $uni-color-primary;
  }
</style>
