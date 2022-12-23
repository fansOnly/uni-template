<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <vc-switch :value="value" @input="onSwitchChange"></vc-switch>
    </demo-block>

    <demo-block title="自定义值类型" padding>
      <vc-cell border>
        <template slot="title">{{ type1 }} : {{ value }}</template>
        <vc-switch slot="text" v-model="value"></vc-switch>
      </vc-cell>
      <vc-cell border>
        <view slot="title">{{ type5 }} : {{ value5 }}</view>
        <vc-switch slot="text" v-model="value5" :active-value="1" :inactive-value="0"></vc-switch>
      </vc-cell>
      <vc-cell>
        <template slot="title">{{ type6 }} : {{ value6 }}</template>
        <vc-switch slot="text" v-model="value6" active-value="1" inactive-value="0"></vc-switch>
      </vc-cell>
    </demo-block>

    <demo-block title="显示提示文本" padding>
      <vc-switch v-model="value2" show-text></vc-switch>
      <vc-switch v-model="value2" show-text active-text="on" inactive-text="off"></vc-switch>
    </demo-block>

    <demo-block title="自定义大小" padding>
      <vc-switch v-model="value2" size="20"></vc-switch>
      <vc-switch v-model="value2" size="40"></vc-switch>
    </demo-block>

    <demo-block title="自定义颜色" padding>
      <vc-switch v-model="value3" active-color="green" inactive-color="#ff0"></vc-switch>
    </demo-block>

    <demo-block title="禁用状态" padding>
      <vc-switch v-model="value4" disabled></vc-switch>
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
      value: false,
      value2: false,
      value3: true,
      value4: true,
      value5: 0,
      value6: '0',
    };
  },
  computed: {
    type1() {
      return typeof this.value;
    },
    type5() {
      return typeof this.value5;
    },
    type6() {
      return typeof this.value6;
    }
  },
  methods: {
    onSwitchChange(val) {
      console.log('[debug] onSwitchChange >>>', val);
      this.value = val;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
