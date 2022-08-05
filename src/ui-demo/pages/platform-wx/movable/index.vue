<template>
  <view class="page-wrapper">
    <view class="demo-block">
      <view class="demo-title">
        <view class="">x: {{x}}</view>
        <view class="">y: {{y}}</view>
        <view class="">source: {{source}}</view>
      </view>
    </view>
    <et-button type="primary" @click="onMove">点击移动(180 * 180)</et-button>
      <!-- 可拖拽工具 -->
    <et-movable :x="startX" :y="startY" width="56" height="56" @change="onChange">
      <view class="et-moveable-button">
        <view class="et-moveable-button__text">拖拽工具</view>
      </view>
    </et-movable>
  </view>
</template>

<script>
export default {
  data() {
    return {
      startX: '100%',
      startY: '50%',
      x: 0,
      y: 0,
      source: ''
    }
  },
  mounted() {
    this.x = this.startX
    this.y = this.startY
  },
  methods: {
    onMove() {
      this.startX = this.startY = 180
      setTimeout(() => {
        this.startX = this.x
        this.startY = this.y
      }, 1000);
    },
    onChange({x, y, source}) {
      this.x = x
      this.y = y
      this.source = source
    }
  }
}
</script>

<style lang="scss" scoped>
.et-moveable-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #e4182c;
  box-shadow: 0px 0px 12px 0px rgba(228, 24, 44, 0.33);
  border-radius: 100%;
}
.et-moveable-button__text {
  width: 56rpx;
  height: 80rpx;
  color: #fff;
  font-size: 28rpx;
}
</style>
