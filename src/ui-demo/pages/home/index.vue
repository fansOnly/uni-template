<template>
  <view class="page-wrapper is-custom-tab-bar">
    <et-page-progress-bar :percent="progressBarPercent"></et-page-progress-bar>
    <view>Hello, stranger!</view>
  </view>
</template>

<script>
import page from '@/mixins/page'
export default {
  components: {},
  mixins: [page],
  computed: {
  },
  async onLoad() {
    await this.$onLaunched
  },
  async onShow() {
    await this.$onLaunched
  },
  methods: {
    onShareAppMessage() {
      return {
        title: 'UI 组件库演示',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
