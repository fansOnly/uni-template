<!--
 * 1. 临时解决滚动穿透方案
 * 用 scroll-view 包裹页面
 * 2. 安卓兼容问题，scroll-view上拉导致input输入框上移
 * input 聚焦时禁止滚动
 -->
<template>
  <view v-if="scrollable"><slot /></view>
  <scroll-view v-else :scroll-y="shouldPageScroll" :scroll-top="scrollTop" enhanced :bounces="false"
    :style="{ 'height': windowHeight + 'px' }" @scroll="evt => $emit('on-scroll', evt.detail)">
    <slot />
  </scroll-view>
</template>

<script>
import { getAppData } from '../common/globalData';

export default {
  name: 'et-scroll-lock',
  props: {
    scrollTop: {
      type: Number,
      default: 0
    },
    useScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      windowHeight: wx.getSystemInfoSync().windowHeight,
      shouldPageScroll: true
    };
  },
  computed: {
    scrollable() {
      return this.shouldPageScroll && this.useScroll;
    }
  },
  mounted() {
    this.shouldPageScroll = getAppData('shouldPageScroll');
  }
};
</script>
