<template>
  <view class="vc-empty" :style="customStyle">
    <!-- slot icon -->
    <slot v-if="showIcon" name="icon"><vc-image :src="icon + '.png'" :width="width" :height="height"
        :static="useStatic" />
    </slot>
    <text v-if="text" class="vc-empty__text">{{ text }}</text>
  </view>
</template>

<script>
export default {
  name: 'vc-empty',
  props: {
    // 是否显示图标
    showIcon: {
      type: Boolean,
      default: true
    },
    // 图标路径
    icon: {
      type: String,
      default: 'icon-empty'
    },
    // 背景色
    background: {
      type: String,
    },
    // 请求结束显示文本
    text: {
      type: String,
      default: '暂无数据'
    },
    // 本地资源
    useStatic: {
      type: Boolean,
      default: false
    },
    // 图标宽度
    width: {
      type: [String, Number],
      default: 110
    },
    // 图标高度
    height: {
      type: [String, Number],
      default: 110
    },
    // 自定义组件样式
    customStyle: String
  },
  computed: {
    customStyled({ customStyle, background }) {
      let style = ''
      if (background) {
        style += `background: ${background};`
      }
      return style + customStyle
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/empty.scss';
</style>
