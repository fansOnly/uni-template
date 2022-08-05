<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">基础用法</view>
      <view class="gap"></view>
      <et-cell title="标题长度自适应自适应自适应自适应自适应自适应" border></et-cell>
      <et-cell title="标题" text="内容长度自适应自适应自适应自适应自适应自适应" title-width="80"></et-cell>
    </view>
    <view class="gap"></view>

    <view class="demo-block">
      <view class="demo-title">标签组</view>
      <view class="gap"></view>
        <et-cell-group title-class="title111" title-style="font-size:10px;" border custom-style="border-color: #f00;">
          <et-cell title="姓名" text="章三"></et-cell>
          <view>
            <et-cell title="姓名" text="里斯本"></et-cell>
          </view>
          <et-cell title="姓名" text="章三" :border="false"></et-cell>
        </et-cell-group>

    </view>
    <view class="gap"></view>

    <view class="demo-block">
      <view class="demo-title">导航样式</view>
      <view class="gap"></view>
      <et-cell title="标题" is-link border></et-cell>
      <et-cell title="标题222222" text="内容" is-link></et-cell>
    </view>
    <view class="gap"></view>

    <view class="demo-block">
      <view class="demo-title">自定义插槽</view>
      <view class="gap"></view>
      <et-cell class="et-cell-move--right" title="自定义内容" border>
        <view slot="text">这是自定义的内容</view>
      </et-cell>
      <et-cell title="自定义图标" is-link>
        <et-icon slot="icon" name="facial" size="20"></et-icon>
      </et-cell>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
::v-deep .title111 {
  color: #f00;
}
</style>
