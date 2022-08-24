<template>
  <view>
    <et-navigation :title="title" background-image="icon/bg-userinfo.png" />
    <view class="page-wrapper" :style="{ 'min-height': windowHeight + 'px' }">
      <view class="demo-block">
        <view class="color"></view>
        <view class="demo-title">请输入页面标题: </view>
        <view class="demo-title demo-margin-bottom">
          <et-input v-model="title" border placeholder="请输入页面标题"></et-input>
        </view>
        <view class="demo-row--flex">
          <view class="demo-margin-bottom">
            <et-button type="primary" :radius="4" block @click="jumpHome">去首页 - navigate</et-button>
          </view>
          <view class="demo-margin-bottom">
            <et-button type="primary" :radius="4" block @click="visible = true">拉起弹窗</et-button>
          </view>
          <et-button type="primary" :radius="4" block @click="getRectInfo">获取元素信息</et-button>
        </view>
      </view>
    </view>

    <et-popup :visible.sync="visible" title="弹窗"></et-popup>

    <et-tab-bar></et-tab-bar>
  </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import page from '@/mixins/page'
import { getRect, requestAnimationFrame } from '@/shared'

export default {
  mixins: [page],
  data() {
    return {
      title: '自定义导航',
      visible: false
    }
  },
  computed: {
    ...mapState('state', ['navHeight']),
    ...mapGetters('state', ['windowHeight'])
  },
  async onLoad() {
    await requestAnimationFrame()
    setTimeout(() => {
      this.getRectInfo()
    }, 60)
  },
  methods: {
    async getRectInfo() {
      const rect = await getRect(this, '.color')
      console.log('rect: ', rect)
    },
    jumpHome() {
      uni.reLaunch({ url: '/ui-demo/pages/home/index' })
    },
  },
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
