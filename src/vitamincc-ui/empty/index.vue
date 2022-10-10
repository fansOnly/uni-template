<template>
  <view class="vc-empty-wrapper" :style="customStyle">
    <slot v-if="showIcon" name="icon"><vc-image :src="icon" :width="width" :height="height" :static="local" /></slot>
    <text v-if="tip" class="vc-empty-text">{{tip}}</text>
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
      default: 'icon-empty.png'
    },
    // 背景色
    background: {
      type: String,
      default: '#fff'
    },
    // 请求结束显示文本
    tip: {
      type: String,
      default: '暂无数据'
    },
    // 本地资源
    local: {
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
    customStyle: null
  },
  computed: {
    customStyled({ customStyle, background }) {
      let style = '';
      style += `background: ${background};`;
      return style + customStyle;
    }
  }
};
</script>

<style lang="scss" scoped>
  .vc-empty-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50rpx $uni-spacing-16;
  }
  .vc-empty-text {
    margin-top: $uni-spacing-12;
    color: $uni-text-color-sub;
    font-size: $uni-font-size-14;
    text-align: center;
  }
</style>
