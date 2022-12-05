<template>
  <vc-page :show="pageReady">
    <view class="navigation-style--custom">
      <view class="navigation-style--custom__title">导航布局可以自定义</view>
      <view class="title">这里是自定文字</view>
      <view class="title">这里是自定文字</view>
      <view class="title">这里是自定文字</view>
      <view class="title">这里是自定文字</view>
      <view class="page-bg-image"><vc-image
          src="https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg" mode="widthFix" /></view>
    </view>
    <view class="page-wrapper" :style="{ 'min-height': windowHeight + 'px' }">
      <view v-for="(_, i) in 'x'.repeat(10)" :key="i" class="demo-box"></view>
    </view>
  </vc-page>
</template>

<script>
import { mapState } from 'vuex'
import page from '@/mixins/page'

export default {
  mixins: [page],
  data() {
    return {
      title: '自定义导航',
      visible: false
    }
  },
  computed: {
    ...mapState('app', ['windowHeight'])
  },
  async onLoad() {
    console.log('=== app/windowHeight =====', this.windowHeight)
  },
  onReady() {
    this.pageReady = true
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.navigation-style--custom {
  position: relative;
  height: 260px;
  padding: 0 20px;
}

.navigation-style--custom__title {
  padding-top: 50px;
  color: #fff;
}

.title {
  color: #fff;
  line-height: 30px;
}

.page-bg-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  z-index: -1;
}

.demo-box {
  width: 100%;
  height: 100px;
  margin-top: 16px;
  background: #eaeaea;
}
</style>
