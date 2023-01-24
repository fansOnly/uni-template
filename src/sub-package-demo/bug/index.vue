<template>
  <view class="page-wrapper" style="height:3000px;">
    <demo-block title="input 穿透" padding>
      <input type="text" style="border: 1px solid #000;">
      <view class="gap"></view>
      <vc-input border custom-style="background: #fff;" />
      <view class="gap"></view>
      <vc-button type="primary" block @click="visible = true">打开遮罩</vc-button>
    </demo-block>

    <vc-popup :visible.sync="visible" title="测试" position="bottom" closeable :close-on-click-overlay="false">
      <!-- <view class="popup"> -->
      <view v-for="(item, index) in 'x'.repeat(10)" :key="index" class="item">哈哈哈哈哈哈哈哈---{{ index + 1 }}</view>
      <!-- </view> -->
    </vc-popup>
  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {},
  watch: {},
  async onLoad(options) { },
  async onShow() { },
  methods: {},
}
</script>

<style lang='scss' scoped>
@import '@/sub-package-demo/common/demo.scss';

.popup {
  height: 200px;
  background: #fff;
  overflow: auto;
}

.item {
  line-height: 50px;
}
</style>
