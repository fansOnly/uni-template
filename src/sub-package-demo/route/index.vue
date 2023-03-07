<template>
  <vc-page :show="pageReady">
    <view class="page-wrapper">
      <view class="gap"></view>
      <view v-for="(item, index) in arr1" :key="index">{{ item.name }} - {{ item.age }}</view>
      <view class="gap"></view>
      <view v-for="(item, index) in arr2" :key="index">{{ item.name }} - {{ item.age }}</view>
      <view class="gap"></view>
      <vc-input v-model="value" type="text" border placeholder="请输入 JSON 字符串格式" custom-style="background:#fff;" />
      <view class="gap"></view>
      <vc-button block @click="setQuery">设置自定义参数</vc-button>
      <view class="gap"></view>
      <vc-button block @click="jump">跳转页面 - navigate</vc-button>
      <vc-button block @click="jump2">跳转页面 - redirect</vc-button>
      <vc-tab-bar></vc-tab-bar>
    </view>
  </vc-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      pageReady: false,
      count: 0,
      value: '',
      query: {
        'hehe': 'haha'
      },
      arr1: [
        { name: 'lily', age: 30 },
        { name: 'john', age: 15 },
      ],
    }
  },
  computed: {
    ...mapState('test', ['arr2']),
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
      const query = { a: 1, b: { 'c': { d: '2' } }, ...this.query }
      this.$Router.push({ path: '/sub-package-demo/route/detail', query })
    },
    jump2() {
      const query = {
        x: 111,
        obj: { m: 'm' },
        ...this.query
      }
      this.$Router.replace({ name: 'route-detail', params: query })
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
