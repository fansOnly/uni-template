<template>
  <vc-page :show="pageReady">
    <vc-navigation :title="title" background-image="http://139.199.251.138:7080/miniResFile/mgr/icon/bg-userinfo.png" @after-mounted="navMounted = true" />
    <view v-if="navMounted" class="page-wrapper is-custom-tab-bar"
      :style="{ 'min-height': windowHeight + 'px', 'height': '1500px' }">
      <view class="demo-block">
        <view class="color"></view>
        <view class="demo-title">请输入页面标题: </view>
        <view class="demo-title demo-margin-bottom">
          <vc-input v-model="title" border placeholder="请输入页面标题" background="#fff"></vc-input>
        </view>
        <view class="demo-row--flex">
          <view class="demo-margin-bottom">
            <vc-button type="primary" :radius="4" block @click="getRectInfo">获取元素信息</vc-button>
          </view>
          <view class="demo-margin-bottom">
            <vc-button type="primary" :radius="4" block @click="visible = true">拉起弹窗</vc-button>
          </view>
          <view class="demo-margin-bottom">
            <vc-button type="primary" :radius="4" block @click="jumpDetail">跳转内页 - navigate</vc-button>
          </view>
          <view class="demo-margin-bottom">
            <vc-button type="primary" :radius="4" block @click="jumpDetail2">跳转内页 - redirect</vc-button>
          </view>
          <view class="demo-margin-bottom">
            <vc-button type="primary" :radius="4" block @click="jumpHome">去首页 - reLaunch</vc-button>
          </view>
          <view class="demo-margin-bottom">
            <vc-button type="primary" :radius="4" block @click="jumpHome2">去首页 - switchTab</vc-button>
          </view>
          <view class="demo-margin-bottom">
            <vc-button type="primary" :radius="4" block @click="jumpOther">其他 - reLaunch</vc-button>
          </view>
        </view>
      </view>

      <vc-popup :visible.sync="visible" title="弹窗"></vc-popup>
    </view>

    <vc-tab-bar></vc-tab-bar>
  </vc-page>
</template>

<script>
import { mapState } from 'vuex';
import page from '@/mixins/page';
import { getRect, requestAnimationFrame } from '@/shared';

export default {
  mixins: [page],
  data() {
    return {
      navMounted: false,
      title: '自定义导航',
      visible: false
    };
  },
  computed: {
    ...mapState('app', ['windowHeight'])
  },
  async onLoad() {
    await requestAnimationFrame();
    setTimeout(() => {
      this.getRectInfo();
    }, 60);
  },
  async onShow() {
    console.log('=== app/windowHeight =====', this.windowHeight);
  },
  onReady() {
    this.pageReady = true;
  },
  methods: {
    async getRectInfo() {
      const rect = await getRect(this, '.color');
      console.log('rect: ', rect);
    },
    jumpDetail() {
      this.$Router.push('/ui-demo/pages/platform-wx/navigation/detail');
    },
    jumpDetail2() {
      this.$Router.replace('/ui-demo/pages/platform-wx/navigation/detail');
    },
    jumpHome() {
      this.$Router.replaceAll('/ui-demo/pages/home/index');
    },
    jumpHome2() {
      this.$Router.pushTab('/ui-demo/pages/home/index');
    },
    jumpOther() {
      this.$Router.replaceAll('/ui-demo/pages/custom-ui/button/index');
    }
  },
  onReachBottom() {
    console.log('reach bottom....');
  }
};
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
