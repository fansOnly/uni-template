<template>
  <view class="page-wrapper">
    <!-- <et-navigation title="索引栏" @after-mounted="navMounted = true" /> -->
    <view class="gap"></view>
    <view class="demo-title">IndexBar 索引栏</view>

    <et-tab :value="activeIndex" :options="tabList" @click-item="onClickItem"></et-tab>

    <view v-for="(_, index) in 'x'.repeat(5)" :key="index" class="demo-title2">这里是组件外部区域了</view>

    <template v-if="activeIndex == 0">
      <van-index-bar :key="activeIndex" :sticky="false" :scroll-top="scrollTop">
        <view v-for="(item) in CONTACT_LIST" :key="item.key">
          <!-- <et-index-anchor :index="item.key" custom-class="custom-anchor" /> -->
          <van-index-anchor :index="item.key" />

          <et-cell v-for="(user, sindex) in item.values" :key="sindex" class="et-cell-move--right" border>
            <view slot="title" class="user-info">
              <view class="user-avatar">
                <!-- <et-image v-if="user.headImg" :src="user.headImg" width="40" height="04" round /> -->
                <view class="user-avatar-re">{{user.userName.substring(0, 1)}}</view>
              </view>
              <view class="user-name">{{user.userName}}</view>
            </view>
          </et-cell>
        </view>
      </van-index-bar>
    </template>

    <template v-if="activeIndex == 1">
      <et-index-bar :key="activeIndex" class="custom-index-bar" :scroll-top="scrollTop" :index-list="indexList" sticky>

        <view class="demo-content">
          <et-index-anchor index="1">
            <view class="custom-anchor-item">一</view>
          </et-index-anchor>
          <view v-for="(_, index) in '1'.repeat(5)" :key="index" class="demo-title2">1111111</view>
        </view>

        <view class="demo-content">
          <et-index-anchor index="2">
            <view class="custom-anchor-item">二</view>
          </et-index-anchor>
          <view v-for="(_, index) in '2'.repeat(17)" :key="index" class="demo-title2">2222222</view>
        </view>

        <view class="demo-content">
          <et-index-anchor index="3">三</et-index-anchor>
          <view v-for="(_, index) in '3'.repeat(7)" :key="index" class="demo-title2">3333333</view>
        </view>

        <view class="demo-content">
          <et-index-anchor index="4">四</et-index-anchor>
          <view v-for="(_, index) in '4'.repeat(10)" :key="index" class="demo-title2" style="line-height:80px;">44444444</view>
        </view>
      </et-index-bar>
    </template>

    <view v-for="(_, index) in 'y'.repeat(10)" :key="index" class="demo-title3">这里是组件外部区域了</view>
  </view>
</template>

<script>
import { genPinyinSortData } from '@/common/lib/pinyin';
import customers from './customer.json';

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
      navMounted: false
    };
  },
  onLoad() {
    this.CONTACT_LIST = genPinyinSortData(customers.slice(0, 1500), 'userName');
  },
  methods: {
    onClickItem(item, index) {
      this.activeIndex = index;
      this.active = item;
      this.scrollTop = 0;
    },
  },
  onPageScroll({ scrollTop }) {
    // console.log('=====scrollTop======', scrollTop)
    this.scrollTop = scrollTop;
  },
};
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';

.user-info {
  display: flex;
  align-items: center;
  height: 40px;
}
.user-avatar {
  margin-right: 8px;
}
.user-avatar-re {
  width: 40px;
  height: 40px;
  background: #FFC05D;
  border-radius: 100%;
  font-size: 17px;
  text-align: center;
  line-height: 40px;
}
.user-name {
  flex: 1;
}

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
  background: #ccc;
}

.custom-index-bar ::v-deep .et-index-anchor--sticky {
  background: #ccc;
}

::v-deep .custom-anchor {
  padding: 16px;
}
</style>
