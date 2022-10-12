<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding background="#fff">
      <vc-swiper :options="list" :value="1" indicator-dots @click="onSwiperChange" />
    </demo-block>

    <demo-block title="缩放特效" padding background="#fff">
      <vc-swiper :options="list" effect="scale" height="100" />
    </demo-block>

    <demo-block title="自定义内容" padding background="#fff">
      <vc-swiper :options="list" height="80">
        <template #default="{ item, index }">
          <view style="height: 100%;background-color: #ccc;">自定义轮播内容：{{ item.title }}--{{ index }}</view>
        </template>
      </vc-swiper>
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
      list: [
        {
          id: '1',
          title: 'banner1',
          src: 'idcard-front.png',
        },
        {
          id: '2',
          title: 'banner2',
          src: 'idcard-front.png',
        },
        {
          id: '3',
          title: 'banner3',
          src: 'idcard-front',
        },
      ],
      active: 0,
    };
  },
  methods: {
    onSwiperChange(item, index) {
      console.log('[debug] swiper item', item);
      uni.showToast({
        title: `点击了第${index}项`,
        icon: 'none',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
