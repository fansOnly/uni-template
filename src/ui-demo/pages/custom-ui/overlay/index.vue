<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">基础用法</view>
    <view class="gap"></view>
      <view class="demo-">
        <et-cell title="基础用法" is-link border hover-class="" @click="visible = true"></et-cell>
        <et-cell title="包含内容" is-link hover-class="" @click="visible2 = true"></et-cell>
      </view>
    </view>

    <et-overlay :visible.sync="visible"></et-overlay>
    <et-overlay :visible.sync="visible2">
      <view class="content">渺渺清音，演奏的是落英缤纷时的一场邂逅，亦或是内心记忆深处的烙印，回首往事，不堪的是那一丝轻狂，亦或是早已成风的夸下的海口，这般深的情，这般痴的心，难道皆抗拒不了漫长时间的流逝？牵着记忆的手，追寻罢……</view>
    </et-overlay>
  </view>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      visible2: false,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';

.content {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 200px;
  padding: 15px;
  background: #fff;
  transform: translate(-50%, -50%);
}
</style>
