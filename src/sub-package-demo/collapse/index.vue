<template>
  <view class="page-wrapper">

    <demo-block title="基础用法">
      <vc-collapse v-model="value">
        <vc-collapse-item name="1" title="面板一">
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
        </vc-collapse-item>
        <vc-collapse-item name="2" title="面板2222">
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
        </vc-collapse-item>
        <vc-collapse-item name="3" title="面板3333">
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
        </vc-collapse-item>
      </vc-collapse>
    </demo-block>

    <demo-block title="手风琴模式">
      <vc-collapse :value="value2" accordion @change="onChange2">
        <vc-collapse-item name="a" title="面板a">
          <view>本期产品募集资金主易的未到期余额不得超过组合资产净值的40%。</view>
        </vc-collapse-item>
        <vc-collapse-item name="b" title="面板b">
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
        </vc-collapse-item>
      </vc-collapse>
    </demo-block>

    <demo-block title="不可用项">
      <vc-collapse :value="value3" accordion @change="onChange3">
        <vc-collapse-item name="x" title="面板x" disabled title-style="color:#f00" text="测试" text-style="color:#f60">
          <view>产品募集资金主易的未到期余额不得超过组合资产净值的40%。</view>
        </vc-collapse-item>
        <vc-collapse-item name="y" title="面板y">
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
        </vc-collapse-item>
        <vc-collapse-item name="z" title="面板z">
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
          <view>本期产品募集资金主易</view>
        </vc-collapse-item>
      </vc-collapse>
    </demo-block>
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
      value: ['2'],
      value2: '',
      value3: '',
    }
  },
  methods: {
    onChange(active) {
      console.log('[debug] 当前打开的面板111 >>>', active)
      this.value = active
    },
    onChange2(active) {
      console.log('[debug] 当前打开的面板222 >>>', active)
      this.value2 = active
    },
    onChange3(active) {
      this.value3 = active
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
