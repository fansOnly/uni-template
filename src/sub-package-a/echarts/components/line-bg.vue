<template>
  <charts-line :chart-option="chartOptionLineBg" height="300"></charts-line>
</template>

<script>
import ChartsLine from '../../components/echarts/line'
export default {
  name: 'demo-line-bg',
  components: {
    ChartsLine
  },
  data() {
    return {
      // 折线图 - 填充
      chartOptionLineBg: {
        grid: {
          right: 15
        },
        tooltip: {
          formatter: '{c0}%'
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
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#3264DC', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#fff', // 100% 处的颜色
                },
              ],
            },
          },
          symbol: 'none',
        },
      },
    }
  }
}
</script>
