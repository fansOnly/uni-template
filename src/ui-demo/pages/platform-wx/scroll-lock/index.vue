<template>
  <et-scroll-lock v-if="scrollLock">
    <view class="page-wrapper--scroll-lock">
      <view class="demo-row--flex">
        <view class="mgr12">
          <et-button type="primary" @click="scrollLock = !scrollLock">取消锁定</et-button>
        </view>
        <view class="mgr12">
          <et-button type="primary" @click="visible = true">打开弹窗</et-button>
        </view>
      </view>
    </view>
    <et-popup :visible.sync="visible" position="bottom">
      <scroll-view scroll-y style="height:200px;">
      </scroll-view>
    </et-popup>
  </et-scroll-lock>
  <view v-else>
    <view class="page-wrapper--scroll-lock">
      <view class="demo-row--flex">
        <view class="mgr12">
          <et-button type="primary" @click="scrollLock = !scrollLock">开启锁定</et-button>
        </view>
        <view class="mgr12">
          <et-button type="primary" @click="visible = true">打开弹窗</et-button>
        </view>
      </view>
    </view>
    <et-popup :visible.sync="visible" position="bottom">
      <scroll-view scroll-y style="height:200px;">
      </scroll-view>
    </et-popup>
  </view>
</template>

<script>
  // import EtButton from '@/components/button'
  // import EtPopup from '@/components/popup'
  // import EtScrollLock from '@/components/scroll-lock'
  export default {
    components: {
      // EtButton,
      // EtScrollLock,
      // EtPopup,
    },
    data() {
      return {
        scrollLock: false,
        visible: false,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .page-wrapper--scroll-lock {
    height: 2000px;
    margin-top: 20px;
  }
</style>
