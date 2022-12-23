<template>
  <vc-page :show="pageReady">
    <vc-navigation :title="title"
      background-image="https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg"
      @after-mounted="navMounted = true" />
    <view v-if="navMounted" :class="['page-wrapper', isCustomTabBar ? 'is-custom-tab-bar' : null]"
      :style="{ 'min-height': windowHeight + 'px', 'height': '1500px' }">
      <view class="demo-block">
        <view class="color"></view>
        <view class="demo-title">请输入页面标题: </view>
        <view class="demo-title demo-margin-bottom">
          <vc-input v-model="title" border placeholder="请输入页面标题" background="#fff"></vc-input>
        </view>
        <view class="demo-row--flex">
          <view class="demo-margin-bottom">
            <vc-button type="primary" :radius="4" block @click="visible = true">拉起弹窗</vc-button>
          </view>
          <view class="demo-margin-bottom">
            <vc-button type="primary" :radius="4" block @click="jumpDetail">自定义导航布局</vc-button>
          </view>
          <view class="demo-margin-bottom">
            <vc-button type="primary" :radius="4" block @click="jumpHome">去首页 - reLaunch</vc-button>
          </view>
        </view>
      </view>

      <vc-popup :visible.sync="visible" title="弹窗"></vc-popup>
    </view>

    <!-- <vc-tab-bar /> -->
  </vc-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import page from '@/mixins/page'

export default {
  mixins: [page],
  data() {
    return {
      navMounted: false,
      title: '自定义导航',
      visible: false
    }
  },
  computed: {
    ...mapState('app', ['windowHeight']),
    ...mapGetters('app', ['isCustomTabBar'])
  },
  async onLoad() {
  },
  async onShow() {
    console.log('=== app/windowHeight =====', this.windowHeight)
  },
  onReady() {
    this.pageReady = true
  },
  methods: {
    jumpDetail() {
      this.$Router.replace('/sub-package-demo/navigation/detail')
    },
    jumpHome() {
      this.$Router.replaceAll('/pages/home/index')
    },
  },
  onReachBottom() {
    console.log('reach bottom....')
  }
}
</script>

<style lang="scss" scoped>
.demo-title {
  margin-top: 16px;
}

.demo-block {
  padding: 16px;
}

.demo-margin-bottom {
  margin-bottom: 12px;
}

.color {
  height: 80rpx;
  background: #ccc;
}
</style>
