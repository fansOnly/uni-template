<template>
  <!-- 页面级组件，依赖小程序的 pageScroll 事件 -->
  <div class="vc-index-bar">
    <slot />
    <!-- 滚动索引栏 -->
    <view v-show="ready" class="vc-index-bar__sidebar" :style="sidebarStyled">
      <view v-for="(item, index) in indexList" :key="index"
        :class="['vc-index-bar__sidebar-item', index === current ? 'is-active' : null]"
        :style="{ 'color': index === current && color ? color : '' }" @click="onClickAnchor(item, index)">{{ item }}
      </view>
    </view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { useRect } from '@/common/hooks/use-rect'

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
      // 当前索引项
      current: -1,
      timer: null,
    }
  },
  computed: {
    ...mapGetters('app', ['navHeightValue']),
    sidebarStyled() {
      let style = ''
      if (this.navHeightValue) {
        style += `margin-top: ${this.navHeightValue / 2}px;`
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
        this.setStickyAnchor(val)
      },
      immediate: true
    },
    ready: {
      handler(val) {
        val && this.init()
      },
      immediate: true
    }
  },
  created() {
    this.children = []
    this.anchorRects = []

    this.prevAnchorIdx = 0
    this.prevScrollTop = 0
  },
  methods: {
    async init() {
      // 计算位置信息
      await Promise.allSettled([this.getAnchorsRect(), this.getWrapperRect()])
      // console.log('this.anchorRects: ', this.anchorRects)
      this.onScroll(this.scrollTop)
    },
    async onClickAnchor(anchor, index) {
      const existAnchorIdx = this.children.findIndex(v => v.indexAnchor === anchor)
      if (existAnchorIdx === -1) return

      // Bug: 上级节点不能是 scroll-view 或者设置 overflow: auto
      uni.pageScrollTo({
        scrollTop: this.anchorRects[existAnchorIdx].top + 1,
        // Bug: selector 不生效？？？
        // selector: '.anchor-' + index,
        duration: 0
      })
    },
    onScroll(scrollTop) {
      if (!this.ready) return

      const direction = this.prevScrollTop > scrollTop ? 'up' : 'down'
      this.prevScrollTop = scrollTop
      // 滚动结束后判断滚动位置是否在索引区域
      if (this.boundary) {
        const { start, end } = this.boundary
        if (scrollTop < start || scrollTop > end) {
          this.current = -1
        } else {
          this.whenScroll(scrollTop, direction)
        }
      }
    },
    whenScroll(scrollTop, direction) {
      if (this.anchorRects.length === 1) return 0
      if (direction === 'down') {
        this.onScrollDown(scrollTop)
      } else {
        this.onScrollUp(scrollTop)
      }
    },
    onScrollDown(scrollTop) {
      let i = this.prevAnchorIdx
      while (i < this.anchorRects.length - 1 && this.anchorRects[i + 1].top <= scrollTop) { i++ }
      const anchor = this.anchorRects[i].anchor
      this.prevAnchorIdx = i
      this.current = this.indexList.indexOf(anchor)
    },
    onScrollUp(scrollTop) {
      let i = this.prevAnchorIdx
      while (i > 0 && this.anchorRects[i].top > scrollTop) { i-- }
      const anchor = this.anchorRects[i].anchor
      this.prevAnchorIdx = i
      this.current = this.indexList.indexOf(anchor)
    },
    setStickyAnchor(val) {
      if (!this.sticky) return
      this.$nextTick(() => {
        this.children.forEach((child, index) => {
          child.setStickyAnchor(index === val, this.stickyOffsetTop)
        })
      })
    },
    getAnchorsRect() {
      this.anchorRects = []
      this.children.forEach(async (child) => {
        const childClassName = `.anchor-${child.indexAnchor === '#' ? 'special' : child.indexAnchor}`
        const rect = await useRect(child, childClassName)
        const top = this.fixIfCustomNav(rect.top) - this.offset + this.scrollTop
        this.anchorRects.push({ anchor: child.indexAnchor, name: childClassName, top, height: rect.height })
      })
    },
    async getWrapperRect() {
      const rect = await useRect(this, '.vc-index-bar')
      const top = this.fixIfCustomNav(rect.top) - this.offset
      this.boundary = { start: top + this.scrollTop, end: rect.bottom + this.scrollTop }
      // console.log('this.boundary: ', this.boundary)
    },
    fixIfCustomNav(value) {
      return value - this.navHeightValue
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/index-bar.scss';
</style>
