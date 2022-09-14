<template>
  <view class="page-wrapper">
    <!-- <et-navigation title="索引栏" /> -->
    <view class="gap"></view>
    <view class="demo-title">IndexBar 索引栏</view>

    <et-tab :value="activeIndex" :options="tabList" @click-item="onClickItem"></et-tab>

    <view class="demo-title2">这里是组件外部区域了</view>
    <view class="demo-title2">这里是组件外部区域了</view>
    <view class="demo-title3">这里是组件外部区域了</view>
    <view class="demo-title2">这里是组件外部区域了</view>

    <template v-if="activeIndex == 0">
      <et-index-bar :key="activeIndex" :scroll-top="scrollTop">
        <view v-for="(item, index) in CONTACT_LIST" :key="item.key">
          <et-index-anchor :index="item.key" custom-class="custom-anthor"></et-index-anchor>

          <et-cell v-for="(sub, sindex) in item.values" :key="sindex" class="et-cell-move--right" :title="sub.name"
            border></et-cell>
        </view>
      </et-index-bar>
    </template>

    <template v-if="activeIndex == 1">
      <et-index-bar :key="activeIndex" class="custom-index-bar" :scroll-top="scrollTop" :index-list="indexList" sticky>

        <view class="demo-content">
          <et-index-anchor index="1">
            <view class="custom-anchor-item">一</view>
          </et-index-anchor>

          <view class="demo-title2">1111111</view>
          <view class="demo-title2">1111111</view>
          <view class="demo-title2">1111111</view>
          <view class="demo-title2">1111111</view>
          <view class="demo-title2">1111111</view>
          <view class="demo-title2">1111111</view>
          <view class="demo-title2">1111111</view>
          <view class="demo-title2">1111111</view>
          <view class="demo-title2">1111111</view>
          <view class="demo-title2">1111111</view>
        </view>

        <view class="demo-content">
          <et-index-anchor index="2">
            <view class="custom-anchor-item">二</view>
          </et-index-anchor>
          <view class="demo-title2">2222222</view>
          <view class="demo-title2">2222222</view>
          <view class="demo-title2">2222222</view>
          <view class="demo-title2">2222222</view>
          <view class="demo-title2">2222222</view>
          <view class="demo-title2">2222222</view>
          <view class="demo-title2">2222222</view>
          <view class="demo-title2">2222222</view>
        </view>

        <view class="demo-content">
          <et-index-anchor index="3">三</et-index-anchor>
          <view class="demo-title2">3333333</view>
          <view class="demo-title2">3333333</view>
          <view class="demo-title2">3333333</view>
          <view class="demo-title2">3333333</view>
          <view class="demo-title2">3333333</view>
          <view class="demo-title2">3333333</view>
          <view class="demo-title2">3333333</view>
          <view class="demo-title2">3333333</view>
          <view class="demo-title2">3333333</view>
          <view class="demo-title2">3333333</view>
        </view>

        <view class="demo-content">
          <et-index-anchor index="4">四</et-index-anchor>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
          <view class="demo-title2" style="line-height:80px;">44444444</view>
        </view>

      </et-index-bar>
    </template>

    <view class="demo-title3">这里是组件外部区域了</view>
    <view class="demo-title3">这里是组件外部区域了</view>
    <view class="demo-title3">这里是组件外部区域了</view>
    <view class="demo-title3">这里是组件外部区域了</view>
    <view class="demo-title3">这里是组件外部区域了</view>
    <view class="demo-title3">这里是组件外部区域了</view>
    <view class="demo-title3">这里是组件外部区域了</view>
    <view class="demo-title3">这里是组件外部区域了</view>
    <view class="demo-title3">这里是组件外部区域了</view>

  </view>
</template>

<script>
import { genPinyinSortData } from '@/common/lib/pinyin'
export default {
  data() {
    return {
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      scrollTop: 0,
      tabList: [
        { text: '基础用法', value: '1' },
        { text: '自定义索引列表', value: '2' },
      ],
      activeIndex: 0,
      LIST: [
        { name: '阿霍' },
        { name: '诸葛亮' },
        { name: '阿三' },
        { name: '陈坤' },
        { name: '李四' },
        { name: '陈大虾' },
        { name: '成龙' },
        { name: '☀️' },
        { name: '孙策' },
        { name: '王武' },
        { name: '杜宇' },
        { name: '张三' },
        { name: '德明' },
        { name: '&&' },
        { name: '公孙离' },
        { name: '高亮' },
      ],
      CONTACT_LIST: [],
    }
  },
  onLoad(options) {
    this.CONTACT_LIST = genPinyinSortData(this.LIST, 'name')
  },
  methods: {
    onClickItem(item, index) {
      this.activeIndex = index
      this.active = item
      this.scrollTop = 0
    },
  },
  onPageScroll({ scrollTop }) {
    // console.log('=====scrollTop======', scrollTop)
    this.scrollTop = scrollTop
  },
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';

.demo-title2 {
  line-height: 30px;
}

.demo-title3 {
  line-height: 100px;
}

.custom-anchor-item {
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
}

.custom-index-bar ::v-deep .et-index-anchor--sticky {
  background: #ccc;
}

::v-deep .custom-anthor {
  padding: 16px;
}
</style>
