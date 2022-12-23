<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <view style="margin-bottom:10px">v-model 双向绑定: {{ checkbox }}</view>
      <vc-checkbox v-model="checkbox">复选框</vc-checkbox>
    </demo-block>

    <demo-block title="复选框组" padding>
      <view style="height:30px;line-height:30px;"><text v-for="item in checkbox2" :key="item">{{ item }}</text></view>
      <vc-checkbox-group v-model="checkbox2">
        <vc-checkbox name="a" block icon-disabled>复选框a-块级 - 只能点击文本</vc-checkbox>
        <vc-cell>
          <vc-checkbox slot="title" name="b">复选框b - 被 vc-cell 组件包裹</vc-checkbox>
        </vc-cell>
        <view>
          <vc-checkbox name="c" label-disabled>复选框c - 只允许点击图标</vc-checkbox>
        </view>
      </vc-checkbox-group>
    </demo-block>

    <demo-block title="自定义图标" padding>
      <vc-checkbox v-model="checkbox4" inactive-icon="checkbox-off" active-icon="checkbox-on-fill">复选框a
      </vc-checkbox>
    </demo-block>

    <demo-block title="单元格示例" padding>
      <vc-cell title="标题" @click="checkbox3 = !checkbox3">
        <vc-checkbox slot="text" :value="checkbox3"></vc-checkbox>
      </vc-cell>
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
      checkbox: false,
      checkbox1: true,
      checkbox2: ['b'],
      checkbox3: false,
      checkbox4: false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
