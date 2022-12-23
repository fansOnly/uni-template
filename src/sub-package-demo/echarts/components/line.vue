<template>
  <charts-line :chart-option="chartOptionLine" height="300"></charts-line>
</template>

<script>
import ChartsLine from '../../components/echarts/line'
export default {
  name: 'demo-line',
  components: {
    ChartsLine
  },
  data() {
    return {
      // 折线图 - 基础
      chartOptionLine: {
        grid: {
          left: 0,
          right: 15
        },
        tooltip: {
          formatter: '{c0}人'
        },
        xAxis: {
          data: ['2016', '2017', '2018', '2019', '2020', '2021'],
          boundaryGap: false,
        },
        yAxis: {
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: {
          data: [35.1, 36.25, 31.1, 33.8, 13, 10, 34.0],
          smooth: true,
          symbol: 'none',
          emphasis: {
            scale: true
          }
        },
      },
    }
  }
}
</script>
