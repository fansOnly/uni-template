<template>
  <div v-show="initialized" :class="['et-table', 'et-hairline--surround', customClass]" :style="tableStyled">
    <slot />
    <view class="et-table-header et-hairline--bottom" :style="theadStyled">
      <view v-for="(item, index) in tableHeaders" :key="index" :class="['et-table-row__item', verticalLine && index > 0 ? 'et-hairline--left' : null]" :style="item.theadStyle">
        <view v-if="item.label" class="et-table-header__title" :style="titleStyle">{{item.label}}</view>
        <view v-if="item.tip" class="et-table-header__sub">{{item.tip}}</view>
      </view>
    </view>
    <view class="et-table-body">
      <view v-for="(row, rowIndex) in data" :key="rowIndex" class="et-table-row">
        <view v-for="(item, index) in tableHeaders" :key="index" :class="['et-table-row__item', rowIndex > 0 ? 'et-hairline--top' : null, verticalLine && index > 0 ?  'et-hairline--left' : null]" :style="item.tbodyStyle">
        <view :style="{'color': rowIndex === active ? activeColor : 'inherit'}">{{formatter(item.formatter, row[item.prop], row)}}</view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
  import { getChildrenCompatibleH5 } from '@/shared'
  import cssVariables from '@/shared/css-variables'
  export default {
    name: 'et-table',
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
      titleStyle: null
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
      theadStyled({ background, radius, theadStyle, addUnit }) {
        let style = `background: ${background};`
        if (radius) style += `border-radius: ${addUnit(radius/2)} ${addUnit(radius/2)} 0 0;`
        return this.mergeStyles([style, theadStyle])
      },
    },
    mounted() {
      const tableColumns = this.getTableColumns()
      this.tableHeaders = tableColumns.map(child => {
        // Bug: :style 不支持 computed = fn(item) 语法
        let style = `align-items: ${child.align === 'left' ? 'flex-start' : child.align === 'right' ? 'flex-end' : child.align};`
        style += `width: ${child.width ? this.addUnit(child.width) : 'auto'};`
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
          tbodyStyle: style,
        }
      })
      this.initialized = true
    },
    methods: {
      formatter(fn, value, item) {
        return typeof fn === 'function' ? fn(value, item, this) : value
      },
      getTableColumns() {
        const children = getChildrenCompatibleH5(this)
        return children.filter(child => child['useTableColumn'])
      },
    }
  }
</script>

<style lang="scss" scoped>
.et-table {
  width: 100%;
}
.et-table-header {
  display: flex;
}
.et-table-header__sub {
  margin-top: 4rpx;
  font-size: 20rpx;
  color: #909090;
}
.et-table-row {
  display: flex;
}
.et-table-row__item {
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
