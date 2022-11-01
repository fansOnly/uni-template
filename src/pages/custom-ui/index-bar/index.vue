<template>
  <view class="page-wrapper">
    <!-- <vc-navigation title="索引栏" @after-mounted="navMounted = true" /> -->
    <view class="gap"></view>
    <view class="demo-title">IndexBar 索引栏</view>

    <vc-tab :value="activeIndex" :options="tabList" @click-item="onClickItem"></vc-tab>

    <view v-for="(_, index) in 'x'.repeat(5)" :key="index" class="demo-title2">这里是组件外部区域了</view>

    <template v-if="activeIndex == 0">
      <vc-index-bar :key="activeIndex" :sticky="false" :scroll-top="scrollTop" long-list>
        <view v-for="(item) in CONTACT_LIST" :key="item.key">
          <vc-index-anchor :index="item.key" custom-class="custom-anchor" />

          <!-- <vc-cell v-for="(_, index2) in 'x'.repeat(50)" :key="index2" :title="`文本${index2+1}`" border /> -->
          <vc-cell v-for="(user, sindex) in item.values" :key="sindex" class="vc-cell-move--right" border>
            <view slot="title" class="user-info">
              <view class="user-avatar">
                <view class="user-avatar-re">{{user.userName.substring(0, 1)}}</view>
              </view>
              <view class="user-name">{{user.userName}}</view>
            </view>
          </vc-cell>
        </view>
      </vc-index-bar>
    </template>

    <template v-if="activeIndex == 1">
      <vc-index-bar :key="activeIndex" class="custom-index-bar" :scroll-top="scrollTop" :index-list="indexList" sticky>

        <view class="demo-content">
          <vc-index-anchor index="1">
            <view class="custom-anchor-item">一</view>
          </vc-index-anchor>
          <view v-for="(_, index) in '1'.repeat(15)" :key="index" class="demo-title2">1111111</view>
        </view>

        <view class="demo-content">
          <vc-index-anchor index="2">
            <view class="custom-anchor-item">二</view>
          </vc-index-anchor>
          <view v-for="(_, index) in '2'.repeat(30)" :key="index" class="demo-title2">2222222</view>
        </view>

        <view class="demo-content">
          <vc-index-anchor index="3">三</vc-index-anchor>
          <view v-for="(_, index) in '3'.repeat(20)" :key="index" class="demo-title2">3333333</view>
        </view>

        <view class="demo-content">
          <vc-index-anchor index="4">四</vc-index-anchor>
          <view v-for="(_, index) in '4'.repeat(30)" :key="index" class="demo-title2" style="line-height:80px;">44444444</view>
        </view>
      </vc-index-bar>
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
    this.t0 = +new Date;
    let CONTACT_LIST = genPinyinSortData(customers.slice(0, 500), 'userName');
    // this.CONTACT_LIST = CONTACT_LIST;

    this.CONTACT_LIST1 = CONTACT_LIST.slice();
    let timer = setInterval(() => {
      const data = this.appendData();
      this.CONTACT_LIST = this.concatData(this.CONTACT_LIST, data);
      if (!this.CONTACT_LIST1.length) {
        clearInterval(timer);
        timer = null;
      }
    }, 60);
  },
  onReady() {
    console.log('onready', +new Date() - this.t0);
  },
  methods: {
    concatData(arr1, arr2) {
      if (!arr1.length) return arr2;
      let res = [];
      const end = arr1[arr1.length - 1];
      const concat = arr2[0];
      if (end.key === concat.key) {
        res = [
          ...arr1.slice(0, -1),
          {
            key: arr2[0].key,
            values: [...end.values, ...concat.values]
          },
          ...arr2.slice(1)
        ];
      } else {
        res = [...arr1, ...arr2];
      }
      return res;
    },
    appendData() {
      let res = [];
      let num = 50;
      let i = 0;
      while (i < this.CONTACT_LIST1.length) {
        const item = this.CONTACT_LIST1[i];
        const count = item.values.length;
        if (count < num) {
          num -= count;
          res.push(...this.CONTACT_LIST1.splice(i, 1, { key: item.key, values: [] }));
          i++;
        } else {
          if (count === num) {
            res.push(...this.CONTACT_LIST1.splice(i, 1, { key: item.key, values: [] }));
          } else {
            const val = item.values.splice(0, num);
            res.push({
              key: item.key,
              values: val
            });
          }
          break;
        }
      }
      this.CONTACT_LIST1 = this.CONTACT_LIST1.filter(v => v.values.length);
      return res;
    },
    genIndexList(withSpecial = true) {
      const arr = [];
      const charCodeOfA = 'A'.charCodeAt(0);
      for (let i = 0; i < 26; i++) {
        arr.push(String.fromCharCode(charCodeOfA + i));
      }
      return withSpecial ? arr.concat('#') : arr;
    },
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
@import '@/common/demo.scss';

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

.custom-index-bar ::v-deep .vc-index-anchor--sticky {
  background: #ccc;
}

::v-deep .custom-anchor {
  padding: 16px;
}
</style>
