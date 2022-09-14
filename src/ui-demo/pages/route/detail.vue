<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="">页面加载次数：{{count}}</view>
    <view v-for="(item, index) in queryList" :key="index">
      <view>{{item}}</view>
    </view>
    <et-button block @click="refresh">刷新页面</et-button>
    <!-- <et-button block @click="getPath">获取页面路径</et-button> -->
    <!-- <et-button block @click="getQuery">获取页面参数</et-button> -->
    <!-- <et-button block @click="clearQuery">清除页面参数</et-button> -->
  </view>
</template>

<script>
import page from '@/mixins/page'
export default {
  mixins: [page],
  data() {
    return {
      count: 0,
      query: {}
    }
  },
  computed: {
    queryList() {
      return Object.entries(this.nextRoute.query)
    }
  },
  async onLoad(options) {
    console.log('[debug] url 携带参数: ', options)
    await this.$onLaunched
    this.count++
  },
  async onShow() {
    await this.$onLaunched
  },
  methods: {
    refresh() {
      this.$wxRouter.reload()
    }
  }
}
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
