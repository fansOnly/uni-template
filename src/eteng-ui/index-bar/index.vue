<template>
  <!-- 页面级组件，依赖小程序的 pageScroll 事件 -->
  <div class="index-bar-wrapper">
    <slot />
    <!-- 滚动索引栏 -->
    <view v-if="ready" class="sidebar--fixed" :style="sidebarStyled">
      <view v-for="(item, index) in indexList" :key="index"
        :class="['sidebar-item', index === current ? 'is-active' : null]"
        :style="{'color': index === current ? activeColor : ''}" @click="onClickAnchor(item, index)">{{item}}</view>
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
    longList: {
      type: Boolean,
      default: false
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
      ready: false,
      len: 0,
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
    },
    current: {
      handler(val) {
        this.setStickyAnchor();
      },
      immediate: true
    },
    len: {
      handler(val) {
        val && this.init();
      },
      immediate: true
    }
  },
  created() {
    this.children = [];
    this.anchorRects = [];
  },
  mounted() {
    const [customNavigationStyle, navHeight] = getAppData(['customNavigationStyle', 'navHeight']);
    this.customNavigationStyle = customNavigationStyle;
    this.navHeight = navHeight;
  },
  methods: {
    init() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        await this.setRect();
        this.ready = true;
        this.timer = null;
      }, 0);
    },
    async onClickAnchor(item, index) {
      const keys = this.children.map(v => v.index);

      const existKeyIdx = keys.indexOf(item);
      if (existKeyIdx === -1) return;

      // Bug: 上级节点不能是 scroll-view 或者设置 overflow: auto
      uni.pageScrollTo({
        scrollTop: this.anchorRects[existKeyIdx].top,
        // Bug: selector 不生效？？？
        // selector: '.anchor-' + index,
        duration: 0
      });
    },
    onScroll(val) {
      if (!this.ready) return;

      if (this.longList) {
        if (this.timer2) clearTimeout(this.timer2);
        this.timer2 = setTimeout(() => {
          this.whenScroll(val);
          this.timer2 = null;
        }, 0);
      } else {
        this.whenScroll(val);
      }
    },
    whenScroll(scrollTop) {
      this.$nextTick(() => {
        // 滚动结束后判断滚动位置是否在索引区域
        if (this.boundary) {
          const { start, end } = this.boundary;
          if (scrollTop < start || scrollTop > end) {
            this.current = -1;
          } else {
            this.prev = this.current > -1 ? this.current : 0;
            this.current = this.getAnchorIndex(scrollTop);
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
    getActiveChild(index) {
      return this.children.find(child => child.index == index);
    },
    setRect() {
      return Promise.all([this.getAnchorsRect(), this.getWrapperRect()]);
    },
    getAnchorIndex(scrollTop) {
      let effectiveAnchors = [];
      let i = 0;
      const prevPos = this.anchorRects[this.prev].top;
      if (scrollTop > prevPos) {
        // 向下滚动
        effectiveAnchors = this.anchorRects.slice(this.prev);
        const max = effectiveAnchors.length - 1;
        while (i < effectiveAnchors.length) {
          if (scrollTop > effectiveAnchors[max].top) {
            i = max;
            break;
          } else if (scrollTop > effectiveAnchors[i].top) {
            i++;
          } else {
            i--;
            break;
          }
        }
      } else if (scrollTop < prevPos) {
        // 向上滚动
        effectiveAnchors = this.anchorRects.slice(0, this.prev);
        i = this.prev;
        while (i > 0) {
          if (scrollTop > effectiveAnchors[i - 1].top) {
            i--;
          } else {
            i++;
            break;
          }
        }
      }
      return this.indexList.map(v => v + '').indexOf(effectiveAnchors[i]?.index);
    },
    getAnchorsRect() {
      this.children.forEach(async (child) => {
        const childClassName = `.anchor-${child.index === '#' ? 'special' : child.index}`;
        const rect = await getRect(child, childClassName);
        const top = rect.top - (this.customNavigationStyle ? this.navHeight : 0) - this.offset;
        this.anchorRects.push({ index: child.index + '', name: childClassName, top, height: rect.height });
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
