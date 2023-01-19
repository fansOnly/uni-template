<template>
  <vc-page :show="pageReady">
    <vc-navigation slot="nav" :mode="mode" :title="title" :align="align" :background="background" :color="color"
      :bg-image="bgImage" />
    <view v-show="isCustomNavMounted" :class="['page-wrapper', isCustomTabBar ? 'is-custom-tab-bar' : null]"
      :style="{ 'min-height': windowHeight + 'px', 'height': '1500px' }">
      <view style="padding:16px;">
        <view class="demo-title">请输入页面标题: </view>
        <view class="gap"></view>
        <vc-input v-model="title" border placeholder="请输入页面标题" background="#fff"></vc-input>
        <view class="gap"></view>
        <view class="demo-row--flex">
          <view class="demo-label">主题模式: </view>
          <vc-radio-group v-model="mode" @change="handleModeChange">
            <vc-radio name="light" custom-style="margin-right: 8px;">浅色</vc-radio>
            <vc-radio name="dark" custom-style="margin-right: 8px;">深色</vc-radio>
            <vc-radio name="custom">自定义</vc-radio>
          </vc-radio-group>
        </view>
        <template v-if="mode === 'custom'">
          <view class="gap"></view>
          <view class="demo-row--flex">
            <view class="demo-label">背景色: </view>
            <vc-radio-group v-model="background">
              <vc-radio name="#ef4b4b" custom-style="margin-right: 8px;">红色</vc-radio>
              <vc-radio name="#7a67e2" custom-style="margin-right: 8px;">蓝色</vc-radio>
              <vc-radio name="#0db914">绿色</vc-radio>
            </vc-radio-group>
          </view>
          <view class="gap"></view>
          <view class="demo-row--flex">
            <view class="demo-label">文本色: </view>
            <vc-radio-group v-model="color">
              <vc-radio name="#fff" custom-style="margin-right: 8px;">白色</vc-radio>
              <vc-radio name="#ef4b4b" custom-style="margin-right: 8px;">红色</vc-radio>
              <vc-radio name="#0db914">绿色</vc-radio>
            </vc-radio-group>
          </view>
        </template>
        <view class="gap"></view>
        <view class="demo-row--flex">
          <view class="demo-label">对齐方式: </view>
          <vc-radio-group v-model="align">
            <vc-radio name="center" custom-style="margin-right: 8px;">居中</vc-radio>
            <vc-radio name="left">居左</vc-radio>
          </vc-radio-group>
        </view>
        <view class="gap"></view>
        <view class="demo-row--flex">
          <text class="demo-label">开启背景图: </text>
          <vc-switch v-model="useBgImage" @change="toggleUseBgImage"></vc-switch>
        </view>
        <view class="gap"></view>
        <view class="demo-row--flex">
          <text class="demo-label">置灰模式: </text>
          <vc-switch v-model="isGray2" @change="toggleGray"></vc-switch>
        </view>
        <view class="gap"></view>
        <view class="demo-row--flex">
          <vc-button custom-style="margin-right:10px;" @click="visible = true">拉起弹窗</vc-button>
        </view>

        <vc-button custom-style="margin-right:10px;" @click="jumpDetail">自定义导航布局</vc-button>
        <vc-button @click="jumpHome">去首页 - reLaunch</vc-button>
      </view>

      <vc-popup :visible.sync="visible" title="弹窗"></vc-popup>
    </view>

    <!-- <vc-tab-bar /> -->
  </vc-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      pageReady: false,
      title: '自定义导航',
      bgImage: '',
      mode: 'light',
      align: 'center',
      background: '',
      color: '',
      useBgImage: false,
      visible: false,
      isGray2: false
    }
  },
  computed: {
    ...mapState('app', ['windowHeight', 'isGray', 'isCustomNavMounted']),
    ...mapGetters('app', ['isCustomTabBar'])
  },
  watch: {
    isGray: {
      handler(val) {
        this.isGray2 = val
      },
      immediate: true
    }
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
    ...mapActions('app', ['setGray']),
    toggleGray(val) {
      this.setGray(val)
    },
    toggleUseBgImage(val) {
      this.bgImage = val ? 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg' : ''
    },
    handleModeChange(val) {
      if (val !== 'custom') {
        this.background = this.color = ''
      }
    },
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
.demo-row--flex {
  display: flex;
  align-items: center;
}

.demo-label {
  margin-right: 8px;
}
</style>
