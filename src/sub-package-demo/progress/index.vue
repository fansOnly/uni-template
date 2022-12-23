<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <vc-button type="primary" size="mini" style="margin-right:12px;" @click="increment">递增 +10</vc-button>
      <vc-button type="primary" size="mini" @click="decrement">递减 -10</vc-button>
      <view style="padding:16px;background:#fff;">
        <vc-progress :value="value" />
      </view>
    </demo-block>

    <demo-block title="自定义样式" padding background>
      <vc-progress :value="value2" :stroke-width="4" track-color="#0c328e"
        background="linear-gradient(270deg, #FFFFFF 0%, #3264DC 100%)" :dot="false">
      </vc-progress>
    </demo-block>

    <demo-block title="文字排列" padding background>
      <view class="demo-row">
        <vc-progress position="bottom" :value="81">
          <view style="font-size: 12px;">已完成 {{ value3 }}%</view>
        </vc-progress>
      </view>
      <view class="demo-row">
        <vc-progress position="top" :value="37">
          <view style="font-size: 12px;">已完成 {{ value3 }}%</view>
        </vc-progress>
      </view>
      <view class="demo-row">
        <vc-progress position="left" :value="65">
          <view style="font-size: 12px;">已完成 {{ value3 }}%</view>
        </vc-progress>
      </view>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@/components/demo-block';

export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      value: 10,
      value2: 57,
      value3: 97,
    };
  },
  methods: {
    increment() {
      if (this.value + 10 >= 100) {
        this.value = 100;
      } else {
        this.value += 10;
      }
    },
    decrement() {
      if (this.value - 10 <= 0) {
        this.value = 0;
      } else {
        this.value -= 10;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.demo-row {
  margin-top: 12px;
}
</style>
