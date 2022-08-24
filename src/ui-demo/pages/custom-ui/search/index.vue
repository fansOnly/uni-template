<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding background="#fff">
      <et-search-bar v-model="keyword" placeholder="搜索产品名称/产品标号" @on-search="handleSearch"></et-search-bar>
    </demo-block>

    <demo-block title="基础用法" padding background="#fff">
      <et-search-bar v-model="keyword2" label="产品" placeholder="搜索产品名称/产品标号" @on-search="handleSearch2"></et-search-bar>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block'
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
    },
    handleSearch2(value) {
      console.log('=====keyword===', this.keyword2)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
