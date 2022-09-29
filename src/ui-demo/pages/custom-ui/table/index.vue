<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding background="#fff">
      <et-table :data="tableData">
        <et-table-column prop="date" label="日期"></et-table-column>
        <et-table-column prop="name" label="姓名"></et-table-column>
        <et-table-column prop="address" label="地址"></et-table-column>
      </et-table>
    </demo-block>

    <demo-block title="设置高亮" padding background="#fff">
      <et-button type="primary" block @click="randomActive">随机高亮 - {{ active }}</et-button>
      <et-table :data="tableData" :active="active">
        <et-table-column prop="date" label="日期"></et-table-column>
        <et-table-column prop="name" label="姓名"></et-table-column>
        <et-table-column prop="address" label="地址"></et-table-column>
      </et-table>
    </demo-block>

    <demo-block title="表格头备注" padding background="#fff">
      <et-table :data="tableData">
        <et-table-column prop="date" label="日期"></et-table-column>
        <et-table-column prop="name" label="姓名"></et-table-column>
        <et-table-column prop="address" label="地址" tip="上海市"></et-table-column>
      </et-table>
    </demo-block>

    <demo-block title="格式化数据" padding background="#fff">
      <et-table :data="tableData">
        <et-table-column prop="date" label="日期" :formatter="formatterDate"></et-table-column>
        <et-table-column prop="name" label="姓名"></et-table-column>
        <et-table-column prop="address" label="地址"></et-table-column>
      </et-table>
    </demo-block>

    <demo-block title="圆角边框" padding background="#fff">
      <et-table :data="tableData" :radius="20">
        <et-table-column prop="date" label="日期"></et-table-column>
        <et-table-column prop="name" label="姓名"></et-table-column>
        <et-table-column prop="address" label="地址"></et-table-column>
      </et-table>
    </demo-block>

    <demo-block title="自定义样式" padding background="#fff">
      <et-table :data="tableData" td-style="background:#ccc;">
        <et-table-column prop="date" label="日期"></et-table-column>
        <et-table-column prop="name" label="姓名"></et-table-column>
        <et-table-column prop="address" label="地址"></et-table-column>
      </et-table>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block';
export default {
  components: {
    DemoBlock
  },
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
    };
  },
  methods: {
    randomActive() {
      if (this.active === this.tableData.length - 1) {
        this.active = 0;
      } else {
        this.active++;
      }
    },
    formatterDate(value) {
      return value + '%';
    }
  },
};
</script>
