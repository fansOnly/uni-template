<template>
<!-- 页面级组件，依赖小程序的 pageScroll 事件 -->
  <div class="index-bar-wrapper">
    <slot />
    <!-- 滚动索引栏 -->
    <view class="sidebar--fixed" :style="sidebarStyled">
      <view v-for="(item, index) in indexList" :key="index" :class="['sidebar-item', index === current ? 'is-active' : null]" :style="{'color': index === current ? activeColor : ''}" @click="onClickAnchor(item, index)">{{item}}</view>
    </view>
  </div>
</template>

<script>
import { getRect } from '../common/util';
import { getAppData } from '../common/global-data';

function genIndexList(withSpecial = true) {
  const arr = [];
  const charCodeOfA = 'A'.charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    arr.push(String.fromCharCode(charCodeOfA + i));
  }
  return withSpecial ? arr.concat('#') : arr;
}

export default {
  name: 'et-index-bar',
  provide() {
    return {
      indexBar: this
    };
  },
  props: {
    // 页面滚动距离
    scrollTop: {
      type: Number,
      default: 0
    },
    /**
       * 位置偏差场景处理
       * 1. 页面存在吸顶元素
       */
    offset: {
      type: Number,
      default: 0
    },
    // 右侧索引列表
    indexList: {
      type: Array,
      default: () => genIndexList()
    },
    // 右侧索引高亮颜色
    activeColor: {
      type: String,
      default: '#3264DC'
    },
    // 锚点吸顶
    sticky: {
      type: Boolean,
      default: false
    },
    // 吸顶位移
    stickyOffsetTop: {
      type: [Number, String],
      default: 0,
      validator(val) {
        return /^\d+$/.test(String(val));
      }
    },
  },
  data() {
    return {
      // 记录所有的索引内容位置
      anchorRects: [],
      // 当前索引项
      current: -1,
      timer: null,
      navHeight: 0,
      customNavigationStyle: false
    };
  },
  computed: {
    sidebarStyled({ navHeight, customNavigationStyle }) {
      let style = '';
      if (customNavigationStyle) {
        style += `margin-top: ${navHeight / 2}px;`;
      }
      return style;
    }
  },
  watch: {
    scrollTop: {
      handler(val) {
        this.onScroll(val);
      },
      immediate: true
    },
    current: {
      handler(val) {
        this.setStickyAnchor();
      },
      immediate: true
    }
  },
  created() {
    this.children = [];
  },
  mounted() {
    const [customNavigationStyle, navHeight] = getAppData(['customNavigationStyle', 'navHeight']);
    this.customNavigationStyle = customNavigationStyle;
    this.navHeight = navHeight;
    /**
     * Bug: 设置自定义导航时，如果页面不是首页，获取的节点 top 值会有误差（navHeight）
     * 延迟获取
     */
    setTimeout(() => {
      this.getAnchorsRect();
      this.getWrapperRect();
    }, 60);
  },
  methods: {
    async onClickAnchor(item, index) {
      const keys = this.children.map(v => v.index);

      const existKeyIdx = keys.indexOf(item);
      if (existKeyIdx === -1) return;

      // Bug: 上级节点不能是 scroll-view 或者设置 overflow: auto
      uni.pageScrollTo({
        scrollTop: this.anchorRects[existKeyIdx].top,
        // Bug: selector 不生效？？？
        // selector: '.anchor-' + index,
        duration: 100
      });
    },
    async onScroll(val) {
      if (!this.anchorRects.length) {
        await this.getAnchorsRect();
        return;
      }
      this.$nextTick(() => {
        // 滚动结束后判断滚动位置是否在索引区域
        if (this.boundary) {
          const { start, end } = this.boundary;
          if (val < start || val > end) {
            return (this.current = -1);
          }
        }
        for (let i = 1; i < this.anchorRects.length - 1; i++) {
          const currentAnchor = this.anchorRects[i]; const preAnchor = this.anchorRects[i - 1]; const nextAnchor = this.anchorRects[i + 1];
          if (val >= currentAnchor.top && val < nextAnchor.top) {
            // 向下滚动
            this.current = this.getAnchorIndexByKey(currentAnchor.index);
          } else if (val >= preAnchor.top && val < currentAnchor.top) {
            // 向上滚动
            this.current = this.getAnchorIndexByKey(preAnchor.index);
          } else if (val >= nextAnchor.top) {
            // 滚动到底
            this.current = this.getAnchorIndexByKey(nextAnchor.index);
          }
        }
      });
    },
    setStickyAnchor() {
      if (!this.sticky) return;
      this.$nextTick(() => {
        this.children.forEach((child, index) => {
          child.setStickyAnchor(index === this.current, this.stickyOffsetTop);
        });
      });
    },
    getAnchorIndexByKey(key) {
      return this.indexList.map(v => v + '').indexOf(key);
    },
    getActiveChild(index) {
      return this.children.find(child => child.index == index);
    },
    getAnchorsRect() {
      this.$nextTick(() => {
        this.children.forEach(async (child) => {
          const childClassName = `.anchor-${child.index === '#' ? 'special' : child.index}`;
          const rect = await getRect(child, childClassName);
          const top = rect.top - (this.customNavigationStyle ? this.navHeight : 0) - this.offset;
          this.anchorRects.push({ index: child.index + '', name: childClassName, top, height: rect.height });
        });
      });
    },
    async getWrapperRect() {
      const rect = await getRect(this, '.index-bar-wrapper');
      const top = rect.top - (this.customNavigationStyle ? this.navHeight : 0) - this.offset;
      this.boundary = { start: top, end: rect.bottom };
    },
  },
};
</script>

<style lang="scss" scoped>
  .index-bar-wrapper {
    height: 100%;
  }
  .sidebar--fixed {
    position: fixed;
    top: 50%;
    right: 16rpx;
    transform: translateY(-50%);
    z-index: 9;
  }
  .sidebar-item {
    padding: 6rpx;
    font-size: 28rpx;
    line-height: 1;
    text-align: center;
    border-radius: 8rpx;
    &.is-active {
      background: #d8e9f7;
      font-weight: 500;
    }
  }
</style>
