<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding background="#fff">
      <vc-input v-model="value1" name="name" border :radius="10" placeholder="请输入内容" clear-trigger="always"
        @clear="handleClear"></vc-input>
    </demo-block>

    <demo-block title="自定义类型" padding background="#fff">
      <vc-input v-model="value1" name="age" type="number" border :radius="10" placeholder="数字输入键盘">
      </vc-input>
      <view class="gap"></view>
      <vc-input v-model="value1" type="password" border :radius="10" placeholder="密码输入键盘"></vc-input>
      <view class="gap"></view>
      <vc-input v-model="value1" type="idcard" border :radius="10" placeholder="身份证输入键盘"></vc-input>
      <view class="gap"></view>
      <vc-input v-model="value1" type="digit" border :radius="10" placeholder="带小数点的数字键盘"></vc-input>
      <view class="gap"></view>
      <vc-input v-model="value1" type="safe-password" border :radius="10" placeholder="密码安全输入键盘"></vc-input>
    </demo-block>

    <demo-block title="文本域" padding background="#fff">
      <vc-input v-model="value1" type="textarea" border :radius="10" auto-height show-limit :maxlength="200"
        placeholder="文本域"></vc-input>
    </demo-block>

    <demo-block title="禁用状态" padding background="#fff">
      <vc-input v-model="value1" border :radius="10" placeholder="不可用" disabled></vc-input>
      <view class="gap"></view>
      <vc-input v-model="value1" border :radius="10" placeholder="只读" readonly></vc-input>
    </demo-block>

    <demo-block title="格式化输出" padding background="#fff">
      <view>{{ phone }}</view>
      <vc-input v-model="phone" border :radius="10" :formatter="trim" placeholder="格式化输出"></vc-input>
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
      value1: '',
      value2: '',
      value3: '',
      phone: '我是有 空    格 的'
    };
  },
  methods: {
    handleClear() {
      console.log('====handleClear===');
    },
    trim(value) {
      return value.replace(/\s+/g, '');
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
