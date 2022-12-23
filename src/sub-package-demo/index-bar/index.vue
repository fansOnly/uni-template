<template>
  <view class="page-wrapper">
    <!-- <vc-navigation title="索引栏" @after-mounted="navMounted = true" /> -->
    <view class="gap"></view>
    <view class="demo-title">IndexBar 索引栏</view>

    <vc-tab :value="activeIndex" :options="tabList" @click-item="onClickItem"></vc-tab>

    <view v-for="(_, index) in 'x'.repeat(5)" :key="index" class="demo-title2">这里是组件外部区域了</view>

    <demo-base v-if="activeIndex == 0" :scroll-top="scrollTop" />
    <demo-custom-index v-if="activeIndex == 1" :scroll-top="scrollTop" />

    <view v-for="(_, index) in 'y'.repeat(10)" :key="index" class="demo-title2">这里是组件外部区域了</view>
  </view>
</template>

<script>
import DemoCustomIndex from './components/demo-custom-index'
import DemoBase from './components/demo-base.vue'

export default {
  components: {
    DemoBase,
    DemoCustomIndex
  },
  data() {
    return {
      scrollTop: 0,
      tabList: [
        { text: '基础用法', value: '1' },
        { text: '自定义索引列表', value: '2' },
      ],
      activeIndex: 0,
      navMounted: false
    }
  },
  onLoad() {
    this.t0 = +new Date()
  },
  onReady() {
    console.log('onReady', +new Date() - this.t0)
  },
  methods: {
    onClickItem(item, index) {
      this.activeIndex = index
      this.active = item
      this.scrollTop = 0
    },
  },
  onPageScroll({ scrollTop }) {
    this.scrollTop = scrollTop
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/demo.scss';

.demo-title2 {
  line-height: 50px;
}

::v-deep .custom-anchor {
  padding: 16px;
}
</style>
