<template>
  <et-popup :visible="visible" position="bottom" :round="round" :duration="duration" :close-on-click-overlay="closeOnClickOverlay" @click-overlay="clickOverlay">
    <view :class="['et-popup-container', round ? 'et-popup--round' : null]" :style="styled">
      <view v-for="(item,index) in data" :key="index" class="et-action-sheet-item et-hairline--bottom" @click="onSelect(item)">
        <view :class="['et-action-sheet--flex', item.disabled ? 'et-action-sheet--disabled' : 'tap-effect']">
          <view class="et-action-sheet-info">
            <view class="et-action-sheet__title" :style="{'color': value === item[valueProp] ? color : 'inherit'}">{{item[textProp]}}</view>
          </view>
        </view>
      </view>
      <template v-if="showCancel">
        <view class="et-action-sheet__gap"></view>
        <et-button size="large" :border="false" plain block color="#737373" @click="cancel">{{cancelText}}</et-button>
      </template>
    </view>
  </et-popup>
</template>

<script>
import cssVariables from '@/shared/css-variables'
export default {
  name: 'et-action-sheet',
  props: {
    // 显示开关 - 透传 popup 组件
    visible: {
      type: Boolean,
      default: false,
    },
    // 渲染源数据
    data: {
      type: Array,
      default: () => []
    },
    // 激活的值
    value: null,
    // height 默认自适应，如果内容过多，需要设置高度防止内容过溢出屏幕
    height: {
      type: [Number, String],
      default: 'auto',
    },
    // 是否显示圆角 - 透传 popup 组件
    round: {
      type: Boolean,
      default: false,
    },
    // 动画时长 ms - 透传 popup 组件
    duration: {
      type: Number,
      default: 300,
    },
    // 激活的颜色
    color: {
      type: String,
      default: cssVariables.primaryColor
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
    // 自定义组件样式
    customStyle: null
  },
  computed: {
    unitedHeight() {
      return this.height === 'auto' ? this.height : this.addUnit(this.height)
    },
    styled() {
      let style = ''
      style += `height: ${this.unitedHeight};`
      style += `color: ${cssVariables.textColor};`
      return this.mergeStyles([style, this.customStyle])
    },
  },
  methods: {
    onSelect(item) {
      if (item.disabled) return
      if (this.value === item[this.valueProp] && !this.refresh) return
      this.$emit('select', item)
      this.closeOnClickAction && this.close()
    },
    clickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.close()
    },
    cancel() {
      this.$emit('cancel')
      this.$emit('update:visible', false)
    },
    close() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
  }
}
</script>

<style lang="scss" scoped>
  .et-popup-container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
  }
  .et-popup--round {
    border-top-left-radius: 16rpx;
    border-top-right-radius: 16rpx;
  }
  .et-popup__body {
    max-height: 70%;
  }
  .et-action-sheet-item:last-child:after {
    display: none;
  }
  .et-action-sheet--flex {
    display: flex;
    align-items: center;
    height: 104rpx;
    padding: 0 32rpx;
  }
  .et-action-sheet--disabled {
    // opacity: .5;
    color: $uni-text-color-disabled;
    cursor: not-allowed;
  }
  .et-action-sheet-info {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .et-action-sheet__title {
    &.is-active {
      color: $uni-color-primary;
      /* font-weight: 500; */
    }
  }
  .et-action-sheet__gap {
    height: 24rpx;
    background-color: $uni-bg-grey;
  }
</style>
