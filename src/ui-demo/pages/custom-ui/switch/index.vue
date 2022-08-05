<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">基础用法</view>
      <view class="demo-content">
        <et-switch :value="value" @input="onSwitchChange"></et-switch>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">自定义值类型</view>
      <view class="demo-content">
        <et-cell border>
          <template slot="title">{{type1}} : {{value}}</template>
          <et-switch slot="text" v-model="value"></et-switch>
        </et-cell>
        <et-cell border>
          <view slot="title">{{type5}} : {{value5}}</view>
          <et-switch slot="text" v-model="value5" :active-value="1" :inactive-value="0"></et-switch>
        </et-cell>
        <et-cell>
          <template slot="title">{{type6}} : {{value6}}</template>
          <et-switch slot="text" v-model="value6" active-value="1" inactive-value="0"></et-switch>
        </et-cell>
      </view>
    </view>
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">显示提示文本</view>
      <view class="demo-content">
        <et-switch v-model="value2" show-text></et-switch>
        <et-switch v-model="value2" show-text active-text="on" inactive-text="off"></et-switch>
      </view>
    </view>

    <view class="demo-block">
      <view class="demo-title">自定义大小</view>
      <view class="demo-content">
        <et-switch v-model="value2" size="20"></et-switch>
        <et-switch v-model="value2" size="40"></et-switch>
      </view>
    </view>

    <view class="demo-block">
      <view class="demo-title">自定义颜色</view>
      <view class="demo-content">
        <et-switch v-model="value3" active-color="green" inactive-color="#ff0"></et-switch>
      </view>
    </view>

    <view class="demo-block">
      <view class="demo-title">禁用状态</view>
      <view class="demo-content">
        <et-switch v-model="value4" disabled></et-switch>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: false,
      value2: false,
      value3: true,
      value4: true,
      value5: 0,
      value6: '0',
    }
  },
  computed: {
    type1 () {
      return typeof this.value
    },
    type5 () {
      return typeof this.value5
    },
    type6 () {
      return typeof this.value6
    }
  },
  methods: {
    onSwitchChange(val) {
      console.log('[debug] onSwitchChange >>>', val)
      this.value = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
