<template>
  <div v-show="initialized" :class="['vc-table', 'vc-hairline--surround', customClass]" :style="tableStyled">
    <!-- #ifdef H5 -->
    <slot />
    <!-- #endif -->
    <view class="vc-table-header vc-hairline--bottom" :style="theadStyled">
      <view v-for="(item, index) in tableHeaders" :key="index"
        :class="['vc-table-row__item', verticalLine && index > 0 ? 'vc-hairline--left' : null]"
        :style="item.theadStyle">
        <view v-if="item.label" class="vc-table-header__title" :style="titleStyle">{{ item.label }}</view>
        <view v-if="item.tip" class="vc-table-header__sub">{{ item.tip }}</view>
      </view>
    </view>
    <view class="vc-table-body">
      <view v-for="(row, rowIndex) in data" :key="rowIndex" class="vc-table-row">
        <view v-for="(item, index) in tableHeaders" :key="index"
          :class="['vc-table-row__item', rowIndex > 0 ? 'vc-hairline--top' : null, verticalLine && index > 0 ? 'vc-hairline--left' : null]"
          :style="item.tbodyStyle">
          <view :style="{ 'color': rowIndex === active ? activeColor : 'inherit' }">{{ formatter(item.formatter,
              row[item.prop], row)
          }}</view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import { addUnit } from '../common/util'
import cssVariables from '@/common/lib/theme'

export default {
  name: 'vc-table',
  provide() {
    return {
      table: this
    }
  },
  props: {
    // 表格数据源
    data: {
      type: Array,
      default: () => [],
    },
    // 表格头背景色
    background: {
      type: String,
      default: '#F6F6F6'
    },
    // 边框线颜色
    borderColor: null,
    // 是否显示竖边框线
    verticalLine: {
      type: Boolean,
      default: true
    },
    // 圆角值
    radius: {
      type: Number,
      default: 0
    },
    // 高亮的表格行
    active: {
      type: Number,
      default: -1
    },
    // 高亮颜色
    activeColor: {
      type: String,
      default: cssVariables.primaryColor
    },
    // 自定义表格头样式
    theadStyle: null,
    // 自定义表格 class
    customClass: null,
    // 自定义表格头文本样式
    titleStyle: null,
    // 自定义单元格样式
    tdStyle: null
  },
  data() {
    return {
      initialized: false,
      tableHeaders: [],
      isActive: false,
    }
  },
  computed: {
    tableStyled({ radius, borderColor }) {
      let style = ''
      if (radius) style += `border-radius: ${radius}px;`
      if (borderColor) style += `border-color: ${borderColor};`
      return style
    },
    theadStyled({ background, radius, theadStyle }) {
      let style = `background: ${background};`
      if (radius) style += `border-radius: ${addUnit(radius / 2)} ${addUnit(radius / 2)} 0 0;`
      return style + theadStyle
    },
  },
  created() {
    this.children = []
  },
  mounted() {
    this.tableHeaders = this.children.map(child => {
      // Bug: :style 不支持 computed = fn(item) 语法
      let style = `align-items: ${child.align === 'left' ? 'flex-start' : child.align === 'right' ? 'flex-end' : child.align};`
      style += `width: ${child.width ? addUnit(child.width) : 'auto'};`
      style += `flex: ${child.width ? '0 0 auto' : '1 1 0'};`
      if (this.borderColor) style += `border-color: ${this.borderColor};`

      return {
        label: child.label,
        prop: child.prop,
        width: child.width,
        align: child.align,
        tip: child.tip,
        formatter: child.formatter,
        theadStyle: style,
        tbodyStyle: style + this.tdStyle,
      }
    })
    this.initialized = true
  },
  methods: {
    formatter(fn, value, item) {
      return typeof fn === 'function' ? fn(value, item, this) : value
    },
  }
}
</script>

<style lang="scss" scoped>
.vc-table {
  width: 100%;
}

.vc-table-header {
  display: flex;
}

.vc-table-header__sub {
  margin-top: 4rpx;
  font-size: 20rpx;
  color: #909090;
}

.vc-table-row {
  display: flex;
}

.vc-table-row__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 80rpx;
  padding: 12rpx 24rpx;
  color: $uni-text-color-sub;
  font-size: $uni-font-size-12;
  word-break: break-all;
}
</style>
