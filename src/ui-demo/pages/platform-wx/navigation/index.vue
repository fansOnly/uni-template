<template>
  <view>
    <et-navigation :title="title" background-image="icon/bg-userinfo.png" />
    <view class="page-wrapper" :style="{ 'min-height': windowHeight + 'px' }">
      <view class="demo-block">
        <view class="color"></view>
        <view class="demo-title">请输入页面标题: </view>
        <view class="demo-title">
          <et-input v-model="title" border placeholder="请输入页面标题"></et-input>
        </view>
        <view class="demo-content">
          <view class="demo-row--flex">
            <view class="mgr12">
              <et-button type="primary" @click="navigate">去首页 - navigate</et-button>
            </view>
            <view class="mgr12">
              <et-button type="primary" @click="redirect">去首页 - redirect</et-button>
            </view>
            <et-button type="primary" @click="getInfo">获取元素信息</et-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { getRect, requestAnimationFrame } from '@/shared'
export default {
  data() {
    return {
      title: '自定义导航'
    }
  },
  computed: {
    ...mapState('state', ['navHeight']),
    ...mapGetters('state', ['windowHeight'])
  },
  async onLoad() {
    await requestAnimationFrame()
    setTimeout(() => {
      this.getInfo()
    }, 60);
  },
  methods: {
    async getInfo() {
      const rect = await getRect(this, '.color')
      console.log('rect: ', rect);
    },
    navigate() {
      uni.navigateTo({ url: '/ui-demo/pages/home/index' })
    },
    redirect() {
      uni.redirectTo({ url: '/ui-demo/pages/home/index' })
    },
  },
}
</script>

<style lang="scss" scoped>
.demo-title {
  margin-top: 16px;
}

.color {
  width: 100%;
  height: 80rpx;
  background: #ccc;
}
</style>
