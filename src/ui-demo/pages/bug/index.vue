<template>
  <view class="page-wrapper" style="height:3000px;">
    <demo-block title="input 穿透" padding>
      <input type="text" style="border: 1px solid #000;">
      <view class="gap"></view>
      <et-input border custom-style="background: #fff;" />
      <view class="gap"></view>
      <et-button type="primary" block @click="visible = true">打开遮罩</et-button>
    </demo-block>

    <et-popup :visible.sync="visible" title="测试" position="bottom" closeable :close-on-click-overlay="false">
      <view class="popup">
        <view v-for="(item, index) in 'x'.repeat(10)" :key="index" class="item">哈哈哈哈哈哈哈哈</view>
      </view>
    </et-popup>
  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block';
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {},
  watch: {},
  async onLoad(options) { },
  async onShow() { },
  methods: {},
};
</script>

<style lang='scss' scoped>
@import '@p/assets/styles/index.scss';

.popup {
  height: 200px;
  background: #fff;
}

.item {
  line-height: 50px;
}
</style>
