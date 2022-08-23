<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <view style="margin-bottom:10px">v-model 双向绑定: {{ checkbox }}</view>
      <et-checkbox v-model="checkbox">复选框</et-checkbox>
    </demo-block>

    <demo-block title="复选框组" padding>
      <view style="height:30px;line-height:30px;"><text v-for="item in checkbox2" :key="item">{{ item }}</text></view>
      <et-checkbox-group v-model="checkbox2">
        <et-checkbox name="a" block icon-disabled>复选框a-块级 - 只能点击文本</et-checkbox>
        <et-cell>
          <et-checkbox slot="title" name="b">复选框b - 被 et-cell 组件包裹</et-checkbox>
        </et-cell>
        <view>
          <et-checkbox name="c" label-disabled>复选框c - 只允许点击图标</et-checkbox>
        </view>
      </et-checkbox-group>
    </demo-block>

    <demo-block title="自定义图标" padding>
      <et-checkbox v-model="checkbox4" inactive-icon="checkbox-square" active-icon="checkbox-square-on">复选框a
      </et-checkbox>
    </demo-block>

    <demo-block title="单元格示例" padding>
      <et-cell title="标题" @click="checkbox3 = !checkbox3">
        <et-checkbox slot="text" :value="checkbox3"></et-checkbox>
      </et-cell>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block'
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
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
