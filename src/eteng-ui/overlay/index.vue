<template>
<!-- 需要将 class 挂载在 et-transition 上，不然遮罩层级有bug -->
  <et-transition :visible="visible" :animation-name="name" :duration="duration" @click="close">
    <view class="et-overlay" :style="styled">
      <slot />
    </view>
  </et-transition>
</template>

<script>
import { appendStyles } from '../common/util';
import cssVariables from '@/common/lib/theme';
import { getAppData } from '../common/global-data';
export default {
  name: 'et-overlay',
  props: {
    // 显示开关
    visible: {
      type: Boolean,
      default: false
    },
    // 动画名称
    name: {
      type: String,
      default: 'fade'
    },
    // 动画时间 ms
    duration: {
      type: Number,
      default: 300
    },
    // 层级
    zIndex: {
      type: Number,
      default: +cssVariables.overlayZIndex
    },
    // 锁定滚动穿透
    lockScroll: {
      type: Boolean,
      default: true
    },
    // 是否可点击
    clickable: {
      type: Boolean,
      default: true
    },
    // 自定义样式
    customStyle: null
  },
  computed: {
    styled() {
      const [customNavigationStyle, navHeight] = getAppData(['customNavigationStyle', 'navHeight']);
      let style = `z-index: ${this.zIndex};`;
      if (customNavigationStyle) style += `top: ${navHeight}px;`;
      return appendStyles([style, this.customStyle]);
    }
  },
  methods: {
    close() {
      if (!this.clickable) return;
      this.$emit('click');
      this.$emit('update:visible', false);
    }
  }
};
</script>

<style lang="scss" scoped>
  .et-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  </style>
