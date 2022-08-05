<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">基础用法</view>
      <view class="demo-content">
      <et-search-bar v-model="keyword" placeholder="搜索产品名称/产品标号" @on-search="handleSearch"></et-search-bar>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">高级用法 - 左侧标签</view>
      <view class="demo-content">
      <et-search-bar v-model="keyword2" label="产品" placeholder="搜索产品名称/产品标号" @on-search="handleSearch2"></et-search-bar>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      keyword2: 'hahhahha',
    }
  },
  methods: {
    handleSearch(value) {
      console.log('=====keyword===', this.keyword)
    },
    handleSearch2(value) {
      console.log('=====keyword===', this.keyword2)
    },
  },
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
