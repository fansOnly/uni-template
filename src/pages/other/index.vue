<template>
  <vc-page :show="pageReady">
    <view class="page-wrapper is-custom-tab-bar">

      <demo-block title="vuex 数据" padding>
        <view>子工程 vuex 数据: {{ msg }}</view>
      </demo-block>

      <!-- #ifdef MP-WEIXIN -->
      <demo-block title="微信自定义组件" padding>
        <e-test msg="hello mini component"></e-test>
      </demo-block>
      <!-- #endif -->

      <vc-tab-bar></vc-tab-bar>
    </view>
  </vc-page>
</template>

<script>
import DemoBlock from '@/components/demo-block/index.vue';
import page from '@/mixins/page';
import { mapState } from 'vuex';

export default {
  components: {
    DemoBlock
  },
  mixins: [page],
  computed: {
    ...mapState('p-state', ['msg'])
  },
  async onLoad() {
    await this.$onLaunched;
  },
  async onShow() {
    await this.$onLaunched;
  },
  onReady() {
    this.pageReady = true;
  },
  methods: {
    onShareAppMessage() {
      return {
        title: 'UI 组件库演示',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/common/demo.scss';
</style>
