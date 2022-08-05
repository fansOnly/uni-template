<template>
  <view class="page-wrapper" style="">
    <view class="gap"></view>
    <div class="demo-title">基础用法</div>
    <div class="demo-body">
      <et-table :data="tableData">
        <et-table-column prop="date" label="日期"></et-table-column>
        <et-table-column prop="name" label="姓名"></et-table-column>
        <et-table-column prop="address" label="地址"></et-table-column>
      </et-table>
    </div>

    <view class="gap"></view>
    <div class="demo-title">设置高亮</div>
    <div class="demo-body">
      <et-button type="primary" block @click="randomActive">随机高亮 - {{active}}</et-button>
      <et-table :data="tableData" :active="active">
        <et-table-column prop="date" label="日期"></et-table-column>
        <et-table-column prop="name" label="姓名"></et-table-column>
        <et-table-column prop="address" label="地址"></et-table-column>
      </et-table>
    </div>

    <view class="gap"></view>
    <div class="demo-title">表格头备注</div>
    <div class="demo-body">
      <et-table :data="tableData">
        <et-table-column prop="date" label="日期"></et-table-column>
        <et-table-column prop="name" label="姓名"></et-table-column>
        <et-table-column prop="address" label="地址" tip="上海市"></et-table-column>
      </et-table>
    </div>

    <view class="gap"></view>
    <div class="demo-title">格式化数据</div>
    <div class="demo-body">
      <et-table :data="tableData">
        <et-table-column prop="date" label="日期" :formatter="formatterDate"></et-table-column>
        <et-table-column prop="name" label="姓名"></et-table-column>
        <et-table-column prop="address" label="地址"></et-table-column>
      </et-table>
    </div>

    <view class="gap"></view>
    <div class="demo-title">圆角边框</div>
    <div class="demo-body">
      <et-table :data="tableData" :radius="20">
        <et-table-column prop="date" label="日期"></et-table-column>
        <et-table-column prop="name" label="姓名"></et-table-column>
        <et-table-column prop="address" label="地址"></et-table-column>
      </et-table>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      active: 1
    }
  },
  methods: {
    randomActive() {
      this.active = ~~(Math.random() * this.tableData.length)
    },
    formatterDate(value) {
      return value + '%'
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
