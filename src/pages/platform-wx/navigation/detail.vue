<template>
  <vc-page :show="pageReady">
    <vc-navigation :title="title" @after-mounted="navMounted = true" />
    <view v-if="navMounted" class="page-wrapper is-custom-tab-bar"
      :style="{ 'min-height': windowHeight + 'px' }">
      <view class="demo-block">
        <view class="color"></view>
        <view class="demo-title">请输入页面标题: </view>
        <view class="demo-title demo-margin-bottom">
          <vc-input v-model="title" border placeholder="请输入页面标题" background="#fff"></vc-input>
        </view>
      </view>
    </view>
  </vc-page>
</template>

<script>
import { mapState } from 'vuex';
import page from '@/mixins/page';

export default {
  mixins: [page],
  data() {
    return {
      navMounted: false,
      title: '自定义导航',
      visible: false
    };
  },
  computed: {
    ...mapState('app', ['windowHeight'])
  },
  async onLoad() {
    console.log('=== app/windowHeight =====', this.windowHeight);
  },
  onReady() {
    this.pageReady = true;
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.demo-title {
  margin-top: 16px;
}

.demo-block {
  padding: 16px;
}

.demo-margin-bottom {
  margin-bottom: 12px;
}

.color {
  height: 80rpx;
  background: #ccc;
}
</style>
