<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title" hover-class="hover-class">基础用法</view>
      <view class="demo-body">
        <view style="margin-bottom:10px">v-model 双向绑定: {{checkbox}}</view>
        <et-checkbox v-model="checkbox">复选框</et-checkbox>
      </view>
    </view>
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">复选框组</view>
      <view class="demo-body">
        <view style="height:30px;line-height:30px;"><text v-for="item in checkbox2" :key="item">{{item}}</text></view>
        <et-checkbox-group v-model="checkbox2">
          <et-checkbox name="a" block icon-disabled>复选框a-块级 - 只能点击文本</et-checkbox>
          <et-cell>
            <et-checkbox slot="title" name="b" >复选框b - 被 et-cell 组件包裹</et-checkbox>
          </et-cell>
          <view><et-checkbox name="c" label-disabled>复选框c - 只允许点击图标</et-checkbox></view>
        </et-checkbox-group>
      </view>
    </view>
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">自定义图标</view>
      <view class="demo-body">
        <et-checkbox v-model="checkbox4" inactive-icon="checkbox-square-icon" active-icon="checkbox-square-on-icon">复选框a</et-checkbox>
      </view>
    </view>
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">单元格示例</view>
    </view>
    <view class="bg">
      <et-cell title="标题" @click="checkbox3 = !checkbox3">
        <et-checkbox slot="text" :value="checkbox3"></et-checkbox>
      </et-cell>
    </view>
  </view>
</template>

<script>
  export default {
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
@import '@p/assets/styles/index.scss';
</style>
