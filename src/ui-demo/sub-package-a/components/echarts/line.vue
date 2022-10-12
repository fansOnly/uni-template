<template>
  <view class="vc-chart-wrapper" :style="{ 'height': height + 'px' }">
    <ec-canvas type="line" :ec="{}" :option="option" @click="(evt, current) => $emit('click', evt, current)"></ec-canvas>
  </view>
</template>

<script>
import EcCanvas from './ec-canvas'

export default {
  name: 'vc-charts-line',
  components: {
    EcCanvas
  },
  props: {
    // 图表配置参数
    chartOption: {
      type: Object,
      default: () => { }
    },
    // 图表高度
    height: {
      type: [Number, String],
      default: 200
    }
  },
  data() {
    const { title = {}, legend = {}, grid = {}, tooltip = {}, xAxis = {}, yAxis = {}, series = {}, yAxisExtraOption = {}, yAxisExtraSeries = [], color = '#3264DC', ...rest } = this.chartOption
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
          left: 10,
          right: 10,
          bottom: 40,
          containLabel: true, // 防止标签溢出
          ...grid
        },
        // 提示框组件
        tooltip: {
          show: true,
          trigger: 'axis',
          padding: [0, 5],
          backgroundColor: color,
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          ...tooltip
        },
        // 坐标轴指示器
        axisPointer: {
          type: 'line',
          lineStyle: {
            color,
            type: 'solid'
          },
        },
        // x 轴
        xAxis: {
          type: 'category',
          // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
          // boundaryGap: false,
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
          type: 'value',
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
            type: 'line',
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
  }
}
</script>

<style lang="scss" scoped>
.vc-chart-wrapper {
  width: 100%;
}
</style>
