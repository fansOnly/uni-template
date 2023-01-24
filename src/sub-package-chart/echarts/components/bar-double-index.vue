<template>
  <charts-bar :chart-option="chartOptionBarDoubleIndex" height="300"></charts-bar>
</template>

<script>
import ChartsBar from '../../components/echarts/bar'
export default {
  name: 'demo-bar-double-index',
  components: {
    ChartsBar
  },
  data() {
    return {
      // 柱状图 - 双指标
      chartOptionBarDoubleIndex: {
        color: ['#6D8BFA', '#4CD7E4'],
        legend: {
          left: 0,
          itemWidth: 7,
          icon: 'circle',
          textStyle: {
            color: '#A2A9B4',
          }
        },
        grid: {
          top: 40
        },
        xAxis: {
          data: ['理财', '存款'],
          axisLabel: {
            color: '#C0C0C0',
            fontSize: 10
          }
        },
        yAxis: {
          interval: 200,
          axisLabel: {
            color: '#C0C0C0',
            fontSize: 10
          },
          splitLine: {
            lineStyle: {
              color: '#E6E6E6',
              type: 'dotted',
            },
          },
        },
        series: {
          name: '存量',
          data: [220, -182]
        },
        yAxisExtraSeries: [{
          type: 'bar',
          barWidth: 'auto',
          lineStyle: {
            width: 1,
          },
          name: '新增',
          data: [320, 332]
        }]
      },
    }
  }
}
</script>
