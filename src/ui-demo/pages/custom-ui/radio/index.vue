<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">单选框组 - v-model</view>
      <view class="demo-content">
        <view>{{ radio }}</view>
        <et-radio-group v-model="radio">
          <et-radio name="x" custom-style="margin-bottom: 8px;">单选框x</et-radio>
          <et-radio name="y" custom-style="margin-bottom: 8px;" label-disabled>单选框y - 只能点击图标</et-radio>
          <et-radio name="z" icon-disabled>单选框z - 只能点击文本</et-radio>
        </et-radio-group>
      </view>
    </view>
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">单选框组 - 水平布局</view>
      <view class="demo-content">
        <view>{{ radio1 }}</view>
        <et-radio-group v-model="radio1" direction="horizontal">
          <et-radio name="a" custom-style="margin-right: 8px;">单选框a</et-radio>
          <et-cell>
            <et-radio slot="title" name="b">单选框b - et-cell 组件包裹</et-radio>
          </et-cell>
          <view>
            <et-radio name="c">单选框c</et-radio>
          </view>
        </et-radio-group>
      </view>
    </view>
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">单选框组 - disabled</view>
      <view class="demo-content">
        <view>{{ radio3 }}</view>
        <et-radio-group v-model="radio3">
          <et-radio name="m" custom-style="margin-bottom: 8px;">单选框m</et-radio>
          <et-radio name="n" disabled>单选框n</et-radio>
        </et-radio-group>
      </view>
    </view>
    <view class="bg">
      <view class="demo-block">
        <view class="demo-title">单元格示例 - {{ radio2 }}</view>
      </view>
      <et-radio-group v-model="radio2">
        <et-cell title="单选框1" border @click="onClick($event, '1')">
          <et-radio slot="text" name="1"></et-radio>
        </et-cell>
        <et-cell title="单选框2" @click="onClick($event, '2')">
          <et-radio slot="text" name="2"></et-radio>
        </et-cell>
      </et-radio-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      radio: '',
      radio1: 'b',
      radio2: '2',
      radio3: '',
    }
  },
  methods: {
    onCheck(value) {
      this.radio1 = value
    },
    onClick(evt, name) {
      this.radio2 = name
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
