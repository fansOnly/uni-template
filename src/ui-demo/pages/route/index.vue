<template>
  <view class="page-wrapper is-custom-tab-bar">
    <et-page-progress-bar :percent="progressBarPercent" :duration="1000"></et-page-progress-bar>
    <template v-if="pageReady">
      <view class="gap"></view>
      <et-button block @click="jump">跳转页面 - navigate</et-button>
      <et-button block @click="jump2">跳转页面 - redirect</et-button>
      <et-button block @click="setQuery">设置自定义参数</et-button>
    </template>
      <et-tab-bar></et-tab-bar>
  </view>
</template>

<script>
import page from '@/mixins/page'
export default {
  data() {
    return {
      count: 0
    }
  },
  mixins: [page],
  async onLoad(options) {
    await this.$onLaunched
  },
  async onShow(options) {
    await this.$onLaunched
  },
  methods: {
    jump() {
      uni.navigateTo({ url: '/ui-demo/pages/route/detail?a=1&b={v:3}' })
      this.$setPageOptions({ a: 6, c: 'x' })
    },
    jump2() {
      uni.redirectTo({ url: '/ui-demo/pages/route/detail?a=1&b={v:3}' })
    },
    setQuery() {
      this.$setPageOptions({
        name: 'haha',
        value: ['1', 2, '3a']
      })
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
