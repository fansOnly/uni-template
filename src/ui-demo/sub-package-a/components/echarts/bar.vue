<template>
  <view class="et-chart-wrapper" :style="{'height': height + 'px'}">
    <ec-canvas type="bar" :ec="{}" :option="option" @click="(evt, current) => $emit('click', evt, current)"></ec-canvas>
  </view>
</template>

<script>
import EcCanvas from './ec-canvas'
export default {
  name: 'et-charts-bar',
  components: {
    EcCanvas
  },
  props: {
    // 图表配置参数
    chartOption: {
      type: Object,
      default: () => {}
    },
    // 图表高度
    height: {
      type: [Number, String],
      default: 200
    }
  },
  data() {
    const { title = {}, legend = {}, grid = {}, tooltip = {}, xAxis = {}, yAxis = {}, series = {}, yAxisExtraOption = {}, yAxisExtraSeries = [], color = '#3264DC', barWidth = 'auto', ...rest } = this.chartOption
    return {
      option: {
        color,
        // 标题组件
        title,
        // 图例组件
        legend,
        // 直角坐标系内绘图网
        grid: {
          top: 10, // 带标题时需要设置更大
          left: 40,
          right: 10,
          bottom: 40,
          ...grid
        },
        // 提示框组件
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          padding: [0, 5],
          backgroundColor: '#fff',
          textStyle: {
            fontSize: 12
          },
          ...tooltip
        },
        // x 轴
        xAxis: {
          type: 'category',
          // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
          // boundaryGap: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            margin: 16,
            color: '#a2a2a2',
            fontSize: 13,
          },
          ...xAxis
        },
        // y 轴
        yAxis: [{
          nameTextStyle: {
            color: '#a2a2a2'
          },
          axisLabel: {
            color: '#a2a2a2',
            fontSize: 13,
          },
          splitLine: {
            lineStyle: {
              color: '#ebebeb',
              type: 'dashed',
            },
          },
          ...yAxis
        }, yAxisExtraOption /**双y轴配置项 */],
        // 数据源
        series: [
          {
            type: 'bar',
            barWidth,
            lineStyle: {
              width: 1,
            },
            ...series
          },
          // 多图例配置
          ...yAxisExtraSeries
        ],
        ...rest
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.et-chart-wrapper {
  width: 100%;
}
</style>
