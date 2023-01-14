<template>
  <div v-show="initialized" :class="['vc-table', 'vc-hairline--surround', customClass]" :style="tableStyle">
    <!-- #ifdef H5 -->
    <slot />
    <!-- #endif -->
    <view class="vc-table__header vc-hairline--bottom" :style="theadStyle">
      <view v-for="(item, index) in tableHeaders" :key="index"
        :class="['vc-table__row-item', border && index > 0 ? 'vc-hairline--left' : null]" :style="item.theadStyle">
        <view v-if="item.label" class="vc-table__header-title" :style="titleStyle">{{ item.label }}</view>
        <view v-if="item.tip" class="vc-table__header-sub">{{ item.tip }}</view>
      </view>
    </view>
    <view class="vc-table__body">
      <view v-for="(row, rowIndex) in data" :key="rowIndex"
        :class="['vc-table__row', stripe && (rowIndex + 1) % 2 === 0 ? 'is-even' : null]">
        <view v-for="(item, index) in tableHeaders" :key="index"
          :class="['vc-table__row-item', rowIndex > 0 ? 'vc-hairline--top' : null, border && index > 0 ? 'vc-hairline--left' : null]"
          :style="item.tbodyStyle">
          <text :class="['vc-table__body-text', rowIndex === active ? 'is-active' : null]">{{
            format(item.format,
            row[item.prop], row)
          }}</text>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
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
    // 是否显示竖边框线
    border: {
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
    stripe: {
      type: Boolean,
      default: false
    },
    // 高亮颜色
    activeColor: String,
    // 自定义表格 class
    customClass: null,
    // 自定义表格头样式
    theadStyle: String,
    // 自定义表格头文本样式
    titleStyle: String,
    // 自定义单元格样式
    tdStyle: String
  },
  data() {
    return {
      initialized: false,
      tableHeaders: [],
      isActive: false,
    }
  },
  computed: {
    tableStyle() {
      let style = ''
      if (this.radius) {
        style += `border-radius: ${this.radius}px;`
      }
      return style
    },
  },
  created() {
    this.children = []
  },
  mounted() {
    this.tableHeaders = this.children.map(child => {
      // Bug: :style 不支持 computed = fn(item) 语法
      let style = ''
      style += `width: ${child.width ? `${child.width}px` : 'auto'};`
      style += `flex: ${child.width ? '0 0 auto' : '1 1 0'};`

      return {
        label: child.label,
        prop: child.prop,
        width: child.width,
        align: child.align,
        tip: child.tip,
        format: child.format,
        theadStyle: style + this.setAlign(child.headerAlign),
        tbodyStyle: style + this.setAlign(child.align) + (this.tdStyle ?? ''),
      }
    })
    this.initialized = true
  },
  methods: {
    format(fn, value, item) {
      return typeof fn === 'function' ? fn(value, item, this) : value
    },
    setAlign(value) {
      return `align-items: ${value === 'left' ? 'flex-start' : value === 'right' ? 'flex-end' : value};`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/table.scss';
</style>
