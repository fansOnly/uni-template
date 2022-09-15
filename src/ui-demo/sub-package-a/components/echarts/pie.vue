<template>
  <view class="et-chart-wrapper" :style="{'height': height + 'px'}">
    <ec-canvas type="pie" :ec="{}" :option="option" @click="(evt, current) => $emit('click', evt, current)"></ec-canvas>
  </view>
</template>

<script>
import EcCanvas from './ec-canvas'
export default {
  name: 'et-charts-pie',
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
    },
    // x 轴渲染源数据
    seriesData: {
      type: Array,
      default: () => [],
    },
    // 系列名称，用于 tooltip 的显示，legend 的图例筛选
    seriesName: {
      type: String,
      default: ''
    },
    // 标题配置项
    titleOption: {
      type: Object,
      default: () => {}
    },
    // 图例组件配置项
    legendOption: () => {},
    // 调色盘颜色列表
    color: {
      type: Array,
      default: () => ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
    },
    // 饼图的半径
    radius: {
      type: [Number, String, Array],
      default: [0, '70%']
    },
    // 图形上的文本标签
    label: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const { title = {}, legend = {}, tooltip = {}, series = {}, color = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'], ...rest } = this.chartOption
    return {
      option: {
        // 调色盘颜色列表
        color,
        // 标题组件
        title,
        // 图例组件
        legend: {
          top: 10,
          ...legend
        },
        // 提示框组件
        tooltip: {
          trigger: 'item',
          textStyle: {
            fontSize: 12
          },
          borderWidth: 0,
          borderColor: 'transparent',
          padding: 5
        },
        // 数据源
        series: [
          {
            type: 'pie',
            top: 10,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            ...series
          },
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
