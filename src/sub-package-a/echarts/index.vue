<template>
  <view class="page-wrapper">
    <view>这个是分包页面</view>
    <!-- <demo-block title="折线图 - 基础" padding background="#fff">
      <charts-line :chart-option="chartOptionLine" height="300"></charts-line>
    </demo-block>

    <demo-block title="折线图 - 填充" padding background="#fff">
      <charts-line :chart-option="chartOptionLineBg"></charts-line>
    </demo-block>

    <demo-block title="折线图 - 双 y 轴" padding background="#fff">
      <charts-line :chart-option="chartOptionLineDoubleY"></charts-line>
    </demo-block>

    <demo-block title="柱状图 - 基础" padding background="#fff">
      <charts-bar :chart-option="chartOptionBar"></charts-bar>
    </demo-block>

    <demo-block title="柱状图 - 双指标" padding background="#fff">
      <charts-bar :chart-option="chartOptionBarDoubleIndex"></charts-bar>
    </demo-block>

    <demo-block title="饼状图 - 基础" padding background="#fff">
      <charts-pie :chart-option="chartOptionPie"></charts-pie>
    </demo-block>

    <demo-block title="柱状图 - 环形图" padding background="#fff">
      <charts-pie :chart-option="chartOptionRing"></charts-pie>
    </demo-block> -->
  </view>
</template>

<script>
// import DemoBlock from '@/components/demo-block';
// import ChartsLine from '../components/echarts/line';
// import ChartsBar from '../components/echarts/bar';
// import ChartsPie from '../components/echarts/pie';
export default {
  components: {
    // DemoBlock,
    // ChartsLine,
    // ChartsBar,
    // ChartsPie,
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
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/common/demo.scss';
</style>
