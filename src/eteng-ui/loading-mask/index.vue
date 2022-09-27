<template>
  <view v-if="visible" class="et-loading-mask" :style="{'z-index': zIndex, 'background-color': background}" @touchmove.stop="noop">
    <et-loading :type="type" :size="size" :vertical="vertical" :color="color" />
  </view>
</template>

<script>
export default {
  name: 'et-loading-mask',
  props: {
    // 显示开关
    visible: {
      type: Boolean,
      default: false
    },
    // 层级
    zIndex: {
      type: Number,
      default: 2
    },
    // 加载类型 - 透传 loading 组件
    type: {
      type: String,
      default: 'spinner'
    },
    // 垂直布局 - 透传 loading 组件
    vertical: {
      type: Boolean,
      default: false
    },
    // 背景色
    background: {
      type: String,
      default: 'rgba(0, 0, 0, .1)'
    },
    // 图标及文案颜色 - 透传 loading 组件
    color: {
      type: String,
      default: '#fff'
    },
    // 图标大小 - 透传 loading 组件
    size: {
      type: [String, Number],
      default: 20
    },
  },
  methods: {
    // for prevent touchmove
    noop: function () {},
  }
};
</script>

<style lang="scss" scoped>
  .et-loading-mask {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
</style>
