<template>
  <div class="index-bar-anchor">
    <view class="anchor--placeholder" :style="{ 'height': isSticky ? addUnit(height) : 0 }"></view>
    <view :class="['anchor-' + (index === '#' ? 'special' : index), isSticky ? 'index-bar-anchor--sticky' : null, customClass]" :style="anchorStyled">
      <slot>{{index}}</slot>
    </view>
  </div>
</template>

<script>
import { getRect } from '@/shared';
import { addUnit } from '../common/util';
import { getAppData } from '../common/globalData';

export default {
  name: 'et-index-anchor',
  inject: {
    parent: {
      from: 'indexBar',
      default: null
    }
  },
  props: {
    // 索引值
    index: {
      type: [Number, String],
      default: 0
    },
    // 自定义类
    customClass: null,
    // 自定义样式
    customStyle: null
  },
  data() {
    return {
      addUnit,
      height: 0,
      isSticky: false,
      offsetTop: 0,
      customNavigationStyle: false,
      navHeight: 0
    };
  },
  computed: {
    anchorStyled({ offsetTop, navHeight, customNavigationStyle, isSticky, customStyle }) {
      if (!isSticky) return customStyle;
      /* #ifdef H5 */
      offsetTop += 44;
      /* #endif */
      return `top: ${offsetTop + (customNavigationStyle ? navHeight : 0) }px;${customStyle ? customStyle : ''}`;
    }
  },
  async mounted() {
    const [customNavigationStyle, navHeight] = getAppData(['customNavigationStyle', 'navHeight']);
    this.parent.children.push(this);
    this.customNavigationStyle = customNavigationStyle;
    this.navHeight = navHeight;
    const rect = await getRect(this, '.index-bar-anchor');
    this.height = rect.height;
  },
  methods: {
    setStickyAnchor(val = false, top = 0) {
      this.isSticky = val;
      this.offsetTop = top;
    },
    useIndexAnchor() {}
  },
};
</script>

<style lang="scss" scoped>
.index-bar-anchor--sticky {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: #fff;
  color: $uni-color-primary;
  z-index: 88;
}
</style>
