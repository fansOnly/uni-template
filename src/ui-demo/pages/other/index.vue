<template>
  <view class="page-wrapper is-custom-tab-bar">
    <et-page-progress-bar :percent="progressBarPercent"></et-page-progress-bar>
    <template v-if="pageReady">
      <view>子工程 vuex 数据: {{ msg }}</view>
      <e-test msg="hello mini component"></e-test>
    </template>
    <et-tab-bar></et-tab-bar>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import page from '@/mixins/page'
export default {
  components: {},
  mixins: [page],
  computed: {
    ...mapState('p-state', ['msg'])
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
