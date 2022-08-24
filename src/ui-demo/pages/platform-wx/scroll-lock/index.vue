<template>
  <et-scroll-lock v-if="scrollLock">
    <view class="page-wrapper--scroll-lock">

      <demo-block title="锁定滚动穿透" padding>
        <et-button type="primary" :radius="4" block @click="scrollLock = !scrollLock">取消锁定</et-button>
        <view class="gap"></view>
        <et-button type="primary" :radius="4" block @click="visible = true">打开弹窗</et-button>
      </demo-block>

    </view>
    <et-popup :visible.sync="visible" position="bottom">
      <scroll-view scroll-y style="height:200px;">
      </scroll-view>
    </et-popup>
  </et-scroll-lock>
  <view v-else>
    <view class="page-wrapper--scroll-lock">

      <demo-block title="滚动穿透" padding>
        <et-button type="primary" :radius="4" block @click="scrollLock = !scrollLock">开启锁定</et-button>
        <view class="gap"></view>
        <et-button type="primary" :radius="4" block @click="visible = true">打开弹窗</et-button>
      </demo-block>

    </view>
    <et-popup :visible.sync="visible" position="bottom">
      <scroll-view scroll-y style="height:200px;">
      </scroll-view>
    </et-popup>
  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block/index.vue'
export default {
  components: {
    DemoBlock
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
  }
</style>
