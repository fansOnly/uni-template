<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding background="#fff">
      <vc-search-bar v-model="keyword" placeholder="搜索产品名称/产品标号" @search="handleSearch"></vc-search-bar>
    </demo-block>

    <demo-block title="自定义背景" padding background="#fff">
      <vc-search-bar v-model="keyword" placeholder="搜索产品名称" round mask-style="background:#fff5f5;"
        @search="handleSearch"></vc-search-bar>
    </demo-block>

    <demo-block title="高级用法" padding background="#fff">
      <vc-search-bar v-model="keyword2" label="产品" placeholder="搜索产品名称/产品标号" @search="handleSearch2"></vc-search-bar>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      keyword: '',
      keyword2: 'hahhahha',
    }
  },
  methods: {
    handleSearch(value) {
      console.log('=====keyword===', this.keyword)
      uni.showToast({
        title: this.keyword,
        icon: 'none',
        mask: true
      })
    },
    handleSearch2(value) {
      console.log('=====keyword===', this.keyword2)
      uni.showToast({
        title: this.keyword2,
        icon: 'none',
        mask: true
      })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
