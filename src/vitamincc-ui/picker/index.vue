<template>
  <vc-popup :visible="visible" round position="bottom" :max-height="rowHeight * rows"
    :close-on-click-overlay="closeOnClickOverlay" class="vc-picker" @click-overlay="onClickOverlay" @close="onClose"
    @after-leave="show = false">
    <template slot="header">
      <view v-if="withHeader" class="vc-picker__header vc-hairline--bottom">
        <view v-if="showCancel" class="vc-picker__cancel" @click="onClose">
          <vc-icon v-if="closeable" name="cross" size="24" />
          <template v-else>{{ cancelButtonText }}</template>
        </view>
        <view class="vc-picker__title">{{ title }}</view>
        <view v-if="showConfirm" class="vc-picker__confirm" @click="onConfirm">{{ confirmButtonText }}</view>
      </view>
    </template>
    <view class="vc-picker__body" :style="{ 'height': rowHeight * rows + 'px' }" @touchmove.stop="noop">
      <vc-picker-column v-for="(item, index) in options" :key="index" class="vc-picker__column" :options="item"
        :current="activeIndexes[index]" :rows="rows" :row-height="rowHeight"
        :style="{ 'max-width': 'calc(100% / ' + options.length + ');' }"
        @change="onChange($event, index)"></vc-picker-column>
      <template v-if="options.length">
        <view class="vc-picker__mask" :style="{ 'background-size': '100% ' + (rowHeight * (rows - 1)) / 2 + 'px' }">
        </view>
        <view :class="['vc-picker__line vc-hairline--top-bottom', rows % 2 === 0 ? null : 'is-adapt']"
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
      style += `background-size: 100% ${((rowHeight * (rows - 1)) / 2)}px;`
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
        const arr = []
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
      this.onClose()
    },
    onClickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.activeIndexes.length = 0
      this.onClose()
    },
    onClose() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    noop() { }
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/picker.scss';
</style>
