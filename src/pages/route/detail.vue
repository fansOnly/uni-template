<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="">页面加载次数：{{count}}</view>
    <view v-for="(item, index) in queryList" :key="index">
      <view>{{item}}</view>
    </view>
    <vc-button block @click="refresh">刷新页面</vc-button>
  </view>
</template>

<script>
import page from '@/mixins/page';
export default {
  mixins: [page],
  data() {
    return {
      count: 0,
      query: {}
    };
  },
  computed: {
    queryList() {
      return Object.entries(this.query);
    }
  },
  async onLoad(options) {
    console.log('[debug] url 携带参数: ', options);
    console.log('[debug] 路由参数 >>>', this.$Route.query);
    this.query = this.$Route.query;
    await this.$onLaunched;
    this.count++;
  },
  async onShow() {
    await this.$onLaunched;
    console.log('[debug] 路由参数 >>>', this.$Route.query);
  },
  methods: {
    refresh() {
      // this.$Router.reload()
    },
  }
};
</script>

<style lang="scss" scoped>
.demo-title {
    display: flex;
    align-items: center;
    padding: 16px;
    background: #fff;
    &::before {
      content: "";
      width: 4px;
      height: 20px;
      background: #3264DC;
      margin-right: 12px;
    }
  }
  .demo-content {
    padding: 16px;
    background: #fff;
  }
</style>
