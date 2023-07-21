<template>
  <vc-page ref="page" :show="pageReady">
    <view :class="['page-wrapper', isCustomTabBar ? 'is-custom-tab-bar' : null]">

      <!-- #ifdef MP-WEIXIN -->
      <demo-block title="微信自定义组件" padding>
        <e-test msg="hello mini component"></e-test>
      </demo-block>
      <!-- #endif -->
      <view class="gap"></view>
      <vc-cell title="打开遮罩" is-link @click="visible = true"></vc-cell>

      <vc-overlay :visible.sync="visible"></vc-overlay>

    </view>
  </vc-page>
</template>

<script>
import DemoBlock from '@/components/demo-block/index.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      pageReady: false,
      visible: false
    }
  },
  computed: {
    ...mapGetters('app', ['isCustomTabBar'])
  },
  async onLoad() {
    console.log('on other page load', this.$Route.query)
    await this.$onLaunched
  },
  async onShow() {
    console.log('on other page show', this.$Route.query)
    await this.$onLaunched
  },
  onReady() {
    console.log('on other page ready', this.$Route.query)
    this.pageReady = true
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
@import '@/sub-package-demo/common/demo.scss';
</style>
