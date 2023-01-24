<template>
  <charts-pie :chart-option="chartOptionPie" height="300"></charts-pie>
</template>

<script>
import ChartsPie from '../../components/echarts/pie'
export default {
  name: 'demo-pie',
  components: {
    ChartsPie
  },
  data() {
    return {
      // 饼状图 - 基础
      chartOptionPie: {
        series: {
          data: [
            { value: 1048, name: 'Search' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union' },
            { value: 300, name: 'Video' },
          ],
          top: 40,
          label: {
            show: true,
          }
        }
      },
    }
  }
}
</script>
