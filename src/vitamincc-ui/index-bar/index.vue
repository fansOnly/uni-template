<template>
  <!-- 页面级组件，依赖小程序的 pageScroll 事件 -->
  <div class="vc-index-bar">
    <slot />
    <!-- 滚动索引栏 -->
    <view v-if="ready" class="vc-index-bar__sidebar" :style="sidebarStyled">
      <view v-for="(item, index) in indexList" :key="index"
        :class="['vc-index-bar__sidebar-item', index === current ? 'is-active' : null]"
        :style="{ 'color': index === current && color ? color : '' }" @click="onClickAnchor(item, index)">{{ item }}
      </view>
    </view>
  </div>
</template>

<script>
import { getRect } from '../common/util'
import { getAppData } from '../common/global-data'

function genIndexList(withSpecial = true) {
  const arr = []
  const charCodeOfA = 'A'.charCodeAt(0)
  for (let i = 0; i < 26; i++) {
    arr.push(String.fromCharCode(charCodeOfA + i))
  }
  return withSpecial ? arr.concat('#') : arr
}

export default {
  name: 'vc-index-bar',
  provide() {
    return {
      indexBar: this
    }
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
    color: String,
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
        return /^\d+$/.test(String(val))
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
      isCustomNavigation: false
    }
  },
  computed: {
    sidebarStyled() {
      let style = ''
      if (this.isCustomNavigation) {
        style += `margin-top: ${this.navHeight / 2}px;`
      }
      return style
    }
  },
  watch: {
    scrollTop: {
      handler(val) {
        this.onScroll(val)
      },
    },
    current: {
      handler(val) {
        this.setStickyAnchor()
      },
      immediate: true
    },
    len: {
      handler(val) {
        val && this.init()
      },
      immediate: true
    }
  },
  created() {
    this.children = []
    this.anchorRects = []
  },
  mounted() {
    const [isCustomNavigation, navHeight] = getAppData(['isCustomNavigation', 'navHeight'])
    this.isCustomNavigation = isCustomNavigation
    this.navHeight = navHeight
  },
  methods: {
    init() {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        await this.setRect()
        this.ready = true
        this.timer = null
      }, 60)
    },
    async onClickAnchor(item, index) {
      const keys = this.children.map(v => v.index)

      const existKeyIdx = keys.indexOf(item)
      if (existKeyIdx === -1) return

      // Bug: 上级节点不能是 scroll-view 或者设置 overflow: auto
      uni.pageScrollTo({
        scrollTop: this.anchorRects[existKeyIdx].top,
        // Bug: selector 不生效？？？
        // selector: '.anchor-' + index,
        duration: 0
      })
    },
    onScroll(val) {
      if (!this.ready) return

      this.$nextTick(() => {
        if (this.longList) {
          if (this.timer2) clearTimeout(this.timer2)
          this.timer2 = setTimeout(() => {
            this.whenScroll(val)
            this.timer2 = null
          }, 60)
        } else {
          this.whenScroll(val)
        }
      })
    },
    whenScroll(scrollTop) {
      // 滚动结束后判断滚动位置是否在索引区域
      if (this.boundary) {
        const { start, end } = this.boundary
        if (scrollTop < start || scrollTop > end) {
          this.current = -1
        } else {
          this.current = this.getAnchorIndex(scrollTop)
        }
      }
    },
    getAnchorIndex(scrollTop) {
      let key = ''
      for (let i = 1; i < this.anchorRects.length - 1; i++) {
        const currentAnchor = this.anchorRects[i]
        const preAnchor = this.anchorRects[i - 1]
        const nextAnchor = this.anchorRects[i + 1]
        if (scrollTop >= currentAnchor.top && scrollTop < nextAnchor.top) {
          // 向下滚动
          key = currentAnchor.index
        } else if (scrollTop >= preAnchor.top && scrollTop < currentAnchor.top) {
          // 向上滚动
          key = preAnchor.index
        } else if (scrollTop >= nextAnchor.top) {
          key = nextAnchor.index
        }
      }
      return this.getAnchorIndexByKey(key)
    },
    getAnchorIndexByKey(key) {
      return this.indexList.map(v => `${v}`).indexOf(key)
    },
    setStickyAnchor() {
      if (!this.sticky) return
      this.$nextTick(() => {
        this.children.forEach((child, index) => {
          child.setStickyAnchor(index === this.current, this.stickyOffsetTop)
        })
      })
    },
    getActiveChild(index) {
      return this.children.find(child => child.index == index)
    },
    setRect() {
      return Promise.allSettled([this.getAnchorsRect(), this.getWrapperRect()])
    },
    getAnchorsRect() {
      this.anchorRects = []
      this.children.forEach(async (child) => {
        const childClassName = `.anchor-${child.index === '#' ? 'special' : child.index}`
        const rect = await getRect(child, childClassName)
        const top = rect.top - (this.isCustomNavigation ? this.navHeight : 0) - this.offset
        this.anchorRects.push({ index: `${child.index}`, name: childClassName, top, height: rect.height })
      })
    },
    async getWrapperRect() {
      const rect = await getRect(this, '.vc-index-bar')
      const top = rect.top - (this.isCustomNavigation ? this.navHeight : 0) - this.offset
      this.boundary = { start: top, end: rect.bottom }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/index-bar.scss';
</style>
