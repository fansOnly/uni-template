<template>
  <page :show="pageReady">
    <view class="page-wrapper">
      <view class="gap"></view>
      <view class="demo-title">IndexBar 索引栏</view>

      <vc-tabs :value="activeIndex" :options="tabList" @click-item="onClickItem" />

      <view v-for="(_, index) in 'x'.repeat(5)" :key="index" class="demo-title2">这里是组件外部区域了</view>

      <demo-base v-if="activeIndex == 0" :scroll-top="scrollTop" />
      <demo-long-list v-if="activeIndex == 1" :scroll-top="scrollTop" />
      <demo-custom-index v-if="activeIndex == 2" :scroll-top="scrollTop" />

      <view v-for="(_, index) in 'y'.repeat(20)" :key="index" class="demo-title2">这里是组件外部区域了</view>
    </view>
  </page>
</template>

<script>
import DemoCustomIndex from './components/demo-custom-index'
import DemoBase from './components/demo-base.vue'
import DemoLongList from './components/demo-long-list.vue'
import { throttle } from 'echarts/core'

export default {
  components: {
    DemoBase,
    DemoLongList,
    DemoCustomIndex
  },
  data() {
    return {
      pageReady: false,
      scrollTop: 0,
      tabList: [
        { text: '基础用法', value: '1' },
        { text: '长列表', value: '2' },
        { text: '自定义索引', value: '3' },
      ],
      activeIndex: 0,
    }
  },
  onLoad() {
    this.t0 = +new Date()
  },
  onReady() {
    console.log('onReady', +new Date() - this.t0)
    this.pageReady = true
  },
  methods: {
    onClickItem(item, index) {
      this.activeIndex = index
      this.scrollTop = 0
    },
  },
  onPageScroll: throttle(function ({ scrollTop }) {
    this.scrollTop = scrollTop
  }, 60),
}
</script>

<style lang="scss" scoped>
@import '@/sub-package-demo/common/demo.scss';

.demo-title2 {
  line-height: 50px;
}

::v-deep .custom-anchor {
  padding: 16px;
}
</style>
