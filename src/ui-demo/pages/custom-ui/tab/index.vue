<template>
  <view class="page-wrapper" style="height: 2500px">

    <demo-block title="基础用法">
      <et-tab :value="activeIndex" :options="tabList" @click-item="onClickItem" />
      <view class="">{{ active.text }}</view>
    </demo-block>

    <demo-block title="标签栏滚动">
      <et-tab :value="activeIndex2" :options="tabList2" @click-item="onClickItem2" />
      <view class="gap"></view>
      <slider :value="activeIndex2" :min="0" :max="tabList2.length - 1" step="1" show-value @change="onSliderChange" />
    </demo-block>

    <demo-block title="吸顶标签栏">
      <et-tab :value="activeIndex" :options="tabList" :scroll-top="scrollTop" fixed @click-item="onClickItem" />
      <view class="gap"></view>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block';
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      scrollTop: 0,
      activeIndex: 0,
      active: { text: '天猫', value: '1' },
      tabList: [
        { text: '天猫', value: '1' },
        { text: '京东', value: '2' },
        { text: '淘宝', value: '3' },
        { text: '唯品会', value: '4' },
      ],
      activeIndex2: 6,
      tabList2: [
        { text: '标签一', value: '1' },
        { text: '标签二', value: '2' },
        { text: '标签三', value: '3' },
        { text: '标签四', value: '4' },
        { text: '标签五', value: '5' },
        { text: '标签六', value: '6' },
        { text: '标签七', value: '7' },
        { text: '标签八', value: '8' },
      ],
    };
  },
  methods: {
    onClickItem(item, index) {
      console.log('item, index: ', item, index);
      this.activeIndex = index;
      this.active = item;
    },
    onClickItem2(item, index) {
      console.log('item, index222: ', item, index);
      this.activeIndex2 = index;
    },
    onSliderChange(evt) {
      // 改变 tab 索引时模拟器会有样式bug，真机无
      this.activeIndex2 = evt.detail.value;
    },
    onPageScroll({ scrollTop }) {
      this.scrollTop = scrollTop;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
