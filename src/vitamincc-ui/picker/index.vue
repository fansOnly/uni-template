<template>
  <vc-popup :visible="visible" round position="bottom" :max-height="rowHeight * rows" border
    :close-on-click-overlay="closeOnClickOverlay" body-style="padding-bottom: 32rpx;" @click-overlay="clickOverlay"
    @close="close" @after-leave="show = false">
    <template slot="header">
      <view v-if="withHeader" class="vc-picker-header vc-hairline--bottom">
        <view v-if="showCancel" class="vc-picker-button--cancel" @click="close">
          <template v-if="!closeable">{{ cancelButtonText }}</template>
          <vc-icon v-else name="cross" size="24" />
        </view>
        <view class="vc-picker-header-title">{{ title }}</view>
        <view v-if="showConfirm" class="vc-picker-button--confirm" @click="onConfirm">{{ confirmButtonText }}</view>
      </view>
    </template>
    <view class="vc-picker-body" :style="{ 'height': rowHeight * rows + 'px' }" @touchmove.stop="noop">
      <vc-picker-column v-for="(item, index) in options" :key="index" class="vc-picker-col" :options="item"
        :current="activeIndexes[index]" :rows="rows" :row-height="rowHeight"
        :style="{ 'max-width': 'calc(100% / ' + options.length + ');' }" @change="onChange($event, index)"></vc-picker-column>
      <template v-if="options.length">
        <view class="vc-picker-mask" :style="{ 'background-size': '100% ' + (rowHeight * (rows - 1)) / 2 + 'px' }"></view>
        <view :class="['vc-picker-line vc-hairline--top-bottom', rows % 2 === 0 ? null : 'adapt']"
          :style="{ 'height': rowHeight + 'px' }"></view>
      </template>
    </view>
  </vc-popup>
</template>

<script>
import { addUnit } from '../common/util'

export default {
  name: 'vc-picker',
  props: {
    // 显示开关
    visible: {
      type: Boolean,
      default: false
    },
    // 渲染源数据
    options: {
      type: Array,
      default: () => []
    },
    // 默认选中的项
    values: {
      type: Array,
      default: () => []
    },
    // 默认 column 项的 value 属性
    optionKey: {
      type: String,
      default: 'value'
    },
    // 选择器的标题
    title: {
      type: String,
      default: ''
    },
    // 配置项
    // 1. rollback 当前列发生滚动时，后面的列是否回滚到初始位置
    // config: [{ column: 1, rollback: false  }]
    config: {
      type: Array,
      default: () => []
    },
    // 多列选择器是否级联关系
    cascade: {
      type: Boolean,
      default: false
    },
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
    // 显示头部
    withHeader: {
      type: Boolean,
      default: true
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
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
      activeIndexes: new Array(this.options.length).fill(0), // 默认索引
    }
  },
  computed: {
    bodyStyled({ rowHeight, rows }) {
      // tip: 这里的单位要设为 px，rpx 在真机下转换有偏差
      let style = ''
      style += `height: ${rowHeight * rows}px;`
      return style
    },
    activeStyled({ rowHeight }) {
      // tip: 这里的单位要设为 px，rpx 在真机下转换有偏差
      let style = ''
      style += `height: ${rowHeight}px;`
      return style
    },
    maskStyled({ rowHeight, rows }) {
      // note: 遮罩效果
      let style = ''
      style += `background-size: 100% ${addUnit((rowHeight * (rows - 1)) / 2)};`
      return style
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) this.show = val
        val && this.initValues()
      },
      immediate: true,
    },
    values: {
      handler(val) {
        this.initValues()
      },
      deep: true
    }
  },
  methods: {
    initValues() {
      if (this.optionKey === 'value') {
        let arr = []
        this.options.map((columnData, i) => {
          const index = columnData.findIndex(v => v[this.optionKey] === this.values[i])
          arr.push(index > -1 ? index : 0)
        })
        this.activeIndexes = arr
      } else if (this.optionKey === 'index') {
        this.activeIndexes = [...this.values]
      }
    },
    onChange(index, column) {
      // console.log(`[debug] >>> 当前操作第${column}列，第${index}项`);
      // 找到当前的操作的选择器列，更新后续的选择器列
      this.activeIndexes.splice(column, 1, index)
      for (let i = column; i < this.options.length; i++) {
        if (this.cascade) this.$emit('update', column, index)
        let rollback = false
        if (this.config.length) {
          const columnCfg = this.config.find(v => v.column === column) || { rollback: false }
          rollback = columnCfg.rollback
        }
        // 当前列滚动时，后面的列是否回滚初始位置
        rollback && (i < this.options.length - 1) && this.activeIndexes.splice(i + 1, 1, 0)
      }
    },
    onConfirm() {
      const data = this.activeIndexes.reduce((acc, cur, index) => [...acc, this.options[index][cur]], [])
      this.$emit('confirm', data)
      this.close()
    },
    clickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.activeIndexes.length = 0
      this.close()
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
.vc-picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 104rpx;
  padding: 0 32rpx;
}

.vc-picker-button--cancel {
  color: #909090;
}

.vc-picker-button--confirm {
  color: $uni-color-primary;
}

.vc-picker-body {
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.vc-picker-mask {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4)), linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
  background-repeat: no-repeat;
  background-position: top, bottom;
  backface-visibility: hidden;
  z-index: 2;
  pointer-events: none;
}

.vc-picker-line {
  position: absolute;
  top: 50%;
  right: 0;
  width: 100%;
  z-index: 1;
  pointer-events: none;

  &.adapt {
    transform: translateY(-50%);
  }
}

.vc-picker-col {
  flex: 1;
  overflow: hidden;
}
</style>
