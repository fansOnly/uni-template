<template>
  <charts-line :chart-option="chartOptionLineDoubleY" height="300"></charts-line>
</template>

<script>
import ChartsLine from '../../components/echarts/line'
export default {
  name: 'demo-line-double-y',
  components: {
    ChartsLine
  },
  data() {
    return {
      // 折线图 - 双 y 轴
      chartOptionLineDoubleY: {
        legend: {
          show: false
        },
        grid: {
          top: 40,
        },
        tooltip: {
          show: true,
          backgroundColor: 'rgba(0, 0, 0, .4)',
        },
        xAxis: {
          data: ['2016', '2017', '2018', '2019', '2020', '2021'],
          boundaryGap: false,
        },
        yAxis: {
          name: '余额(元）',
        },
        series: {
          name: '余额(元）',
          data: [35.1, 36.25, 31.1, 33.8, 13, 10, 34.0],
          smooth: true,
          symbol: 'none',
          lineStyle: {
            width: 2
          },
        },
        yAxisExtraOption: {
          type: 'value',
          name: '转介人数(人）',
          nameTextStyle: {
            color: '#a2a2a2'
          },
          axisLabel: {
            color: '#a2a2a2',
            fontSize: 13,
          },
          min: 0,
          max: 400,
          interval: 100,
        },
        yAxisExtraSeries: [{
          name: '转介人数(人）',
          data: [50, 165, 180, 350, 265, 100],
          yAxisIndex: 1,
          symbol: 'none',
          smooth: true,
          lineStyle: {
            width: 2,
            color: '#F3793A',
          },
        }]
      },
    }
  }
}
</script>
