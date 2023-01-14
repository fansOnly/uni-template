<template>
  <!-- this will compile to a empty wxml file -->
  <div></div>
</template>
<script>
export default {
  name: 'vc-table-column',
  inject: ['table'],
  props: {
    // 表格头宽度
    width: null,
    // 表格头标题
    label: null,
    // 表格项属性映射
    prop: null,
    // 表格头标题备注
    tip: null,
    // 对齐方式
    align: {
      type: String,
      default: 'left'
    },
    // 对齐方式
    headerAlign: {
      type: String,
      default: 'left'
    },
    // 自定义数据格式化函数
    format: null
  },
  created() {
    this.table.children.push(this)
  },
}
</script>
