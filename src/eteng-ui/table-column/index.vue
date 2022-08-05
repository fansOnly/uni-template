<template></template>
<script>
  export default {
    name: 'et-table-column',
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
        default: 'center'
      },
      // 表格头背景色
      background: {
        type: String,
        default: '#F6F6F6',
      },
      // 自定义数据格式化函数
      formatter: null
    },
    methods: {
      useTableColumn() {}
    }
  }
</script>
