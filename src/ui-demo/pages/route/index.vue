<template>
  <et-page :show="pageReady">
    <view class="page-wrapper">
      <view class="gap"></view>
      <et-input v-model="value" type="text" border placeholder="请输入 JSON 字符串格式" custom-style="background:#fff;" />
      <view class="gap"></view>
      <et-button block @click="setQuery">设置自定义参数</et-button>
      <view class="gap"></view>
      <et-button block @click="jump">跳转页面 - navigate</et-button>
      <et-button block @click="jump2">跳转页面 - redirect</et-button>
      <et-tab-bar></et-tab-bar>
    </view>
  </et-page>
</template>

<script>
import page from '@/mixins/page'
export default {
  mixins: [page],
  data() {
    return {
      count: 0,
      value: '',
      query: {}
    }
  },
  async onLoad(options) {
    await this.$onLaunched
  },
  async onShow() {
    await this.$onLaunched
  },
  onReady() {
    this.pageReady = true
  },
  methods: {
    jump() {
      const query = { a: 1, b: {'c': {d: '2'}}, ...this.query }
      // uni.navigateTo({ url: '/ui-demo/pages/route/detail?a=1&b={v:3}', query })
      this.$wxRouter.navigateTo({ url: '/ui-demo/pages/route/detail?a=1&b={v:3}', query })
    },
    jump2() {
      const query = {
        x: 111,
        ...this.query
      }
      this.$wxRouter.redirectTo({ url: '/ui-demo/pages/route/detail?a=1&b={v:3}', query })
    },
    setQuery() {
      try {
        this.query = JSON.parse(this.value)
      } catch (error) {
        uni.showToast({
          title: '参数格式错误'
        })
      }
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
