<template>
  <charts-bar :chart-option="chartOptionBar" height="300"></charts-bar>
</template>

<script>
import ChartsBar from '../../components/echarts/bar'
export default {
  name: 'demo-bar',
  components: {
    ChartsBar
  },
  data() {
    return {
      // 柱状图 - 基础
      chartOptionBar: {
        grid: {
          top: 40
        },
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: {
          name: '新增用户',
          data: [120, 200, 150, 80, 70, 110, 130]
        },
      },
    }
  }
}
</script>
