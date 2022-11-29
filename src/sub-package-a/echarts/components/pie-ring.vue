<template>
  <charts-pie :chart-option="chartOptionRing" height="300"></charts-pie>
</template>

<script>
import ChartsPie from '../../components/echarts/pie'
export default {
  name: 'demo-pie-ring',
  components: {
    ChartsPie
  },
  data() {
    return {
      // 饼状图 - 环形图
      chartOptionRing: {
        color: ['#0375FF', '#23D39B', '#FFAC2F', '#FF5355', '#C653FF'],
        legend: {
          show: false
        },
        series: {
          data: [
            { value: 1048, name: 'Search' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union' },
            { value: 300, name: 'Video' },
          ],
          radius: ['40%', '70%'],
          label: {
            show: false,
          }
        }
      },
    }
  }
}
</script>
