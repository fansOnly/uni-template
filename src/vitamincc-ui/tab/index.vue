<template>
  <div class="vc-tab-wrapper">
    <!-- Bug: scroll-view 标签在开发者工具和 iphone 11 下 底部元素定位在 y 轴上有错位 -->
    <scroll-view scroll-x scroll-with-animation :scroll-into-view="currentView" enhanced scroll-anchoring
      :show-scrollbar="false"
      :class="['vc-tab', border ? 'vc-hairline--bottom' : null, shouldFix ? 'vc-tab--fixed' : null]"
      :style="tabBarStyled">
      <view class="vc-tab-scroll--flex">
        <view v-for="(item, index) in options" :id="'tab-' + index" :key="index" class="vc-tab-item"
          @click="onClick(item, index)">
          <view :class="['vc-tab__text', item.showDot ? 'vc-tab__text-dot' : null, index === current ? 'vc-tab__text--strong' : null]"
            :style="{ 'color': index === current ? activeColor : defaultColor }">{{ item[textKey] }}</view>
        </view>
      </view>
      <view class="vc-tab__bar" :class="[initialized ? 'is-active' : 'is-first']" :style="barStyled"></view>
    </scroll-view>
    <view v-if="shouldFix" :style="heightStyled"></view>
  </div>
</template>

<script>
import { getRect, requestAnimationFrame, compareVersion, addUnit } from '../common/util';
import cssVariables from '@/common/lib/theme';
import { getAppData } from '../common/global-data';

export default {
  name: 'vc-tab',
  props: {
    // 渲染源数据
    options: {
      type: Array,
      default: () => [],
    },
    // 默认值
    value: {
      type: Number,
      default: 0,
    },
    // 高度
    height: {
      type: [String, Number],
      default: 44
    },
    // 页面滚动距离
    scrollTop: {
      type: Number,
      default: 0,
    },
    // 是否吸顶
    // 需要配合页面的滚动事件使用
    fixed: {
      type: Boolean,
      default: false,
    },
    // 是否显示下边框
    border: {
      type: Boolean,
      default: true,
    },
    // 索引层级
    zIndex: {
      type: Number,
      default: 5
    },
    // 默认文案颜色
    defaultColor: {
      type: String,
      default: '#8C8C8C',
    },
    // 高亮文案颜色
    activeColor: {
      type: String,
      default: cssVariables.primaryColor
    },
    // 线条宽度
    lineWidth: {
      type: [Number, String],
      default: 28,
    },
    // 线条高度
    lineHeight: {
      type: [Number, String],
      default: 2,
    },
    // 线条颜色
    lineBackground: {
      type: String,
      default: cssVariables.primaryColor
    },
    // 文本属性樱色
    textKey: {
      type: String,
      default: 'text',
    },
    // 值属性樱色
    valueKey: {
      type: String,
      default: 'value',
    },
    // 自定义样式覆盖
    customStyle: null
  },
  data() {
    return {
      initialized: false,
      shouldFix: false, // 是否吸顶
      top: 0, // 组件到页面顶部的距离
      width: 0, // 每个 tab 项的宽度
      current: 0, // 当前激活的滑块索引
      bottom: 0, // 滑块在 y 轴的底部定位值
    };
  },
  computed: {
    heightStyled({ height }) {
      return `height: ${addUnit(height)};`;
    },
    tabBarStyled({ shouldFix, zIndex, customStyle, heightStyled }) {
      const [customNavigationStyle, navHeight] = getAppData(['customNavigationStyle', 'navHeight']);
      let top = 0;
      // #ifdef MP-WEIXIN
      if (customNavigationStyle && shouldFix) {
        top = navHeight;
      }
      // #endif
      // #ifdef H5
      if (shouldFix) {
        top = 44;
      }
      // #endif
      let style = `top: ${top}px;`;
      style += `z-index: ${zIndex};`;
      return style + heightStyled + customStyle;
    },
    baseStyle({ lineWidth, lineHeight, lineBackground, bottom }) {
      let style = '';
      style += `width: ${addUnit(lineWidth)};`;
      style += `height: ${lineHeight}px;`;
      style += `background: ${lineBackground};`;
      style += `bottom: ${bottom};`;
      return style;
    },
    barStyled({ width, current, baseStyle }) {
      let style = '';
      const left = width * current + width / 2;
      style += `left: ${left}px;`;
      return style + baseStyle;
    },
    currentView({ current }) {
      return 'tab-' + current;
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.current) {
          this.current = val;
        }
      },
      immediate: true
    },
  },
  async mounted() {
    // Bug: A，B 页面都设置自定义导航且包含 tab 组件时， A 页面 跳转 B 页面 获取的 top 值不一致
    // 会产生 navHeight 的误差
    setTimeout(async () => {
      await this.resolveTabRect();

      // Bug: 模拟器、iOS 15.4+ 系统下，滑块位置会往下偏移 20px 左右
      const { platform, system } = wx.getSystemInfoSync();
      let shouldFixPosition = platform === 'devtools';
      if (platform === 'ios') {
        const [_, version] = system.split(' ');
        shouldFixPosition = compareVersion(version, '15.4.1') > -1;
      }
      if (shouldFixPosition) {
        this.bottom = '20px';
      }

      await requestAnimationFrame();
      // 初始化时滑块不产生动画效果
      if (!this.initialized) {
        setTimeout(() => {
          this.initialized = true;
        }, 300);
      }

      if (this.fixed) {
        this.$watch('scrollTop', val => {
          if (val >= this.top) {
            this.shouldFix = true;
          } else {
            this.shouldFix = false;
          }
        }, {
          immediate: true
        });
      }
    }, 60);
  },
  methods: {
    onClick(item, index) {
      if (this.current !== index) {
        this.current = index;
        this.$emit('click-item', item, index);
      }
    },
    async resolveTabRect() {
      const [customNavigationStyle, navHeight] = getAppData(['customNavigationStyle', 'navHeight']);
      const rect = await getRect(this, '.vc-tab-item');
      this.width = rect.width;
      this.top = rect.top - (customNavigationStyle ? navHeight : 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.vc-tab {
  display: flex;
  position: relative;
  height: 96rpx;
  background-color: #fff;
  overflow-y: hidden;
}

.vc-tab--fixed {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
}

.vc-tab-scroll--flex {
  display: flex;
  align-items: center;
  height: 100%;
}

.vc-tab-item {
  flex: 1;
  box-sizing: border-box;
  position: relative;
  min-width: 80px;
  padding: 0 $uni-spacing-16;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.vc-tab__text {
  display: flex;
  font-size: $uni-font-size-14;
  text-align: center;
}
.vc-tab__text-dot::after {
  content: "";
  display: block;
  width: 16rpx;
  height: 16rpx;
  background: #f00;
  border-radius: 100%;
  transform: translate(-7rpx,-2rpx);
}

.vc-tab__text--strong {
  font-weight: 500;
}

.vc-tab__bar {
  position: absolute;
  bottom: 0;
  border-radius: 4rpx;
  transform: translateX(-50%);
  &.is-first {
    /* animation: fadeIn ease 60ms; */
  }
  &.is-active {
  transition-timing-function: ease;
  transition-duration: 300ms;
  transition-property: left;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* #ifdef H5 */
.vc-tab-wrapper ::v-deep .uni-scroll-view::-webkit-scrollbar {
  display: none;
}
/* #endif */
</style>
